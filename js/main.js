(function () {
  'use strict';

  var CONFIG = window.JOHN_PREP_CONFIG || {};
  var DATA = window.JOHN_PREP_DATA || {};
  var track = window.trackEvent || function () {};

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  navToggle.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Phone / SMS links wired from config ---------- */
  var phone = (CONFIG.CONTACT_PHONE || '').trim();
  var sms = (CONFIG.CONTACT_SMS_NUMBER || '').trim();
  var smsText = encodeURIComponent(CONFIG.CONTACT_SMS_PRESET_TEXT || '');

  document.querySelectorAll('.js-tel-link').forEach(function (el) {
    if (phone) {
      el.setAttribute('href', 'tel:' + phone.replace(/[^0-9+]/g, ''));
    } else {
      el.setAttribute('href', '#consultation');
      el.setAttribute('title', '전화 상담 연결 준비 중입니다. 아래 상담 신청 폼을 이용해주세요.');
    }
  });

  document.querySelectorAll('.js-sms-link').forEach(function (el) {
    if (sms) {
      var digits = sms.replace(/[^0-9+]/g, '');
      el.setAttribute('href', 'sms:' + digits + (smsText ? '?&body=' + smsText : ''));
    } else {
      el.setAttribute('href', '#consultation');
      el.setAttribute('title', '문자 상담 연결 준비 중입니다. 아래 상담 신청 폼을 이용해주세요.');
    }
  });

  /* ---------- Click event tracking ---------- */
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      track(el.getAttribute('data-track'), { label: el.getAttribute('data-track-label') || '' });
    });
  });

  /* ---------- Scroll-into-view tracking (program_view / tutor_profile_view) ---------- */
  var viewTracked = {};
  var viewEls = document.querySelectorAll('[data-track-view]');
  if ('IntersectionObserver' in window && viewEls.length) {
    var viewIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var name = entry.target.getAttribute('data-track-view');
        if (entry.isIntersecting && !viewTracked[name]) {
          viewTracked[name] = true;
          track(name, {});
        }
      });
    }, { threshold: 0.3 });
    viewEls.forEach(function (el) { viewIo.observe(el); });
  }

  /* ---------- Scroll reveal ---------- */
  function observeReveal(el) {
    if (!('IntersectionObserver' in window)) { el.classList.add('is-visible'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
  }
  document.querySelectorAll('.reveal').forEach(observeReveal);

  /* ---------- Render: Age Journey ---------- */
  var ageJourneyEl = document.querySelector('.age-journey');
  if (ageJourneyEl && Array.isArray(DATA.AGE_JOURNEY)) {
    DATA.AGE_JOURNEY.forEach(function (stage) {
      var card = document.createElement('div');
      card.className = 'age-card';
      var itemsHtml = stage.items.map(function (i) { return '<li>' + i + '</li>'; }).join('');
      card.innerHTML =
        '<span class="age-range">' + stage.range + '</span>' +
        '<h3>' + stage.title + '</h3>' +
        '<ul>' + itemsHtml + '</ul>';
      ageJourneyEl.appendChild(card);
    });
  }

  /* ---------- Render: Programs ---------- */
  var programListEl = document.querySelector('.program-list');
  if (programListEl && Array.isArray(DATA.PROGRAMS)) {
    DATA.PROGRAMS.forEach(function (p) {
      var item = document.createElement('div');
      item.className = 'program-item';
      item.innerHTML = '<h3>' + p.name + '</h3><p>' + p.desc + '</p>';
      programListEl.appendChild(item);
    });
  }

  /* ---------- Render: Service Areas ---------- */
  var serviceAreaEl = document.getElementById('serviceAreaList');
  if (serviceAreaEl && Array.isArray(DATA.SERVICE_AREAS)) {
    DATA.SERVICE_AREAS.forEach(function (area) {
      var card = document.createElement('div');
      card.className = 'service-area-card';
      var sub = area.subareas && area.subareas.length ? area.subareas.join(', ') : '상담을 통해 안내';
      card.innerHTML = '<h3>' + area.region + '</h3><p>' + sub + '</p>';
      serviceAreaEl.appendChild(card);
    });
  }

  /* ---------- Render: Testimonials (section stays hidden while data is empty) ---------- */
  var testimonialsSection = document.getElementById('testimonials');
  var testimonialGridEl = document.getElementById('testimonialGrid');
  if (testimonialsSection && testimonialGridEl) {
    var testimonials = Array.isArray(DATA.TESTIMONIALS) ? DATA.TESTIMONIALS : [];
    if (testimonials.length) {
      testimonials.forEach(function (t) {
        var card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML =
          '<span class="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>' +
          '<p class="testimonial-text">' + t.quote + '</p>' +
          '<p class="testimonial-label">' + t.label + '</p>';
        testimonialGridEl.appendChild(card);
      });
    } else {
      testimonialsSection.remove();
    }
  }

  /* ---------- Accordion builder (shared for Parent Concerns + FAQ) ---------- */
  function buildAccordion(containerEl, items, trackName) {
    if (!containerEl || !Array.isArray(items)) return;
    items.forEach(function (item) {
      var el = document.createElement('div');
      el.className = 'accordion-item';
      el.innerHTML =
        '<button class="accordion-trigger" type="button">' + item.q + '<span class="accordion-icon" aria-hidden="true">+</span></button>' +
        '<div class="accordion-panel"><p>' + item.a + '</p></div>';
      containerEl.appendChild(el);
    });

    var accordionItems = containerEl.querySelectorAll('.accordion-item');
    accordionItems.forEach(function (item) {
      var trigger = item.querySelector('.accordion-trigger');
      var panel = item.querySelector('.accordion-panel');
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        accordionItems.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.accordion-panel').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          if (trackName) track(trackName, { question: trigger.textContent.replace('+', '').trim() });
        }
      });
    });
  }

  buildAccordion(document.getElementById('parentConcernsAccordion'), DATA.PARENT_CONCERNS, 'faq_open');
  buildAccordion(document.getElementById('faqAccordion'), DATA.FAQ, 'faq_open');

  /* ---------- Footer business info ---------- */
  var footerBusinessEl = document.getElementById('footerBusiness');
  if (footerBusinessEl) {
    var lines = [];
    lines.push(CONFIG.BUSINESS_NAME || 'JOHN PREP TUTORING');
    if (CONFIG.BUSINESS_REG_NUMBER) lines.push('사업자등록번호 ' + CONFIG.BUSINESS_REG_NUMBER);
    if (CONFIG.BUSINESS_ADDRESS) lines.push(CONFIG.BUSINESS_ADDRESS);
    if (CONFIG.BUSINESS_EMAIL) lines.push(CONFIG.BUSINESS_EMAIL);
    footerBusinessEl.innerHTML = '<p>' + lines.join(' · ') + '</p>';
  }

  /* ---------- Consultation form ---------- */
  var form = document.getElementById('consultationForm');
  var formNote = document.getElementById('formNote');
  if (form) {
    var startTracked = false;
    form.addEventListener('focusin', function () {
      if (!startTracked) { startTracked = true; track('consultation_form_start', {}); }
    });

    var action = (CONFIG.CONSULTATION_FORM_ACTION || '').trim();
    var isConfigured = action && action.indexOf('YOUR_FORM_ID') === -1;
    if (isConfigured) form.setAttribute('action', action);

    form.addEventListener('submit', function (e) {
      track('consultation_form_submit', {});
      if (!isConfigured) {
        e.preventDefault();
        formNote.hidden = false;
        formNote.textContent = '폼 제출 엔드포인트가 아직 연결되지 않았습니다. js/config.js의 CONSULTATION_FORM_ACTION 값을 실제 주소로 교체해주세요. (지금은 데모 상태입니다.)';
        formNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
})();
