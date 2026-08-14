(function () {
  'use strict';

  var CONFIG = window.JOHN_PREP_CONFIG || {};
  var DATA = window.JOHN_PREP_DATA || {};
  var FORM_OPTIONS = DATA.FORM_OPTIONS || {};
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

  /* ---------- Phone links wired from config ---------- */
  var phone = (CONFIG.CONTACT_PHONE || '').trim();

  document.querySelectorAll('.js-tel-link').forEach(function (el) {
    if (phone) {
      el.setAttribute('href', 'tel:' + phone.replace(/[^0-9+]/g, ''));
    } else {
      el.setAttribute('href', '#consultation');
      el.setAttribute('title', '전화 상담 연결 준비 중입니다. 아래 상담 신청 폼을 이용해주세요.');
    }
  });

  // Elements that should show the actual phone number as visible text (not hidden behind a button label)
  document.querySelectorAll('.js-tel-text').forEach(function (el) {
    el.textContent = phone || '전화 상담 준비 중';
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
  function observeRevealAll() {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(observeReveal);
  }

  /* ---------- Render: Age Journey ---------- */
  var ageJourneyEl = document.getElementById('ageJourneyGrid');
  if (ageJourneyEl && Array.isArray(DATA.AGE_JOURNEY)) {
    DATA.AGE_JOURNEY.forEach(function (stage) {
      var card = document.createElement('div');
      card.className = 'age-card';
      card.innerHTML =
        '<span class="age-range">' + stage.range + '</span>' +
        '<h3>' + stage.title + '</h3>' +
        '<p>' + stage.desc + '</p>';
      ageJourneyEl.appendChild(card);
    });
  }

  /* ---------- Render: Lesson style summary (Play-based / Academic / Balanced) ---------- */
  var lessonStyleSummaryEl = document.getElementById('lessonStyleSummary');
  if (lessonStyleSummaryEl && Array.isArray(DATA.LESSON_STYLE_SUMMARY)) {
    DATA.LESSON_STYLE_SUMMARY.forEach(function (s) {
      var card = document.createElement('div');
      card.className = 'style-summary-card';
      card.innerHTML = '<h3>' + s.name + '</h3><p>' + s.desc + '</p>';
      lessonStyleSummaryEl.appendChild(card);
    });
  }

  /* ---------- Render: Needs path selector ---------- */
  var needsPathGridEl = document.getElementById('needsPathGrid');
  if (needsPathGridEl && Array.isArray(DATA.NEEDS_PATHS)) {
    DATA.NEEDS_PATHS.forEach(function (p) {
      var card = document.createElement('a');
      card.className = 'needs-path-card';
      card.href = p.anchor;
      card.innerHTML =
        '<span class="needs-path-label">' + p.label + '</span>' +
        '<span class="needs-path-sub">' + p.sub + '</span>' +
        '<span class="needs-path-arrow" aria-hidden="true">→</span>';
      needsPathGridEl.appendChild(card);
    });
  }

  /* ---------- Render: Programs ---------- */
  var programListEl = document.getElementById('programList');
  if (programListEl && Array.isArray(DATA.PROGRAMS)) {
    DATA.PROGRAMS.forEach(function (p) {
      var item = document.createElement('div');
      item.className = 'program-item';
      item.innerHTML = '<h3>' + p.name + '</h3><p>' + p.desc + '</p>';
      programListEl.appendChild(item);
    });
  }

  /* ---------- Render: Service Areas (3-tier) ---------- */
  var serviceAreaEl = document.getElementById('serviceAreaList');
  if (serviceAreaEl && Array.isArray(DATA.SERVICE_AREAS)) {
    DATA.SERVICE_AREAS.forEach(function (tier) {
      var card = document.createElement('div');
      card.className = 'service-area-tier';
      var tagsHtml = (tier.areas || []).map(function (a) { return '<span>' + a + '</span>'; }).join('');
      card.innerHTML =
        '<span class="service-area-tier-name">' + tier.tier + '</span>' +
        '<h3>' + tier.label + '</h3>' +
        '<div class="service-area-tags">' + tagsHtml + '</div>';
      serviceAreaEl.appendChild(card);
    });
  }

  /* ---------- Render: Group lesson price table ---------- */
  var priceTableEl = document.getElementById('groupPriceTable');
  if (priceTableEl) {
    var basePrice = Number(CONFIG.BASE_LESSON_PRICE) || 0;
    var multipliers = CONFIG.GROUP_PRICING_MULTIPLIERS || { 1: 1, 2: 1.2, 3: 1.4, 4: 1.6 };
    [1, 2, 3, 4].forEach(function (size) {
      var m = multipliers[size] || 1;
      var row = document.createElement('div');
      row.className = 'price-row';
      var valueText;
      if (basePrice > 0) {
        var perStudent = Math.round((basePrice * m) / size);
        valueText = '1인당 약 ' + perStudent.toLocaleString('ko-KR') + '원';
      } else if (size === 1) {
        valueText = '기준 (1인 전액)';
      } else {
        valueText = '1인당 약 ' + Math.round((m / size) * 100) + '%';
      }
      row.innerHTML = '<span class="price-row-size">1:' + size + '</span><span class="price-row-value">' + valueText + '</span>';
      priceTableEl.appendChild(row);
    });
  }

  /* ---------- Render: Tutor profile cards ---------- */
  var tutorGridEl = document.getElementById('tutorGrid');
  if (tutorGridEl && Array.isArray(DATA.TEACHERS)) {
    var hasSampleTutor = DATA.TEACHERS.some(function (t) { return t.isSample; });
    var sampleTagEl = document.getElementById('tutorSampleTag');
    if (sampleTagEl) sampleTagEl.hidden = !hasSampleTutor;

    DATA.TEACHERS.forEach(function (t) {
      var card = document.createElement('div');
      card.className = 'tutor-card';
      var specialties = (t.specialties || []).join(' · ');
      card.innerHTML =
        '<div class="tutor-card-head">' +
          '<span class="tutor-flag" aria-hidden="true">' + (t.flag || '') + '</span>' +
          '<div><p class="tutor-name">' + t.name + '</p><p class="tutor-origin">' + t.origin + '</p></div>' +
        '</div>' +
        '<dl class="tutor-detail">' +
          '<div class="tutor-detail-row"><dt>Experience</dt><dd>' + t.experience + '</dd></div>' +
          '<div class="tutor-detail-row"><dt>Specialties</dt><dd>' + specialties + '</dd></div>' +
          '<div class="tutor-detail-row"><dt>Best With</dt><dd>' + t.bestWith + '</dd></div>' +
          '<div class="tutor-detail-row"><dt>Teaching Style</dt><dd>' + t.teachingStyle + '</dd></div>' +
        '</dl>';
      tutorGridEl.appendChild(card);
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
          (t.meta ? '<p class="testimonial-meta">' + t.meta + '</p>' : '') +
          '<p class="testimonial-text">&ldquo;' + t.quote + '&rdquo;</p>';
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

  /* ---------- Footer business + support info ---------- */
  var footerBusinessEl = document.getElementById('footerBusiness');
  if (footerBusinessEl) {
    var bizLines = [];
    bizLines.push(CONFIG.BUSINESS_NAME || '존프랩튜터링');
    if (CONFIG.BUSINESS_REG_NUMBER) bizLines.push('사업자등록번호 ' + CONFIG.BUSINESS_REG_NUMBER);
    if (CONFIG.BUSINESS_ADDRESS) bizLines.push(CONFIG.BUSINESS_ADDRESS);
    footerBusinessEl.innerHTML = '<p>' + bizLines.join(' · ') + '</p>';
  }

  var footerSupportEl = document.getElementById('footerSupport');
  if (footerSupportEl) {
    var supportRows = [];
    if (CONFIG.CONTACT_PHONE) supportRows.push('<p class="footer-phone-row">Phone &middot; <a href="tel:' + CONFIG.CONTACT_PHONE.replace(/[^0-9+]/g, '') + '" data-track="phone_click" data-track-label="footer">' + CONFIG.CONTACT_PHONE + '</a></p>');
    if (CONFIG.BUSINESS_EMAIL) supportRows.push('<p>이메일 ' + CONFIG.BUSINESS_EMAIL + '</p>');
    if (CONFIG.BUSINESS_HOURS) supportRows.push('<p>운영시간 ' + CONFIG.BUSINESS_HOURS + '</p>');
    if (supportRows.length) {
      footerSupportEl.innerHTML = '<p class="footer-support-title">Contact</p>' + supportRows.join('');
      var footerPhoneLink = footerSupportEl.querySelector('[data-track="phone_click"]');
      if (footerPhoneLink) footerPhoneLink.addEventListener('click', function () { track('phone_click', { label: 'footer' }); });
    } else {
      footerSupportEl.remove();
    }
  }

  /* =====================================================================
     Tutor Matching Request Form — 5-step wizard
     ===================================================================== */
  var matchingForm = document.getElementById('matchingForm');
  if (matchingForm) {
    function fillSelect(selectEl, options, placeholder) {
      if (!selectEl || !Array.isArray(options)) return;
      var ph = document.createElement('option');
      ph.value = '';
      ph.textContent = placeholder;
      ph.disabled = true;
      ph.selected = true;
      selectEl.appendChild(ph);
      options.forEach(function (opt) {
        var o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        selectEl.appendChild(o);
      });
    }

    function renderChoiceGroup(container, options, name, type, required) {
      if (!container || !Array.isArray(options)) return;
      options.forEach(function (opt, i) {
        var isObj = typeof opt === 'object';
        var value = isObj ? opt.value : opt;
        var desc = isObj ? opt.desc : null;
        var wrap = document.createElement('label');
        wrap.className = 'choice-pill';
        var input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.value = value;
        input.id = name + '-' + i;
        input.className = 'choice-input';
        if (required) input.required = true;
        var span = document.createElement('span');
        span.className = 'choice-label';
        span.textContent = value;
        if (desc) {
          var small = document.createElement('small');
          small.textContent = desc;
          span.appendChild(small);
        }
        wrap.appendChild(input);
        wrap.appendChild(span);
        container.appendChild(wrap);
      });
    }

    fillSelect(document.getElementById('studentAge'), FORM_OPTIONS.studentAges, '선택해주세요');
    fillSelect(document.getElementById('region'), FORM_OPTIONS.regions, '선택해주세요');
    fillSelect(document.getElementById('lessonFrequency'), FORM_OPTIONS.lessonFrequencies, '선택해주세요 (선택)');
    fillSelect(document.getElementById('lessonDuration'), FORM_OPTIONS.lessonDurations, '선택해주세요 (선택)');

    renderChoiceGroup(document.getElementById('genderGroup'), FORM_OPTIONS.genders, 'gender', 'radio', false);
    renderChoiceGroup(document.getElementById('englishLevelGroup'), FORM_OPTIONS.englishLevels, 'englishLevel', 'radio', true);
    renderChoiceGroup(document.getElementById('learningEnvGroup'), FORM_OPTIONS.learningEnvironments, 'learningEnvironments', 'checkbox', false);
    renderChoiceGroup(document.getElementById('personalityGroup'), FORM_OPTIONS.childPersonalities, 'childPersonalities', 'checkbox', false);
    renderChoiceGroup(document.getElementById('lessonInterestGroup'), FORM_OPTIONS.lessonInterests, 'lessonInterests', 'checkbox', false);
    renderChoiceGroup(document.getElementById('lessonStyleGroup'), FORM_OPTIONS.lessonStyles, 'lessonStyles', 'checkbox', false);
    renderChoiceGroup(document.getElementById('tutorCountryGroup'), FORM_OPTIONS.tutorCountries, 'tutorCountry', 'radio', false);
    renderChoiceGroup(document.getElementById('tutorGenderGroup'), FORM_OPTIONS.tutorGenders, 'tutorGender', 'radio', false);
    renderChoiceGroup(document.getElementById('tutorStyleGroup'), FORM_OPTIONS.tutorStyles, 'tutorStyles', 'checkbox', false);
    renderChoiceGroup(document.getElementById('daysGroup'), FORM_OPTIONS.weekdays, 'days', 'checkbox', false);
    renderChoiceGroup(document.getElementById('timeSlotGroup'), FORM_OPTIONS.timeSlots, 'timeSlots', 'checkbox', false);

    // Newly rendered .reveal-less content lives inside an already-visible section, but any
    // fresh .reveal ancestors added above (there are none here) would need re-observing.
    observeRevealAll();

    var renderedAtInput = document.getElementById('renderedAt');
    if (renderedAtInput) renderedAtInput.value = String(Date.now());

    var steps = Array.prototype.slice.call(matchingForm.querySelectorAll('.form-step'));
    var totalSteps = steps.length;
    var currentStep = 1;
    var prevBtn = document.getElementById('formPrevBtn');
    var nextBtn = document.getElementById('formNextBtn');
    var submitBtn = document.getElementById('formSubmitBtn');
    var progressFill = document.getElementById('formProgressFill');
    var progressWrap = document.getElementById('formProgress');
    var stepCurrentLabel = document.getElementById('formStepCurrent');
    var formNoteEl = document.getElementById('formNote');
    var formErrorEl = document.getElementById('formError');
    var formThankYou = document.getElementById('formThankYou');

    function showStep(n, scroll) {
      steps.forEach(function (s) {
        s.classList.toggle('is-active', Number(s.getAttribute('data-step')) === n);
      });
      progressFill.style.width = Math.round((n / totalSteps) * 100) + '%';
      stepCurrentLabel.textContent = String(n);
      prevBtn.hidden = n === 1;
      nextBtn.hidden = n === totalSteps;
      submitBtn.hidden = n !== totalSteps;
      if (scroll) progressWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validateStep(n) {
      var stepEl = steps[n - 1];
      var requiredEls = stepEl.querySelectorAll('[required]');
      var checkedRadioNames = {};
      for (var i = 0; i < requiredEls.length; i++) {
        var el = requiredEls[i];
        if (el.type === 'radio') {
          if (checkedRadioNames[el.name]) continue;
          checkedRadioNames[el.name] = true;
          var group = stepEl.querySelectorAll('input[name="' + el.name + '"]');
          var anyChecked = Array.prototype.some.call(group, function (r) { return r.checked; });
          if (!anyChecked) { el.reportValidity(); return false; }
        } else if (el.type === 'checkbox') {
          if (!el.checked) { el.reportValidity(); return false; }
        } else if (!el.checkValidity()) {
          el.reportValidity();
          return false;
        }
      }
      return true;
    }

    nextBtn.addEventListener('click', function () {
      if (!validateStep(currentStep)) return;
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep, true);
      }
    });
    prevBtn.addEventListener('click', function () {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep, true);
      }
    });

    showStep(1, false);

    var startTracked = false;
    matchingForm.addEventListener('focusin', function () {
      if (!startTracked) { startTracked = true; track('consultation_form_start', {}); }
    });

    var MULTI_FIELDS = ['learningEnvironments', 'childPersonalities', 'lessonInterests', 'lessonStyles', 'tutorStyles', 'days', 'timeSlots'];

    function collectFormData() {
      var fd = new FormData(matchingForm);
      var obj = {};
      MULTI_FIELDS.forEach(function (f) { obj[f] = []; });
      fd.forEach(function (value, key) {
        if (MULTI_FIELDS.indexOf(key) !== -1) obj[key].push(value);
        else obj[key] = value;
      });
      obj.consent = !!document.getElementById('consent').checked;
      obj.marketingOptIn = !!document.getElementById('marketingOptIn').checked;
      return obj;
    }

    function submitToApi(payload) {
      return fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) return false;
        return res.json().then(function (data) { return !!(data && data.ok); }).catch(function () { return false; });
      }).catch(function () { return false; });
    }

    function submitToFormspreeFallback(payload) {
      var action = (CONFIG.CONSULTATION_FORM_ACTION || '').trim();
      if (!action || action.indexOf('YOUR_FORM_ID') !== -1) return Promise.resolve(false);
      var fd = new FormData();
      fd.append('학부모 성함', payload.parentName || '');
      fd.append('연락처', payload.phone || '');
      fd.append('이메일', payload.email || '');
      fd.append('아이 나이', payload.studentAge || '');
      fd.append('아이 성별', payload.gender || '');
      fd.append('현재 영어 수준', payload.englishLevel || '');
      fd.append('현재 영어 환경', (payload.learningEnvironments || []).join(', '));
      fd.append('아이 성향', (payload.childPersonalities || []).join(', '));
      fd.append('희망 지역', [payload.region, payload.district].filter(Boolean).join(' '));
      fd.append('아파트/주거지역', payload.apartment || '');
      fd.append('희망 수업', (payload.lessonInterests || []).join(', '));
      fd.append('희망 스타일', (payload.lessonStyles || []).join(', '));
      fd.append('수업 횟수', payload.lessonFrequency || '');
      fd.append('수업 시간', payload.lessonDuration || '');
      fd.append('가능 요일', (payload.days || []).join(', '));
      fd.append('희망 시간대', (payload.timeSlots || []).join(', '));
      fd.append('시간 직접입력', payload.scheduleNote || '');
      fd.append('선호 국가', payload.tutorCountry || '');
      fd.append('선호 성별', payload.tutorGender || '');
      fd.append('선호 스타일', (payload.tutorStyles || []).join(', '));
      fd.append('상담 요청사항', payload.message || '');
      fd.append('마케팅 수신 동의', payload.marketingOptIn ? '동의' : '비동의');

      return fetch(action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd })
        .then(function (res) { return res.ok; })
        .catch(function () { return false; });
    }

    function onSubmitSuccess() {
      track('consultation_form_submit', {});
      matchingForm.hidden = true;
      progressWrap.hidden = true;
      formThankYou.hidden = false;
      formThankYou.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function onSubmitFailure() {
      submitBtn.disabled = false;
      formErrorEl.hidden = false;
      formErrorEl.textContent = '죄송합니다. 상담 신청 접수 중 문제가 발생했습니다. ' +
        (phone ? '전화(' + phone + ') ' : '') + '또는 문자로 직접 문의해주시면 빠르게 도와드리겠습니다.';
      formErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    matchingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep(totalSteps)) return;

      var honeypotVal = document.getElementById('companyHoneypot').value;
      if (honeypotVal) { onSubmitSuccess(); return; } // silent bot trap

      submitBtn.disabled = true;
      formErrorEl.hidden = true;
      formNoteEl.hidden = true;

      var payload = collectFormData();

      submitToApi(payload).then(function (ok) {
        if (ok) { onSubmitSuccess(); return; }
        return submitToFormspreeFallback(payload).then(function (ok2) {
          if (ok2) onSubmitSuccess();
          else onSubmitFailure();
        });
      }).catch(function () {
        submitToFormspreeFallback(payload).then(function (ok2) {
          if (ok2) onSubmitSuccess();
          else onSubmitFailure();
        });
      });
    });
  }

  /* ---------- Kick off reveal observation for statically-present elements ---------- */
  observeRevealAll();
})();
