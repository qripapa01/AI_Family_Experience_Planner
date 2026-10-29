// v39: 장소 카드용 일러스트 썸네일(직접 제작한 도형 그림). 실제 장소 사진이 아니라 "예시 이미지"로 표시한다.
// 교과 색은 초등 교과서 표지 색 구분(국어·사회·수학·과학·통합)을 따른다. 사진을 확보하면 PHOTOS에 파일 경로를 넣으면 대체된다.
const SUBJ_COLOR = {
  '국어': ['#F07A62', '#D9503A'], '사회': ['#E7B23E', '#C98A1B'], '수학': ['#5B95E6', '#3667B8'],
  '과학': ['#2FB3A3', '#127C70'], '통합': ['#93C257', '#5E902A']
};
// AI 생성 이미지는 실제 시설 사진이 아니므로 반드시 안내 문구(credit)를 함께 표시한다. 실제 사진으로 바꿀 때는 출처·이용 조건을 credit에 적는다.
const AI_CREDIT = 'AI 생성 이미지 · 실제 시설 모습과 다를 수 있습니다.';
const PHOTOS = {
  '별자리 탐험대': { src: 'img/starry.webp', credit: AI_CREDIT, ai: true },
  '로봇 탐정단': { src: 'img/robot.webp', credit: AI_CREDIT, ai: true },
  '만화로 남기는 하루': { src: 'img/comic_photo.webp', ai: false, place: '한국만화박물관',
    who: 'Motoko C. K.', lic: 'CC BY 4.0', licUrl: 'https://creativecommons.org/licenses/by/4.0/deed.ko',
    srcUrl: 'https://commons.wikimedia.org/wiki/File:Korea_Manhwa_Museum_20251122_1.jpg', srcName: '위키미디어 커먼즈', edit: '잘라내기·크기 조정' },
  '곤충 관찰 대작전': { src: 'img/ecopark.webp', credit: AI_CREDIT, ai: true },
  '식물원 관찰 그림일기': { src: 'img/botanic_photo.webp', ai: false, place: '부천식물원',
    who: '경기도', lic: '공공누리 제1유형', licUrl: 'https://www.kogl.or.kr/info/licenseType1.do',
    srcUrl: 'https://www.kogl.or.kr/recommend/recommendDivView.do?division=img&recommendIdx=37028', srcName: '공공누리', edit: '잘라내기·크기 조정' },
  '호수공원 소리 지도': { src: 'img/lake.webp', credit: AI_CREDIT, ai: true },
  '호수 위 식물 탐험': { src: 'img/supia.webp', credit: AI_CREDIT, ai: true },
  '나무 이름 찾기': { src: 'img/arboretum.webp', credit: AI_CREDIT, ai: true },
  '한옥에서 옛 생활 체험': { src: 'img/hanok.webp', credit: AI_CREDIT, ai: true }
};
const W = 'fill="#fff"';
const MOTIFS = {
  sky: `<circle cx="236" cy="62" r="30" ${W} opacity=".95"/><circle cx="248" cy="54" r="26" fill="var(--c1)"/>
    <path d="M70 52l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1z" ${W}/><path d="M140 100l3 8 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" ${W} opacity=".85"/>
    <path d="M0 150Q60 118 120 140T240 132T320 146V180H0z" ${W} opacity=".28"/><path d="M196 150a34 34 0 0 1 68 0z" ${W}/><rect x="190" y="150" width="80" height="10" rx="3" ${W} opacity=".9"/><path d="M226 118l8-12" stroke="var(--c2)" stroke-width="6" stroke-linecap="round"/>`,
  robot: `<rect x="108" y="54" width="104" height="78" rx="18" ${W}/><rect x="126" y="76" width="22" height="22" rx="6" fill="var(--c2)"/><rect x="172" y="76" width="22" height="22" rx="6" fill="var(--c2)"/>
    <rect x="136" y="110" width="48" height="8" rx="4" fill="var(--c1)"/><rect x="157" y="30" width="6" height="26" ${W}/><circle cx="160" cy="28" r="9" ${W}/>
    <rect x="86" y="82" width="14" height="30" rx="7" ${W} opacity=".8"/><rect x="220" y="82" width="14" height="30" rx="7" ${W} opacity=".8"/><rect x="128" y="138" width="64" height="18" rx="9" ${W} opacity=".5"/>`,
  comic: `<rect x="62" y="38" width="86" height="64" rx="8" ${W}/><rect x="158" y="38" width="100" height="40" rx="8" ${W} opacity=".9"/><rect x="158" y="86" width="100" height="56" rx="8" ${W} opacity=".75"/><rect x="62" y="110" width="86" height="32" rx="8" ${W} opacity=".6"/>
    <circle cx="105" cy="66" r="15" fill="var(--c1)"/><path d="M180 60h44M180 52h60" stroke="var(--c2)" stroke-width="5" stroke-linecap="round"/><path d="M200 120q22-26 44 0" stroke="var(--c2)" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  bug: `<ellipse cx="160" cy="98" rx="34" ry="42" ${W}/><circle cx="160" cy="48" r="17" ${W}/><path d="M160 60v82" stroke="var(--c2)" stroke-width="4"/><circle cx="148" cy="84" r="6" fill="var(--c2)"/><circle cx="172" cy="108" r="6" fill="var(--c2)"/>
    <path d="M150 34q-12-18-24-16M170 34q12-18 24-16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M60 150q40-40 80-12M200 150q40-30 70-6" ${W} opacity=".3"/><ellipse cx="248" cy="62" rx="20" ry="10" ${W} opacity=".5" transform="rotate(-30 248 62)"/><ellipse cx="78" cy="70" rx="20" ry="10" ${W} opacity=".5" transform="rotate(30 78 70)"/>`,
  pot: `<path d="M120 60h80q22 16 22 50q0 30-22 40h-80q-22-10-22-40q0-34 22-50z" ${W}/><rect x="124" y="46" width="72" height="16" rx="8" ${W} opacity=".9"/><path d="M104 88h112M102 112h116" stroke="var(--c2)" stroke-width="5" stroke-dasharray="10 8"/>
    <circle cx="258" cy="58" r="22" ${W} opacity=".35"/><path d="M40 156h240" stroke="#fff" stroke-width="4" opacity=".4"/>`,
  bow: `<path d="M110 30Q232 90 110 150" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M110 30L110 150" stroke="#fff" stroke-width="3" opacity=".7"/><path d="M110 90H260" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M260 90l-18-10v20z" ${W}/><path d="M122 90l-14-9v18z" ${W} opacity=".0"/><circle cx="250" cy="130" r="26" ${W} opacity=".28"/>`,
  earth: `<circle cx="160" cy="92" r="52" ${W}/><path d="M130 70q16-14 30-2q4 18-14 24q-12-6-16-22zM166 104q22-8 30 8q-6 22-26 18q-8-12-4-26z" fill="var(--c1)"/><path d="M60 150q50-24 100-6t100-4" ${W} opacity=".3"/><path d="M236 40q16 8 8 28q-18-6-8-28z" ${W} opacity=".7"/>`,
  lake: `<circle cx="248" cy="52" r="22" ${W} opacity=".9"/><path d="M0 112Q80 94 160 112T320 108V180H0z" ${W} opacity=".4"/><path d="M0 134Q80 118 160 134T320 130V180H0z" ${W} opacity=".55"/><path d="M40 110q14-20 28 0M240 120q14-20 28 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M150 40l-10 36h20z" ${W}/>`,
  tree: `<rect x="150" y="104" width="20" height="52" rx="4" ${W} opacity=".9"/><circle cx="160" cy="78" r="44" ${W}/><circle cx="124" cy="96" r="26" ${W} opacity=".85"/><circle cx="198" cy="96" r="26" ${W} opacity=".85"/><circle cx="148" cy="70" r="8" fill="var(--c1)" opacity=".7"/><circle cx="176" cy="86" r="8" fill="var(--c1)" opacity=".7"/>`,
  lily: `<path d="M0 120Q80 104 160 120T320 116V180H0z" ${W} opacity=".35"/><ellipse cx="120" cy="124" rx="42" ry="14" ${W} opacity=".9"/><ellipse cx="208" cy="140" rx="34" ry="11" ${W} opacity=".8"/><circle cx="130" cy="106" r="16" ${W}/><circle cx="130" cy="106" r="7" fill="var(--c2)"/><path d="M96 70q16 24 34 36" stroke="#fff" stroke-width="4" fill="none"/>`,
  books: `<rect x="86" y="62" width="30" height="86" rx="5" ${W}/><rect x="122" y="48" width="34" height="100" rx="5" ${W} opacity=".85"/><rect x="162" y="70" width="28" height="78" rx="5" ${W} opacity=".95"/><rect x="196" y="56" width="38" height="92" rx="5" ${W} opacity=".75"/><rect x="238" y="82" width="10" height="66" rx="3" ${W}/>
    <path d="M94 90h14M94 102h14M130 76h18M170 96h12" stroke="var(--c2)" stroke-width="4" stroke-linecap="round"/><path d="M60 152h200" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
  drop: `<path d="M160 28Q214 94 200 124a40 40 0 1 1-80 0Q106 94 160 28z" ${W}/><path d="M140 122q4 14 18 18" stroke="var(--c2)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M40 150q30-14 60 0t60 0t60 0t60 0" stroke="#fff" stroke-width="5" fill="none" opacity=".5"/>`,
  hanok: `<path d="M64 82Q160 44 256 82l-12 14H76z" ${W}/><path d="M64 82Q80 96 76 96" ${W}/><rect x="96" y="96" width="128" height="52" ${W} opacity=".7"/><rect x="108" y="104" width="28" height="44" fill="var(--c2)" opacity=".55"/><rect x="146" y="104" width="28" height="44" fill="var(--c2)" opacity=".55"/><rect x="184" y="104" width="28" height="44" fill="var(--c2)" opacity=".55"/><rect x="70" y="148" width="180" height="8" rx="3" ${W}/>`,
  hut: `<path d="M160 36L248 148H72z" ${W}/><path d="M160 76l34 72H126z" fill="var(--c2)" opacity=".55"/><circle cx="62" cy="64" r="20" ${W} opacity=".4"/><path d="M40 152h240" stroke="#fff" stroke-width="5" opacity=".5"/>`,
  hands: `<circle cx="120" cy="84" r="30" ${W}/><circle cx="200" cy="84" r="30" ${W} opacity=".8"/><path d="M80 148q40-44 80-10q40-34 80 10z" ${W} opacity=".9"/><path d="M160 36q-12-14-20 0q4 12 20 22q16-10 20-22q-8-14-20 0z" ${W}/>`,
  poem: `<path d="M96 52q-30 6-30 40h32v34H62V92M196 52q-30 6-30 40h32v34h-36V92" fill="none"/><path d="M92 50h36v40q0 30-30 36l-4-12q16-6 16-20H92z" ${W}/><path d="M192 50h36v40q0 30-30 36l-4-12q16-6 16-20H192z" ${W} opacity=".85"/><path d="M80 150h160" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>`,
  sprout: `<path d="M160 148V90" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M160 96q-8-44-52-44q-2 40 52 44z" ${W}/><path d="M160 86q8-40 52-38q2 38-52 38z" ${W} opacity=".85"/><path d="M110 150h100" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".6"/><circle cx="64" cy="54" r="16" ${W} opacity=".35"/>`
};
const MOTIF_OF = {
  '로봇 탐정단': 'robot', '별자리 탐험대': 'sky', '곤충 관찰 대작전': 'bug', '만화로 남기는 하루': 'comic', '옛 물건 비교 탐험': 'pot',
  '활 속 과학 찾기': 'bow', '우리 집 탄소 줄이기': 'earth', '호수공원 소리 지도': 'lake', '나무 이름 찾기': 'tree', '호수 위 식물 탐험': 'lily',
  '도서관 보물 찾기': 'books', '물의 여행 따라가기': 'drop', '한옥에서 옛 생활 체험': 'hanok', '선사시대 마을 탐험': 'hut',
  '다름을 존중하는 하루': 'hands', '시인의 말 수집가': 'poem', '식물원 관찰 그림일기': 'sprout'
};
const PRICE_BADGE = { '별자리 탐험대': '1,000원부터', '로봇 탐정단': '어린이 3,000원', '만화로 남기는 하루': '일반 5,000원' };
function creditHTML(ph) {
  if (ph.ai) return ph.credit;
  const a = (u, t) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`;
  return `사진: ${ph.who} · ${a(ph.licUrl, ph.lic)} · ${a(ph.srcUrl, '원본')} · 수정: ${ph.edit}`;
}
function creditListHTML() {
  const rows = Object.entries(PHOTOS).filter(([, p]) => !p.ai).map(([t, p]) => `<li><b>${p.place}</b> — ${creditHTML(p)}</li>`).join('');
  return `<h2>이미지 안내</h2><p class="muted">카드의 이미지는 실제 시설 사진이거나 AI로 만든 예시 이미지이며, 각 이미지 아래에 구분해 표시했어요. 일러스트·AI 이미지는 실제 시설 모습과 다를 수 있어요.</p><ul class="credit-list">${rows}</ul>`;
}
function subjOf(item) {
  const s = String(item.subject || '');
  for (const k of ['국어', '사회', '수학', '과학', '통합']) if (s.includes(k)) return k;
  return '통합';
}
function thumbHTML(item) {
  const sj = subjOf(item), [c1, c2] = SUBJ_COLOR[sj];
  const ph = PHOTOS[item.title];
  const price = PRICE_BADGE[item.title] || '요금 확인 중';
  const body = ph
    ? `<img src="${ph.src}" alt="${ph.ai ? item.place + ' (AI 생성 이미지)' : (ph.place || item.place)}" loading="lazy">`
    : `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><circle cx="40" cy="30" r="64" fill="#fff" opacity=".12"/><circle cx="300" cy="170" r="80" fill="#fff" opacity=".1"/>${MOTIFS[MOTIF_OF[item.title]] || MOTIFS.tree}</svg>`;
  return `<div class="thumb" style="--c1:${c1};--c2:${c2}">${body}<span class="thumb-subj">${sj}</span><span class="thumb-price">${price}</span><span class="thumb-tag">${ph ? creditHTML(ph) : '일러스트 · 예시 이미지'}</span></div>`;
}
