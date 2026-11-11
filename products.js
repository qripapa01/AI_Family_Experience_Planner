// v42: 체험학습 상품 카드(가로로 넘기는 카드) + '학부모가이드' 접기. 기본은 꺼져 있고, 켜는 방법은 두 가지입니다.
//   1) config.js 의 window.GYOGWAON_PRODUCTS = true   2) 주소 끝에 ?products=1 (미리 보기용)
// 실제 프로그램·요금(PROGRAMS, guides.js)은 공식 안내에서 확인한 내용만 표시하고, '예시' 카드는 화면 구성을 보여 주는 가상 정보라 반드시 '예시'로 표시한다.
const PROD_ON = (window.GYOGWAON_PRODUCTS === true) || /[?&]products=1/.test(location.search);
const REAL_SHORT = {
  '천체투영관 프로그램': '1,000~2,000원', '체험 프로그램': '성인 2,000원',
  '인터랙티브 체험존 (변신·마술·댄싱 로봇)': '어린이 3,000원', '3D 영상관 · 오케스트라 로봇': '입장료에 포함',
  '4층 만화체험 전시관 · 체험교육실': '5,000원'
};
const REF_PHOTO = { '천체투영관 프로그램': 'dome', '인터랙티브 체험존 (변신·마술·댄싱 로봇)': 'robotkid', '4층 만화체험 전시관 · 체험교육실': 'manga' };
const SAMPLE_PRODUCTS = [
  { for: ['별자리 탐험대'], photo: 'sky', motif: 'sky', subj: '과학', name: '밤하늘 별자리 관측 교실', price: '12,000원', who: '초등 3~6학년 · 가족 동반', note: '저녁 2시간' },
  { for: ['곤충 관찰 대작전', '식물원 관찰 그림일기'], motif: 'bug', subj: '과학', name: '도심 숲 곤충 관찰 교실', price: '10,000원', who: '초등 1~4학년 · 가족 동반', note: '오전 90분' },
  { for: ['옛 물건 비교 탐험', '한옥에서 옛 생활 체험', '선사시대 마을 탐험'], photo: 'pot', motif: 'pot', subj: '사회', name: '옛 생활 도구 만들기', price: '15,000원', who: '초등 3~6학년', note: '오후 2시간' },
  { for: ['만화로 남기는 하루', '시인의 말 수집가'], photo: 'draw', motif: 'comic', subj: '국어', name: '나만의 이야기책 만들기', price: '9,000원', who: '초등 2~5학년', note: '오전 2시간' },
  { for: ['로봇 탐정단'], photo: 'robotcar', motif: 'robot', subj: '과학', name: '코딩 로봇 첫걸음', price: '18,000원', who: '초등 4~6학년', note: '오후 2시간' }
];
// 장소와 관련 있는 예시만 고른다(관련 없는 상품으로 채우지 않는다). 해당이 없으면 빈 목록.
function pickSamples(item) { return SAMPLE_PRODUCTS.filter((x) => x.for && x.for.includes(item.title)); }

function prodImg(item, motif, subj, real, ref) {
  const [c1, c2] = SUBJ_COLOR[subj] || SUBJ_COLOR['통합'];
  const ph = real ? PHOTOS[item.title] : null;
  let inner, cap;
  if (ref) { inner = `<img src="img/prod/${ref}.webp" alt="참고 이미지" loading="lazy">`; cap = '참고 사진 · 실제 시설 아님'; }
  else if (ph) { inner = `<img src="${ph.src}" alt="${ph.ai ? item.place + ' (AI 생성 이미지)' : (ph.place || item.place)}" loading="lazy">`; cap = ph.ai ? 'AI 생성 이미지' : '사진'; }
  else { inner = `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><circle cx="40" cy="30" r="64" fill="#fff" opacity=".12"/><circle cx="300" cy="170" r="80" fill="#fff" opacity=".1"/>${MOTIFS[motif] || MOTIFS.tree}</svg>`; cap = '일러스트'; }
  return `<div class="prod-img" style="--c1:${c1};--c2:${c2}">${inner}<span class="prod-subj">${subj}</span><span class="prod-cap">${cap}</span></div>`;
}
const LINK_SAMPLES = [
    { for: ['한옥에서 옛 생활 체험', '선사시대 마을 탐험'], motif: 'pot', subj: '사회', name: '도자기 손빚기', op: '개인 공방 강사(예시)', price: '20,000원', who: '초등 2~6학년', note: '오후 2시간' },
  { for: ['곤충 관찰 대작전', '나무 이름 찾기', '호수 위 식물 탐험', '식물원 관찰 그림일기'], motif: 'tree', subj: '과학', name: '숲 해설 체험', op: '공공기관 프로그램(예시)', price: '5,000원', who: '초등 전 학년 · 가족', note: '오전 90분' }
];
function productsHTML(item) {
  const sj = subjOf(item), P = PROGRAMS[item.title];
  const real = (P ? P.items : []).map((x) => `<article class="prod" role="listitem">
      ${prodImg(item, MOTIF_OF[item.title], sj, true, REF_PHOTO[x.name])}<span class="prod-badge real">기존 상품 · 공식 안내</span>
      <div class="prod-body"><p class="prod-sub">📍 ${item.place}</p><h4>${x.name}</h4><p class="prod-who">대상 ${x.who}</p>
      <p class="prod-price">${REAL_SHORT[x.name] || '요금 확인'}</p>
      <a class="prod-btn" href="${P.url}" target="_blank" rel="noopener" data-prog="${item.title}">공식 안내 ↗</a></div></article>`);
  const lk = LINK_SAMPLES.filter((x) => x.for && x.for.includes(item.title)).map((s) => `<article class="prod ex" role="listitem">
      ${prodImg(item, s.motif, s.subj, false, null)}<span class="prod-badge ex">입점 예시</span>
      <div class="prod-body"><p class="prod-sub">${s.op}</p><h4>${s.name} (예시)</h4><p class="prod-who">${s.who} · ${s.note}</p>
      <p class="prod-price">${s.price} <small>(예시)</small></p><button type="button" class="prod-btn interest" data-pk="link" data-pi="${s.name}" data-pl="${item.title}">👍 이런 체험이 있으면 관심 있어요</button><p class="pi-msg" hidden>아직 준비 중인 예시예요. 관심을 남겨 주셔서 고마워요. 입점 체험을 고를 때 참고할게요.</p></div></article>`);
  const own = pickSamples(item).map((s) => `<article class="prod ex own" role="listitem">
      ${prodImg(item, s.motif, s.subj, false, s.photo)}<span class="prod-badge own">교과ON 기획 예시</span>
      <div class="prod-body"><p class="prod-sub">교과ON이 만드는 체험(예시)</p><h4>${s.name} (예시)</h4><p class="prod-who">${s.who} · ${s.note}</p>
      <p class="prod-price">${s.price} <small>(예시)</small></p><button type="button" class="prod-btn interest" data-pk="own" data-pi="${s.name}" data-pl="${item.title}">👍 이런 체험 관심 있어요</button><p class="pi-msg" hidden>아직 준비 중인 예시예요. 관심을 남겨 주셔서 고마워요. 체험을 만들 때 참고할게요.</p></div></article>`);
  const foot = P
    ? `<p class="prod-src">예약·문의: ${P.how} · 출처: ${P.src} · 확인일 ${P.checked} · 요금과 운영은 바뀔 수 있어 방문 전 공식 안내를 확인해 주세요.</p>`
    : `<p class="prod-src">이 장소의 프로그램·요금은 확인하는 중이에요. <a href="https://search.naver.com/search.naver?query=${encodeURIComponent('부천 ' + item.place + ' 체험 프로그램 요금 예약')}" target="_blank" rel="noopener" data-prog="${item.title}">공식 정보 찾아보기 ↗</a></p>`;
  const n1 = real.length + lk.length, n2 = own.length;
  const hasLink = n1 > 0, hasOwn = n2 > 0;
  if (!hasLink && !hasOwn) return `<section class="prod-wrap" aria-label="체험학습"><p class="prod-empty">이 장소에 연결된 체험 상품은 아직 없어요. 장소 정보와 부모용 가이드를 먼저 확인해 주세요.</p>${foot}</section>`;
  const first = hasLink ? 'link' : 'own';
  const types = (hasLink && hasOwn) ? `<div class="ptype" role="tablist"><span class="ptype-lbl">종류</span><button type="button" class="pt on" data-pt="link" data-pl="${item.title}">입점 체험 <i>${n1}</i></button><button type="button" class="pt" data-pt="own" data-pl="${item.title}">교과ON 기획 <i>${n2}</i></button></div>` : '';
  return `<section class="prod-wrap" aria-label="체험학습">
    ${types}
    ${hasLink ? `<p class="ptype-desc" data-pd="link"${first === 'link' ? '' : ' hidden'}>시설 업체, 개인 강사, 공공기관이 올린 체험을 한곳에서 볼 수 있어요. 지금은 안내와 공식 예약 연결만 하고, 교과ON에서 바로 예약·결제하는 기능은 준비 중이에요.</p>` : ''}
    ${hasOwn ? `<p class="ptype-desc" data-pd="own"${first === 'own' ? '' : ' hidden'}>우리 아이 학년·교과에 맞춰 교과ON이 직접 기획하는 체험이에요. 아직 준비 중이라 아래는 모두 예시예요.</p>` : ''}
    ${hasLink ? `<div class="prod-row" role="list" data-pr="link"${first === 'link' ? '' : ' hidden'}>${real.concat(lk).join('')}</div>` : ''}
    ${hasOwn ? `<div class="prod-row" role="list" data-pr="own"${first === 'own' ? '' : ' hidden'}>${own.join('')}</div>` : ''}
    ${foot}</section>`;
}
function guideBuyHTML(item) {
  return `<div class="gbuy"><b>📘 장소 가이드 한 권 <small>(준비 중 · 예시)</small></b>
    <p>${item.place} 미션지 + 아이에게 할 질문 + 집에서 이어하기를 정리한 가이드예요. 가격은 예시이며 지금은 판매하지 않아요.</p>
    <div class="gbuy-row"><button type="button" class="gb" data-gk="single" data-pl="${item.title}">1권 구매 관심<small>4,900원 (예시)</small></button><button type="button" class="gb" data-gk="sub" data-pl="${item.title}">월 구독 관심<small>월 3,900원 (예시)</small></button><button type="button" class="gb" data-gk="none" data-pl="${item.title}">관심 없어요</button></div>
    <p class="gb-msg" hidden>의견 고마워요. 가이드를 만들 때 참고할게요.</p></div>`;
}
document.addEventListener('click', (e) => {
  const g = e.target.closest && e.target.closest('.gb'); if (g) {
    const w = g.closest('.gbuy'); w.querySelectorAll('.gb').forEach((x) => { x.disabled = true; }); g.classList.add('on');
    const m = w.querySelector('.gb-msg'); if (m) m.hidden = false;
    if (typeof track === 'function') track('guide_interest', { place: g.dataset.pl, kind: g.dataset.gk }); return;
  }
  const t = e.target.closest && e.target.closest('.pt'); if (!t) return;
  const w = t.closest('.prod-wrap'), k = t.dataset.pt;
  w.querySelectorAll('.pt').forEach((x) => x.classList.toggle('on', x === t));
  w.querySelectorAll('[data-pr]').forEach((x) => { x.hidden = x.dataset.pr !== k; });
  w.querySelectorAll('[data-pd]').forEach((x) => { x.hidden = x.dataset.pd !== k; });
  if (typeof track === 'function') track('prod_type_view', { place: t.dataset.pl, type: k });
});
function tabsHTML(item) {
  return `<div class="tabs2" role="tablist"><button type="button" class="tab2 on" role="tab" aria-selected="true" data-tab="prod" data-t="${item.title}"><b>체험학습</b><small>프로그램 · 요금</small></button><button type="button" class="tab2" role="tab" aria-selected="false" data-tab="self" data-t="${item.title}"><b>학부모가이드</b><small>가이드 · 미션 · 기록</small></button></div>`;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest && e.target.closest('.tab2'); if (!b) return;
  const art = b.closest('article'), self = b.dataset.tab === 'self';
  art.querySelectorAll('.tab2').forEach((t) => { const on = t === b; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
  art.querySelector('.prod-pane').hidden = self; art.querySelector('.selfdo-body').hidden = !self;
  if (self && typeof track === 'function') track('selfdo_open', { place: b.dataset.t });
});

document.addEventListener('click', (e) => {
  const b = e.target.closest && e.target.closest('.prod-btn.interest'); if (!b || b.disabled) return;
  b.disabled = true; b.classList.add('done'); b.textContent = '✓ 관심을 남겼어요';
  const m = b.parentNode.querySelector('.pi-msg'); if (m) m.hidden = false;
  if (typeof track === 'function') track('product_interest', { place: b.dataset.pl, product: b.dataset.pi, kind: b.dataset.pk || 'sample' });
});
