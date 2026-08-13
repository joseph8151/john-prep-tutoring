/**
 * JOHN PREP TUTORING — Analytics
 * Thin wrapper around Google Analytics 4 (gtag.js). Loads GA4 only when a real
 * Measurement ID is set in js/config.js. Until then, trackEvent() no-ops safely
 * so the rest of the site never has to check whether analytics is configured.
 *
 * Custom events fired across the site: phone_click, sms_click, consultation_click,
 * consultation_form_start, consultation_form_submit, program_view, tutor_profile_view, faq_open.
 * (page_view is tracked automatically by GA4 itself.)
 */
(function () {
  'use strict';
  var GA_ID = (window.JOHN_PREP_CONFIG && window.JOHN_PREP_CONFIG.GA_MEASUREMENT_ID) || '';
  var isConfigured = /^G-[A-Z0-9]+$/.test(GA_ID);

  if (isConfigured) {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  } else {
    // eslint-disable-next-line no-console
    console.info('[JOHN PREP] GA_MEASUREMENT_ID is not set in js/config.js — analytics events will be logged to console only.');
  }

  window.trackEvent = function (name, params) {
    if (isConfigured && window.gtag) {
      window.gtag('event', name, params || {});
    } else if (window.location.hostname === 'localhost' || window.location.protocol === 'file:') {
      // eslint-disable-next-line no-console
      console.debug('[analytics event]', name, params || {});
    }
  };
})();
