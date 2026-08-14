/**
 * JOHN PREP TUTORING — Structured Content Data
 * Keep editable, data-driven content here instead of buried in HTML.
 * IMPORTANT: Never fill TEACHERS, TESTIMONIALS, or SERVICE_AREAS.regions.*.subareas
 * with invented names, schools, credentials, or reviews beyond what is explicitly
 * marked as a UI sample below. Leave empty until real data is supplied.
 */
window.JOHN_PREP_DATA = {
  // Sample-format cards only (isSample:true) until real tutor profiles are supplied.
  // Replace with real entries (and set isSample:false or remove the field) when available —
  // the "SAMPLE FORMAT" badge is driven entirely by isSample.
  TEACHERS: [
    {
      isSample: true,
      name: "EMILY M.",
      flag: "🇺🇸",
      origin: "United States",
      experience: "6+ Years",
      specialties: ["Early Childhood", "Speaking", "Reading"],
      bestWith: "Ages 3–8",
      teachingStyle: "Warm · Interactive · Conversation-Focused"
    },
    {
      isSample: true,
      name: "SARAH L.",
      flag: "🇨🇦",
      origin: "Canada",
      experience: "7+ Years",
      specialties: ["Reading", "Writing", "Academic English"],
      bestWith: "Ages 7–14",
      teachingStyle: "Structured · Encouraging · Academic"
    }
  ],

  // Real, submitted testimonials only. The Testimonials section stays hidden while this is empty.
  // meta (age/district · topic) is shown only when provided — never invented for a real quote.
  TESTIMONIALS: [
    {
      meta: "4세 여아 학부모",
      sampleRelated: true,
      quote: "아이가 아직 어려서 원어민 수업을 너무 일찍 시작하는 건 아닌지 고민을 많이 했어요. 처음에는 선생님이 오시면 저한테만 붙어 있으려고 했는데, 선생님께서 억지로 영어를 시키지 않고 장난감이랑 그림책으로 자연스럽게 놀아주시니까 금방 적응하더라고요. 요즘은 선생님 오시는 날이면 먼저 영어 선생님 언제 오냐고 물어봐요. 집에서 수업하니까 이동하지 않아도 되는 것도 생각보다 정말 편하고요. 어린아이 수업 경험이 있는 선생님으로 매칭해 주신 점이 가장 만족스러웠습니다."
    },
    {
      meta: "6세 남아 학부모",
      quote: "영유를 다니고 있지만 스피킹이 생각보다 늘지 않아서 신청했어요. 단순히 교재만 진행하는 과외가 아니라 아이가 계속 말을 할 수 있게 질문을 많이 해주시는 게 좋았습니다. 처음에는 한두 단어로 대답하던 아이가 요즘에는 문장으로 이야기하려고 해요. 미국인 선생님이라 발음이나 표현도 확실히 자연스럽고, 아이가 틀리게 말해도 바로 끊어서 고치기보다는 대화를 이어가면서 자연스럽게 수정해 주시는 점도 마음에 들었어요. 주 2회 하고 있는데 꾸준히 계속할 생각입니다."
    },
    {
      meta: "국제학교 준비 중인 8세 학부모",
      quote: "국제학교 준비 때문에 리딩과 스피킹을 같이 봐주실 수 있는 선생님을 찾다가 존프랩튜터링을 알게 됐어요. 처음 상담할 때 아이 성향이랑 현재 영어 수준, 원하는 수업 방향을 꽤 자세히 물어보셔서 그냥 아무 선생님이나 연결해 주는 곳은 아니라는 느낌을 받았습니다. 지금 선생님도 아이 수준에 맞춰서 리딩 후 질문하고 자기 생각을 말하게 하는 방식으로 수업해 주세요. 영어로 대답하는 시간이 확실히 많아졌고 아이도 선생님을 좋아합니다. 방문수업이라 집에서 편하게 받을 수 있는 것도 큰 장점이에요."
    },
    {
      meta: "5세 여아 학부모",
      sampleRelated: true,
      quote: "아이가 낯을 많이 가리는 편이라 사실 첫 수업 전까지 걱정을 많이 했어요. 그런데 선생님이 아이 눈높이에 맞춰서 계속 웃으면서 기다려주시고 처음부터 수업하려고 하지 않으셨어요. 첫날은 거의 놀이 위주였는데 두 번째, 세 번째 수업부터 아이가 먼저 영어로 색깔이나 동물 이름을 이야기하기 시작했습니다. 저는 어린아이일수록 선생님 성격이 정말 중요하다고 생각하는데 저희 아이와 잘 맞는 선생님을 연결해 주셔서 만족하고 있어요. 수업 있는 날을 아이가 기다리는 것만으로도 잘 시작했다는 생각이 듭니다."
    },
    {
      meta: "초등학생 학부모",
      quote: "예전에 다른 원어민 과외도 몇 번 해봤는데 선생님마다 편차가 있어서 오래 이어가지 못했어요. 존프랩에서는 처음 상담할 때 제가 원하는 조건을 말씀드렸고, 미국·캐나다 출신 선생님 중에서 아이에게 맞는 분을 추천해 주셨어요. 현재 선생님은 수업 준비도 꼼꼼하게 해오시고 아이가 관심 있어 하는 주제로 대화를 많이 이끌어 주세요. 특히 학교 영어처럼 정답만 찾는 수업이 아니라 실제로 영어로 생각하고 말하게 해주는 점이 마음에 듭니다. 아이가 영어에 대한 부담이 많이 줄었고 예전보다 먼저 영어로 이야기하려는 모습이 보여서 계속 수업하고 있습니다."
    }
  ],

  // Editable 3-tier service area structure. Edit freely as coverage changes — never implies
  // guaranteed same-day availability everywhere; the UI always pairs this with the
  // "confirmed after consultation" disclaimer.
  SERVICE_AREAS: [
    {
      tier: "SEOUL",
      label: "서울 전 지역",
      areas: ["강남", "서초", "송파", "용산", "성동", "광진", "마포", "강서", "양천", "영등포", "동작", "강동", "노원 등"]
    },
    {
      tier: "SEOUL METROPOLITAN AREA",
      label: "경기 · 인천",
      areas: ["분당", "판교", "수지", "위례", "광교", "동탄", "과천", "일산", "김포", "하남", "미사", "부천", "광명", "구리", "평택 등 (경기)", "송도", "청라", "연수구 등 (인천)"]
    },
    {
      tier: "MAJOR CITIES",
      label: "주요 지방 광역시",
      areas: ["부산", "대구", "대전", "광주", "울산", "세종", "및 기타 주요 도시"]
    }
  ],

  AGE_JOURNEY: [
    {
      range: "만 2~4세",
      title: "영어와 친해지는 시기",
      desc: "그림책, 놀이, 노래와 자연스러운 대화를 통해 영어를 편안하게 접합니다."
    },
    {
      range: "만 5~7세",
      title: "영어 기초를 만드는 시기",
      desc: "말하기를 중심으로 파닉스, 리딩, 어휘와 기초 쓰기를 자연스럽게 연결합니다."
    },
    {
      range: "초등 1~3학년",
      title: "영어 활용 능력을 키우는 시기",
      desc: "리딩, 스피킹, 어휘, 문법, 문장 쓰기를 균형 있게 진행합니다."
    },
    {
      range: "초등 4~6학년",
      title: "학업 영어로 확장하는 시기",
      desc: "독해, 라이팅, 어휘, 문법, 토론과 Academic English까지 확장합니다."
    }
  ],

  LESSON_STYLE_SUMMARY: [
    { name: "놀이 중심", desc: "어린 학생이 부담 없이 영어에 익숙해질 수 있도록 놀이와 대화 중심으로 진행합니다." },
    { name: "학습 중심", desc: "파닉스, 리딩, 라이팅, 어휘, 문법 등을 체계적으로 진행합니다." },
    { name: "균형형", desc: "말하기와 활동, 리딩과 쓰기를 아이의 집중도와 수준에 맞춰 섞어서 진행합니다." }
  ],

  // "우리 아이는 어떤 수업이 필요할까요?" self-identification paths. anchor must match a real section id on the page.
  NEEDS_PATHS: [
    { label: "영어를 처음 시작해요", sub: "첫 영어 · 놀이 · Speaking", anchor: "#programs" },
    { label: "영어유치원을 준비해요", sub: "Pre-K 준비", anchor: "#prek-prep" },
    { label: "파닉스·리딩을 시작하고 싶어요", sub: "Foundation", anchor: "#programs" },
    { label: "초등 영어를 강화하고 싶어요", sub: "Reading · Writing · Academic", anchor: "#programs" },
    { label: "학원 레벨테스트가 있어요", sub: "Test Preparation", anchor: "#level-test-prep" }
  ],

  PROGRAMS: [
    { name: "파닉스 · 첫 읽기 (Phonics)", desc: "소리와 글자를 연결하는 첫 읽기 기초 수업." },
    { name: "말하기 (Speaking)", desc: "자연스러운 대화를 통한 말하기 연습." },
    { name: "독해 (Reading)", desc: "글의 흐름과 의미를 이해하는 읽기 훈련." },
    { name: "쓰기 (Writing)", desc: "생각을 문장과 글로 표현하는 쓰기 수업." },
    { name: "어휘 (Vocabulary)", desc: "연령과 수준에 맞는 어휘 확장." },
    { name: "문법 (Grammar)", desc: "정확한 문장을 만드는 문법 학습." },
    { name: "학업 영어 (Academic English)", desc: "학교 수업을 뒷받침하는 학술 영어." },
    { name: "국제학교 준비", desc: "국제학교 입학과 적응을 위한 준비 수업." },
    { name: "학교 수업 서포트", desc: "학교 진도와 과제를 함께 챙기는 서포트 수업." },
    { name: "맞춤형 통합 프로그램", desc: "위 영역을 조합한 맞춤형 커리큘럼." }
  ],

  // ---------------------------------------------------------------------
  // Parent Problem — what a parent would otherwise have to verify alone
  // before trusting a native tutor with their child.
  // ---------------------------------------------------------------------
  PARENT_CHECK_POINTS: [
    "출신 국가는 어디인지",
    "유아 수업 경험이 있는지",
    "우리 아이 성향과 잘 맞는지",
    "Phonics를 가르칠 수 있는지",
    "학습형 수업도 가능한지",
    "시간 약속을 잘 지키는지",
    "오랫동안 수업할 수 있는지",
    "Speaking 위주인지 Academic English까지 가능한지"
  ],

  // ---------------------------------------------------------------------
  // JOHN PREP vs. a typical tutor-search platform — objective comparison,
  // not a sales pitch.
  // ---------------------------------------------------------------------
  COMPARISON: {
    typical: {
      label: "TYPICAL TUTOR PLATFORM",
      items: [
        "Search dozens of profiles",
        "Contact tutors individually",
        "Check schedules yourself",
        "Compare experience yourself",
        "Coordinate everything yourself"
      ]
    },
    johnPrep: {
      label: "JOHN PREP TUTORING",
      items: [
        "One Parent Consultation",
        "Student Profile Analysis",
        "Tutor Screening",
        "Personalized Matching",
        "Tutor Profile Introduction",
        "Sample Lesson",
        "Ongoing Matching Support"
      ]
    }
  },

  // ---------------------------------------------------------------------
  // The JOHN PREP Standard — 6-step tutor review & matching process.
  // Reflects only what JOHN PREP actually reviews — never add unverified
  // checks (e.g. criminal background checks, certification verification).
  // ---------------------------------------------------------------------
  STANDARD_STEPS: [
    { num: "01", title: "Native English Background", desc: "미국·캐나다 등 영어권 교육 및 생활 배경을 확인합니다." },
    { num: "02", title: "Education & Experience Review", desc: "학력, 교육 경험, Tutor Experience, 유아 및 초등 수업 경험 등을 검토합니다." },
    { num: "03", title: "Tutor Interview", desc: "Communication, Professionalism, Teaching Style 등을 확인합니다." },
    { num: "04", title: "Age & Goal Matching", desc: "유아, Phonics, Reading, Speaking, Writing, Academic English 등 학생의 목적에 적합한지를 확인합니다." },
    { num: "05", title: "Location & Schedule", desc: "방문 가능 지역과 실제 수업 가능한 일정을 확인합니다." },
    { num: "06", title: "Parent Introduction", desc: "수업 전 학부모에게 Tutor의 주요 Profile을 안내합니다." }
  ],

  // ---------------------------------------------------------------------
  // Sample tutor profile sheet — mockup format shown before the first lesson.
  // isSample:true — replaced with the real matched tutor's info per family;
  // never presented site-wide as if it were an actual profile.
  // ---------------------------------------------------------------------
  PROFILE_SHEET_SAMPLE: {
    isSample: true,
    name: "Emily S.",
    nationality: "Toronto, Canada",
    education: "B.Ed., Early Childhood Education",
    experience: "6+ Years Teaching Experience",
    ageSpecialization: "Ages 3–7",
    teachingStyle: "Warm · Patient · Interactive",
    lessonFocus: "Phonics · Reading · Speaking · Kindergarten Prep",
    schedule: "상담을 통해 확인 (Confirmed After Consultation)",
    matchNote: "아이의 현재 영어 수준과 유아 수업 목표를 고려하여 추천된 Tutor 예시입니다.",
    whyMatch: ["유아 수업 경험 다수", "Phonics 지도 가능", "Speaking 중심 Interaction", "요청 연령대 수업 경험"]
  },

  // ---------------------------------------------------------------------
  // Try Before Regular Lessons — the core sample-first conversion pitch.
  // ---------------------------------------------------------------------
  TRY_FIRST_STEPS: [
    { num: "01", title: "Meet Your Tutor", desc: "매칭된 선생님의 주요 프로필을 먼저 확인합니다." },
    { num: "02", title: "Try One Lesson", desc: "실제 1:1 수업을 경험합니다." },
    { num: "03", title: "Decide After", desc: "아이의 반응과 수업 방식을 확인한 뒤 정규수업을 결정합니다." }
  ],

  // ---------------------------------------------------------------------
  // Payment-anxiety reassurance — shown directly beside the Sample Lesson
  // CTA, not buried only in the FAQ accordion.
  // ---------------------------------------------------------------------
  SAMPLE_REASSURANCE: [
    { q: "선생님을 보지도 않고 결제해야 하나요?", a: "아닙니다. 먼저 학생 조건에 맞는 Tutor를 매칭하고 가능한 범위에서 Tutor Profile을 안내합니다." },
    { q: "샘플수업 후 꼭 정규수업을 해야 하나요?", a: "샘플수업 후 아이와 Tutor의 적합도를 확인하고 정규수업 여부를 결정할 수 있도록 안내합니다." },
    { q: "아이가 선생님을 어려워하면 어떡하나요?", a: "아이의 반응, 수업 방식, Tutor와의 Interaction을 샘플수업에서 직접 확인할 수 있습니다." },
    { q: "유아인데 수업이 가능한지 모르겠어요.", a: "연령만으로 판단하기보다 영어 노출 경험, 낯가림, 집중 시간 등을 상담 후 고려합니다." },
    { q: "어떤 선생님이 오는지 모르는데 결제하기 불안해요.", a: "Tutor Matching 후 가능한 범위에서 Tutor Profile을 안내한 뒤 샘플수업으로 연결합니다." }
  ],

  // ---------------------------------------------------------------------
  // Sample Lesson product card — the entry product. Price stays "상담 후
  // 안내" unless CONFIG.SAMPLE_LESSON_PRICE is set to a real value.
  // ---------------------------------------------------------------------
  SAMPLE_LESSON_FEATURES: [
    "Personalized Tutor Matching",
    "Tutor Profile Before Lesson",
    "Private 1:1 Lesson",
    "Parent Feedback & Consultation",
    "No Need to Commit to Regular Lessons First"
  ],

  // ---------------------------------------------------------------------
  // Programs — 4 age/goal categories, the primary program structure.
  // ---------------------------------------------------------------------
  PROGRAM_CATEGORIES: [
    {
      num: "01",
      tag: "LITTLE LEARNERS",
      title: "Little Learners",
      range: "Ages 2–4",
      skills: ["Play", "Songs", "Picture Books", "First Words", "Listening", "Simple Speaking"],
      desc: "영어를 공부로 시작하기보다 자연스럽게 듣고 반응하며 영어에 익숙해지는 단계입니다."
    },
    {
      num: "02",
      tag: "KINDERGARTEN READY",
      title: "Kindergarten Ready",
      range: "Ages 4–7",
      skills: ["Speaking", "Phonics", "Reading", "Classroom English", "Vocabulary"],
      desc: "영어유치원 입학 전 또는 재원 중 필요한 기초 영어 능력을 균형 있게 준비합니다."
    },
    {
      num: "03",
      tag: "ELEMENTARY ENGLISH",
      title: "Elementary English",
      range: "Grades 1–6",
      skills: ["Reading", "Writing", "Vocabulary", "Grammar", "Speaking", "Academic English"],
      desc: "단순 회화를 넘어 Reading과 Writing까지 포함한 학습형 영어로 확장합니다."
    },
    {
      num: "04",
      tag: "LEVEL TEST PREP",
      title: "Level Test Prep",
      range: "Academy / School Admission &amp; Advancement",
      skills: ["Reading", "Vocabulary", "Grammar", "Writing", "Listening", "Speaking", "Interview"],
      desc: "지원하는 교육기관 또는 목표 평가의 주요 영역을 확인하여 학생 수준에 맞춰 준비합니다."
    }
  ],

  // ---------------------------------------------------------------------
  // Pre-K / Kindergarten prep — situations this program fits.
  // ---------------------------------------------------------------------
  PREK_FIT_POINTS: [
    "영어유치원 입학 전 영어 노출이 부족한 경우",
    "원어민과 대화할 때 긴장하는 경우",
    "영어 지시를 이해하는 연습이 필요한 경우",
    "Phonics를 처음 시작하는 경우",
    "Picture Book Reading을 시작하고 싶은 경우",
    "영어유치원 입학 전 Speaking을 강화하고 싶은 경우"
  ],

  // ---------------------------------------------------------------------
  // Level Test Prep — 5-step preparation process.
  // ---------------------------------------------------------------------
  LEVEL_TEST_PROCESS: [
    { num: "01", title: "Goal Analysis", desc: "지원하려는 교육기관과 목표 확인" },
    { num: "02", title: "Current Level", desc: "Reading / Vocabulary / Writing / Speaking 등 현재 수준 확인" },
    { num: "03", title: "Priority Areas", desc: "집중적으로 보완해야 할 영역 선정" },
    { num: "04", title: "Targeted Practice", desc: "유형별 연습 및 Skill Training" },
    { num: "05", title: "Native Interview Practice", desc: "필요한 경우 Native Tutor와 Speaking / Interview Practice" }
  ],

  // ---------------------------------------------------------------------
  // Lesson Experience — general flow. Actual composition varies by the
  // student's age and goals; see the age-based note shown alongside it.
  // ---------------------------------------------------------------------
  LESSON_FLOW: [
    "Warm-up Conversation", "Today's Topic", "Vocabulary", "Picture Book / Reading",
    "Speaking Practice", "Phonics / Writing Activity", "Review", "Home Practice"
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
    { q: "수업료는 얼마인가요?", a: "수업료는 학생의 연령, 프로그램, 수업 빈도 등 조건에 따라 달라집니다. 상담을 통해 수업 조건을 확인한 후 안내해드립니다." },
    { q: "정말 미국·캐나다 원어민 선생님만 있나요?", a: "JOHN PREP TUTORING은 미국 또는 캐나다 출신 Native English Speaker를 중심으로 Tutor를 매칭합니다." },
    { q: "아이가 영어를 전혀 못해도 가능한가요?", a: "가능합니다. 만 2세 이상의 어린 학생은 놀이, 그림책, 노래, 반복적인 표현 등을 활용하여 영어에 자연스럽게 익숙해지는 것부터 시작할 수 있습니다." },
    { q: "선생님 정보를 수업 전에 알 수 있나요?", a: "매칭 완료 후 가능한 범위에서 Tutor의 출신 국가, 주요 경력, Teaching Experience, 전문 영역 및 수업 스타일 등을 안내합니다." },
    { q: "수업은 어디에서 하나요?", a: "기본적으로 학생의 자택에서 진행하는 1:1 방문수업입니다." },
    { q: "유아도 책상에 앉아서 수업하나요?", a: "연령에 따라 수업 방식이 달라집니다. 어린 학생은 놀이, 그림책, 대화 등 Interactive Activity 비중을 높이고 연령이 올라갈수록 Reading, Writing 및 Academic Learning 비중을 확대합니다." },
    { q: "유아도 한 시간 수업하나요?", a: "아이의 나이와 집중 시간에 따라 적절한 수업시간을 상담합니다. 어린 연령일수록 짧은 시간을 놀이와 활동으로 나누어 진행하는 경우가 많고, 아이가 수업에 익숙해지면 시간을 조정할 수 있습니다." },
    { q: "국제학교 학생도 가능한가요?", a: "가능합니다. 학생 수준과 필요에 따라 Reading, Writing, Speaking, Vocabulary, Grammar 및 Academic English 수업으로 구성할 수 있습니다." },
    { q: "특정 성별이나 스타일의 선생님을 요청할 수 있나요?", a: "네. 상담 시 미국/캐나다 출신, 성별, 밝고 활발한 스타일, 차분한 스타일, 어린아이 경험, Academic 성향 등 원하는 조건을 자유롭게 말씀해주시면 학부모 요청사항과 실제 Tutor Availability를 함께 고려하여 매칭합니다." },
    { q: "수업은 어떤 방식으로 진행되나요?", a: "정해진 하나의 방식으로 모든 아이에게 동일하게 진행하지 않습니다. 매니저 상담을 통해 아이의 나이, 현재 영어 수준, 학습 경험, 성향, 학습 목표를 먼저 확인한 뒤 그에 맞는 Tutor와 수업 방식을 안내합니다. One child. One level. One personalized lesson." },
    { q: "형제나 친구와 같이 수업할 수 있나요?", a: "네. 상황에 따라 1:1, 1:2, 1:3, 1:4 수업이 가능하며 형제·자매 또는 비슷한 연령·영어 수준의 친구들이 함께 수업하는 것도 가능합니다. 학생 간 연령, 수준, 목표 차이가 너무 크지 않은 것이 좋으며 정확한 구성은 매니저 상담 후 안내합니다." },
    { q: "선생님을 제가 직접 고르는 건가요?", a: "아니요. JOHN PREP은 Tutor Marketplace가 아닙니다. 여러 프로필을 직접 검색하고 선택하시는 구조가 아니라, 매니저 상담을 통해 아이의 조건을 확인한 뒤 적합한 Tutor를 검토하여 소개해드립니다." },
    { q: "정규수업 전에 샘플수업을 받을 수 있나요?", a: "네. JOHN PREP 매니저 상담 후 적합한 Tutor를 소개받으면 정규수업을 시작하기 전에 샘플수업을 진행할 수 있습니다. 샘플수업을 통해 아이와 Tutor의 호흡, 수업 방식과 난이도를 직접 확인한 후 정규수업 진행 여부를 결정하실 수 있습니다. 지역과 Tutor 일정에 따라 샘플수업 가능 일정이 달라질 수 있습니다." },
    { q: "원어민 수업이 처음인데 괜찮을까요?", a: "네, 많은 학부모님들이 처음 시작하십니다. 매니저 상담에서 아이의 성향과 낯가림 정도를 미리 확인해 그에 맞는 선생님을 소개해드리고, 샘플수업을 통해 미리 확인하실 수 있어 부담이 적습니다." },
    { q: "엄마(아빠)가 수업에 같이 있어야 하나요?", a: "처음 몇 회는 옆에서 지켜보셔도 좋고, 아이와 선생님이 편안해진 이후에는 자유롭게 다른 일을 보셔도 괜찮습니다. 편하신 방식을 매니저와 상담해주세요." },
    { q: "교재는 누가 준비하나요?", a: "연령과 수업 방향에 따라 필요한 교재와 학습 자료가 달라질 수 있어, 매니저 상담 시 함께 안내해드립니다." },
    { q: "숙제는 있나요?", a: "숙제 여부와 양은 아이의 연령과 학습 목표에 따라 달라집니다. 원하시는 방향이 있다면 상담 시 말씀해주세요." },
    { q: "선생님이 아이와 잘 맞지 않으면 어떻게 하나요?", a: "샘플수업 또는 수업 진행 중 아이와 선생님이 잘 맞지 않는다고 느껴지시면 매니저와 상담을 통해 재매칭을 진행할 수 있습니다." }
  ],

  // ---------------------------------------------------------------------
  // Tutor Matching Request Form — option lists. Edit freely; the form
  // renders entirely from this data so adding/removing an option needs
  // no HTML changes.
  // ---------------------------------------------------------------------
  FORM_OPTIONS: {
    regions: ["서울", "경기", "인천", "기타"],

    studentAges: [
      "만 2세", "만 3세", "만 4세", "만 5세", "만 6세", "만 7세",
      "초등 1학년", "초등 2학년", "초등 3학년", "초등 4학년", "초등 5학년", "초등 6학년",
      "중학생", "고등학생"
    ],

    genders: ["남아", "여아", "답변하지 않음"],

    englishLevels: [
      { value: "처음 시작", desc: "영어 노출이 거의 없어요." },
      { value: "Beginner", desc: "단어나 간단한 표현을 이해해요." },
      { value: "Basic Conversation", desc: "간단한 질문과 대답이 가능해요." },
      { value: "Intermediate", desc: "영어로 어느 정도 대화가 가능해요." },
      { value: "Advanced", desc: "영어로 자연스럽게 의사소통이 가능해요." },
      { value: "잘 모르겠어요", desc: "상담 후 확인하고 싶어요." }
    ],

    learningEnvironments: [
      "영어유치원 재원", "일반 유치원 / 어린이집", "국제학교 재학", "외국인학교 재학",
      "일반 초등학교", "일반 중·고등학교", "해외 거주 경험 있음", "원어민 과외 경험 있음",
      "영어학원 재원", "별도의 영어수업 없음", "기타"
    ],

    lessonInterests: [
      "놀이 영어", "First English", "Speaking", "Phonics", "Reading", "Writing", "Vocabulary",
      "Grammar", "Academic English", "국제학교 영어", "국제학교 준비", "학교 과제 / Homework Support",
      "영어 토론", "Presentation", "Essay Writing", "아직 잘 모르겠어요"
    ],

    lessonStyles: [
      { value: "놀이 중심", desc: "어린 아이가 부담 없이 영어에 익숙해지는 수업" },
      { value: "Speaking 중심", desc: "선생님과 영어로 최대한 많이 대화하는 수업" },
      { value: "Reading 중심", desc: "책을 읽고 이해하고 이야기하는 수업" },
      { value: "Academic", desc: "교재를 활용해 체계적으로 배우는 수업" },
      { value: "Balanced", desc: "Speaking, Reading, Writing을 균형 있게" },
      { value: "Fun & Interactive", desc: "활동과 대화를 많이 하는 수업" },
      { value: "Structured", desc: "정해진 Curriculum과 목표를 가지고 진행하는 수업" },
      { value: "Intensive", desc: "단기간에 집중적으로 실력을 높이는 수업" },
      { value: "JOHN PREP 추천", desc: "JOHN PREP에서 학생에게 적합한 방식을 제안" }
    ],

    tutorCountries: ["미국", "캐나다", "미국 또는 캐나다 모두 가능", "상관없음"],
    tutorGenders: ["여성 선생님", "남성 선생님", "상관없음"],

    tutorStyles: [
      "아이와 잘 놀아주는 선생님", "밝고 Energetic한 선생님", "차분하고 부드러운 선생님",
      "꼼꼼한 선생님", "Academic한 선생님", "Speaking을 많이 유도하는 선생님",
      "숙제와 Writing을 잘 관리하는 선생님", "어린아이 경험이 많은 선생님",
      "국제학교 학생 경험이 많은 선생님", "JOHN PREP 추천"
    ],

    // Edit this list to match whatever frequency/duration options JOHN PREP actually offers.
    lessonFrequencies: ["주 1회", "주 2회", "주 3회", "주 4회 이상", "아직 결정하지 않음"],
    lessonDurations: ["40분", "60분", "90분", "상담 후 결정"],

    weekdays: ["월", "화", "수", "목", "금", "토", "일"],
    timeSlots: ["오전", "12:00–15:00", "15:00–17:00", "17:00–19:00", "19:00 이후", "시간 협의 가능"],

    childPersonalities: [
      "처음에는 낯을 가려요", "활발하고 말이 많아요", "조용하고 차분해요", "집중력이 좋은 편이에요",
      "오래 앉아있는 것을 어려워해요", "게임이나 놀이를 좋아해요", "책 읽기를 좋아해요",
      "말하는 것을 좋아해요", "영어에 자신감이 없어요", "영어를 좋아해요",
      "선생님과 친해지는 데 시간이 필요해요", "기타"
    ]
  }
};
