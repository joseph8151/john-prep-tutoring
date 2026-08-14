/**
 * 존프랩튜터링 — Tutor Application Page Data
 * Option lists for the Become a Tutor application form. Edit freely.
 */
window.JOHN_PREP_TUTOR_DATA = {
  englishBackgrounds: [
    "Raised in the United States", "Raised in Canada", "Educated in the United States", "Educated in Canada",
    "Korean-American", "Korean-Canadian", "Second-generation Korean diaspora",
    "Native-level North American English", "Other"
  ],
  proficiencyLevels: ["Native", "Native-level / Bilingual", "Other"],
  preferredAges: ["Age 2–4", "Age 5–7", "Elementary 1–3", "Elementary 4–6"],
  preferredStyles: [
    "Play-Based", "Speaking", "Phonics", "Reading", "Writing",
    "Academic English", "Balanced", "International School Support"
  ],
  weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  timeSlots: ["Morning", "Early Afternoon", "Afternoon", "Evening"],
  transportation: ["Public transportation", "Own vehicle", "Either"],

  // Same 3-tier structure as the family-facing site's SERVICE_AREAS, English labels for tutor applicants.
  RECRUITING_AREAS: [
    { tier: "SEOUL", areas: ["Gangnam", "Seocho", "Songpa", "Yongsan", "Mapo", "Seongdong", "Gwangjin", "Gangseo", "and other districts"] },
    { tier: "GYEONGGI / INCHEON", areas: ["Bundang", "Pangyo", "Suji", "Dongtan", "Gwanggyo", "Ilsan", "Gimpo", "Hanam", "Songdo", "Cheongna", "and surrounding areas"] },
    { tier: "MAJOR CITIES", areas: ["Busan", "Daegu", "Daejeon", "Gwangju", "Ulsan", "Sejong", "and other cities depending on student demand"] }
  ],

  FAQ: [
    { q: "Do I need to be a U.S. or Canadian citizen?", a: "No. Citizenship itself is not the deciding criterion. 존프랩 looks for tutors with native or fully native-level North American English and strong suitability for teaching children." },
    { q: "I'm Korean-American / Korean-Canadian. Can I apply?", a: "Absolutely. If English is your native or dominant language and you communicate naturally at a native level, we welcome your application." },
    { q: "Do I need to speak Korean?", a: "Not necessarily. Korean ability can be helpful in some situations, but it is not required for most English tutoring roles." },
    { q: "Do I need teaching experience?", a: "Relevant teaching, tutoring, or childcare experience is preferred. Strong candidates with excellent communication skills and experience working with children may still be considered." },
    { q: "Are lessons online or in person?", a: "존프랩 primarily provides in-home tutoring. Availability and lesson opportunities depend on location." },
    { q: "Can I choose which students I teach?", a: "You can tell 존프랩 your preferred ages, subjects, areas, schedule and lesson style. We only contact you when a potentially suitable match becomes available." }
  ]
};
