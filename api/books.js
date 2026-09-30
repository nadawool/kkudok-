// api/books.js — 꾸독 책 검색 (카카오 + 국립중앙도서관 + 구글북스 합치기)
// 호출: /api/books?q=검색어  ·  /api/books?isbn=9788937460449 (쪽수만)
// Vercel 환경변수: KAKAO_REST_KEY (기존), NL_CERT_KEY (국립중앙도서관), GOOGLE_BOOKS_KEY (구글북스)
// · 카카오 결과를 기본 목록으로 쓰고, 같은 ISBN의 쪽수·표지를 도서관/구글에서 채워 넣어요.
// · 카카오에 없는 책은 도서관 → 구글 순서로 뒤에 붙여요.
// · 키가 없거나 한 곳이 실패해도 나머지 결과로 정상 응답해요.

const T = 3500; // 각 API 최대 대기(ms)

function withTimeout(p, ms) {
  return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
}
const isbn13Of = s => {
  const all = String(s || '').replace(/[^0-9Xx ]/g, ' ').split(/\s+/).filter(Boolean);
  return all.find(x => x.length === 13) || all[0] || '';
};
const toPages = v => {
  const m = String(v || '').match(/(\d{2,5})/);
  return m ? parseInt(m[1], 10) : 0;
};
const https = u => (u || '').replace(/^http:\/\//, 'https://');

async function kakao(q) {
  const key = process.env.KAKAO_REST_KEY;
  if (!key) return [];
  const r = await fetch('https://dapi.kakao.com/v3/search/book?size=20&query=' + encodeURIComponent(q), {
    headers: { Authorization: 'KakaoAK ' + key }
  });
  const j = await r.json();
  return (j.documents || []).map(d => ({
    title: d.title || '',
    authors: d.authors || [],
    publisher: d.publisher || '',
    pubDate: (d.datetime || '').slice(0, 10),
    isbn13: isbn13Of(d.isbn),
    cover: https(d.thumbnail || ''),
    thumb: https(d.thumbnail || ''),
    pages: 0,
    src: 'kakao'
  }));
}

async function nl(q) {
  const key = process.env.NL_CERT_KEY;
  if (!key) return [];
  const u = 'https://www.nl.go.kr/seoji/SearchApi.do?result_style=json&page_no=1&page_size=20'
    + '&cert_key=' + encodeURIComponent(key) + '&title=' + encodeURIComponent(q);
  const r = await fetch(u);
  const j = await r.json();
  return (j.docs || []).map(d => ({
    title: d.TITLE || '',
    authors: d.AUTHOR ? [String(d.AUTHOR).replace(/\s*(지은이|지음|저|옮긴이|옮김|글|그림)\s*/g, ' ').trim()] : [],
    publisher: d.PUBLISHER || '',
    pubDate: d.PUBLISH_PREDATE ? `${d.PUBLISH_PREDATE.slice(0, 4)}-${d.PUBLISH_PREDATE.slice(4, 6)}` : '',
    isbn13: isbn13Of(d.EA_ISBN),
    cover: https(d.TITLE_URL || ''),
    thumb: https(d.TITLE_URL || ''),
    pages: toPages(d.PAGE),
    src: 'nl'
  }));
}

async function google(q) {
  const key = process.env.GOOGLE_BOOKS_KEY;
  const u = 'https://www.googleapis.com/books/v1/volumes?maxResults=20&printType=books&q='
    + encodeURIComponent('intitle:' + q) + (key ? '&key=' + encodeURIComponent(key) : '');
  const r = await fetch(u);
  const j = await r.json();
  return (j.items || []).map(it => {
    const v = it.volumeInfo || {};
    const ids = v.industryIdentifiers || [];
    const i13 = (ids.find(x => x.type === 'ISBN_13') || {}).identifier || '';
    const img = (v.imageLinks && (v.imageLinks.thumbnail || v.imageLinks.smallThumbnail)) || '';
    return {
      title: v.title || '',
      authors: v.authors || [],
      publisher: v.publisher || '',
      pubDate: v.publishedDate || '',
      isbn13: i13,
      cover: https(img).replace('&edge=curl', ''),
      thumb: https(img).replace('&edge=curl', ''),
      pages: v.pageCount || 0,
      src: 'google'
    };
  });
}

const norm = s => String(s || '').toLowerCase().replace(/[\s·:\-–—_()\[\]]/g, '');

// ISBN 한 권의 쪽수·표지만 조회 (책을 고른 뒤 쪽수가 비어 있을 때 사용)
async function lookupIsbn(isbn) {
  const tasks = [];
  if (process.env.NL_CERT_KEY) tasks.push((async () => {
    const r = await fetch('https://www.nl.go.kr/seoji/SearchApi.do?result_style=json&page_no=1&page_size=5'
      + '&cert_key=' + encodeURIComponent(process.env.NL_CERT_KEY) + '&isbn=' + encodeURIComponent(isbn));
    const d = ((await r.json()).docs || [])[0] || {};
    return { pages: toPages(d.PAGE), cover: https(d.TITLE_URL || '') };
  })());
  tasks.push((async () => {
    const key = process.env.GOOGLE_BOOKS_KEY;
    const r = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + encodeURIComponent(isbn)
      + (key ? '&key=' + encodeURIComponent(key) : ''));
    const v = (((await r.json()).items || [])[0] || {}).volumeInfo || {};
    const img = (v.imageLinks && (v.imageLinks.thumbnail || v.imageLinks.smallThumbnail)) || '';
    return { pages: v.pageCount || 0, cover: https(img).replace('&edge=curl', '') };
  })());
  const rs = await Promise.all(tasks.map(t => withTimeout(t, T).catch(() => ({}))));
  return { pages: (rs.find(x => x.pages) || {}).pages || 0, cover: (rs.find(x => x.cover) || {}).cover || '' };
}

export default async function handler(req, res) {
  const isbn = String((req.query && req.query.isbn) || '').replace(/[^0-9Xx]/g, '');
  if (isbn) {
    const r = await lookupIsbn(isbn);
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json(r);
  }
  const q = String((req.query && req.query.q) || '').trim();
  if (!q) return res.status(400).json({ error: 'q required', items: [] });

  const [k, n, g] = await Promise.all(
    [kakao, nl, google].map(fn => withTimeout(fn(q), T).catch(() => []))
  );

  // 쪽수·표지 보강용 사전 (ISBN → 도서관/구글 정보)
  const byIsbn = {};
  [...n, ...g].forEach(b => {
    if (!b.isbn13) return;
    const cur = byIsbn[b.isbn13] || {};
    byIsbn[b.isbn13] = { pages: cur.pages || b.pages, cover: cur.cover || b.cover };
  });

  const out = [], seen = new Set();
  const add = b => {
    const key = b.isbn13 || norm(b.title) + '|' + norm((b.authors || []).join(''));
    if (!b.title || seen.has(key)) return;
    seen.add(key);
    const extra = b.isbn13 && byIsbn[b.isbn13];
    if (extra) {
      if (!b.pages) b.pages = extra.pages || 0;
      if (!b.cover) { b.cover = extra.cover || ''; b.thumb = b.thumb || b.cover; }
    }
    out.push(b);
  };
  k.forEach(add);   // 1순위: 카카오
  n.forEach(add);   // 2순위: 국립중앙도서관 (카카오에 없는 책)
  g.forEach(add);   // 3순위: 구글북스

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({ items: out.slice(0, 30), sources: { kakao: k.length, nl: n.length, google: g.length } });
}
