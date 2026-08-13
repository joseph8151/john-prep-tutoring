/**
 * JOHN PREP TUTORING — Tutor Application handler (Vercel serverless function)
 * Mirrors api/consultation.js. Sends a structured HTML email via Resend using the
 * same RESEND_API_KEY / CONTACT_EMAIL environment variables. Falls back to
 * Formspree client-side (see js/tutor-application.js) when not configured.
 */

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

function row(label, value) {
  return '<tr><td style="padding:4px 12px 4px 0;color:#5C6560;font-size:13px;white-space:nowrap;vertical-align:top;">' + esc(label) + '</td>' +
    '<td style="padding:4px 0;color:#252927;font-size:14px;">' + esc(value) + '</td></tr>';
}
function sectionHeading(text) {
  return '<tr><td colspan="2" style="padding:22px 0 6px;border-top:1px solid #EAE4D8;color:#173F35;font-weight:700;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">' + esc(text) + '</td></tr>';
}

function buildHtml(d, receivedAt) {
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

  return '<!doctype html><html><body style="margin:0;padding:0;background:#F8F5EE;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">' +
    '<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;padding:32px 20px;">' +
    '<tr><td>' +
    '<p style="font-family:Georgia,serif;font-weight:700;font-size:12px;letter-spacing:0.1em;color:#173F35;margin:0 0 4px;">JOHN PREP TUTORING</p>' +
    '<h1 style="font-size:20px;color:#173F35;margin:0 0 4px;">NEW TUTOR APPLICATION</h1>' +
    '<p style="font-size:12px;color:#5C6560;margin:0 0 8px;">Submitted: ' + esc(receivedAt) + '</p>' +
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

  if (d.company) { res.status(200).json({ ok: true }); return; }

  var renderedAt = Number(d.renderedAt) || 0;
  if (renderedAt && Date.now() - renderedAt < 3000) { res.status(200).json({ ok: true }); return; }

  if (!d.name || !d.phone || !d.email || !d.city) {
    res.status(400).json({ ok: false, error: 'missing_required_fields' });
    return;
  }

  var receivedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

  try {
    var resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'JOHN PREP TUTORING <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        subject: '[JOHN PREP Tutor Application] ' + (d.name || 'Unnamed') + ' / ' + (d.city || ''),
        html: buildHtml(d, receivedAt),
        reply_to: d.email || undefined
      })
    });

    if (!resendRes.ok) { res.status(502).json({ ok: false, error: 'email_send_failed' }); return; }
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(502).json({ ok: false, error: 'email_send_failed' });
  }
};
