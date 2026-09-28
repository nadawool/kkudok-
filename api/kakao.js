// /api/kakao.js — Vercel 서버리스 함수 (카카오 책 검색 프록시)
// 알라딘 OpenAPI 종료(2026-10-30)로 카카오(Daum) 책 검색 API로 교체.
// 브라우저는 /api/kakao?q=검색어 만 호출. REST API 키는 서버(환경변수)에만 있어 노출 안 됨.
//
// ⚙️ Vercel → Settings → Environment Variables 에
//    KAKAO_REST_KEY = (카카오 디벨로퍼스 > 내 애플리케이션 > 앱 키 > REST API 키)
//    넣고 재배포하세요.

// 카카오 썸네일(120x174)은 작아서, 안에 들어있는 원본 이미지 주소(fname)를 꺼내 더 큰 표지로 사용
function bigCover(thumb) {
  if (!thumb) return '';
  try {
    const f = new URL(thumb).searchParams.get('fname');
    if (f) return decodeURIComponent(f).replace(/^http:\/\//, 'https://');
  } catch (_) {}
  return thumb.replace(/^http:\/\//, 'https://');
}

module.exports = async (req, res) => {
  const q = ((req.query && req.query.q) || '').toString().trim();
  if (!q) { res.status(400).json({ error: 'q 파라미터가 필요해요' }); return; }

  const KEY = process.env.KAKAO_REST_KEY;
  if (!KEY) { res.status(500).json({ error: 'KAKAO_REST_KEY 환경변수가 없어요' }); return; }

  const api = 'https://dapi.kakao.com/v3/search/book'
    + '?query=' + encodeURIComponent(q)
    + '&size=20&page=1&sort=accuracy';

  try {
    const r = await fetch(api, { headers: { Authorization: 'KakaoAK ' + KEY } });
    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: (data && (data.message || data.errorType)) || ('HTTP ' + r.status) });
      return;
    }

    // 카카오 응답 → 앱에서 쓰기 쉬운 형태로 정리. ISBN 중복(같은 책 2번) 제거.
    const seen = new Set();
    const items = [];
    for (const d of (data.documents || [])) {
      const isbns = (d.isbn || '').split(/\s+/).filter(Boolean);
      const isbn13 = isbns.find(s => s.length === 13) || isbns[0] || '';
      const key = isbn13 || (d.title + '|' + (d.authors || []).join(','));
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({
        title: d.title || '',
        authors: d.authors || [],
        translators: d.translators || [],
        publisher: d.publisher || '',
        pubDate: (d.datetime || '').slice(0, 10),   // "2014-11-17"
        isbn13,
        cover: bigCover(d.thumbnail),
        thumb: (d.thumbnail || '').replace(/^http:\/\//, 'https://'),
      });
    }

    // 같은 검색어 반복 시 호출을 아끼도록 잠깐 캐시 (엣지 10분, 그 후 백그라운드 갱신)
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e) });
  }
};
