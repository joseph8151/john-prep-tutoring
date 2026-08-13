/**
 * JOHN PREP TUTORING — Tutor Matching Request handler (Vercel serverless function)
 *
 * Sends a structured HTML email via the Resend API whenever a parent submits the
 * Tutor Matching Request form. Requires two environment variables set in the
 * Vercel project (Settings -> Environment Variables), never exposed client-side:
 *
 *   RESEND_API_KEY   Resend API key (create a free account at resend.com)
 *   CONTACT_EMAIL    Where new inquiries should be delivered
 *
 * If those aren't set yet, this route responds 503 and the front end falls back
 * to the already-working Formspree submission — nothing breaks either way.
 *
 * Uses only native fetch (no "resend" npm dependency), so no package.json /
 * build step is required for this static-site deployment.
 */

// Best-effort in-memory rate limit. Resets whenever the serverless instance cold-starts,
// so this is a soft deterrent (paired with the honeypot + timing check below), not a hard
// guarantee — swap in Vercel KV / Upstash here if stronger limits are ever needed.
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

function fmt(value) {
  if (Array.isArray(value)) return value.length ? value.join(' / ') : '—';
  if (value === undefined || value === null || value === '') return '—';
  return String(value);
}

function esc(value) {
  return fmt(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildSubject(d) {
  var genderLabel = { '여성 선생님': 'Female Tutor', '남성 선생님': 'Male Tutor', '상관없음': 'Any Tutor' }[d.tutorGender] || 'Tutor';
  var loc = d.district || d.region || '';
  var parts = [d.studentAge || '', loc, d.lessonFrequency || '', genderLabel].filter(Boolean);
  return '[JOHN PREP 신규 문의] ' + parts.join(' / ');
}

function row(label, value) {
  return '<tr><td style="padding:4px 12px 4px 0;color:#5C6560;font-size:13px;white-space:nowrap;vertical-align:top;">' + esc(label) + '</td>' +
    '<td style="padding:4px 0;color:#252927;font-size:14px;">' + esc(value) + '</td></tr>';
}

function sectionHeading(text) {
  return '<tr><td colspan="2" style="padding:22px 0 6px;border-top:1px solid #EAE4D8;color:#173F35;font-weight:700;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">' + esc(text) + '</td></tr>';
}

function buildHtml(d, receivedAt) {
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

  return '<!doctype html><html><body style="margin:0;padding:0;background:#F8F5EE;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">' +
    '<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;padding:32px 20px;">' +
    '<tr><td>' +
    '<p style="font-family:Georgia,serif;font-weight:700;font-size:12px;letter-spacing:0.1em;color:#173F35;margin:0 0 4px;">JOHN PREP TUTORING</p>' +
    '<h1 style="font-size:20px;color:#173F35;margin:0 0 4px;">NEW TUTOR MATCHING REQUEST</h1>' +
    '<p style="font-size:12px;color:#5C6560;margin:0 0 8px;">접수시간: ' + esc(receivedAt) + '</p>' +
    '<table role="presentation" width="100%" style="border-collapse:collapse;">' + rows.join('') + '</table>' +
    '</td></tr></table></body></html>';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  var RESEND_API_KEY = process.env.RESEND_API_KEY;
  var CONTACT_EMAIL = process.env.CONTACT_EMAIL;

  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    res.status(503).json({ ok: false, error: 'not_configured' });
    return;
  }

  var ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }

  var d = req.body || {};

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (d.company) {
    res.status(200).json({ ok: true });
    return;
  }

  // Timing check: real users take more than a few seconds to fill a 5-step form.
  var renderedAt = Number(d.renderedAt) || 0;
  if (renderedAt && Date.now() - renderedAt < 3000) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!d.parentName || !d.phone || !d.studentAge || !d.region) {
    res.status(400).json({ ok: false, error: 'missing_required_fields' });
    return;
  }

  var receivedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

  try {
    var resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'JOHN PREP TUTORING <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        subject: buildSubject(d),
        html: buildHtml(d, receivedAt),
        reply_to: d.email || undefined
      })
    });

    if (!resendRes.ok) {
      res.status(502).json({ ok: false, error: 'email_send_failed' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(502).json({ ok: false, error: 'email_send_failed' });
  }
};
