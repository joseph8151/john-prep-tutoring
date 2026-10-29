# 존프랩튜터링 — 공식 웹사이트

미국·캐나다 출신 Native English Teacher를 매니저 상담 후 매칭해주는 1:1 방문 영어 튜터링 서비스,
존프랩튜터링의 홈페이지입니다. 순수 HTML/CSS/JS로 제작되어 빌드 도구 없이 바로 배포할 수 있습니다.

브랜드 구조: **학부모 ↔ 존프랩 매니저 ↔ 선생님** — 홈페이지에서 선생님을 직접 골라 연락하는
Tutor Marketplace가 아니라, 매니저가 상담 후 적합한 선생님을 소개하는 구조입니다.

## 페이지

- `index.html` — 홈 (매우 단순한 허브). 한 화면에 "원어민 방문" / "시험 프렙" 두 갈래 카드만 보여주고 각 상세 페이지로 연결합니다.
- `native.html` — 원어민 방문 상세 페이지. 매칭 철학, 매칭 순서, 연령/지역 요약, 상담 신청 폼(5단계), FAQ, 후기.
- `prep.html` — 시험 프렙 상세 페이지. 레벨테스트·MAP Test·CAT4·ISEE·국제학교 선행학습 5개 카테고리, 각각 상담 폼(native.html#consultation)으로 연결.
- `become-a-tutor.html` — 선생님 지원 페이지 (지원자 대상, 영어 중심)
- `privacy.html` — 개인정보처리방침 (템플릿, 대괄호 `[ ]` 항목은 실제 정보로 교체 필요)

## 파일 구조

- `css/styles.css` — 원래 디자인 시스템 (Deep Forest `#173F35` / Sage `#A9B9A5` 등). `become-a-tutor.html`과 일부 공용 컴포넌트(상담폼, 아코디언, 후기 카드)가 계속 사용합니다.
- `css/simple.css` — `index.html` / `native.html` / `prep.html` 전용. `css/styles.css` 뒤에 로드되어 CSS 변수(색상/그림자/radius)를 재정의하는 방식으로, 배경 `#F6F3EE` · 글자 `#1C1A17` · 포인트 `#1F3A34` 하나, 그림자·알약버튼·아이콘 없는 미니멀한 톤으로 덮어씁니다.
- `js/config.js` — **연락처, GA4 ID, 폼 주소, 그룹 수업료 등 사이트 전체 설정값 (가장 먼저 확인하세요)**
- `js/data.js` — 사이트 콘텐츠 (FAQ, 선생님 샘플, 후기, 서비스 지역, 상담폼 옵션 목록 등). `native.html`이 주로 사용.
- `js/tutor-data.js` — 선생님 지원 페이지 전용 콘텐츠 (지원폼 옵션, 모집 지역, FAQ)
- `js/analytics.js` — Google Analytics 4 연동 및 이벤트 트래킹 (전 페이지 공용)
- `js/main.js` — 공용 인터랙션 (헤더/모바일 메뉴, 5단계 상담폼, 아코디언, 가격 계산기 등). 각 함수가 대상 엘리먼트 존재 여부를 먼저 확인하므로, 해당 섹션이 없는 페이지에서는 자동으로 아무 동작도 하지 않습니다.
- `js/tutor-application.js` — 선생님 지원 폼 인터랙션 및 제출
- `src/worker.js` — 상담/지원 이메일 발송 (Cloudflare Worker, Resend 사용). `POST /api/consultation`, `POST /api/tutor-application` 두 라우트를 처리하고, 그 외 모든 요청은 정적 파일로 서빙합니다.
- `wrangler.jsonc` — Cloudflare Worker 설정 (정적 자산 디렉터리, API 라우팅)
- `assets/photos/jp_0*.jpg` — 실제 수업 사진 (홈/원어민 페이지에서 사용). 실제 선생님 프로필 사진이 아니며, 캡션에 실명·국적을 넣지 않습니다.
- `assets/illustrations/reading-together.svg` — `become-a-tutor.html`에서만 사용하는 커스텀 SVG 일러스트. 나머지 3개(`hero.svg`/`consultation.svg`/`home-visit.svg`)는 더 이상 어느 페이지에서도 참조되지 않는 미사용 파일입니다.
- `assets/og-image.png` (+ 소스 `og-card.svg`/`og-card.html`) — 카카오톡/SNS 공유 미리보기 이미지
- `serve.ps1` / `.claude/launch.json` — 로컬 미리보기용 정적 서버

## 배포 전 반드시 확인해야 하는 값 (`js/config.js`)

| 항목 | 상태 | 설명 |
|---|---|---|
| `CONTACT_PHONE` | ✅ 설정됨 | 헤더·히어로·Contact 섹션·푸터·모바일 메뉴에 텍스트로 노출됩니다 (문자 상담 버튼은 제거됨 — 오작동 이슈로 전화만 사용). |
| `GA_MEASUREMENT_ID` | ✅ 설정됨 | Google Analytics 4. |
| `CONSULTATION_FORM_ACTION` | ✅ 설정됨 (Formspree) | 상담폼 이메일 수신처. `src/worker.js`(Resend)가 아직 미설정이라 현재는 이 Formspree로만 전송됩니다. |
| `TUTOR_APPLICATION_FORM_ACTION` | 비어 있음 | 비워두면 선생님 지원 폼도 위 Formspree로 함께 전송됩니다. 별도 수신함이 필요하면 Formspree 폼을 하나 더 만들어 넣으세요. |
| `RESEND_API_KEY` / `CONTACT_EMAIL` | 미설정 (Cloudflare Worker 변수) | Cloudflare 대시보드 → Workers & Pages → john-prep-tutoring → Settings → Variables and Secrets에서 설정하면 두 폼 모두 Worker가 보기 좋은 HTML 이메일을 직접 발송하고, Formspree는 자동 폴백으로만 남습니다. |
| `BASE_LESSON_PRICE` | `0` | 1:1 기준 실제 수업료(원). 0이면 그룹 수업료를 퍼센트로만 표시, 값을 넣으면 원화로 자동 계산됩니다. |
| `BUSINESS_REG_NUMBER` / `BUSINESS_EMAIL` / `BUSINESS_HOURS` | 비어 있음 | 실제 값이 없어 임의로 채우지 않았습니다. 값을 넣는 즉시 푸터에 표시됩니다. |

## 의도적으로 비워두거나 "샘플"로 표시한 부분

"근거 없는 숫자·후기·선생님 정보를 만들지 말 것" 원칙에 따라, 아래는 실제 데이터가 들어오기 전까지 비어 있거나
명확히 "샘플 형식"으로 표시해두었습니다.

- **선생님 프로필** (`js/data.js`의 `TEACHERS`) — 예시 2개(Emily M., Sarah L.)에 `isSample: true`가 붙어 있어 "SAMPLE FORMAT" 배지가 자동으로 뜹니다. 실제 선생님이 등록되면 배열에 추가하고 `isSample`을 빼거나 `false`로 두세요.
- **후기 (Testimonials)** — 현재 5개는 실제 학부모 후기입니다 (본인 확인 후 반영). 추가로 들어오면 같은 배열에 이어서 넣으면 됩니다.
- **수업 후 피드백 카드** — "예시 형식" 배지가 붙은 샘플입니다. 실제로 이런 리포트를 제공하실지 확인 후 문구를 조정하세요.
- **서비스 지역 세부 동/읍/면** — 3단계 구조(서울/경기·인천/광역시)의 대표 지역만 채웠습니다.
- **가격/수업료** — 그룹 수업료(1:2~1:4)는 배수 공식으로 자동 계산되고, 1:1 기준가만 넣으면 됩니다.
- **일러스트 인물** — 홈/원어민 페이지는 실제 수업 사진(`assets/photos/`)으로 교체 완료. `become-a-tutor.html`에 남아있는 `reading-together.svg` 한 장만 아직 일러스트이며, 특정 인종을 특정하지 않는 중립 톤으로 그려두었습니다.

## 로컬 미리보기

Node/Python 없이도 PowerShell 정적 서버로 바로 확인할 수 있습니다.

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

이후 `http://localhost:8123` 접속. `/api/*` 라우트(`src/worker.js`)는 이 정적 서버에서 동작하지 않고
Cloudflare 배포 환경에서만 동작합니다 — 로컬에서는 상담폼이 자동으로 Formspree로 폴백됩니다 (정상 동작).
Worker까지 포함해 로컬에서 확인하려면 `npx wrangler dev`를 사용하세요.

## 배포

Cloudflare Workers (Workers & Pages → john-prep-tutoring)가 이 GitHub 저장소의 `main` 브랜치에 연결되어
있어, push하면 자동으로 빌드·배포됩니다. `wrangler.jsonc`의 `assets.directory`가 정적 파일을 서빙하고,
`src/worker.js`가 `/api/consultation`·`/api/tutor-application` 요청만 가로채 처리합니다.

배포 후 `RESEND_API_KEY` / `CONTACT_EMAIL`을 Cloudflare 대시보드(Settings → Variables and Secrets)에
설정해야 Worker가 직접 이메일을 발송합니다. 미설정 상태에서는 두 폼 모두 Formspree로 자동 폴백됩니다.

## 관리자 Analytics 대시보드

별도의 커스텀 관리자 페이지 대신 **Google Analytics 4**를 사용합니다. GA4는 오늘/일간/주간/월간 방문자,
Top Pages, 유입 경로, 기기별 통계, 전환 이벤트를 무료로 제공하며 구글 로그인으로 이미 보호되어 있습니다.
아래 커스텀 이벤트가 두 페이지 모두에서 GA4로 자동 전송됩니다.

`phone_click`, `consultation_click`, `consultation_form_start`, `consultation_form_submit`,
`program_view`, `tutor_profile_view`, `faq_open` (`page_view`는 GA4가 자동 수집)

## ⚠️ 배포 규칙 (중요 — 사이트 충돌 방지)

이 사이트는 **자기만의 Cloudflare 서버(Worker)** 에만 배포되어야 합니다.

- 이 저장소의 Cloudflare Worker 이름 = **`john-prep-tutoring`** (`wrangler.jsonc` 참고)
- **절대** `blossom-books` 등 다른 사이트의 서버에 배포하지 마세요. 이름이 겹치면 그 사이트를 덮어씁니다.
- 대시보드에서 이 저장소를 Cloudflare 에 연결할 때, 새 프로젝트 이름을 반드시 `john-prep-tutoring` 로 두세요 (기존 프로젝트에 연결 ❌).
- 도메인은 이 `john-prep-tutoring` 서버에만 연결하세요.
