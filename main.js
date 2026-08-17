const experiences = [
  {
    grade: 4,
    semester: 1,
    interest: 'history',
    monthsAhead: 3,
    title: '수원화성 성곽 탐험',
    place: '수원화성',
    story: '성곽을 따라 걸으며 옛 도시의 비밀을 찾아보는 하루 모험이에요.',
    missions: ['가장 멋진 성문 사진 찍기', '성곽에서 신기한 구조 1개 찾기', '가족이 함께 가장 기억에 남는 장소 고르기'],
    badge: '🏰 성곽 탐험가',
    parent: '초등 사회의 지역 역사·문화유산 학습과 연결됩니다.',
    local: '근처 전통시장·지역 식당과 연계한 가족 코스로 확장할 수 있어요.'
  },
  {
    grade: 4,
    semester: 1,
    interest: 'history',
    monthsAhead: 5,
    title: '왕의 보물 찾기',
    place: '국립중앙박물관',
    story: '박물관을 공부하러 가는 대신, 가족과 함께 오늘의 보물을 찾으러 떠나요.',
    missions: ['가장 신기한 유물 1개 고르기', '왕이나 옛사람과 관련된 물건 찾기', '내가 큐레이터라면 소개하고 싶은 유물 사진 찍기'],
    badge: '👑 보물 큐레이터',
    parent: '사회·역사 관련 단원을 몇 달 앞두고 자연스럽게 배경경험을 쌓도록 돕습니다.',
    local: '용산 일대 가족 식사·공원 산책과 결합할 수 있어요.'
  },
  {
    grade: 4,
    semester: 1,
    interest: 'science',
    monthsAhead: 4,
    title: '우주와 과학 놀이터',
    place: '국립과천과학관',
    story: '정답을 외우지 않고 만지고 보고 놀면서 “왜 그럴까?”를 발견해요.',
    missions: ['가장 신기했던 과학 장치 고르기', '가족에게 “왜 그럴까?” 질문 하나 하기', '우주·로봇·자연 중 나의 최애 전시 고르기'],
    badge: '🚀 호기심 탐험가',
    parent: '과학 수업 전 충분히 이른 시점에 호기심과 친숙도를 높이는 경험입니다.',
    local: '인근 공원·식당·카페와 함께 반나절 코스로 구성할 수 있어요.'
  },
  {
    grade: 3,
    semester: 1,
    interest: 'nature',
    monthsAhead: 2,
    title: '숲속 발견 대작전',
    place: '가까운 생태공원',
    story: '나뭇잎, 곤충, 소리, 냄새를 찾아보는 가벼운 야외 모험이에요.',
    missions: ['서로 다른 모양의 잎 3개 찾기', '새소리나 자연의 소리 1분 듣기', '오늘의 자연 사진 한 장 남기기'],
    badge: '🌿 자연 발견가',
    parent: '생태·환경 관련 과학 학습과 연결될 수 있는 경험입니다.',
    local: '주변 로컬 카페나 시장과 함께 동네 나들이로 이어갈 수 있어요.'
  },
  {
    grade: 5,
    semester: 1,
    interest: 'history',
    monthsAhead: 6,
    title: '시간여행 궁궐 산책',
    place: '경복궁',
    story: '옛 궁궐을 돌아다니며 왕과 백성이 살던 시대를 상상해 보는 시간여행이에요.',
    missions: ['가장 마음에 드는 건물 찾기', '옛날에 내가 살았다면 어디에서 지내고 싶은지 말하기', '가족 역사 사진 한 장 찍기'],
    badge: '⏳ 시간여행자',
    parent: '역사 단원 학습 훨씬 전부터 문화유산에 대한 친숙함을 만드는 데 초점을 둡니다.',
    local: '서촌·전통시장 등 지역상권과 자연스럽게 이어질 수 있어요.'
  }
];

const gradeSelect = document.getElementById('gradeSelect');
const semesterSelect = document.getElementById('semesterSelect');
const interestSelect = document.getElementById('interestSelect');
const recommendBtn = document.getElementById('recommendBtn');
const cards = document.getElementById('cards');
const summaryText = document.getElementById('summaryText');

function cardTemplate(item) {
  return `
    <article class="experience-card">
      <div class="card-topline">
        <span class="chip">${item.monthsAhead}개월 안 학습과 연결</span>
        <span class="badge">${item.badge}</span>
      </div>
      <h3>${item.title}</h3>
      <p class="place">📍 ${item.place}</p>
      <p class="story">${item.story}</p>
      <div class="mission-box">
        <strong>🎯 오늘의 발견 미션</strong>
        <ul>${item.missions.map(m => `<li>${m}</li>`).join('')}</ul>
      </div>
      <details>
        <summary>부모용 교과 연결 보기</summary>
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

  if (!filtered.length) {
    filtered = experiences.filter(x => interest === 'all' || x.interest === interest).slice(0, 3);
  }

  cards.innerHTML = filtered.map(cardTemplate).join('');
  summaryText.textContent = `${grade}학년 ${semester}학기 · 최대 6개월 Experience Window에서 ${filtered.length}개의 재미있는 나들이를 골랐어요.`;
}

recommendBtn.addEventListener('click', render);
render();
