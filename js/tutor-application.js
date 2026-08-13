(function () {
  'use strict';

  var CONFIG = window.JOHN_PREP_CONFIG || {};
  var DATA = window.JOHN_PREP_TUTOR_DATA || {};
  var track = window.trackEvent || function () {};

  /* ---------- Sticky header + mobile nav (same behavior as main site) ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  /* ---------- Click event tracking ---------- */
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      track(el.getAttribute('data-track'), { label: el.getAttribute('data-track-label') || '' });
    });
  });

  /* ---------- Render: Recruiting areas ---------- */
  var areasEl = document.getElementById('recruitingAreasList');
  if (areasEl && Array.isArray(DATA.RECRUITING_AREAS)) {
    DATA.RECRUITING_AREAS.forEach(function (tier) {
      var card = document.createElement('div');
      card.className = 'service-area-tier';
      var tagsHtml = (tier.areas || []).map(function (a) { return '<span>' + a + '</span>'; }).join('');
      card.innerHTML = '<span class="service-area-tier-name">' + tier.tier + '</span><div class="service-area-tags">' + tagsHtml + '</div>';
      areasEl.appendChild(card);
    });
  }

  /* ---------- Render: FAQ accordion ---------- */
  var faqEl = document.getElementById('tutorFaqAccordion');
  if (faqEl && Array.isArray(DATA.FAQ)) {
    DATA.FAQ.forEach(function (item) {
      var el = document.createElement('div');
      el.className = 'accordion-item';
      el.innerHTML =
        '<button class="accordion-trigger" type="button">' + item.q + '<span class="accordion-icon" aria-hidden="true">+</span></button>' +
        '<div class="accordion-panel"><p>' + item.a + '</p></div>';
      faqEl.appendChild(el);
    });
    var accordionItems = faqEl.querySelectorAll('.accordion-item');
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
        }
      });
    });
  }

  /* ---------- Render: checkbox groups + selects from tutor-data ---------- */
  function renderCheckboxes(container, options, name) {
    if (!container || !Array.isArray(options)) return;
    options.forEach(function (opt, i) {
      var label = document.createElement('label');
      var input = document.createElement('input');
      input.type = 'checkbox'; input.name = name; input.value = opt; input.id = name + '-' + i;
      label.appendChild(input);
      label.appendChild(document.createTextNode(' ' + opt));
      container.appendChild(label);
    });
  }
  function fillSelect(selectEl, options, placeholder) {
    if (!selectEl || !Array.isArray(options)) return;
    var ph = document.createElement('option');
    ph.value = ''; ph.textContent = placeholder; ph.disabled = true; ph.selected = true;
    selectEl.appendChild(ph);
    options.forEach(function (opt) {
      var o = document.createElement('option');
      o.value = opt; o.textContent = opt;
      selectEl.appendChild(o);
    });
  }

  renderCheckboxes(document.getElementById('tEnglishBackground'), DATA.englishBackgrounds, 'englishBackground');
  renderCheckboxes(document.getElementById('tPreferredAges'), DATA.preferredAges, 'preferredAges');
  renderCheckboxes(document.getElementById('tPreferredStyles'), DATA.preferredStyles, 'preferredStyles');
  renderCheckboxes(document.getElementById('tDays'), DATA.weekdays, 'days');
  renderCheckboxes(document.getElementById('tTimes'), DATA.timeSlots, 'times');
  fillSelect(document.getElementById('tProficiency'), DATA.proficiencyLevels, 'Select');
  fillSelect(document.getElementById('tTransportation'), DATA.transportation, 'Select (optional)');

  /* ---------- Application form submission ---------- */
  var form = document.getElementById('tutorApplicationForm');
  var formNote = document.getElementById('tutorFormNote');
  var formError = document.getElementById('tutorFormError');
  var thankYou = document.getElementById('tutorFormThankYou');
  var renderedAtInput = document.getElementById('tutorRenderedAt');
  if (renderedAtInput) renderedAtInput.value = String(Date.now());

  if (form) {
    var startTracked = false;
    form.addEventListener('focusin', function () {
      if (!startTracked) { startTracked = true; track('consultation_form_start', { form: 'tutor_application' }); }
    });

    var MULTI_FIELDS = ['englishBackground', 'preferredAges', 'preferredStyles', 'days', 'times'];

    function collectFormData() {
      var fd = new FormData(form);
      var obj = {};
      MULTI_FIELDS.forEach(function (f) { obj[f] = []; });
      fd.forEach(function (value, key) {
        if (MULTI_FIELDS.indexOf(key) !== -1) obj[key].push(value);
        else obj[key] = value;
      });
      obj.consent = !!document.getElementById('tConsent').checked;
      return obj;
    }

    function submitToApi(payload) {
      return fetch('/api/tutor-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) return false;
        return res.json().then(function (data) { return !!(data && data.ok); }).catch(function () { return false; });
      }).catch(function () { return false; });
    }

    function submitToFormspreeFallback(payload) {
      var action = (CONFIG.TUTOR_APPLICATION_FORM_ACTION || CONFIG.CONSULTATION_FORM_ACTION || '').trim();
      if (!action || action.indexOf('YOUR_FORM_ID') !== -1) return Promise.resolve(false);
      var fd = new FormData();
      fd.append('Application Type', 'Tutor Network Application');
      fd.append('Name', payload.name || '');
      fd.append('Phone', payload.phone || '');
      fd.append('Email', payload.email || '');
      fd.append('City', payload.city || '');
      fd.append('English Background', (payload.englishBackground || []).join(', '));
      fd.append('Proficiency', payload.proficiency || '');
      fd.append('University', payload.university || '');
      fd.append('Teaching Experience', payload.teachingExperience || '');
      fd.append('Preferred Ages', (payload.preferredAges || []).join(', '));
      fd.append('Preferred Styles', (payload.preferredStyles || []).join(', '));
      fd.append('Areas', payload.areas || '');
      fd.append('Days', (payload.days || []).join(', '));
      fd.append('Times', (payload.times || []).join(', '));
      fd.append('Transportation', payload.transportation || '');
      fd.append('Resume Link', payload.resumeLink || '');
      fd.append('Video Link', payload.videoLink || '');
      fd.append('Intro', payload.intro || '');
      return fetch(action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd })
        .then(function (res) { return res.ok; })
        .catch(function () { return false; });
    }

    function onSubmitSuccess() {
      track('consultation_form_submit', { form: 'tutor_application' });
      form.hidden = true;
      thankYou.hidden = false;
      thankYou.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function onSubmitFailure() {
      form.querySelector('button[type="submit"]').disabled = false;
      formError.hidden = false;
      formError.textContent = 'Something went wrong submitting your application. Please try again shortly.';
      formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var honeypotVal = document.getElementById('tutorHoneypot').value;
      if (honeypotVal) { onSubmitSuccess(); return; }

      var renderedAt = Number(renderedAtInput.value) || 0;
      if (renderedAt && Date.now() - renderedAt < 3000) { onSubmitSuccess(); return; }

      form.querySelector('button[type="submit"]').disabled = true;
      formError.hidden = true;
      formNote.hidden = true;

      var payload = collectFormData();

      submitToApi(payload).then(function (ok) {
        if (ok) { onSubmitSuccess(); return; }
        return submitToFormspreeFallback(payload).then(function (ok2) {
          if (ok2) onSubmitSuccess(); else onSubmitFailure();
        });
      }).catch(function () {
        submitToFormspreeFallback(payload).then(function (ok2) {
          if (ok2) onSubmitSuccess(); else onSubmitFailure();
        });
      });
    });
  }
})();
