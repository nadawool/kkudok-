// /api/aladin.js — Vercel 서버리스 함수 (알라딘 도서검색 프록시)
// 알라딘 OpenAPI는 HTTPS/CORS를 열어주지 않아 브라우저 직결이 막힘.
// → 서버(이 함수)에서 알라딘을 대신 호출하고, 깔끔한 JSON을 같은 사이트(HTTPS)로 돌려줌.
// 브라우저는 /api/aladin?q=검색어 만 호출하면 됨. (TTBKey는 서버에만 있어 노출 안 됨)

module.exports = async (req, res) => {
  const q = ((req.query && req.query.q) || '').toString().trim();
  if (!q) { res.status(400).json({ error: 'q 파라미터가 필요해요' }); return; }

  // 키는 Vercel 환경변수 ALADIN_TTB_KEY 로 넣는 걸 권장. 없으면 아래 기본값 사용.
  const KEY = process.env.ALADIN_TTB_KEY || 'ttbbrassee_ar1207001';

  // 서버 사이드라 http로 호출해도 mixed-content 걱정 없음. Version=20131101 → UTF-8 응답.
  const api = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx'
    + '?ttbkey=' + encodeURIComponent(KEY)
    + '&Query=' + encodeURIComponent(q)
    + '&QueryType=Keyword&SearchTarget=Book&MaxResults=20&start=1'
    + '&Cover=Big&OptResult=itemPage&output=js&Version=20131101';

  try {
    const r = await fetch(api);
    let text = (await r.text()).replace(/^\uFEFF/, '').trim();

    // output=js 응답은 보통 그대로 JSON. 혹시 콜백 래퍼/세미콜론이 붙으면 방어적으로 벗겨서 파싱.
    let data;
    try {
      data = JSON.parse(text);
    } catch (_) {
      const m = text.match(/^[^(]*\(([\s\S]*)\)\s*;?\s*$/); // 예: someFn({...});
      if (!m) throw new Error('알라딘 응답 파싱 실패');
      data = JSON.parse(m[1]);
    }

    // 같은 검색어 반복 시 알라딘 호출을 아끼도록 잠깐 캐시 (엣지 10분, 그 후 백그라운드 갱신)
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e) });
  }
};
