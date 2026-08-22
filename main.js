// 교과ON — 모두의 창업 2기 지원용 MVP
// 추천 2단계 엔진: (1) 교과 → 장소 '유형' 매칭  (2) 유형 → 평점 + 학습목표 부합도로 '최적 장소' 선정
// 아이는 '재미있는 모험'을, 부모는 '앞으로 배울 교과와의 연결'을. 가까운 시점은 '지금이 좋은 시점'으로 강조.

const experiences = [
  {
    grade: 4, semester: 1, interest: 'history', monthsAhead: 1,
    title: '수원화성 성곽 탐험', place: '수원화성', region: '경기 수원',
    placeType: '유적·문화유산', rating: 4.7, fit: "사회 '지역의 역사·문화유산' 학습목표 부합",
    story: '성곽을 따라 걸으며 옛 도시의 비밀을 찾아보는 하루 모험이에요.',
    missions: ['가장 멋진 성문에서 사진 찍기', '성곽에서 신기한 구조 1개 찾기', '가족이 함께 가장 기억에 남는 장소 고르기'],
    badge: '🏰 성곽 탐험가',
    subject: '사회 · 우리가 알아보는 지역의 역사',
    parent: '초등 사회의 지역 역사·문화유산 학습과 연결됩니다. 곧 배울 내용이라 지금 경험하기 좋은 시점이에요.',
    local: '행궁동 상권·전통시장·지역 식당과 연계한 가족 코스로 확장할 수 있어요.'
  },
  {
    grade: 4, semester: 1, interest: 'history', monthsAhead: 5,
    title: '왕의 보물 찾기', place: '국립중앙박물관', region: '서울 용산',
    placeType: '박물관', rating: 4.8, fit: "사회 '역사와 문화유산' 학습목표 부합",
    story: '박물관을 공부하러 가는 대신, 가족과 함께 오늘의 보물을 찾으러 떠나요.',
    missions: ['가장 신기한 유물 1개 고르기', '왕이나 옛사람과 관련된 물건 찾기', '내가 큐레이터라면 소개하고 싶은 유물 사진 찍기'],
    badge: '👑 보물 큐레이터',
    subject: '사회 · 역사와 문화유산',
    parent: '사회·역사 관련 단원을 몇 달 앞두고 자연스럽게 배경경험을 쌓도록 돕습니다.',
    local: '용산 일대 가족 식사·공원 산책과 결합할 수 있어요.'
  },
  {
    grade: 4, semester: 1, interest: 'science', monthsAhead: 2,
    title: '우주와 과학 놀이터', place: '국립과천과학관', region: '경기 과천',
    placeType: '과학관', rating: 4.6, fit: "과학 '물질과 에너지·우주' 학습목표 부합",
    story: '정답을 외우지 않고 만지고 보고 놀면서 “왜 그럴까?”를 발견해요.',
    missions: ['가장 신기했던 과학 장치 고르기', '가족에게 “왜 그럴까?” 질문 하나 하기', '우주·로봇·자연 중 나의 최애 전시 고르기'],
    badge: '🚀 호기심 탐험가',
    subject: '과학 · 물질과 에너지',
    parent: '과학 수업 전 이른 시점에 호기심과 친숙도를 높이는 경험입니다.',
    local: '인근 공원·식당·카페와 함께 반나절 코스로 구성할 수 있어요.'
  },
  {
    grade: 3, semester: 1, interest: 'nature', monthsAhead: 1,
    title: '숲속 발견 대작전', place: '가까운 생태공원', region: '우리 동네',
    placeType: '생태·야외', rating: 4.5, fit: "과학 '생명과 환경' 학습목표 부합",
    story: '나뭇잎, 곤충, 소리, 냄새를 찾아보는 가벼운 야외 모험이에요.',
    missions: ['서로 다른 모양의 잎 3개 찾기', '새소리나 자연의 소리 1분 듣기', '오늘의 자연 사진 한 장 남기기'],
    badge: '🌿 자연 발견가',
    subject: '과학 · 생명과 환경',
    parent: '생태·환경 관련 과학 학습과 연결될 수 있는 경험입니다. 곧 배울 시기라 지금이 좋아요.',
    local: '주변 로컬 카페나 시장과 함께 동네 나들이로 이어갈 수 있어요.'
  },
  {
    grade: 5, semester: 1, interest: 'history', monthsAhead: 6,
    title: '시간여행 궁궐 산책', place: '경복궁', region: '서울 종로',
    placeType: '유적·문화유산', rating: 4.8, fit: "사회 '우리 역사의 흐름' 학습목표 부합",
    story: '옛 궁궐을 돌아다니며 왕과 백성이 살던 시대를 상상해 보는 시간여행이에요.',
    missions: ['가장 마음에 드는 건물 찾기', '옛날에 살았다면 어디서 지내고 싶은지 말하기', '가족 역사 사진 한 장 찍기'],
    badge: '⏳ 시간여행자',
    subject: '사회 · 우리 역사의 흐름',
    parent: '역사 단원 학습 훨씬 전부터 문화유산에 대한 친숙함을 만드는 데 초점을 둡니다.',
    local: '서촌·전통시장 등 지역상권과 자연스럽게 이어질 수 있어요.'
  },
  {
    grade: 6, semester: 1, interest: 'science', monthsAhead: 3,
    title: '지층과 화석 탐정단', place: '서대문자연사박물관', region: '서울 서대문',
    placeType: '박물관', rating: 4.6, fit: "과학 '지구와 우주(지층·화석)' 학습목표 부합",
    story: '땅속에 숨은 아주 오래된 이야기를 화석으로 읽어보는 탐정 놀이예요.',
    missions: ['가장 오래돼 보이는 화석 찾기', '이 생물이 살던 환경 상상해서 말하기', '가장 멋진 전시 앞에서 사진 찍기'],
    badge: '🦖 화석 탐정',
    subject: '과학 · 지구와 우주',
    parent: '지층·화석 관련 과학 단원과 연결되는 배경경험을 제공합니다.',
    local: '서대문 지역 식당·카페와 함께 반나절 코스로 좋아요.'
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
      <p class="why">⭐ 평점 ${item.rating} · ${item.placeType} · 왜 이곳? ${item.fit}</p>
      <p class="story">${item.story}</p>
      <div class="mission-box">
        <strong>🎯 오늘의 발견 미션</strong>
        <ul>${item.missions.map(m => `<li>${m}</li>`).join('')}</ul>
      </div>
      <details>
        <summary>부모용 · 교과 연결 & 추천 이유</summary>
        <p><b>예상 학습 시기:</b> 앞으로 약 ${item.monthsAhead}개월 이내</p>
        <p><b>장소 선정 기준:</b> ${item.placeType} 유형 중 평점 ${item.rating} · ${item.fit}</p>
        <p>${item.parent}</p>
      </details>
      <div class="local-box">🏪 <strong>Learning + Local</strong><br>${item.local}</div>
    </article>`;
}

function render() {
  const grade = Number(gradeSelect.value);
  const semester = Number(semesterSelect.value);
  const interest = interestSelect.value;

  let filtered = experiences.filter(x => x.grade === grade && x.semester === semester);
  if (interest !== 'all') filtered = filtered.filter(x => x.interest === interest);

  // 해당 학년·학기 데모 데이터가 없으면 관심사 기준으로 대체 추천
  if (!filtered.length) {
    filtered = experiences.filter(x => interest === 'all' || x.interest === interest).slice(0, 3);
  }

  // 2단계 엔진: 가까운 시점(골든타임) 우선, 같은 시점이면 평점 높은 순
  filtered = filtered.slice().sort((a, b) => a.monthsAhead - b.monthsAhead || b.rating - a.rating);

  const goldenCount = filtered.filter(x => x.monthsAhead <= GOLDEN_MAX_MONTHS).length;
  cards.innerHTML = filtered.map(cardTemplate).join('');
  summaryText.textContent = `${grade}학년 ${semester}학기 · 최대 6개월 Experience Window에서 ${filtered.length}개 추천`
    + (goldenCount ? ` · 그중 ${goldenCount}개는 지금이 좋은 시점 🔥` : '');
}

recommendBtn.addEventListener('click', render);
gradeSelect.addEventListener('change', render);
semesterSelect.addEventListener('change', render);
interestSelect.addEventListener('change', render);
render();
