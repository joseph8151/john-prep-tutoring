/**
 * 존프랩튜터링 — Cloudflare Worker
 *
 * Serves the static site (via the ASSETS binding) and handles the two form
 * endpoints that used to be Vercel serverless functions:
 *   POST /api/consultation       — parent consultation request
 *   POST /api/tutor-application  — tutor network application
 *
 * Both send a structured HTML email via the Resend API. Configure these as
 * Worker secrets (Cloudflare dashboard → Workers & Pages → john-prep-tutoring
 * → Settings → Variables and Secrets, or `wrangler secret put <NAME>`):
 *
 *   RESEND_API_KEY   Resend API key (resend.com)
 *   CONTACT_EMAIL    Where new inquiries should be delivered
 *
 * If those aren't set, both routes respond 503 and the front end falls back
 * to the already-working Formspree submission — nothing breaks either way.
 */

// Best-effort in-memory rate limit, scoped to a single Worker isolate. Resets on
// isolate eviction/cold start, so this is a soft deterrent (paired with the
// honeypot + timing check below), not a hard guarantee.
var submissionLog = new Map();
var RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
var RATE_LIMIT_MAX = 8;

function isRateLimited(ip) {
  var now = Date.now();
  var existing = (submissionLog.get(ip) || []).filter(function (t) { return now - t < RATE_LIMIT_WINDOW_MS; });
  existing.push(now);
  submissionLog.set(ip, existing);
  return existing.length > RATE_LIMIT_MAX;
}

function getClientIp(request) {
  return request.headers.get('CF-Connecting-IP') ||
    (request.headers.get('X-Forwarded-For') || '').split(',')[0].trim() ||
    'unknown';
}

function fmt(value) {
  if (Array.isArray(value)) return value.length ? value.join(' / ') : '—';
  if (value === undefined || value === null || value === '') return '—';
  return String(value);
}

function esc(value) {
  return fmt(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function row(label, value) {
  return '<tr><td style="padding:4px 12px 4px 0;color:#5C6560;font-size:13px;white-space:nowrap;vertical-align:top;">' + esc(label) + '</td>' +
    '<td style="padding:4px 0;color:#252927;font-size:14px;">' + esc(value) + '</td></tr>';
}

function sectionHeading(text) {
  return '<tr><td colspan="2" style="padding:22px 0 6px;border-top:1px solid #EAE4D8;color:#173F35;font-weight:700;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">' + esc(text) + '</td></tr>';
}

function emailWrapper(title, receivedLabel, receivedAt, rows) {
  return '<!doctype html><html><body style="margin:0;padding:0;background:#F8F5EE;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">' +
    '<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;padding:32px 20px;">' +
    '<tr><td>' +
    '<p style="font-family:Georgia,serif;font-weight:700;font-size:12px;letter-spacing:0.1em;color:#173F35;margin:0 0 4px;">존프랩튜터링</p>' +
    '<h1 style="font-size:20px;color:#173F35;margin:0 0 4px;">' + esc(title) + '</h1>' +
    '<p style="font-size:12px;color:#5C6560;margin:0 0 8px;">' + esc(receivedLabel) + ': ' + esc(receivedAt) + '</p>' +
    '<table role="presentation" width="100%" style="border-collapse:collapse;">' + rows.join('') + '</table>' +
    '</td></tr></table></body></html>';
}

function buildConsultationSubject(d) {
  var genderLabel = { '여성 선생님': 'Female Tutor', '남성 선생님': 'Male Tutor', '상관없음': 'Any Tutor' }[d.tutorGender] || 'Tutor';
  var loc = d.district || d.region || '';
  var parts = [d.studentAge || '', loc, d.lessonFrequency || '', genderLabel].filter(Boolean);
  return '[존프랩 신규 문의] ' + parts.join(' / ');
}

function buildConsultationHtml(d, receivedAt) {
  var rows = [];
  rows.push(sectionHeading('Parent'));
  rows.push(row('학부모', d.parentName));
  rows.push(row('전화', d.phone));
  rows.push(row('Email', d.email));

  rows.push(sectionHeading('Student'));
  rows.push(row('나이', d.studentAge));
  rows.push(row('성별', d.gender));
  rows.push(row('현재 영어 수준', d.englishLevel));
  rows.push(row('현재 영어 환경', d.learningEnvironments));
  rows.push(row('아이 성향', d.childPersonalities));

  rows.push(sectionHeading('Location'));
  rows.push(row('지역', [d.region, d.district].filter(Boolean).join(' ')));
  rows.push(row('아파트/거주지역', d.apartment));

  rows.push(sectionHeading('Lesson Request'));
  rows.push(row('희망 수업', d.lessonInterests));
  rows.push(row('희망 스타일', d.lessonStyles));
  rows.push(row('수업 횟수', d.lessonFrequency));
  rows.push(row('수업 시간', d.lessonDuration));
  rows.push(row('가능 요일', d.days));
  rows.push(row('시간대', d.timeSlots));
  rows.push(row('직접입력', d.scheduleNote));

  rows.push(sectionHeading('Tutor Preference'));
  rows.push(row('국가', d.tutorCountry));
  rows.push(row('성별', d.tutorGender));
  rows.push(row('Tutor Style', d.tutorStyles));

  rows.push(sectionHeading('Parent Message'));
  rows.push('<tr><td colspan="2" style="padding:6px 0;color:#252927;font-size:14px;white-space:pre-wrap;">' + esc(d.message || '—') + '</td></tr>');
  rows.push(row('Marketing 수신 동의', d.marketingOptIn ? 'Yes' : 'No'));

  return emailWrapper('NEW TUTOR MATCHING REQUEST', '접수시간', receivedAt, rows);
}

function buildTutorHtml(d, receivedAt) {
  var rows = [];
  rows.push(sectionHeading('Applicant'));
  rows.push(row('Name', d.name));
  rows.push(row('Phone', d.phone));
  rows.push(row('Email', d.email));
  rows.push(row('City / Area', d.city));

  rows.push(sectionHeading('English Background'));
  rows.push(row('Background', d.englishBackground));
  rows.push(row('Proficiency', d.proficiency));
  rows.push(row('University', d.university));

  rows.push(sectionHeading('Experience'));
  rows.push('<tr><td colspan="2" style="padding:6px 0;color:#252927;font-size:14px;white-space:pre-wrap;">' + esc(d.teachingExperience) + '</td></tr>');

  rows.push(sectionHeading('Preferences'));
  rows.push(row('Preferred Ages', d.preferredAges));
  rows.push(row('Preferred Styles', d.preferredStyles));
  rows.push(row('Areas', d.areas));
  rows.push(row('Available Days', d.days));
  rows.push(row('Available Times', d.times));
  rows.push(row('Transportation', d.transportation));

  rows.push(sectionHeading('Links'));
  rows.push(row('Resume / LinkedIn', d.resumeLink));
  rows.push(row('Intro Video', d.videoLink));

  rows.push(sectionHeading('Introduction'));
  rows.push('<tr><td colspan="2" style="padding:6px 0;color:#252927;font-size:14px;white-space:pre-wrap;">' + esc(d.intro) + '</td></tr>');

  return emailWrapper('NEW TUTOR APPLICATION', 'Submitted', receivedAt, rows);
}

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function sendResendEmail(env, payload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + env.RESEND_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

async function handleConsultation(request, env) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method_not_allowed' });
  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL) return json(503, { ok: false, error: 'not_configured' });

  if (isRateLimited(getClientIp(request))) return json(429, { ok: false, error: 'rate_limited' });

  var d;
  try { d = await request.json(); } catch (err) { d = {}; }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (d.company) return json(200, { ok: true });

  // Timing check: real users take more than a few seconds to fill a 5-step form.
  var renderedAt = Number(d.renderedAt) || 0;
  if (renderedAt && Date.now() - renderedAt < 3000) return json(200, { ok: true });

  if (!d.parentName || !d.phone || !d.studentAge || !d.region) {
    return json(400, { ok: false, error: 'missing_required_fields' });
  }

  var receivedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

  try {
    var resendRes = await sendResendEmail(env, {
      from: '존프랩튜터링 <onboarding@resend.dev>',
      to: [env.CONTACT_EMAIL],
      subject: buildConsultationSubject(d),
      html: buildConsultationHtml(d, receivedAt),
      reply_to: d.email || undefined
    });
    if (!resendRes.ok) return json(502, { ok: false, error: 'email_send_failed' });
    return json(200, { ok: true });
  } catch (err) {
    return json(502, { ok: false, error: 'email_send_failed' });
  }
}

async function handleTutorApplication(request, env) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method_not_allowed' });
  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL) return json(503, { ok: false, error: 'not_configured' });

  if (isRateLimited(getClientIp(request))) return json(429, { ok: false, error: 'rate_limited' });

  var d;
  try { d = await request.json(); } catch (err) { d = {}; }

  if (d.company) return json(200, { ok: true });

  var renderedAt = Number(d.renderedAt) || 0;
  if (renderedAt && Date.now() - renderedAt < 3000) return json(200, { ok: true });

  if (!d.name || !d.phone || !d.email || !d.city) {
    return json(400, { ok: false, error: 'missing_required_fields' });
  }

  var receivedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

  try {
    var resendRes = await sendResendEmail(env, {
      from: '존프랩튜터링 <onboarding@resend.dev>',
      to: [env.CONTACT_EMAIL],
      subject: '[존프랩 Tutor Application] ' + (d.name || 'Unnamed') + ' / ' + (d.city || ''),
      html: buildTutorHtml(d, receivedAt),
      reply_to: d.email || undefined
    });
    if (!resendRes.ok) return json(502, { ok: false, error: 'email_send_failed' });
    return json(200, { ok: true });
  } catch (err) {
    return json(502, { ok: false, error: 'email_send_failed' });
  }
}

export default {
  async fetch(request, env) {
    var url = new URL(request.url);
    if (url.pathname === '/api/consultation') return handleConsultation(request, env);
    if (url.pathname === '/api/tutor-application') return handleTutorApplication(request, env);
    return env.ASSETS.fetch(request);
  }
};
