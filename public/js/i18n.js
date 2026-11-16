/**
 * Suyog Constructions — i18n.js
 * Marathi (मराठी) and English language switcher with localStorage persistence
 */
(function () {
  'use strict';

  const translations = {
    en: {
      // Navbar
      nav_home: 'Home',
      nav_about: 'About Us',
      nav_services: 'Services',
      nav_projects: 'Projects',
      nav_estimator: 'Cost Estimator',
      nav_contact: 'Contact',
      nav_quote: 'Get a Quote',
      lang_btn_text: 'मराठी',

      // Hero
      hero_badge: 'Trusted Since 1992 · 30+ Years of Excellence',
      hero_title_1: 'Building Dreams,',
      hero_title_2: 'Crafting Excellence',
      hero_desc: 'Suyog Constructions delivers premium residential, commercial, and renovation projects with unmatched quality, transparent pricing, and on-time delivery across Solapur.',
      hero_cta_start: '🏗️ Start Your Project',
      hero_cta_portfolio: 'View Our Portfolio',
      trust_clients: 'Happy Clients across Solapur',
      trust_projects: 'Projects Done',
      trust_experience: 'Years Experience',
      trust_satisfaction: 'Client Satisfaction',

      // Services section
      services_tag: 'What We Do',
      services_title: 'End-to-End <span>Construction Services</span>',
      services_subtitle: 'From foundation to finishing, we bring decades of civil engineering expertise to every square foot.',
      service_res_title: 'Residential Construction',
      service_res_desc: 'Custom bungalows, multi-storey villas, and luxury apartments built to the highest seismic and structural standards.',
      service_comm_title: 'Commercial Construction',
      service_comm_desc: 'Commercial complexes, retail spaces, and office towers designed for durability, maximum utility, and aesthetics.',
      service_renov_title: 'Renovation & Remodeling',
      service_renov_desc: 'Complete structural strengthening, elevation redesign, and modern architectural transformation for older homes.',
      service_interior_title: 'Turnkey Interior Design',
      service_interior_desc: 'Complete bespoke interior finishing, false ceiling, premium lighting, modular woodwork, and stone cladding.',

      // Cost Estimator
      est_tag: 'Interactive Calculator',
      est_title: 'Instant Construction <span>Cost Estimator</span>',
      est_subtitle: 'Estimate your building project budget in Solapur in seconds with transparent pricing.',
      est_type_label: '1. Select Project Type',
      est_type_res: '🏠 Residential Bungalow',
      est_type_comm: '🏢 Commercial Complex',
      est_type_renov: '🔨 Renovation / Remodeling',
      est_type_int: '🎨 Interior Finishing',
      est_area_label: '2. Total Built-up Area (Sq.Ft)',
      est_area_hint: 'Move slider or enter exact square footage',
      est_floors_label: '3. Number of Floors',
      est_floor_g: 'G (Ground only)',
      est_floor_g1: 'G + 1 (2 Floors)',
      est_floor_g2: 'G + 2 (3 Floors)',
      est_floor_g3: 'G + 3+ (4+ Floors)',
      est_quality_label: '4. Material & Quality Package',
      est_tier_std_title: 'Standard',
      est_tier_std_desc: 'Branded TMT steel, Ultratech cement, quality 2x2 vitrified tiles, standard fixtures',
      est_tier_prem_title: 'Premium (Most Popular)',
      est_tier_prem_desc: 'Top-grade steel/cement, Italian look tiles, teak wood door frames, branded CP fittings',
      est_tier_lux_title: 'Luxury / High-End',
      est_tier_lux_desc: 'Italian marble, smart automation wiring, luxury stone facade, designer architectural finishes',
      est_result_title: 'Estimated Budget Range',
      est_rate_title: 'Average Rate',
      est_breakdown_title: 'Estimated Cost Distribution',
      est_bd_civil: 'Civil & RCC Framing (50%)',
      est_bd_flooring: 'Tiles & Flooring (15%)',
      est_bd_mep: 'Plumbing & Electrical (12%)',
      est_bd_doors: 'Doors, Windows & Paint (15%)',
      est_bd_finish: 'Fixtures & Miscellaneous (8%)',
      est_btn_whatsapp: '💬 Send Estimate to WhatsApp',
      est_btn_quote: '📋 Get Official Detailed Quotation',
      est_disclaimer: '*Disclaimer: This is an estimated price guide based on Solapur market rates. Final price depends on soil condition, exact architectural drawings, and customized material selection.',

      // Featured Projects
      projects_tag: 'Our Work',
      projects_title: 'Featured <span>Projects</span>',
      projects_subtitle: 'A glimpse of our finest construction work across Solapur.',
      projects_view_all: 'View All Projects →',

      // CTA & Footer
      cta_tag: 'Start a Project',
      cta_title: "Ready to Build Your <span>Dream Space?</span>",
      cta_desc: 'Schedule a free on-site consultation with our senior civil engineers in Solapur.',
      cta_btn: '🏗️ Get Free Consultation',
      footer_desc: 'Building dreams and crafting architectural excellence for over 30 years in Solapur, Maharashtra.',
      footer_contact_title: 'Contact Us',
      footer_address: 'Daji Peth, Solapur, Maharashtra',
    },

    mr: {
      // Navbar
      nav_home: 'मुख्यपृष्ठ',
      nav_about: 'आमच्याबद्दल',
      nav_services: 'सेवा',
      nav_projects: 'प्रकल्प',
      nav_estimator: 'खर्च गणक',
      nav_contact: 'संपर्क',
      nav_quote: 'कोटेशन मिळवा',
      lang_btn_text: 'English',

      // Hero
      hero_badge: '१९९२ पासून विश्वासू · ३०+ वर्षांचा समृद्ध अनुभव',
      hero_title_1: 'स्वप्नपूर्तीचे घर, ',
      hero_title_2: 'उत्कृष्टतेची निर्मिती',
      hero_desc: 'सुयोग कन्स्ट्रक्शन्स — सोलापूरमध्ये सर्वोत्तम गुणवत्ता, पारदर्शक दर आणि वेळेवर पूर्ततेसह निवासी, व्यावसायिक आणि नूतनीकरण बांधकाम सेवा देणारे अग्रगण्य नाव.',
      hero_cta_start: '🏗️ बांधकाम सुरू करा',
      hero_cta_portfolio: 'प्रकल्प पहा',
      trust_clients: 'सोलापूरमधील समाधानी ग्राहक',
      trust_projects: 'पूर्ण झालेले प्रकल्प',
      trust_experience: 'वर्षांचा अनुभव',
      trust_satisfaction: 'ग्राहक समाधान',

      // Services section
      services_tag: 'आमच्या सेवा',
      services_title: 'सर्वसमावेशक <span>बांधकाम सेवा</span>',
      services_subtitle: 'पायाभरणीपासून ते गृहप्रवेशापर्यंत, प्रत्येक चौरस फुटावर तीन दशकांचे सिव्हिल इंजिनिअरिंग कौशल्य.',
      service_res_title: 'निवासी बांधकाम (Residential)',
      service_res_desc: 'आलिशान बंगले, रो-हाऊस आणि आधुनिक अपार्टमेंट्सचे मजबूत भूकंपरोधक व दर्जेदार बांधकाम.',
      service_comm_title: 'व्यावसायिक संकुल (Commercial)',
      service_comm_desc: 'दुकान, ऑफिस आणि व्यापारी इमारतींसाठी टिकाऊ, आधुनिक आणि आकर्षक व्यावसायिक संकुले.',
      service_renov_title: 'घर नूतनीकरण (Renovation)',
      service_renov_desc: 'जुन्या घरांची स्ट्रक्चरल मजबुती, आधुनिक एलिव्हेशन आणि नवीन लुकसह संपूर्ण कायापालट.',
      service_interior_title: 'इंटिरिअर डिझाइन (Interior)',
      service_interior_desc: 'पॉप/फॉल्स सिलिंग, आकर्षक लाइटिंग, मॉड्युलर किचन, लाकडी काम आणि मार्बल फिनिशिंग.',

      // Cost Estimator
      est_tag: 'खर्च अंदाज गणक',
      est_title: 'बांधकाम खर्च <span>अंदाज मिळवा</span>',
      est_subtitle: 'आपल्या नवीन घराचा किंवा व्यावसायिक इमारतीचा अंदाजे खर्च काही सेकंदांत जाणून घ्या.',
      est_type_label: '१. प्रकल्प प्रकार निवडा',
      est_type_res: '🏠 निवासी बंगला / घर',
      est_type_comm: '🏢 व्यावसायिक संकुल',
      est_type_renov: '🔨 घर नूतनीकरण',
      est_type_int: '🎨 इंटिरिअर काम',
      est_area_label: '२. एकूण बांधकाम क्षेत्र (चौरस फूट / Sq.Ft)',
      est_area_hint: 'स्लायडर हलवा किंवा अचूक चौरस फूट लिहा',
      est_floors_label: '३. मजले (Floors)',
      est_floor_g: 'फक्त तळमजला (Ground)',
      est_floor_g1: 'तळमजला + १ मजला (G + 1)',
      est_floor_g2: 'तळमजला + २ मजले (G + 2)',
      est_floor_g3: 'तळमजला + ३+ मजले (G + 3+)',
      est_quality_label: '४. मटेरियल व गुणवत्ता पॅकेज',
      est_tier_std_title: 'स्टँडर्ड (Standard)',
      est_tier_std_desc: 'ब्रँडेड टीएमटी स्टील, अल्ट्राटेक सिमेंट, २x२ विट्रिफाईड टाईल्स, दर्जेदार फिटिंग्स',
      est_tier_prem_title: 'प्रीमियम (सर्वाधिक पसंती)',
      est_tier_prem_desc: 'टॉप ब्रँडेड सिमेंट/स्टील, इटालियन फिनिश टाईल्स, सागवानी लाकूड, ब्रँडेड प्लंबिंग',
      est_tier_lux_title: 'लक्झरी (Luxury)',
      est_tier_lux_desc: 'इटालियन मार्बल, स्मार्ट होम वायरिंग, नैसर्गिक दगडी एलिव्हेशन, हाय-एंड डिझाइन',
      est_result_title: 'अंदाजे एकूण बांधकाम खर्च',
      est_rate_title: 'सरासरी दर',
      est_breakdown_title: 'खर्चाची संभाव्य विभागणी',
      est_bd_civil: 'आरसीसी स्ट्रक्चर व बांधकाम (५०%)',
      est_bd_flooring: 'टाईल्स व फ्लोअरिंग (१५%)',
      est_bd_mep: 'प्लंबिंग व वायरिंग (१२%)',
      est_bd_doors: 'दरवाजे, खिडक्या व रंगकाम (१५%)',
      est_bd_finish: 'फिटिंग्स व इतर कामे (८%)',
      est_btn_whatsapp: '💬 व्हॉट्सअ‍ॅपवर हा अंदाज पाठवा',
      est_btn_quote: '📋 प्रत्यक्ष साईट व्हिजिट व कोटेशन',
      est_disclaimer: '*टीप: हा सोलापूर मार्केट दरावर आधारित अंदाजे खर्च आहे. प्रत्यक्ष दर जागेची माती, डिझाइन आणि साहित्याच्या निवडीनुसार बदलू शकतात.',

      // Featured Projects
      projects_tag: 'आमचे काम',
      projects_title: 'प्रमुख <span>प्रकल्प</span>',
      projects_subtitle: 'सोलापूर आणि परिसरातील आमच्या दर्जेदार बांधकामांची झलक.',
      projects_view_all: 'सर्व प्रकल्प पहा →',

      // CTA & Footer
      cta_tag: 'बांधकाम सुरू करा',
      cta_title: 'आपले <span>स्वप्नातील घर</span> साकारण्यास तयार आहात?',
      cta_desc: 'सोलापूरमधील आमच्या वरिष्ठ सिव्हिल इंजिनिअर्ससोबत मोफत साईट कन्सल्टेशनसाठी संपर्क साधा.',
      cta_btn: '🏗️ मोफत कन्सल्टेशन मिळवा',
      footer_desc: 'सोलापूरमध्ये ३० हून अधिक वर्षांपासून विश्वासू आणि दर्जेदार बांधकाम सेवा.',
      footer_contact_title: 'संपर्क',
      footer_address: 'दाजी पेठ, सोलापूर, महाराष्ट्र',
    }
  };

  let currentLang = localStorage.getItem('suyog_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('suyog_lang', lang);
    document.documentElement.lang = lang;

    const dict = translations[lang] || translations.en;

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        // If element contains HTML (like <span>), use innerHTML, else textContent
        if (dict[key].includes('<')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.placeholder = dict[key];
    });

    // Update switcher button text
    document.querySelectorAll('.lang-btn-text').forEach(btn => {
      btn.textContent = dict.lang_btn_text;
    });

    // Dispatch custom event for dynamic components (like cost estimator)
    window.dispatchEvent(new CustomEvent('suyog_lang_changed', { detail: { lang } }));
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'en' ? 'mr' : 'en';
    applyLanguage(nextLang);
  }

  // Expose globally
  window.SuyogI18n = {
    getLang: () => currentLang,
    setLang: applyLanguage,
    toggle: toggleLanguage,
    t: (key) => (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key
  };

  // Bind to buttons when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);

    document.querySelectorAll('.lang-switch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLanguage();
      });
    });
  });

})();