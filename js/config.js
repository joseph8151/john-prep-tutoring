/**
 * JOHN PREP TUTORING — Site Configuration
 * Edit the values below to update contact info and analytics IDs across the entire site.
 * Do NOT hardcode phone numbers, prices, or IDs anywhere else in the codebase.
 */
window.JOHN_PREP_CONFIG = {
  // Shown as visible text (not hidden behind a button label) in the header, hero, contact
  // section, mobile menu and footer — edit this one line to update the number everywhere.
  CONTACT_PHONE: "010-3235-6229",

  GA_MEASUREMENT_ID: "G-45T5TYWC8K",

  CONSULTATION_FORM_ACTION: "https://formspree.io/f/xeajzowv",

  // TODO (optional): create a second Formspree form so tutor applications land in a separate
  // inbox/thread from parent inquiries. Leave blank to reuse CONSULTATION_FORM_ACTION above.
  TUTOR_APPLICATION_FORM_ACTION: "",

  // Business registration info — fill in when available. Left blank intentionally (never fabricate).
  BUSINESS_NAME: "JOHN PREP TUTORING",
  BUSINESS_REG_NUMBER: "", // 사업자등록번호
  BUSINESS_ADDRESS: "서울시 서초구 반포대로18길 62",
  BUSINESS_EMAIL: "",      // 문의 이메일
  BUSINESS_HOURS: "",      // 운영시간, 예: "평일 10:00–19:00"

  // TODO: Set the real 1:1 base lesson price in KRW (e.g. 60000) to show computed group-lesson
  // pricing on the site. Leave at 0 to show percentage-only guidance with no won amounts.
  BASE_LESSON_PRICE: 0,

  // Fixed multipliers for shared (group) lessons — applied to BASE_LESSON_PRICE, per-student
  // cost drops as group size grows. Edit only if JOHN PREP's group pricing policy changes.
  GROUP_PRICING_MULTIPLIERS: { 1: 1.0, 2: 1.2, 3: 1.4, 4: 1.6 }
};
