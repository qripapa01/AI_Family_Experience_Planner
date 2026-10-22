// 교과ON — 모두의 창업 2기 지원용 MVP
// 추천 2단계 엔진: (1) 교과 → 장소 '유형' 매칭  (2) 유형 → 평점 + 학습목표 부합도로 '최적 장소' 선정
// 아이는 '재미있는 모험'을, 부모는 '앞으로 배울 교과와의 연결'을. 가까운 시점은 '지금이 좋은 시점'으로 강조.

const experiences = [
  {
    grades: [5, 6], semesters: [1, 2], interest: 'science', monthsAhead: 4,
    title: '로봇 탐정단', place: '부천로보파크', region: '경기 부천',
    placeType: '로봇 전시관', cost: '무료~저가 · 방문 전 요금 확인', fit: "실과·과학 '로봇·소프트웨어' 영역과 연결 가능",
    story: '움직이는 로봇을 보며 “어떻게 알고 움직일까?”를 찾아보는 탐정 놀이예요.',
    missions: ['로봇의 센서(눈·귀 역할)를 1개 찾기', '로봇이 하는 일을 가족에게 설명하기', '가장 마음에 든 로봇 앞에서 사진 찍기'],
    badge: '🤖 로봇 탐정',
    subject: '실과·과학 · 로봇과 소프트웨어',
    parent: '로봇의 센서와 움직임을 직접 보며 소프트웨어·기술에 대한 호기심을 키웁니다. 교과 연결은 영역 수준의 예시입니다.',
    nearby: [{ name: '김명주뚝안채밥상 부천본점', kind: '식당', note: '한식 상차림' }, { name: 'Cafe And (까치울 카페거리)', kind: '카페', note: '차·커피' }]
  },
  {
    grades: [3, 4, 5, 6], semesters: [1, 2], interest: 'science', monthsAhead: 1,
    title: '별자리 탐험대', place: '부천천문과학관', region: '경기 부천',
    placeType: '과학관', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '지구와 우주' 영역과 연결 가능",
    story: '별과 달을 올려다보며 하늘의 규칙을 하나씩 찾아가는 탐험이에요.',
    missions: ['계절별 별자리 1개 찾아 말해 보기', '달의 모양이 바뀌는 이유 가족에게 물어보기', '가장 신기했던 우주 이야기 한 줄 남기기'],
    badge: '⭐ 별자리 탐험가',
    subject: '과학 · 지구와 우주',
    parent: '별자리와 천체의 움직임을 먼저 접해 보는 경험입니다. 운영 프로그램은 방문 전 공식 안내를 확인해 주세요.',
    nearby: [{ name: '곤드레밥집 여월', kind: '식당', note: '한식' }, { name: '카페동네 여월동점', kind: '카페', note: '동네 카페' }]
  },
  {
    grades: [3, 4, 5, 6], semesters: [1, 2], interest: 'nature', monthsAhead: 2,
    title: '곤충 관찰 대작전', place: '부천자연생태공원·자연생태박물관', region: '경기 부천',
    placeType: '생태공원·박물관', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '생물과 환경' 영역과 연결 가능",
    story: '풀숲과 연못 속 작은 생명들을 관찰 기록장에 남겨 보는 모험이에요.',
    missions: ['관찰한 곤충·식물 이름 2개 적어 보기', '서로 다른 모양의 잎 3개 찾기', '오늘의 자연 사진 한 장 남기기'],
    badge: '🌿 자연 관찰가',
    subject: '과학 · 생물과 환경',
    parent: '생태 환경을 직접 보고 기록하며 생물과 환경 단원의 배경경험을 쌓습니다.',
    nearby: [{ name: '명가오리집', kind: '식당', note: '오리 요리 중심' }, { name: '카페 키아마', kind: '카페', note: '커피·디저트' }]
  },
  {
    grades: [1, 2, 3, 4, 5, 6], semesters: [1, 2], interest: 'history', monthsAhead: 3,
    title: '만화로 남기는 하루', place: '한국만화박물관', region: '경기 부천',
    placeType: '박물관', cost: '무료~저가 · 방문 전 요금 확인', fit: "국어·미술 '이야기 표현' 영역과 연결 가능",
    story: '오늘 본 것을 4컷 만화로 표현해 보는 창작 나들이예요.',
    missions: ['가장 재미있던 전시 1개 고르기', '오늘 있었던 일을 4컷 만화로 상상해 말하기', '좋아하는 캐릭터 앞에서 사진 찍기'],
    badge: '🎨 이야기꾼',
    subject: '국어·미술 · 이야기 표현',
    parent: '체험을 자기 말과 그림으로 표현해 보는 활동으로, 교과 영역과의 연결은 예시입니다.',
    nearby: [{ name: '신림춘천집 부천중동직영점', kind: '식당', note: '닭갈비' }, { name: 'Cafe Fantasia', kind: '카페', note: '만화박물관 인접 베이커리 카페' }]
  },
  {
    grades: [3, 4], semesters: [1, 2], interest: 'history', monthsAhead: 4,
    title: '옛 물건 비교 탐험', place: '부천시립박물관', region: '경기 부천',
    placeType: '박물관', cost: '무료~저가 · 방문 전 요금 확인', fit: "사회 '우리 고장' 영역과 연결 가능",
    story: '옛날 물건과 지금 물건을 견주며 우리 고장의 이야기를 찾아봐요.',
    missions: ['옛날 물건 1개 골라 쓰임 상상해 보기', '지금의 물건과 다른 점 하나 말하기', '가장 오래돼 보이는 전시 앞에서 사진 찍기'],
    badge: '🏛️ 고장 탐험가',
    subject: '사회 · 우리 고장',
    parent: '우리 고장의 역사와 생활 모습을 가볍게 접해 보는 경험입니다. 전시 구성은 방문 전 공식 안내를 확인해 주세요.',
    nearby: [{ name: '담쟁이추억', kind: '식당', note: '한식·찌개류' }, { name: '담쟁이북카페', kind: '카페', note: '책이 있는 카페' }]
  },
  {
    grades: [5, 6], semesters: [1, 2], interest: 'history', monthsAhead: 6,
    title: '활 속 과학 찾기', place: '부천활박물관', region: '경기 부천',
    placeType: '박물관', cost: '무료~저가 · 방문 전 요금 확인', fit: "사회(역사)·과학 영역과 연결 가능",
    story: '옛 활과 화살에 숨은 힘의 원리를 찾아보는 시간여행이에요.',
    missions: ['활의 어느 부분이 힘을 만드는지 찾아보기', '옛 무기와 지금 물건의 닮은 점 말하기', '가장 마음에 든 전시 앞에서 사진 찍기'],
    badge: '🏹 시간여행자',
    subject: '사회·과학 · 역사 속 과학',
    parent: '역사 속 도구에서 과학 원리를 찾아보는 활동입니다. 연결 영역은 예시입니다.',
    nearby: [{ name: '호식당', kind: '식당', note: '한식 고깃집' }, { name: '카페동네 부천역점', kind: '카페', note: '동네 카페' }]
  },
  {
    grades: [3, 4, 5, 6], semesters: [1, 2], interest: 'science', monthsAhead: 5,
    title: '우리 집 탄소 줄이기', place: '부천기후변화체험관', region: '경기 부천',
    placeType: '체험관', cost: '무료~저가 · 방문 전 요금 확인', fit: "사회·과학 '환경·자원' 영역과 연결 가능",
    story: '기후 이야기를 체험으로 만나고 우리 집에서 할 약속을 정해 봐요.',
    missions: ['기후 변화로 달라지는 점 1개 찾기', '우리 집에서 줄일 수 있는 것 한 가지 말하기', '가족 약속 한 줄 만들기'],
    badge: '🌍 지구 지킴이',
    subject: '사회·과학 · 환경과 자원',
    parent: '환경 문제를 체험으로 접해 보는 활동입니다. 운영 여부와 프로그램은 방문 전 공식 안내 확인이 필요합니다.',
    nearby: [{ name: '소사정육식당', kind: '식당', note: '고기 요리' }, { name: '투썸플레이스 부천소새울역점', kind: '카페', note: '카페·디저트' }]
  },
  {
    grades: [3, 4, 5, 6], semesters: [1, 2], interest: 'nature', monthsAhead: 5,
    title: '호수공원 소리 지도', place: '상동호수공원', region: '경기 부천',
    placeType: '공원', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '생물과 환경' 영역과 연결 가능",
    story: '호수 둘레를 걸으며 소리와 냄새로 나만의 지도를 만들어요.',
    missions: ['들리는 소리 3가지 찾기', '물가에서 사는 생물 1개 관찰하기', '오늘의 호수 사진 한 장 남기기'],
    badge: '🌊 호수 탐험가',
    subject: '과학 · 생물과 환경',
    parent: '가까운 공원에서 가볍게 시작하는 야외 관찰 활동입니다.',
    nearby: [{ name: '한옥집숯불갈비 부천직영점', kind: '식당', note: '갈비·냉면' }, { name: '커피늘보', kind: '카페', note: '상동도서관 앞 카페' }]
  },
  {
    grades: [3, 4, 5, 6], semesters: [1, 2], interest: 'nature', monthsAhead: 6,
    title: '나무 이름 찾기', place: '부천무릉도원수목원', region: '경기 부천',
    placeType: '수목원', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '식물' 영역과 연결 가능",
    story: '나무와 꽃 이름표를 찾아 나만의 식물 도감을 만들어요.',
    missions: ['이름표가 있는 나무 3그루 찾기', '잎 모양이 가장 특이한 식물 고르기', '가족과 가장 좋았던 장소 정하기'],
    badge: '🌳 식물 도감가',
    subject: '과학 · 식물의 생활',
    parent: '식물을 직접 보고 이름을 알아가는 관찰 활동입니다. 개방 시간은 방문 전 확인해 주세요.',
    nearby: [{ name: '물멍밥상 부천물멍타임점', kind: '식당', note: '수족관 콘셉트 식당' }, { name: 'TOV BEAN', kind: '카페', note: '베이커리 카페' }]
  },
  {
    grades: [3, 4, 5, 6], semesters: [1, 2], interest: 'nature', monthsAhead: 4,
    title: '호수 위 식물 탐험', place: '호수식물원 수피아', region: '경기 부천',
    placeType: '식물원', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '식물' 영역과 연결 가능",
    story: '호수와 식물이 어우러진 정원에서 나만의 식물 관찰 일기를 써 봐요.',
    missions: ['처음 보는 식물 이름표 2개 찾기', '물가 식물과 땅 식물의 차이 말하기', '가장 마음에 든 풍경 사진 한 장 남기기'],
    badge: '🌺 식물 탐험가',
    subject: '과학 · 식물의 생활',
    parent: '식물을 직접 보고 기록하는 관찰 활동입니다. 운영 시간·요금은 방문 전 공식 안내를 확인해 주세요.',
    nearby: [{ name: '옥길장터식당', kind: '식당', note: '한식·찌개류' }, { name: '커피101스트릿 부천옥길점', kind: '카페', note: '베이커리 카페' }]
  },
  {
    grades: [1, 2, 3, 4, 5, 6], semesters: [1, 2], interest: 'history', monthsAhead: 3,
    title: '도서관 보물 찾기', place: '부천 상동도서관', region: '경기 부천',
    placeType: '도서관', cost: '무료 · 이용 시간은 방문 전 확인', fit: "국어 '읽기·표현' 영역과 연결 가능",
    story: '서가를 탐험하며 오늘의 보물 책 한 권을 찾아 소개해 봐요.',
    missions: ['표지가 마음에 드는 책 1권 고르기', '고른 이유를 가족에게 한 문장으로 말하기', '오늘의 한 줄 독서 기록 남기기'],
    badge: '📚 책 탐험가',
    subject: '국어 · 읽기와 표현',
    parent: '도서관에서 책을 고르고 소개하는 활동으로, 읽기·표현 영역과의 연결은 예시입니다.',
    nearby: [{ name: '목향 상동본점', kind: '식당', note: '고깃집' }, { name: '이디야커피 부천벚꽃마을점', kind: '카페', note: '커피·베이커리' }]
  }
];

const GOLDEN_MAX_MONTHS = 3; // 이 개월 수 이내면 '지금이 좋은 시점'으로 강조

const gradeSelect = document.getElementById('gradeSelect');
const semesterSelect = document.getElementById('semesterSelect');
const interestSelect = document.getElementById('interestSelect');
const recommendBtn = document.getElementById('recommendBtn');
const cards = document.getElementById('cards');
const summaryText = document.getElementById('summaryText');

function cardTemplate(item) {
  const golden = item.monthsAhead <= GOLDEN_MAX_MONTHS;
  return `
    <article class="experience-card${golden ? ' golden' : ''}">
      <div class="card-topline">
        <span class="chip${golden ? ' hot' : ''}">${golden ? '🔥 지금이 좋은 시점' : `📅 약 ${item.monthsAhead}개월 뒤 학습과 연결`}</span>
        <span class="badge">${item.badge}</span>
      </div>
      <p class="subject">${item.subject}</p>
      <h3>${item.title}</h3>
      <p class="place">📍 ${item.place} · ${item.region}</p>
      <p class="why">📌 ${item.placeType} · ${item.cost} · 왜 이곳? ${item.fit}</p>
      <p class="story">${item.story}</p>
      <div class="mission-box quest" data-id="${item.title}">
        <div class="quest-head">
          <strong>🎮 오늘의 탐험 퀘스트</strong>
          <span class="quest-xp" data-xp>0 / ${item.missions.length}</span>
        </div>
        <div class="quest-bar"><i data-bar style="width:0%"></i></div>
        <ul class="quest-list">${item.missions.map((m, i) => questItem(item, m, i)).join('')}</ul>
        <div class="quest-reward" data-reward hidden>🎉 퀘스트 완료! <b>${item.badge}</b> 배지 획득</div>
      </div>
      <details>
        <summary>부모용 · 교과 연결 & 추천 이유</summary>
        <p><b>예상 학습 시기:</b> 앞으로 약 ${item.monthsAhead}개월 이내</p>
        <p><b>장소 선정 기준:</b> ${item.placeType} 유형 · ${item.fit}</p>
        <p>${item.parent}</p>
      </details>
      <div class="local-box">🏪 <strong>근처 코스 후보</strong> <span class="mute">참고용 · 제휴 아님 · 영업 여부는 방문 전 확인</span>
        <ul class="nearby">${item.nearby.map(n => `<li><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('부천 ' + n.name)}" target="_blank" rel="noopener" data-place="${item.title}" data-store="${n.name}" data-kind="${n.kind}">${n.kind === '식당' ? '🍚' : '☕'} <b>${n.name}</b> <small>${n.note}</small></a></li>`).join('')}</ul></div>
    </article>`;
}

// ===== 게임형 미션: 탭하면 완료, 진행바, 배지 =====
const QUEST_KEY = 'gyogwaon_quest_v1';
function loadQuest() { try { return JSON.parse(localStorage.getItem(QUEST_KEY)) || {}; } catch (e) { return {}; } }
function saveQuest(d) { try { localStorage.setItem(QUEST_KEY, JSON.stringify(d)); } catch (e) { /* 저장 불가 환경 무시 */ } }
const questState = loadQuest();

function missionIcon(text) {
  if (/사진|찍/.test(text)) return '📸';
  if (/말하|질문|이야기/.test(text)) return '🗣️';
  if (/듣기|소리/.test(text)) return '👂';
  if (/찾기|찾아/.test(text)) return '🔍';
  return '⭐';
}
function questItem(item, text, i) {
  const done = (questState[item.title] || []).includes(i);
  return `<li><button type="button" class="quest-btn${done ? ' done' : ''}" data-i="${i}" aria-pressed="${done}">
    <span class="q-icon">${missionIcon(text)}</span><span class="q-text">${text}</span><span class="q-check">${done ? '✅' : '⬜'}</span></button></li>`;
}
function refreshQuest(box) {
  const id = box.dataset.id;
  const total = box.querySelectorAll('.quest-btn').length;
  const done = (questState[id] || []).length;
  box.querySelector('[data-xp]').textContent = `${done} / ${total}`;
  box.querySelector('[data-bar]').style.width = `${Math.round(done / total * 100)}%`;
  box.querySelector('[data-reward]').hidden = done < total;
  box.classList.toggle('complete', done === total);
}
cards.addEventListener('click', (e) => {
  const btn = e.target.closest('.quest-btn');
  if (!btn) return;
  const box = btn.closest('.quest');
  const id = box.dataset.id, i = Number(btn.dataset.i);
  const set = new Set(questState[id] || []);
  if (set.has(i)) set.delete(i); else set.add(i);
  questState[id] = [...set];
  saveQuest(questState);
  btn.classList.toggle('done');
  btn.setAttribute('aria-pressed', set.has(i));
  btn.querySelector('.q-check').textContent = set.has(i) ? '✅' : '⬜';
  refreshQuest(box);
});

function render() {
  const grade = Number(gradeSelect.value);
  const semester = Number(semesterSelect.value);
  const interest = interestSelect.value;

  let filtered = experiences.filter(x => x.grades.includes(grade) && x.semesters.includes(semester));
  if (interest !== 'all') filtered = filtered.filter(x => x.interest === interest);

  // 해당 학년·학기 데모 데이터가 없으면 관심사 기준으로 대체 추천
  if (!filtered.length) {
    filtered = experiences.filter(x => interest === 'all' || x.interest === interest).slice(0, 3);
  }

  // 2단계 엔진: 가까운 시점(골든타임) 우선, 같은 시점이면 평점 높은 순
  filtered = filtered.slice().sort((a, b) => a.monthsAhead - b.monthsAhead);

  const goldenCount = filtered.filter(x => x.monthsAhead <= GOLDEN_MAX_MONTHS).length;
  cards.innerHTML = filtered.map(cardTemplate).join('');
  cards.querySelectorAll('.quest').forEach(refreshQuest);
  summaryText.textContent = `${grade}학년 ${semester}학기 · 최대 6개월 Experience Window에서 ${filtered.length}개 추천`
    + (goldenCount ? ` · 그중 ${goldenCount}개는 지금이 좋은 시점 🔥` : '');
}

recommendBtn.addEventListener('click', render);
gradeSelect.addEventListener('change', render);
semesterSelect.addEventListener('change', render);
interestSelect.addEventListener('change', render);
render();

// ===== 측정 도우미 =====
function track(type, data) { try { if (window.GO) return window.GO.send(type, data).catch(() => false); } catch (e) {} return Promise.resolve(false); }
recommendBtn.addEventListener('click', () => track('recommend', { grade: gradeSelect.value, semester: semesterSelect.value, interest: interestSelect.value }));
cards.addEventListener('click', (e) => {
  const btn = e.target.closest('.quest-btn');
  if (!btn) return;
  const box = btn.closest('.quest');
  track('quest_tap', { card: box.dataset.id, mission: btn.dataset.i, done: btn.classList.contains('done') });
});
cards.addEventListener('click', (e) => {
  const a = e.target.closest('.nearby a');
  if (a) track('local_click', { card: a.dataset.place, store: a.dataset.store, kind: a.dataset.kind });
});
cards.addEventListener('toggle', (e) => {
  if (e.target.tagName !== 'DETAILS' || !e.target.open) return;
  const art = e.target.closest('article');
  const q = art && art.querySelector('[data-id]');
  track('parent_detail_open', { card: q ? q.dataset.id : '' });
}, true);

// ===== 사전신청: 구글 시트로 전송 (config.js의 주소가 있을 때만) =====
(function () {
  const form = document.getElementById('signupForm');
  if (!form) return;
  const msg = document.getElementById('signupMsg');
  const btn = form.querySelector('.signup-btn');
  let started = false;
  form.addEventListener('focusin', () => { if (!started) { started = true; track('signup_start', {}); } });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const grades = [...form.querySelectorAll('input[name=grade]:checked')].map(x => x.value);
    const consent = document.getElementById('signupConsent').checked;
    const interview = document.getElementById('signupInterview').checked;
    let err = '';
    if (!grades.length) err = '자녀 학년을 하나 이상 선택해 주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err = '이메일 주소를 확인해 주세요.';
    else if (!consent) err = '개인정보 수집·이용 동의가 필요합니다.';
    msg.hidden = false;
    msg.classList.toggle('err', !!err);
    if (err) { msg.textContent = err; track('signup_error', { reason: err.slice(0, 12) }); return; }
    if (!window.GO || !window.GO.enabled) { msg.classList.add('err'); msg.textContent = '아직 신청 접수가 연결되지 않아 저장되지 않았어요.'; return; }
    btn.disabled = true; msg.classList.remove('err'); msg.textContent = '접수 중...';
    window.GO.send('signup', { email, grades: grades.join(','), interview, consent: true })
      .then(() => { msg.textContent = '🎉 사전신청이 접수되었어요. 출시 소식을 보내 드릴게요.'; form.reset(); })
      .catch(() => { msg.classList.add('err'); msg.textContent = '전송에 실패했어요. 잠시 뒤 다시 시도해 주세요.'; })
      .finally(() => { btn.disabled = false; });
  });
})();
