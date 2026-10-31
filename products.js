// v42: 체험학습 상품 카드(가로로 넘기는 카드) + '스스로 체험' 접기. 기본은 꺼져 있고, 켜는 방법은 두 가지입니다.
//   1) config.js 의 window.GYOGWAON_PRODUCTS = true   2) 주소 끝에 ?products=1 (미리 보기용)
// 실제 프로그램·요금(PROGRAMS, guides.js)은 공식 안내에서 확인한 내용만 표시하고, '예시' 카드는 화면 구성을 보여 주는 가상 정보라 반드시 '예시'로 표시한다.
const PROD_ON = (window.GYOGWAON_PRODUCTS === true) || /[?&]products=1/.test(location.search);
const REAL_SHORT = {
  '천체투영관 프로그램': '1,000~2,000원', '체험 프로그램': '성인 2,000원',
  '인터랙티브 체험존 (변신·마술·댄싱 로봇)': '어린이 3,000원', '3D 영상관 · 오케스트라 로봇': '입장료에 포함',
  '4층 만화체험 전시관 · 체험교육실': '5,000원'
};
const SAMPLE_PRODUCTS = [
  { motif: 'sky', subj: '과학', name: '밤하늘 별자리 관측 교실', price: '12,000원', who: '초등 3~6학년 · 가족 동반', note: '저녁 2시간' },
  { motif: 'bug', subj: '과학', name: '도심 숲 곤충 관찰 교실', price: '10,000원', who: '초등 1~4학년 · 가족 동반', note: '오전 90분' },
  { motif: 'pot', subj: '사회', name: '옛 생활 도구 만들기', price: '15,000원', who: '초등 3~6학년', note: '오후 2시간' },
  { motif: 'comic', subj: '국어', name: '나만의 이야기책 만들기', price: '9,000원', who: '초등 2~5학년', note: '오전 2시간' },
  { motif: 'robot', subj: '과학', name: '코딩 로봇 첫걸음', price: '18,000원', who: '초등 4~6학년', note: '오후 2시간' }
];
function pickSamples(item) {
  const sj = subjOf(item);
  const pick = SAMPLE_PRODUCTS.filter((s) => s.subj === sj).slice(0, 2);
  SAMPLE_PRODUCTS.forEach((s) => { if (pick.length < 2 && !pick.includes(s)) pick.push(s); });
  return pick;
}
function prodImg(item, motif, subj, real) {
  const [c1, c2] = SUBJ_COLOR[subj] || SUBJ_COLOR['통합'];
  const ph = real ? PHOTOS[item.title] : null;
  const inner = ph
    ? `<img src="${ph.src}" alt="${ph.ai ? item.place + ' (AI 생성 이미지)' : (ph.place || item.place)}" loading="lazy">`
    : `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><circle cx="40" cy="30" r="64" fill="#fff" opacity=".12"/><circle cx="300" cy="170" r="80" fill="#fff" opacity=".1"/>${MOTIFS[motif] || MOTIFS.tree}</svg>`;
  const cap = ph ? (ph.ai ? 'AI 생성 이미지' : '사진') : '일러스트';
  return `<div class="prod-img" style="--c1:${c1};--c2:${c2}">${inner}<span class="prod-subj">${subj}</span><span class="prod-cap">${cap}</span></div>`;
}
function productsHTML(item) {
  const sj = subjOf(item), P = PROGRAMS[item.title];
  const real = (P ? P.items : []).map((x) => `<article class="prod" role="listitem">
      ${prodImg(item, MOTIF_OF[item.title], sj, true)}<span class="prod-badge real">공식 안내 기준</span>
      <div class="prod-body"><p class="prod-sub">📍 ${item.place}</p><h4>${x.name}</h4><p class="prod-who">대상 ${x.who}</p>
      <p class="prod-price">${REAL_SHORT[x.name] || '요금 확인'}</p>
      <a class="prod-btn" href="${P.url}" target="_blank" rel="noopener" data-prog="${item.title}">공식 안내 ↗</a></div></article>`);
  const ex = pickSamples(item).map((s) => `<article class="prod ex" role="listitem">
      ${prodImg(item, s.motif, s.subj, false)}<span class="prod-badge ex">예시 · 실제 상품 아님</span>
      <div class="prod-body"><p class="prod-sub">가상 운영처</p><h4>${s.name} (예시)</h4><p class="prod-who">${s.who} · ${s.note}</p>
      <p class="prod-price">${s.price} <small>(예시)</small></p><span class="prod-btn off">화면 예시</span></div></article>`);
  const foot = P
    ? `<p class="prod-src">예약·문의: ${P.how} · 출처: ${P.src} · 확인일 ${P.checked} · 요금과 운영은 바뀔 수 있어 방문 전 공식 안내를 확인해 주세요.</p>`
    : `<p class="prod-src">이 장소의 프로그램·요금은 확인하는 중이에요. <a href="https://search.naver.com/search.naver?query=${encodeURIComponent('부천 ' + item.place + ' 체험 프로그램 요금 예약')}" target="_blank" rel="noopener" data-prog="${item.title}">공식 정보 찾아보기 ↗</a></p>`;
  return `<section class="prod-wrap" aria-label="체험학습">
    <div class="prod-head"><b>🎟 체험학습</b><small>옆으로 밀어 보세요 →</small></div>
    <div class="prod-row" role="list">${real.concat(ex).join('')}</div>
    <p class="prod-src">‘예시’ 카드는 화면 구성을 보여 주는 가상 정보예요. 교과ON은 상품을 직접 판매하거나 예약·결제를 받지 않아요.</p>${foot}</section>`;
}
function selfdoOpen(item) {
  return `<button type="button" class="selfdo-btn" aria-expanded="false" data-selfdo="${item.title}">
      <span class="sd-ico">🏡</span><span class="sd-txt"><b>스스로 체험</b><small>미션 · 한 줄 기록 · 부모용 가이드</small></span><span class="sd-open">펼쳐 보기 ▾</span></button>
    <div class="selfdo-body" hidden>`;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest && e.target.closest('.selfdo-btn'); if (!b) return;
  const body = b.nextElementSibling; if (!body) return;
  const open = body.hidden; body.hidden = !open; b.setAttribute('aria-expanded', open ? 'true' : 'false');
  b.classList.toggle('on', open);
  const t = b.querySelector('.sd-open'); if (t) t.textContent = open ? '접기 ▴' : '펼쳐 보기 ▾';
  if (open && typeof track === 'function') track('selfdo_open', { place: b.dataset.selfdo });
});
