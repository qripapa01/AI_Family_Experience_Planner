// 시험용: 주소 뒤에 ?reset=1 을 붙이면 이 기기에 저장된 진행·신청 표시를 지웁니다(서버 데이터는 그대로).
try { if (/[?&]reset=1/.test(location.search)) { ['gyogwaon_quest_v1', 'gyogwaon_diary_v1', 'gyogwaon_signed', 'gyogwaon_survey_done'].forEach((k) => localStorage.removeItem(k)); history.replaceState(null, '', location.pathname + location.hash); } } catch (e) {}
// 교과ON — 모두의 창업 2기 지원용 MVP
// 추천 방식(규칙 기반, AI 아님): 학년(학년군) → 교과 → 영역(2022 개정 성취기준 단원) 순으로 고른 조건에 연결된 장소를 보여 줍니다.
// 없으면 '영역 → 교과' 순으로 조건을 풀어 가까운 대안을 보여 주며 그 사실을 화면에 알립니다(학년군은 항상 지킴).
// 학기별 단원 배치는 교과서마다 달라 교육과정 원문(학년군 기준)만으로는 나눌 수 없어, 학기는 아직 추천 조건에 넣지 않았습니다.

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
    grades: [1, 2, 3, 4, 5, 6], semesters: [1, 2], interest: 'nature', monthsAhead: 2,
    title: '곤충 관찰 대작전', place: '부천자연생태공원·자연생태박물관', region: '경기 부천',
    placeType: '생태공원·박물관', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '생물과 환경' 영역과 연결 가능",
    story: '풀숲과 연못 속 작은 생명들을 관찰 기록장에 남겨 보는 모험이에요.',
    missions: ['관찰한 곤충·식물 이름 2개 적어 보기', '서로 다른 모양의 잎 3개 찾기', '오늘의 자연 사진 한 장 남기기'],
    badge: '🌿 자연 관찰가',
    subject: '과학 · 생물과 환경',
    subject12: '통합교과(슬기로운 생활) · 자연과 생태', fit12: "통합교과 '슬기로운 생활(생태 탐구)'와 연결 가능",
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
    grades: [1, 2, 3, 4], semesters: [1, 2], interest: 'history', monthsAhead: 4,
    title: '옛 물건 비교 탐험', place: '부천시립박물관', region: '경기 부천',
    placeType: '박물관', cost: '무료~저가 · 방문 전 요금 확인', fit: "사회 '우리 고장' 영역과 연결 가능",
    story: '옛날 물건과 지금 물건을 견주며 우리 고장의 이야기를 찾아봐요.',
    missions: ['옛날 물건 1개 골라 쓰임 상상해 보기', '지금의 물건과 다른 점 하나 말하기', '가장 오래돼 보이는 전시 앞에서 사진 찍기'],
    badge: '🏛️ 고장 탐험가',
    subject: '사회 · 우리 고장',
    subject12: '통합교과(슬기로운 생활) · 우리 마을과 옛 물건', fit12: "통합교과 '슬기로운 생활(마을·과거와 현재)'와 연결 가능",
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
    grades: [1, 2, 3, 4, 5, 6], semesters: [1, 2], interest: 'nature', monthsAhead: 5,
    title: '호수공원 소리 지도', place: '상동호수공원', region: '경기 부천',
    placeType: '공원', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '생물과 환경' 영역과 연결 가능",
    story: '호수 둘레를 걸으며 소리와 냄새로 나만의 지도를 만들어요.',
    missions: ['들리는 소리 3가지 찾기', '물가에서 사는 생물 1개 관찰하기', '오늘의 호수 사진 한 장 남기기'],
    badge: '🌊 호수 탐험가',
    subject: '과학 · 생물과 환경',
    subject12: '통합교과(즐거운 생활) · 자연 감상', fit12: "통합교과 '즐거운 생활(자연 감상)'과 연결 가능",
    parent: '가까운 공원에서 가볍게 시작하는 야외 관찰 활동입니다.',
    nearby: [{ name: '한옥집숯불갈비 부천직영점', kind: '식당', note: '갈비·냉면' }, { name: '커피늘보', kind: '카페', note: '상동도서관 앞 카페' }]
  },
  {
    grades: [1, 2, 3, 4, 5, 6], semesters: [1, 2], interest: 'nature', monthsAhead: 6,
    title: '나무 이름 찾기', place: '부천무릉도원수목원', region: '경기 부천',
    placeType: '수목원', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '식물' 영역과 연결 가능",
    story: '나무와 꽃 이름표를 찾아 나만의 식물 도감을 만들어요.',
    missions: ['이름표가 있는 나무 3그루 찾기', '잎 모양이 가장 특이한 식물 고르기', '가족과 가장 좋았던 장소 정하기'],
    badge: '🌳 식물 도감가',
    subject: '과학 · 식물의 생활',
    subject12: '통합교과(슬기로운 생활) · 계절과 식물', fit12: "통합교과 '슬기로운 생활(계절·식물)'과 연결 가능",
    parent: '식물을 직접 보고 이름을 알아가는 관찰 활동입니다. 개방 시간은 방문 전 확인해 주세요.',
    nearby: [{ name: '물멍밥상 부천물멍타임점', kind: '식당', note: '수족관 콘셉트 식당' }, { name: 'TOV BEAN', kind: '카페', note: '베이커리 카페' }]
  },
  {
    grades: [1, 2, 3, 4, 5, 6], semesters: [1, 2], interest: 'nature', monthsAhead: 4,
    title: '호수 위 식물 탐험', place: '호수식물원 수피아', region: '경기 부천',
    placeType: '식물원', cost: '무료~저가 · 방문 전 요금 확인', fit: "과학 '식물' 영역과 연결 가능",
    story: '호수와 식물이 어우러진 정원에서 나만의 식물 관찰 일기를 써 봐요.',
    missions: ['처음 보는 식물 이름표 2개 찾기', '물가 식물과 땅 식물의 차이 말하기', '가장 마음에 든 풍경 사진 한 장 남기기'],
    badge: '🌺 식물 탐험가',
    subject: '과학 · 식물의 생활',
    subject12: '통합교과(슬기로운 생활) · 계절과 식물', fit12: "통합교과 '슬기로운 생활(계절·식물)'과 연결 가능",
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
  },
  {
    grades: [3, 4], semesters: [1, 2], interest: 'science', monthsAhead: 3,
    title: '물의 여행 따라가기', place: '부천물박물관', region: '경기 부천',
    placeType: '박물관', cost: '무료(공공예약 안내 기준, 평일 운영) · 방문 전 예약·휴관일 확인', fit: '과학 \'물의 상태 변화\' 영역과 연결 가능',
    story: '물이 얼음, 물, 수증기로 모습을 바꾸는 여행을 따라가 봐요.',
    missions: ['물이 모습을 바꾸는 예 1개 찾기', '우리 집에서 물을 쓰는 곳 3곳 떠올려 보기', '가장 신기했던 물 이야기 한 줄 남기기'],
    badge: '💧 물 탐험가',
    subject: '과학 · 물의 상태 변화',
    parent: '물의 상태 변화와 물의 쓰임을 먼저 접해 보는 경험입니다. 운영 프로그램과 예약은 방문 전 공식 안내를 확인해 주세요.',
    nearby: []
  },
  {
    grades: [1, 2, 3, 4, 5, 6], semesters: [1, 2], interest: 'history', monthsAhead: 5,
    title: '한옥에서 옛 생활 체험', place: '부천한옥체험마을', region: '경기 부천',
    placeType: '전통문화 체험 공간', cost: '입장 무료·체험 유료(비공식 정보) · 방문 전 공식 확인 필수', fit: '사회 \'옛 생활과 풍습\' 영역과 연결 가능',
    story: '한옥을 둘러보며 옛 사람들의 집과 생활을 오늘과 견주어 봐요.',
    missions: ['한옥에서 우리 집과 다른 점 2개 찾기', '옛날 방식의 체험 1가지 해 보기', '한옥 앞에서 가족 사진 찍기'],
    badge: '🏯 한옥 탐험가',
    subject: '사회 · 옛 생활과 풍습',
    subject12: '통합교과(슬기로운·즐거운 생활) · 우리나라의 문화', fit12: "통합교과 '우리나라의 문화'와 연결 가능",
    parent: '전통 가옥과 옛 생활 모습을 가볍게 접해 보는 경험입니다. 체험 종류·요금·휴관일은 방문 전 공식 안내를 꼭 확인해 주세요.',
    nearby: []
  },
  {
    grades: [3, 4, 5, 6], semesters: [1, 2], interest: 'history', monthsAhead: 6,
    title: '선사시대 마을 탐험', place: '부천고강선사유적체험관', region: '경기 부천',
    placeType: '유적 체험관', cost: '방문 전 요금·예약 확인', fit: '사회 \'역사·지역 유산\' 영역과 연결 가능',
    story: '아주 오래전 사람들의 도구와 마을을 살펴보며 생활을 상상해 봐요.',
    missions: ['선사시대 도구 1개 골라 쓰임 상상하기', '지금의 물건과 닮은 점 찾기', '가장 오래돼 보이는 유물 앞에서 사진 찍기'],
    badge: '🪨 선사 탐험가',
    subject: '사회 · 선사 시대와 지역 유산',
    parent: '선사시대 유적과 유물을 보며 옛 사람들의 생활을 추론해 보는 경험입니다. 체험 프로그램과 예약은 방문 전 공식 안내를 확인해 주세요.',
    nearby: []
  },
  {
    grades: [1, 2, 3, 4, 5, 6], semesters: [1, 2], interest: 'history', monthsAhead: 5,
    title: '다름을 존중하는 하루', place: '부천펄벅기념관', region: '경기 부천',
    placeType: '기념관', cost: '방문 전 요금·운영 확인', fit: '사회 \'인권과 다문화\' 영역과 연결 가능',
    story: '전시 속 사람들의 이야기를 따라가며 서로 다름을 존중한다는 것을 생각해 봐요.',
    missions: ['전시에서 마음에 남는 사람 이야기 1개 찾기', '다름을 존중하는 말 한 가지 적어 보기', '오늘 배운 점을 한 줄로 쓰기'],
    badge: '🤝 존중 탐험가',
    subject: '사회 · 인권과 다문화',
    subject12: '통합교과(바른 생활) · 다름을 존중하기', fit12: "통합교과 '바른 생활(다름 존중)'과 연결 가능",
    parent: '인권과 다양한 문화를 존중하는 태도를 이야기해 보는 경험입니다. 전시·운영 정보는 방문 전 공식 안내를 확인해 주세요.',
    nearby: []
  },
  {
    grades: [3, 4, 5, 6], semesters: [1, 2], interest: 'history', monthsAhead: 4,
    title: '시인의 말 수집가', place: '부천수주문학관', region: '경기 부천',
    placeType: '문학관', cost: '방문 전 요금·운영 확인', fit: '국어 \'시와 감상\' 영역과 연결 가능',
    story: '시인의 말과 표현을 모아 보고, 나만의 한 줄 시를 써 봐요.',
    missions: ['마음에 드는 표현 1개 찾아 적기', '소리나 모양이 떠오르는 말 찾기', '나만의 한 줄 시 써 보기'],
    badge: '✒️ 말 수집가',
    subject: '국어 · 시와 감상',
    parent: '시와 문학 작품의 표현을 살펴보고 나의 말로 바꿔 써 보는 경험입니다. 전시·프로그램은 방문 전 공식 안내를 확인해 주세요.',
    nearby: []
  },
  {
    grades: [1, 2], semesters: [1, 2], interest: 'nature', monthsAhead: 2,
    title: '식물원 관찰 그림일기', place: '부천식물원(부천자연생태공원)', region: '경기 부천',
    placeType: '식물원', cost: '무료 · 월요일 휴관(공식 안내 확인)', fit: "국어 '겪은 일 쓰기·그림 표현'과 연결 가능",
    story: '식물원에서 마음에 든 꽃이나 잎을 하나 골라, 그림과 한 줄 글로 오늘의 일기를 써 봐요.',
    missions: ['마음에 드는 잎이나 꽃 1개 고르기', '색과 모양을 그림으로 그리기', '오늘 느낀 점을 한 문장으로 쓰기'],
    badge: '🌿 그림일기 작가',
    subject: '국어 · 겪은 일 쓰기와 그림 표현',
    parent: '식물을 보고 그림과 글로 기록하는 활동입니다. 1~2학년 통합교과 연결은 별책 확인 전이라 표시하지 않았고, 국어 영역과의 연결은 예시입니다. 운영 시간은 방문 전 부천시 공식 안내를 확인해 주세요.',
    nearby: []
  }
];

// 장소별 교과·영역 연결(guides.js의 성취기준 코드에서 계산). 교과 이름 문자열은 알림장 추천·보고서에서 쓴다.
experiences.forEach((e) => {
  e.links = linksOf(e.title);
  e.subject = [...new Set(e.links.map((l) => l.subj))].join('·') || e.subject;
});

const gradeSelect = document.getElementById('gradeSelect');
const semesterSelect = document.getElementById('semesterSelect');
const subjectSelect = document.getElementById('subjectSelect');
const areaSelect = document.getElementById('areaSelect');
const bandOf = (g) => (g <= 2 ? '12' : g <= 4 ? '34' : '56');
const recommendBtn = document.getElementById('recommendBtn');
const cards = document.getElementById('cards');
const summaryText = document.getElementById('summaryText');

// 선택한 학년군에서 이 장소와 연결된 교과·영역 (고른 교과·영역과 맞는 것을 앞에)
function linksForView(item) {
  const band = bandOf(Number(gradeSelect.value));
  const subj = subjectSelect.value, area = areaSelect.value;
  const ls = item.links.filter((l) => l.band === band);
  const hit = (l) => (subj === 'all' || l.subj === subj) && (area === 'all' || l.area === area);
  return ls.slice().sort((a, b) => (hit(b) ? 1 : 0) - (hit(a) ? 1 : 0));
}
function cardTemplate(item) {
  const band = bandOf(Number(gradeSelect.value));
  const ls = linksForView(item); const p = ls[0];
  const linkTxt = p ? `${p.subj} · ${p.area}` : '';
  return `
    <article class="experience-card">
      <div class="card-topline">
        <span class="chip">${p ? `📚 ${BAND_LABEL[band]} ${linkTxt}` : '📚 교과 연결(예시)'}</span>
        <span class="badge">${item.badge}</span>
      </div>
      <p class="subject">${ls.map((l) => `${l.subj} · ${l.area}`).join(' / ')}</p>
      <h3>${item.title}</h3>
      <p class="place">📍 ${item.place} · ${item.region}</p>
      <p class="why">📌 ${item.placeType} · ${item.cost} · 왜 이곳? ${p ? `${p.subj} '${p.area}' 성취기준과 연결 가능(예시)` : item.fit}</p>
      <p class="story">${item.story}</p>
      <div class="mission-box quest" data-id="${item.title}">
        <div class="quest-head">
          <strong>🎮 오늘의 탐험 퀘스트</strong>
          <span class="quest-xp" data-xp>0 / ${item.missions.length}</span>
        </div>
        <div class="quest-bar"><i data-bar style="width:0%"></i></div>
        <ul class="quest-list">${item.missions.map((m, i) => questItem(item, m, i)).join('')}</ul>
        <div class="quest-reward" data-reward hidden>🎉 퀘스트 완료! <b>${item.badge}</b> 배지 획득 · +20 XP</div>
        <div class="quest-bonus" data-bonus hidden>🌟 숨은 미션: 아래 <b>한 줄 기록</b>을 저장하면 <b>+15 XP</b>!</div>
      </div>
      <div class="diary" data-diary="${item.title}">
        <strong>📝 오늘의 한 줄 기록</strong>
        <div class="diary-row"><input type="date" class="d-date" aria-label="방문일"><input type="text" class="d-text" maxlength="80" placeholder="오늘 가장 기억에 남은 건?" aria-label="한 줄 소감"><button type="button" class="d-save">저장</button></div>
        <small class="mute d-msg">이 기기에만 저장돼요(서버로 보내지 않아요).</small>
      </div>
      <details class="pg-details">
        <summary><span class="pg-ico">👨‍👩‍👧</span><span class="pg-txt"><b>부모용 가이드</b><small>교과 연결 · 아이에게 할 질문 · 집에서 이어하기</small></span><span class="pg-open">펼쳐 보기 ▾</span></summary>
        <p><b>학기별 단원 배치:</b> 교과서와 학교 진도에 따라 달라요. 지금은 학년군(${BAND_LABEL[band]}) 교육과정 기준으로 연결했어요.</p>
        <p><b>장소 선정 기준:</b> ${item.placeType} 유형 · ${p ? `${p.subj} '${p.area}' 영역과 연결 가능(예시)` : item.fit}</p>
        <p>${item.parent}</p>
        ${guideHTML(item)}
        <div class="pguide check"><p><b>✅ 가기 전 확인</b></p><ul class="chk"><li><label><input type="checkbox"> 운영시간·요금·휴관일을 시설 공식 안내로 확인했어요</label></li><li><label><input type="checkbox"> 이동 방법과 주차·대중교통을 확인했어요</label></li><li><label><input type="checkbox"> 물·간식·편한 신발 등 준비물을 챙겼어요</label></li><li><label><input type="checkbox"> 아이와 안전 약속(손 잡기, 흩어지지 않기)을 정했어요</label></li></ul></div>
        <button type="button" class="print-card">🖨️ 미션지 인쇄</button>
      </details>
      ${item.nearby && item.nearby.length ? `<div class="local-box">🏪 <strong>근처 코스 후보</strong> <span class="mute">참고용 · 제휴 아님 · 영업 여부는 방문 전 확인</span>
        <ul class="nearby">${item.nearby.map(n => `<li><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('부천 ' + n.name)}" target="_blank" rel="noopener" data-place="${item.title}" data-store="${n.name}" data-kind="${n.kind}">${n.kind === '식당' ? '🍚' : '☕'} <b>${n.name}</b> <small>${n.note}</small></a></li>`).join('')}</ul></div>` : ''}
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
  const bonus = box.querySelector('[data-bonus]');
  if (bonus) { const has = !!loadDiary()[id]; bonus.hidden = done < total; bonus.classList.toggle('done', has); bonus.innerHTML = has ? '🌟 숨은 미션 성공! 기록왕 <b>+15 XP</b>' : '🌟 숨은 미션: 아래 <b>한 줄 기록</b>을 저장하면 <b>+15 XP</b>!'; }
}

// ===== 경험치·레벨 (저장된 진행 상태에서 계산 — 별도 저장 없음) =====
const LEVELS = [[0, '새싹 탐험가'], [40, '호기심 탐험가'], [100, '용감한 탐험가'], [200, '부천 탐험대장'], [350, '전설의 탐험가']];
function calcXP() {
  let xp = 0; const diary = loadDiary();
  experiences.forEach((x) => { const n = (questState[x.title] || []).length; xp += n * 10; if (n >= x.missions.length) xp += 20; if (diary[x.title]) xp += 15; });
  return xp;
}
function levelOf(xp) { let i = 0; LEVELS.forEach((l, k) => { if (xp >= l[0]) i = k; }); const next = LEVELS[i + 1]; return { i, name: LEVELS[i][1], next: next ? next[0] : null, base: LEVELS[i][0] }; }
let lastLevel = levelOf(calcXP()).i;
function renderHud(levelUp) {
  const xp = calcXP(), L = levelOf(xp);
  const pct = L.next ? Math.round((xp - L.base) / (L.next - L.base) * 100) : 100;
  const html = `<span class="lv">Lv.${L.i + 1}</span><span>${L.name}</span><div class="bar"><i style="width:${pct}%"></i></div><small>${xp} XP${L.next ? ' · 다음 레벨까지 ' + (L.next - xp) : ' · 최고 레벨!'}</small>` + (levelUp ? '<span class="lvlup">🎊 레벨 업!</span>' : '');
  ['hud', 'stampHud'].forEach((id) => { const el = document.getElementById(id); if (el) el.innerHTML = html; });
}
function burst(box) {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const em = ['🎉', '⭐', '✨', '🎈', '🌟', '🎊'];
  for (let k = 0; k < 14; k++) { const s = document.createElement('span'); s.className = 'confetti'; s.textContent = em[k % em.length]; s.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px'); s.style.setProperty('--dy', (Math.random() * 160 - 90) + 'px'); box.appendChild(s); setTimeout(() => s.remove(), 1200); }
}
function floatXP(btn, txt) { const s = document.createElement('span'); s.className = 'xp-float'; s.textContent = txt; btn.closest('.quest').appendChild(s); s.style.top = (btn.offsetTop + 6) + 'px'; setTimeout(() => s.remove(), 950); }
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
  const total = box.querySelectorAll('.quest-btn').length;
  const justCompleted = set.has(i) && set.size === total;
  if (set.has(i)) floatXP(btn, justCompleted ? '+30 XP!' : '+10 XP');
  refreshQuest(box);
  if (justCompleted) burst(box);
  const L = levelOf(calcXP()).i; const up = L > lastLevel; lastLevel = L;
  renderHud(up);
  renderStamps();
});

const matchNote = document.getElementById('matchNote');
let lastMatch = { n: 0, relax: 'none' };
function countFor(band, subj, area) {
  return experiences.filter((x) => x.links.some((l) => l.band === band && l.subj === subj && (!area || l.area === area))).length;
}
// 학년 → 교과 목록(학년군별) → 영역 목록(교과별)
let gradeTouched = false;
function buildSubjects() {
  const band = bandOf(Number(gradeSelect.value)); const cur = subjectSelect.value;
  const list = SUBJECTS_BY_BAND[band];
  subjectSelect.innerHTML = '<option value="all">전체 교과</option>' + list.map((sj) => `<option value="${sj}">${sj}</option>`).join('');
  subjectSelect.value = list.includes(cur) ? cur : 'all';
  buildAreas();
}
function buildAreas() {
  const band = bandOf(Number(gradeSelect.value)); const subj = subjectSelect.value; const cur = areaSelect.value;
  if (subj === 'all') { areaSelect.innerHTML = '<option value="all">교과를 먼저 골라 주세요</option>'; areaSelect.disabled = true; return; }
  areaSelect.disabled = false;
  const ar = areasOf(band, subj);
  areaSelect.innerHTML = '<option value="all">전체 영역</option>' + ar.map((a) => { const n = countFor(band, subj, a); return `<option value="${a}">${a} ${n ? `(${n}곳)` : '(준비 중)'}</option>`; }).join('');
  areaSelect.value = ar.includes(cur) ? cur : 'all';
}
function pick(band, subj, area) {
  return experiences.filter((x) => x.links.some((l) => l.band === band && (subj === 'all' || l.subj === subj) && (area === 'all' || l.area === area)));
}
function render() {
  const grade = Number(gradeSelect.value);
  const band = bandOf(grade);
  const subj = subjectSelect.value, area = areaSelect.value;

  // 1) 학년군·교과·영역 모두 일치 → 2) 영역 풀기 → 3) 교과 풀기 (학년군은 항상 지킴)
  let relax = 'none';
  let filtered = pick(band, subj, area);
  if (!filtered.length && area !== 'all') { filtered = pick(band, subj, 'all'); relax = 'area'; }
  if (!filtered.length && subj !== 'all') { filtered = pick(band, 'all', 'all'); relax = 'subject'; }
  lastMatch = { n: filtered.length, relax };

  if (matchNote) {
    const sj = subj === 'all' ? '' : ` ${subj}`;
    const ar = area === 'all' ? '' : ` "${area}"`;
    const msgs = {
      area: `${grade}학년${sj}${ar}와 직접 연결된 곳은 아직 없어요(준비 중). 영역을 넓혀서 ${grade}학년${sj}에 맞는 곳을 보여 드려요.`,
      subject: `${grade}학년${sj}${ar}와 연결된 곳은 아직 없어요(준비 중). 교과를 넓혀서 ${grade}학년에 맞는 곳을 보여 드려요.`
    };
    matchNote.hidden = relax === 'none';
    matchNote.textContent = msgs[relax] || '';
  }

  cards.innerHTML = filtered.map(cardTemplate).join('');
  cards.querySelectorAll('.quest').forEach(refreshQuest);
  cards.querySelectorAll('.diary').forEach(fillDiary);
  renderHud(false);
  summaryText.textContent = `${grade}학년 · 연결 코스 ${filtered.length}개 (교과 연결은 예시)`;
}

let recTimer = null;
function trackRecommend(src) {
  if (!window.__recommended && window.__popupAfterRecommend) window.__popupAfterRecommend(); window.__recommended = true; if (window.__showSurvey) window.__showSurvey();
  track('recommend', { src, grade: gradeSelect.value, semester: semesterSelect.value, subject: subjectSelect.value, area: areaSelect.value, n: lastMatch.n, relax: lastMatch.relax });
}
function onSelectChange() { render(); clearTimeout(recTimer); recTimer = setTimeout(() => trackRecommend('select'), 800); }
recommendBtn.addEventListener('click', () => { render(); trackRecommend('button'); const c = document.getElementById('cards'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
gradeSelect.addEventListener('change', () => { gradeTouched = true; buildSubjects(); onSelectChange(); });
semesterSelect.addEventListener('change', onSelectChange);
subjectSelect.addEventListener('change', () => { buildAreas(); onSelectChange(); });
areaSelect.addEventListener('change', onSelectChange);
buildSubjects();
render();

// ===== 측정 도우미 =====
function track(type, data) { try { if (window.GO) return window.GO.send(type, data).catch(() => false); } catch (e) {} return Promise.resolve(false); }
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

// ===== 출시 알림 신청(사전신청): 팝업/버튼으로 열고 구글 시트로 전송 (config.js의 주소가 있을 때만) =====
const modal = document.getElementById('signupModal');
const POP_KEY = 'gyogwaon_popup_hide';
let popupSrc = 'button';
function openSignup(src) {
  if (!modal) return;
  popupSrc = src || 'button';
  // 학년 칸 미리 채우기: 사용자가 위쪽 학년을 직접 바꿨을 때만(기본값 4학년이 쌓이는 것 방지)
  const boxes = [...modal.querySelectorAll('input[name=grade]')];
  if (typeof gradeTouched !== 'undefined' && gradeTouched && !boxes.some((x) => x.checked)) { const b = boxes.find((x) => x.value === String(gradeSelect.value)); if (b) b.checked = true; }
  modal.hidden = false; document.body.classList.add('modal-open');
  try { sessionStorage.setItem('gyogwaon_popup_shown', '1'); } catch (e) {}
  track('popup_show', { src: popupSrc });
  const em = document.getElementById('signupEmail'); if (em && !('ontouchstart' in window)) em.focus();
}
function closeSignup(how) {
  if (!modal || modal.hidden) return;
  modal.hidden = true; document.body.classList.remove('modal-open');
  try { localStorage.setItem(POP_KEY, String(Date.now())); } catch (e) {} // 닫으면 3일 동안 자동 팝업을 다시 띄우지 않음
  track('popup_close', { src: popupSrc, how: how || 'x' });
}
function popupAllowed() {
  if (isSigned()) return false;
  try { if (sessionStorage.getItem('gyogwaon_popup_shown')) return false; } catch (e) {}
  try { const t = Number(localStorage.getItem(POP_KEY) || 0); if (t && Date.now() - t < 3 * 86400000) return false; } catch (e) {}
  return true;
}
// 방문 직후가 아니라, 추천을 한 번 본 뒤 6초 또는 방문 25초 뒤에 한 번만 보여 줌(광고 방문자가 바로 닫지 않도록)
function schedulePopup(ms, src) { setTimeout(() => { if (popupAllowed() && modal && modal.hidden) openSignup(src); }, ms); }
schedulePopup(25000, 'timer');
window.__popupAfterRecommend = () => schedulePopup(6000, 'after_recommend');
if (modal) {
  document.getElementById('signupClose').addEventListener('click', () => closeSignup('x'));
  modal.addEventListener('click', (e) => { if (e.target === modal) closeSignup('backdrop'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSignup('esc'); });
  const ob = document.getElementById('openSignup'); if (ob) ob.addEventListener('click', () => openSignup('button'));
  const cs = document.getElementById('ctaSignup'); if (cs) cs.addEventListener('click', (e) => { e.preventDefault(); openSignup('hero'); });
  document.getElementById('doneClose').addEventListener('click', () => { modal.hidden = true; document.body.classList.remove('modal-open'); });
  document.getElementById('goSurvey').addEventListener('click', () => {
    modal.hidden = true; document.body.classList.remove('modal-open');
    const sv = document.getElementById('surveyForm'); if (sv) { sv.hidden = false; sv.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });
}
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
    let err = '';
    if (!grades.length) err = '자녀 학년을 하나 이상 선택해 주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err = '이메일 주소를 확인해 주세요.';
    else if (!consent) err = '개인정보 수집·이용 동의가 필요합니다.';
    msg.hidden = false;
    msg.classList.toggle('err', !!err);
    if (err) { msg.textContent = err; track('signup_error', { reason: err.slice(0, 12) }); return; }
    if (!window.GO || !window.GO.enabled) { msg.classList.add('err'); msg.textContent = '아직 신청 접수가 연결되지 않아 저장되지 않았어요.'; return; }
    btn.disabled = true; msg.classList.remove('err'); msg.textContent = '접수 중...';
    window.GO.send('signup', { email, grades: grades.join(','), interview: false, consent: true, region: '', src: popupSrc })
      .then(() => { msg.textContent = '🎉 출시 알림이 접수되었어요. 출시 소식을 입력하신 이메일로 전해드릴게요.'; form.reset(); try { localStorage.setItem('gyogwaon_signed', '1'); } catch (e) {} setDl(); const sv = document.getElementById('surveyForm'); if (sv) { sv.dispatchEvent(new CustomEvent('survey:open')); sv.hidden = false; } const dn = document.getElementById('signupDone'); if (dn) dn.hidden = false; btn.hidden = true; })
      .catch(() => { msg.classList.add('err'); msg.textContent = '전송에 실패했어요. 잠시 뒤 다시 시도해 주세요.'; })
      .finally(() => { btn.disabled = false; });
  });
})();

// ===== 신청 후 짧은 의견 (선택) =====
function surveyDone() { try { return localStorage.getItem('gyogwaon_survey_done') === '1'; } catch (e) { return false; } }
(function () {
  const sv = document.getElementById('surveyForm');
  if (!sv) return;
  const msg = document.getElementById('surveyMsg');
  const btn = sv.querySelector('button[type=submit]');
  // 이미 사전신청을 한 방문자가 다시 오면 의견 폼을 다시 보여 줌(이미 보냈으면 숨김)
  // v28: 사전신청 여부와 상관없이, 추천을 한 번 본 뒤(또는 신청 후) 의견 폼을 보여 줌. 응답에 signed(Y/N)를 함께 기록.
  const maybeShow = () => { if (!surveyDone() && (isSigned() || window.__recommended)) sv.hidden = false; };
  window.__showSurvey = maybeShow;
  maybeShow();
  const NAMES = ['q1', 'q8', 'q9']; // 3문항으로 줄임(v35). 나머지 문항 칸은 시트에서 빈칸으로 남음
      const legendOf = (n) => { const f = sv.querySelector('input[name=' + n + ']'); const lg = f && f.closest('fieldset') ? f.closest('fieldset').querySelector('legend') : null; return lg ? lg.textContent.replace(/\s+/g, ' ').trim() : ''; };
  const val = (n) => { const x = sv.querySelector('input[name=' + n + ']:checked'); return x ? x.value : ''; };
  const lab = (n) => { const x = sv.querySelector('input[name=' + n + ']:checked'); return x ? x.parentElement.textContent.trim() : ''; };
  let sending = false;
  // 새로 사전신청하면 설문을 항상 다시 열어 줌(같은 기기에서 이전에 보냈어도). 중복은 방문자ID로 걸러 집계.
  sv.addEventListener('survey:open', () => { sending = false; btn.disabled = false; msg.hidden = true; sv.reset(); try { localStorage.removeItem('gyogwaon_survey_done'); } catch (e) {} });
  sv.addEventListener('submit', (e) => {
    e.preventDefault();
    if (sending) return;
    const text = '';
    msg.hidden = false;
    if (!NAMES.some((n) => val(n))) { msg.classList.add('err'); msg.textContent = '하나 이상 선택해 주세요.'; return; }
    const rg = document.getElementById('surveyRegion');
    const data = { survey_ver: 'v28', signed: isSigned() ? 'Y' : 'N', region: rg ? rg.value : '', grade_ctx: (typeof gradeSelect !== 'undefined' && gradeSelect.value) || '' }; // grade_ctx = 추천 화면에서 고른 학년(가입 학년 아님)
    NAMES.forEach((n) => { data[n + '_value'] = val(n); data[n + '_question'] = legendOf(n); data[n + '_answer'] = lab(n); });
    sending = true; btn.disabled = true;
    msg.classList.remove('err'); msg.textContent = '보내는 중...';
    track('survey', data).then((ok) => {
      if (ok === false && !(window.GO && window.GO.enabled)) { sending = false; btn.disabled = false; msg.classList.add('err'); msg.textContent = '의견이 연결되지 않아 저장되지 않았어요.'; return; }
      try { localStorage.setItem('gyogwaon_survey_done', '1'); } catch (e2) {}
      msg.textContent = '감사합니다! 서비스 개선에 큰 도움이 돼요. 🙌';
    });
  });
})();

// ===== 첫 화면 버튼 측정 =====
['ctaStart','ctaSignup'].forEach((id) => { const el = document.getElementById(id); if (el) el.addEventListener('click', () => track('cta_click', { id })); });

// ===== 무료 자료(PDF): 사전신청 후 받기 =====
function isSigned() { try { return localStorage.getItem('gyogwaon_signed') === '1'; } catch (e) { return false; } }
function setDl() {
  document.querySelectorAll('.resource .dl').forEach((b) => {
    const base = ({ 'curriculum_1-2': '1~2학년군 PDF 받기', 'curriculum_5-6': '5~6학년군 PDF 받기' })[b.dataset.file] || '3~4학년군 PDF 받기';
    b.textContent = isSigned() ? base : '출시 알림 신청하고 ' + base;
  });
}
(function () {
  const btns = document.querySelectorAll('.resource .dl'); if (!btns.length) return;
  setDl();
  btns.forEach((b) => b.addEventListener('click', (e) => {
    const signed = isSigned();
    track('download_click', { file: b.dataset.file, signed });
    if (!signed) {
      e.preventDefault();
      const m = document.getElementById('dlMsg'); m.hidden = false; m.textContent = '출시 알림을 신청하시면 PDF를 받을 수 있어요.';
      openSignup('download');
    }
  }));
})();

// ===== 알림장 연결 추천 (입력 내용은 저장·전송하지 않음) =====
(function () {
  const btn = document.getElementById('noticeBtn'); if (!btn) return;
  const ta = document.getElementById('noticeText'); const out = document.getElementById('noticeOut');
  btn.addEventListener('click', () => {
    const text = ta.value.trim(); out.hidden = false;
    if (text.length < 1) { out.innerHTML = '<p class="signup-msg err">알림장 내용을 한 단어 이상 붙여 넣어 주세요. (예: 별자리, 독서록)</p>'; return; }
    const r = matchNotice(text);
    track('notice_match', { len: Math.min(Math.floor(text.length / 100) * 100, 800), matched: r.length, top: r[0] ? r[0].title : '' });
    if (!r.length) {
      out.innerHTML = '<p class="muted">입력하신 내용과 연결되는 부천 체험을 찾지 못했어요. 지금은 부천 체험 17곳과 관련된 단어만 알아봐요(다른 지역 장소는 아직 없어요). 아래에서 교과를 골라 바로 볼 수 있어요.</p><div class="chips notice-chips">' + ['국어', '사회', '과학', '수학'].map((s) => '<button type="button" class="chip-btn" data-subj="' + s + '">' + s + ' 체험 보기</button>').join('') + '</div><p class="muted"><small>입력하신 내용은 저장하거나 보내지 않아요. 어떤 단어를 찾으면 좋을지 아래 의견란에 남겨 주셔도 좋아요.</small></p>';
      return;
    }
    out.innerHTML = r.map((x) => {
      const it = experiences.find((e) => e.title === x.title); const g = GUIDES[x.title];
      return `<div class="notice-item"><b>${x.title}</b> · ${it ? it.place : ''}<br><small>${x.weak ? '단원 단어는 찾지 못했고, 교과 이름 "' + x.hits.slice(0, 3).join('", "') + '"만 같아서 보여 드려요' : '알림장의 "' + x.hits.slice(0, 3).join('", "') + '" 와 연결돼요'}</small><br><small>💬 ${g ? g.asks[0] : ''}</small></div>`;
    }).join('') + '<p class="muted"><small>※ 단어가 겹치는 정도로 찾는 간단한 추천(베타)이며, 정확한 교과 연결은 아닙니다. 내용은 저장·전송되지 않아요.</small></p>';
  });
})();

document.getElementById('noticeOut').addEventListener('click', (e) => {
  const b = e.target.closest('.chip-btn'); if (!b) return;
  const sel = document.getElementById('subjectSelect'); if (sel && [...sel.options].some((o) => o.value === b.dataset.subj)) { sel.value = b.dataset.subj; buildAreas(); }
  track('notice_fallback', { subj: b.dataset.subj });
  const rb = document.getElementById('recommendBtn'); if (rb) rb.click();
  const c = document.getElementById('controls'); if (c) c.scrollIntoView({ behavior: 'smooth' });
});

// ===== 한 줄 기록 · 스탬프북 · 결과보고서 초안 · 미션지 인쇄 (모두 이 기기 안에서만 처리) =====
const DIARY_KEY = 'gyogwaon_diary_v1';
function loadDiary() { try { return JSON.parse(localStorage.getItem(DIARY_KEY)) || {}; } catch (e) { return {}; } }
function saveDiary(d) { try { localStorage.setItem(DIARY_KEY, JSON.stringify(d)); return true; } catch (e) { return false; } }
function esc(s) { return String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function fillDiary(box) {
  const rec = loadDiary()[box.dataset.diary];
  if (rec) { box.querySelector('.d-date').value = rec.date || ''; box.querySelector('.d-text').value = rec.text || ''; }
}
cards.addEventListener('click', (e) => {
  const b = e.target.closest('.d-save'); if (!b) return;
  const box = b.closest('.diary'); const id = box.dataset.diary;
  const date = box.querySelector('.d-date').value; const text = box.querySelector('.d-text').value.trim();
  const msg = box.querySelector('.d-msg');
  if (!text) { msg.textContent = '한 줄을 적어 주세요.'; return; }
  const d = loadDiary(); d[id] = { date: date || new Date().toISOString().slice(0, 10), text };
  msg.textContent = saveDiary(d) ? '저장했어요. 아래 스탬프북에 반영돼요. (소감 내용은 서버로 보내지 않아요)' : '이 브라우저에서는 저장할 수 없어요.';
  track('diary_save', { card: id });
  renderStamps();
  const qb = cards.querySelector('.quest[data-id="' + id.replace(/"/g, '') + '"]'); if (qb) refreshQuest(qb);
  const L2 = levelOf(calcXP()).i; const up2 = L2 > lastLevel; lastLevel = L2; renderHud(up2);
});
cards.addEventListener('click', (e) => {
  const b = e.target.closest('.print-card'); if (!b) return;
  const art = b.closest('article'); const det = b.closest('details'); if (det) det.open = true;
  art.classList.add('pr-target'); document.body.classList.add('pr-card');
  track('card_print', { card: (art.querySelector('[data-id]') || {}).dataset.id || '' });
  setTimeout(() => { window.print(); document.body.classList.remove('pr-card'); art.classList.remove('pr-target'); }, 50);
});
function renderStamps() {
  const box = document.getElementById('stampGrid'); if (!box) return;
  const diary = loadDiary();
  const stamped = experiences.filter((x) => (questState[x.title] || []).length >= x.missions.length || diary[x.title]);
  box.innerHTML = experiences.map((x) => {
    const on = stamped.includes(x);
    return `<div class="stamp${on ? ' on' : ''}"><span>${on ? '⭐' : '⚪'}</span><b>${x.title}</b><small>${on && diary[x.title] ? esc(diary[x.title].date) : x.place}</small></div>`;
  }).join('');
  const sum = document.getElementById('stampSum');
  const months = {}; Object.values(diary).forEach((r) => { const k = (r.date || '').slice(0, 7); months[k] = (months[k] || 0) + 1; });
  renderHud(false);
  sum.textContent = `모은 스탬프 ${stamped.length} / ${experiences.length}` + (Object.keys(months).length ? ' · 기록: ' + Object.keys(months).sort().map((k) => `${k} ${months[k]}건`).join(', ') : '');
}
(function () {
  renderStamps();
  const b = document.getElementById('reportBtn'); if (!b) return;
  b.addEventListener('click', () => {
    const diary = loadDiary(); const keys = Object.keys(diary);
    const out = document.getElementById('reportPrint');
    if (!keys.length) { document.getElementById('reportMsg').hidden = false; return; }
    document.getElementById('reportMsg').hidden = true;
    keys.sort((a, c) => (diary[a].date || '').localeCompare(diary[c].date || ''));
    out.innerHTML = '<h1>체험학습 결과 보고 (초안)</h1><p>※ 학교 제출 양식이 아닌 일반 양식입니다. 학교 양식에 맞춰 옮겨 적어 주세요.</p><p>학년/반/이름: ____________________</p><table><tr><th>방문일</th><th>체험 장소</th><th>연결 교과 영역</th><th>학생 소감(한 줄)</th></tr>'
      + keys.map((k) => { const it = experiences.find((x) => x.title === k); return `<tr><td>${esc(diary[k].date)}</td><td>${esc(it ? it.place : k)}</td><td>${esc(it ? it.subject : '')}</td><td>${esc(diary[k].text)}</td></tr>`; }).join('') + '</table><p>보호자 확인: ______________ (서명)</p>';
    track('report_print', { n: keys.length });
    document.body.classList.add('pr-report'); setTimeout(() => { window.print(); document.body.classList.remove('pr-report'); }, 50);
  });
})();


// ===== v28: 교외체험학습 신청서 초안 (인쇄 전용, 입력값 저장·전송 없음) =====
(function () {
  const btn = document.getElementById('applyBtn'); if (!btn) return;
  const sel = document.getElementById('applyPlace');
  sel.innerHTML = experiences.map((x) => `<option value="${esc(x.title)}">${esc(x.place)}</option>`).join('');
  const f = document.getElementById('applyFrom'), t = document.getElementById('applyTo');
  const pur = document.getElementById('applyPurpose');
  const fill = () => { const it = experiences.find((x) => x.title === sel.value); if (it && !pur.dataset.edited) pur.value = `${it.place} 방문 체험 (연결 교과: ${it.subject}). ${it.story || ''}`.slice(0, 300); };
  pur.addEventListener('input', () => { pur.dataset.edited = '1'; });
  sel.addEventListener('change', fill); fill();
  f.addEventListener('change', () => { if (!t.value) t.value = f.value; });
  const fmt = (d) => d ? d.replace(/-/g, '.') : '____.__.__';
  btn.addEventListener('click', () => {
    const it = experiences.find((x) => x.title === sel.value) || {};
    const out = document.getElementById('reportPrint');
    const row = (a, b) => `<tr><th>${a}</th><td>${b}</td></tr>`;
    out.innerHTML = '<h1>교외체험학습 신청서 (초안)</h1><p>※ 학교 제출 양식이 아닌 일반 초안입니다. 학교 양식에 맞춰 옮겨 적어 주세요. (신청 시기·제출처는 학교 안내를 따릅니다)</p>'
      + '<table>' + row('학년/반/번호/성명', '____학년 ____반 ____번 &nbsp; 성명: ______________')
      + row('체험 기간', `${esc(fmt(f.value))} ~ ${esc(fmt(t.value))}`)
      + row('체험 장소', esc(it.place || ''))
      + row('체험 유형', '현장체험학습 (가족 동반)')
      + row('체험 목적·내용', esc(pur.value).replace(/\n/g, '<br>'))
      + row('연결 교과', esc(it.subject || ''))
      + row('동행자', esc(document.getElementById('applyWith').value) || '________')
      + row('이동 수단', esc(document.getElementById('applyMove').value))
      + row('보호자 연락처', '______________________')
      + '</table><p>위와 같이 교외체험학습을 신청합니다.</p><p>____년 ____월 ____일 &nbsp; 보호자: ______________ (서명)</p><p>※ 체험 후 "체험 결과 보고 초안"으로 결과보고서를 정리할 수 있어요.</p>';
    track('apply_print', { place: it.title || '' });
    document.body.classList.add('pr-report'); setTimeout(() => { window.print(); document.body.classList.remove('pr-report'); }, 50);
  });
})();

// ===== 개인정보 안내문의 파기일·연락처 (config.js 값) =====
(function () {
  const P = window.GYOGWAON_PRIVACY || {};
  const d = document.getElementById('privDestroy'); if (d && P.destroyDate) d.textContent = P.destroyDate;
  const c = document.getElementById('privContact');
  if (c) { if (P.contact) c.textContent = P.contact; else { c.textContent = ''; try { console.warn('[교과ON] config.js의 GYOGWAON_PRIVACY.contact(운영자 연락처)가 비어 있습니다.'); } catch (e) {} } }
})();


// ===== 추천 유용성 피드백 (👍/👎 + 이유) =====
(function () {
  const box = document.getElementById('feedbackBox'); if (!box) return;
  const more = document.getElementById('fbMore'), msg = document.getElementById('fbMsg'), send = document.getElementById('fbSend');
  let helpful = null, sent = false;
  box.querySelectorAll('.fb-btn').forEach((b) => b.addEventListener('click', () => {
    if (sent) return;
    helpful = b.dataset.v; box.querySelectorAll('.fb-btn').forEach((x) => x.classList.toggle('on', x === b)); more.hidden = false;
    const want = helpful === '1' ? 'p' : 'n';
    box.querySelectorAll('#fbReasons label').forEach((l) => { const show = l.dataset.pol === want; l.hidden = !show; if (!show) l.querySelector('input').checked = false; });
    const q = document.getElementById('fbReasonQ'); if (q) q.firstChild.textContent = helpful === '1' ? '어떤 점이 좋았나요? ' : '어떤 점이 아쉬웠나요? ';
  }));
  send.addEventListener('click', () => {
    if (sent || helpful === null) return;
    const reasons = [...box.querySelectorAll('#fbReasons input:checked')].map((x) => x.value);
    const it = box.querySelector('#fbIntent input:checked');
    sent = true; send.disabled = true;
    track('feedback', { helpful, reasons: reasons.join(','), go_intent: it ? it.value : '', text: document.getElementById('fbText').value.trim().slice(0, 120),
      grade: gradeSelect.value, semester: semesterSelect.value, subject: subjectSelect.value + (areaSelect.value !== 'all' ? '/' + areaSelect.value : ''), interest: '', n: lastMatch.n, relax: lastMatch.relax })
      .then(() => { msg.hidden = false; msg.classList.remove('err'); msg.textContent = '의견 고마워요! 추천을 고치는 데 쓸게요. 🙌'; });
  });
})();
