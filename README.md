# JOHN PREP TUTORING — 공식 웹사이트

미국·캐나다 출신 Native English Teacher의 1:1 방문 영어 튜터링 매칭 서비스, JOHN PREP TUTORING의 홈페이지입니다.
순수 HTML/CSS/JS로 제작되어 빌드 도구 없이 바로 배포할 수 있습니다.

## 파일 구조

- `index.html` — 메인 홈페이지
- `privacy.html` — 개인정보처리방침 (템플릿, 아래 참고)
- `css/styles.css` — 디자인 시스템 (Deep Teal / Sand / Cream 팔레트)
- `js/config.js` — **연락처, GA4 ID, 폼 주소 등 사이트 전체 설정값 (가장 먼저 확인하세요)**
- `js/data.js` — 선생님 프로필, 서비스 지역, FAQ 등 편집 가능한 콘텐츠
- `js/analytics.js` — Google Analytics 4 연동 및 이벤트 트래킹
- `js/main.js` — 인터랙션 (아코디언, 모바일 메뉴, 폼, 렌더링)
- `serve.ps1` / `.claude/launch.json` — 로컬 미리보기용 정적 서버

## 배포 전 반드시 채워야 하는 값 (`js/config.js`)

지금은 전부 빈 값입니다. 실제 데이터 없이 임의로 채워 넣지 않았습니다.

| 항목 | 설명 |
|---|---|
| `CONTACT_PHONE` | 전화 상담 번호. 비어 있으면 전화 버튼이 상담 폼으로 대체 연결됩니다. |
| `CONTACT_SMS_NUMBER` | 문자 상담 번호. 비어 있으면 문자 버튼이 상담 폼으로 대체 연결됩니다. |
| `GA_MEASUREMENT_ID` | Google Analytics 4 속성의 Measurement ID (`G-XXXXXXXXXX`). 무료로 발급받을 수 있으며, 실제 방문자 통계·유입 경로·기기별 통계·전환 이벤트를 GA4 자체 대시보드에서 확인할 수 있습니다. |
| `CONSULTATION_FORM_ACTION` | 상담 폼 제출을 이메일로 받기 위한 엔드포인트 (예: Formspree에서 무료로 발급). |
| `BUSINESS_REG_NUMBER` / `BUSINESS_ADDRESS` / `BUSINESS_EMAIL` | 푸터에 표시할 사업자 정보. 비어 있으면 표시되지 않습니다. |

## 의도적으로 비워둔 부분

브리프의 지침("근거 없는 숫자·후기·선생님 정보를 만들지 말 것")에 따라 아래는 실제 데이터가 들어오기 전까지 비어 있거나 샘플 상태로 남겨두었습니다.

- **선생님 프로필** (`js/data.js`의 `TEACHERS`) — 현재 홈페이지에는 프로필 "형식"을 보여주는 샘플 카드만 있습니다. 실제 선생님이 등록되면 이 배열에 추가하고 `index.html`의 `.teacher-sample` 영역 렌더링 로직을 확장하면 됩니다.
- **후기 (Testimonials)** — 섹션 자체를 만들지 않았습니다. `TESTIMONIALS` 배열에 실제 후기가 쌓이면 섹션을 추가하세요.
- **서비스 지역 세부 지역** — 서울/경기/인천만 큰 틀로 넣었고, 하위 지역은 비어 있습니다 (`SERVICE_AREAS`).
- **가격/수업료** — 어디에도 금액을 표시하지 않았습니다. "상담 후 안내"로 통일했습니다.
- **지역별 랜딩페이지(`/locations/seoul` 등)·블로그** — 향후 SEO 확장을 고려한 구조만 남겨두었고, 페이지 자체는 만들지 않았습니다 (콘텐츠가 없는 상태에서 빈 페이지를 미리 만들면 오히려 품질이 낮아 보일 수 있어 제외했습니다).

## 로컬 미리보기

Node/Python 없이도 PowerShell 정적 서버로 바로 확인할 수 있습니다.

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

이후 `http://localhost:8123` 접속.

## 관리자 Analytics 대시보드

별도의 커스텀 관리자 페이지를 만드는 대신 **Google Analytics 4**를 연동하는 방식을 선택했습니다 (사용자 확인 완료). GA4는 오늘/일간/주간/월간 방문자, Top Pages, 유입 경로, 기기별 통계, 전환 이벤트를 무료로 제공하며 구글 로그인으로 이미 보호되어 있어 별도 인증 시스템을 새로 만들 필요가 없습니다. `GA_MEASUREMENT_ID`만 설정하면 아래 커스텀 이벤트가 자동으로 GA4에 전송됩니다.

`phone_click`, `sms_click`, `consultation_click`, `consultation_form_start`, `consultation_form_submit`, `program_view`, `tutor_profile_view`, `faq_open` (`page_view`는 GA4가 자동 수집)
