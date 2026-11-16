/**
 * Suyog Constructions — estimator.js
 * Instant Construction Cost Estimator for Solapur & Maharashtra region
 */
(function () {
  'use strict';

  // Base rates per sq.ft in INR
  const RATES = {
    residential: {
      standard: { min: 1650, max: 1850, avg: 1750 },
      premium:  { min: 2050, max: 2350, avg: 2200 },
      luxury:   { min: 2600, max: 3200, avg: 2900 }
    },
    commercial: {
      standard: { min: 1800, max: 2100, avg: 1950 },
      premium:  { min: 2300, max: 2700, avg: 2500 },
      luxury:   { min: 2900, max: 3600, avg: 3250 }
    },
    renovation: {
      standard: { min: 800,  max: 1050, avg: 925 },
      premium:  { min: 1200, max: 1600, avg: 1400 },
      luxury:   { min: 1700, max: 2300, avg: 2000 }
    },
    interior: {
      standard: { min: 950,  max: 1250, avg: 1100 },
      premium:  { min: 1450, max: 1950, avg: 1700 },
      luxury:   { min: 2200, max: 3100, avg: 2650 }
    }
  };

  const FLOOR_FACTORS = {
    g:   1.00,
    g1:  1.02,
    g2:  1.05,
    g3:  1.08
  };

  const TYPE_NAMES = {
    en: {
      residential: 'Residential Bungalow / House',
      commercial:  'Commercial Complex',
      renovation:  'Home Renovation / Remodeling',
      interior:    'Interior Design & Finishing'
    },
    mr: {
      residential: 'निवासी बंगला / घर',
      commercial:  'व्यावसायिक संकुल',
      renovation:  'घर नूतनीकरण',
      interior:    'इंटिरिअर डिझाइन'
    }
  };

  const TIER_NAMES = {
    en: { standard: 'Standard Package', premium: 'Premium Package', luxury: 'Luxury Package' },
    mr: { standard: 'स्टँडर्ड पॅकेज', premium: 'प्रीमियम पॅकेज', luxury: 'लक्झरी पॅकेज' }
  };

  const FLOOR_NAMES = {
    en: { g: 'Ground Floor only', g1: 'Ground + 1 Floor', g2: 'Ground + 2 Floors', g3: 'Ground + 3+ Floors' },
    mr: { g: 'फक्त तळमजला', g1: 'तळमजला + १ मजला', g2: 'तळमजला + २ मजले', g3: 'तळमजला + ३+ मजले' }
  };

  // State
  let state = {
    type: 'residential',
    area: 1500,
    floors: 'g1',
    tier: 'premium'
  };

  function formatIndianCurrency(amount, lang = 'en') {
    if (amount >= 10000000) {
      const cr = (amount / 10000000).toFixed(2);
      return lang === 'mr' ? `₹ ${cr} कोटी` : `₹ ${cr} Cr`;
    }
    const lk = (amount / 100000).toFixed(2);
    return lang === 'mr' ? `₹ ${lk} लाख` : `₹ ${lk} Lakhs`;
  }

  function calculate() {
    const rateData = RATES[state.type][state.tier];
    const floorFactor = FLOOR_FACTORS[state.floors] || 1.0;

    const minRate = Math.round(rateData.min * floorFactor);
    const maxRate = Math.round(rateData.max * floorFactor);
    const avgRate = Math.round(rateData.avg * floorFactor);

    const minCost = state.area * minRate;
    const maxCost = state.area * maxRate;
    const totalAvg = state.area * avgRate;

    const breakdown = {
      civil: Math.round(totalAvg * 0.50),
      flooring: Math.round(totalAvg * 0.15),
      mep: Math.round(totalAvg * 0.12),
      doors: Math.round(totalAvg * 0.15),
      finish: Math.round(totalAvg * 0.08)
    };

    return { minCost, maxCost, totalAvg, avgRate, breakdown };
  }

  function render() {
    const lang = (window.SuyogI18n && window.SuyogI18n.getLang()) || 'en';
    const result = calculate();

    // Elements
    const costRangeEl = document.getElementById('est-cost-range');
    const avgRateEl   = document.getElementById('est-avg-rate');
    const bdCivilEl   = document.getElementById('est-bd-civil-val');
    const bdFloorEl   = document.getElementById('est-bd-floor-val');
    const bdMepEl     = document.getElementById('est-bd-mep-val');
    const bdDoorsEl   = document.getElementById('est-bd-doors-val');
    const bdFinishEl  = document.getElementById('est-bd-finish-val');
    const whatsappBtn = document.getElementById('est-whatsapp-share');

    if (costRangeEl) {
      costRangeEl.textContent = `${formatIndianCurrency(result.minCost, lang)} – ${formatIndianCurrency(result.maxCost, lang)}`;
    }

    if (avgRateEl) {
      avgRateEl.textContent = `₹ ${result.avgRate.toLocaleString('en-IN')} / sq.ft`;
    }

    if (bdCivilEl)  bdCivilEl.textContent  = formatIndianCurrency(result.breakdown.civil, lang);
    if (bdFloorEl)  bdFloorEl.textContent  = formatIndianCurrency(result.breakdown.flooring, lang);
    if (bdMepEl)    bdMepEl.textContent    = formatIndianCurrency(result.breakdown.mep, lang);
    if (bdDoorsEl)  bdDoorsEl.textContent  = formatIndianCurrency(result.breakdown.doors, lang);
    if (bdFinishEl) bdFinishEl.textContent = formatIndianCurrency(result.breakdown.finish, lang);

    // Update WhatsApp link
    if (whatsappBtn) {
      const typeText = TYPE_NAMES[lang][state.type];
      const tierText = TIER_NAMES[lang][state.tier];
      const floorText = FLOOR_NAMES[lang][state.floors];
      const rangeText = `${formatIndianCurrency(result.minCost, lang)} - ${formatIndianCurrency(result.maxCost, lang)}`;

      const message = lang === 'mr'
        ? `नमस्कार सुयोग कन्स्ट्रक्शन्स! मी वेबसाईटवर बांधकाम खर्चाचा अंदाज काढला आहे:%0A` +
          `• प्रकल्प: ${typeText}%0A` +
          `• क्षेत्रफळ: ${state.area} sq.ft%0A` +
          `• मजले: ${floorText}%0A` +
          `• पॅकेज: ${tierText}%0A` +
          `• अंदाजे खर्च: ${rangeText}%0A%0A` +
          `कृपया या संदर्भात अधिक माहिती व प्रत्यक्ष कोटेशन मिळावे ही विनंती.`
        : `Hello Suyog Constructions! I just estimated my project cost on your website:%0A` +
          `• Project Type: ${typeText}%0A` +
          `• Built-up Area: ${state.area.toLocaleString()} sq.ft%0A` +
          `• Floors: ${floorText}%0A` +
          `• Package: ${tierText}%0A` +
          `• Estimated Budget: ${rangeText}%0A%0A` +
          `I would like to discuss this and get an official quotation.`;

      whatsappBtn.href = `https://wa.me/919422458982?text=${message}`;
    }
  }

  function init() {
    const areaSlider = document.getElementById('est-area-slider');
    const areaInput  = document.getElementById('est-area-input');

    if (!areaSlider || !areaInput) return;

    // Type selector buttons
    document.querySelectorAll('.est-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.est-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.type = btn.dataset.type;
        render();
      });
    });

    // Floor radio buttons
    document.querySelectorAll('input[name="est-floors"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.floors = e.target.value;
        render();
      });
    });

    // Tier cards
    document.querySelectorAll('.est-tier-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.est-tier-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.tier = card.dataset.tier;
        render();
      });
    });

    // Area slider & input sync
    areaSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 500;
      state.area = val;
      areaInput.value = val;
      render();
    });

    areaInput.addEventListener('input', (e) => {
      let val = parseInt(e.target.value) || 500;
      if (val < 200) val = 200;
      if (val > 50000) val = 50000;
      state.area = val;
      areaSlider.value = Math.min(val, 15000);
      render();
    });

    // Re-render when language toggles
    window.addEventListener('suyog_lang_changed', () => {
      render();
    });

    // Initial render
    render();
  }

  document.addEventListener('DOMContentLoaded', init);

})();