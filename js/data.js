/**
 * JOHN PREP TUTORING — Structured Content Data
 * Keep editable, data-driven content here instead of buried in HTML.
 * IMPORTANT: Never fill TEACHERS, TESTIMONIALS, or SERVICE_AREAS.regions.*.subareas
 * with invented names, schools, credentials, or reviews. Leave empty until real
 * data is supplied, and the corresponding UI will stay in its empty/sample state.
 */
window.JOHN_PREP_DATA = {
  // Real teacher profiles go here once available. Each item renders as a full profile card.
  // Example shape (do not fill with fake data):
  // { firstName: "Sarah", from: "USA", education: "", experience: "", specialties: [], ages: "", lessonStyle: "" }
  TEACHERS: [],

  // Real, submitted testimonials only. The Testimonials section stays hidden while this is empty.
  TESTIMONIALS: [
    {
      label: "4세 여아 학부모",
      quote: "아이가 아직 어려서 원어민 수업을 너무 일찍 시작하는 건 아닌지 고민을 많이 했어요. 처음에는 선생님이 오시면 저한테만 붙어 있으려고 했는데, 선생님께서 억지로 영어를 시키지 않고 장난감이랑 그림책으로 자연스럽게 놀아주시니까 금방 적응하더라고요. 요즘은 선생님 오시는 날이면 먼저 영어 선생님 언제 오냐고 물어봐요. 집에서 수업하니까 이동하지 않아도 되는 것도 생각보다 정말 편하고요. 어린아이 수업 경험이 있는 선생님으로 매칭해 주신 점이 가장 만족스러웠습니다."
    },
    {
      label: "6세 남아 학부모",
      quote: "영유를 다니고 있지만 스피킹이 생각보다 늘지 않아서 신청했어요. 단순히 교재만 진행하는 과외가 아니라 아이가 계속 말을 할 수 있게 질문을 많이 해주시는 게 좋았습니다. 처음에는 한두 단어로 대답하던 아이가 요즘에는 문장으로 이야기하려고 해요. 미국인 선생님이라 발음이나 표현도 확실히 자연스럽고, 아이가 틀리게 말해도 바로 끊어서 고치기보다는 대화를 이어가면서 자연스럽게 수정해 주시는 점도 마음에 들었어요. 주 2회 하고 있는데 꾸준히 계속할 생각입니다."
    },
    {
      label: "국제학교 준비 중인 8세 학부모",
      quote: "국제학교 준비 때문에 리딩과 스피킹을 같이 봐주실 수 있는 선생님을 찾다가 존프랩튜터링을 알게 됐어요. 처음 상담할 때 아이 성향이랑 현재 영어 수준, 원하는 수업 방향을 꽤 자세히 물어보셔서 그냥 아무 선생님이나 연결해 주는 곳은 아니라는 느낌을 받았습니다. 지금 선생님도 아이 수준에 맞춰서 리딩 후 질문하고 자기 생각을 말하게 하는 방식으로 수업해 주세요. 영어로 대답하는 시간이 확실히 많아졌고 아이도 선생님을 좋아합니다. 방문수업이라 집에서 편하게 받을 수 있는 것도 큰 장점이에요."
    },
    {
      label: "5세 여아 학부모",
      quote: "아이가 낯을 많이 가리는 편이라 사실 첫 수업 전까지 걱정을 많이 했어요. 그런데 선생님이 아이 눈높이에 맞춰서 계속 웃으면서 기다려주시고 처음부터 수업하려고 하지 않으셨어요. 첫날은 거의 놀이 위주였는데 두 번째, 세 번째 수업부터 아이가 먼저 영어로 색깔이나 동물 이름을 이야기하기 시작했습니다. 저는 어린아이일수록 선생님 성격이 정말 중요하다고 생각하는데 저희 아이와 잘 맞는 선생님을 연결해 주셔서 만족하고 있어요. 수업 있는 날을 아이가 기다리는 것만으로도 잘 시작했다는 생각이 듭니다."
    },
    {
      label: "초등학생 학부모",
      quote: "예전에 다른 원어민 과외도 몇 번 해봤는데 선생님마다 편차가 있어서 오래 이어가지 못했어요. 존프랩에서는 처음 상담할 때 제가 원하는 조건을 말씀드렸고, 미국·캐나다 출신 선생님 중에서 아이에게 맞는 분을 추천해 주셨어요. 현재 선생님은 수업 준비도 꼼꼼하게 해오시고 아이가 관심 있어 하는 주제로 대화를 많이 이끌어 주세요. 특히 학교 영어처럼 정답만 찾는 수업이 아니라 실제로 영어로 생각하고 말하게 해주는 점이 마음에 듭니다. 아이가 영어에 대한 부담이 많이 줄었고 예전보다 먼저 영어로 이야기하려는 모습이 보여서 계속 수업하고 있습니다."
    }
  ],

  // Editable service area structure. Top-level regions per the brief; add sub-areas as coverage is confirmed.
  SERVICE_AREAS: [
    { region: "서울", subareas: [] },
    { region: "경기", subareas: [] },
    { region: "인천", subareas: [] }
  ],

  AGE_JOURNEY: [
    {
      range: "AGE 2–4",
      title: "Early English",
      items: ["English Exposure", "Songs & Interaction", "Picture Books", "Basic Vocabulary", "Listening", "Speaking", "Play-Based English"]
    },
    {
      range: "AGE 5–7",
      title: "Foundation English",
      items: ["Phonics", "Speaking", "Reading", "Vocabulary", "Basic Writing", "Story Reading"]
    },
    {
      range: "ELEMENTARY",
      title: "Core English",
      items: ["Reading", "Writing", "Vocabulary", "Grammar", "Speaking", "Comprehension"]
    },
    {
      range: "MIDDLE & HIGH SCHOOL",
      title: "Academic English",
      items: ["Advanced Reading", "Writing", "Grammar", "Vocabulary", "Academic English", "School Support", "Test Preparation"]
    }
  ],

  PROGRAMS: [
    { name: "Phonics & Early Reading", desc: "소리와 글자를 연결하는 첫 읽기 기초 수업." },
    { name: "Speaking & Conversation", desc: "자연스러운 대화를 통한 말하기 연습." },
    { name: "Reading Comprehension", desc: "글의 흐름과 의미를 이해하는 읽기 훈련." },
    { name: "Writing", desc: "생각을 문장과 글로 표현하는 쓰기 수업." },
    { name: "Vocabulary", desc: "연령과 수준에 맞는 어휘 확장." },
    { name: "Grammar", desc: "정확한 문장을 만드는 문법 학습." },
    { name: "Academic English", desc: "학교 수업을 뒷받침하는 학술 영어." },
    { name: "International School Preparation", desc: "국제학교 입학과 적응을 위한 준비 수업." },
    { name: "School Support", desc: "학교 진도와 과제를 함께 챙기는 서포트 수업." },
    { name: "Personalized English Program", desc: "위 영역을 조합한 맞춤형 커리큘럼." }
  ],

  PARENT_CONCERNS: [
    { q: "우리 아이가 외국인 선생님을 처음 만나는데 괜찮을까요?", a: "상담 과정에서 아이의 성향을 미리 파악하고, 낯선 사람에게 적응하는 속도를 고려해 선생님을 매칭해드립니다." },
    { q: "만 2~3세도 영어수업이 가능한가요?", a: "네, 가능합니다. 이 연령대는 문제풀이보다 놀이, 그림책, 노래 등 영어 노출 중심으로 수업을 진행합니다." },
    { q: "파닉스를 아직 모르는 아이도 가능한가요?", a: "네. 현재 수준에서 시작해 단계적으로 파닉스와 읽기로 이어지는 수업을 설계합니다." },
    { q: "영어유치원을 다니지 않아도 괜찮나요?", a: "네. 영어유치원 경험 여부와 관계없이 현재 아이의 수준에 맞춰 수업을 시작할 수 있습니다." },
    { q: "Speaking 위주로 수업할 수 있나요?", a: "네. 상담 시 말하기 중심 수업을 원하신다고 알려주시면 그에 맞춰 매칭해드립니다." },
    { q: "Reading과 Writing을 집중적으로 하고 싶어요.", a: "가능합니다. 학습 목표에 따라 Reading·Writing 비중을 높인 수업으로 구성할 수 있습니다." },
    { q: "국제학교 준비도 가능한가요?", a: "네. International School Preparation 수업을 통해 준비 과정을 지원합니다." },
    { q: "집으로 방문 가능한 선생님을 찾고 있어요.", a: "JOHN PREP TUTORING의 핵심 서비스가 바로 1:1 방문수업입니다. 희망 지역과 일정을 상담해드립니다." },
    { q: "아이와 잘 맞는 선생님을 어떻게 찾나요?", a: "아이의 연령, 수준, 성향, 학습 목표, 선호하는 수업 스타일을 상담한 뒤 그에 맞는 Native Teacher를 매칭합니다." }
  ],

  FAQ: [
    { q: "몇 살부터 수업할 수 있나요?", a: "만 2세부터 상담 가능합니다." },
    { q: "선생님이 집으로 방문하나요?", a: "네. JOHN PREP TUTORING의 핵심 서비스는 1:1 방문수업입니다." },
    { q: "선생님은 원어민인가요?", a: "미국 및 캐나다 출신 Native English Teacher 중심으로 매칭합니다." },
    { q: "만 2~3세 아이도 수업할 수 있나요?", a: "어린 연령의 특성에 맞춰 영어노출, 그림책, 대화 및 놀이 기반 접근을 활용할 수 있습니다." },
    { q: "영어를 거의 못하는 아이도 가능한가요?", a: "네. 현재 수준에서 시작해 단계적으로 학습을 진행합니다." },
    { q: "파닉스부터 시작할 수 있나요?", a: "네. 파닉스를 포함한 기초 단계부터 시작할 수 있습니다." },
    { q: "Speaking 위주의 수업도 가능한가요?", a: "네. 원하시는 수업 방향을 상담을 통해 반영합니다." },
    { q: "Reading과 Writing도 가능한가요?", a: "네. 학습 목표에 맞춰 Reading, Writing 비중을 조정할 수 있습니다." },
    { q: "국제학교 준비 수업도 가능한가요?", a: "네. International School Preparation 프로그램을 통해 지원합니다." },
    { q: "선생님은 어떻게 매칭되나요?", a: "아이의 연령, 수준, 성향, 학습 목적, 스케줄과 지역을 상담한 뒤 조건에 맞는 Native Teacher를 찾아 연결합니다." },
    { q: "원하는 선생님 스타일을 요청할 수 있나요?", a: "네. 상담 시 원하시는 수업 스타일이나 선생님 성향을 알려주시면 매칭에 반영합니다." },
    { q: "수업 지역은 어디까지 가능한가요?", a: "지역에 따라 Native Teacher 배정 가능 여부가 달라질 수 있습니다. 상담을 통해 확인해드립니다." },
    { q: "수업 요일과 시간은 어떻게 정하나요?", a: "상담 시 희망 요일과 시간대를 알려주시면 선생님 일정과 조율해드립니다." },
    { q: "상담은 어떻게 신청하나요?", a: "전화 또는 문자로 편하게 문의하시거나, 하단 상담 신청 폼을 남겨주시면 됩니다." },
    { q: "전화보다 문자 상담도 가능한가요?", a: "네. 문자 상담도 가능하며, 부담 없이 편하신 방법으로 문의해주세요." },
    { q: "수업료는 얼마인가요?", a: "수업료는 학생의 연령, 프로그램, 수업 빈도 등 조건에 따라 달라집니다. 상담을 통해 수업 조건을 확인한 후 안내해드립니다." }
  ]
};
