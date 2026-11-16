/**
 * Suyog Constructions — i18n.js
 * Comprehensive Marathi (मराठी) and English Language Engine
 * Supports [data-i18n] keys, automatic phrase dictionary matching across all pages,
 * and real-time translation of dynamic elements (projects, cards, marquee, estimator).
 */
(function () {
  'use strict';

  // ── Explicit Key Dictionaries ──────────────────────────────────────────────
  const translations = {
    en: {
      // Navbar & Global
      nav_home: 'Home',
      nav_about: 'About Us',
      nav_services: 'Services',
      nav_projects: 'Projects',
      nav_estimator: 'Cost Estimator',
      nav_contact: 'Contact',
      nav_quote: 'Get a Quote',
      lang_btn_text: 'मराठी',

      // Hero Section (Homepage)
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

      // Floating Badges & Marquee
      badge_award_strong: 'Award Winning',
      badge_award_sub: 'Construction Company',
      badge_clients_strong: '500+ Happy Clients',
      badge_clients_sub: 'Across Solapur',
      marquee_1: '500+ Projects Completed',
      marquee_2: 'ISO Certified Quality',
      marquee_3: '98% On-Time Delivery',
      marquee_4: 'Residential Excellence',
      marquee_5: 'Commercial Construction',
      marquee_6: 'Expert Renovation',
      marquee_7: '50+ Expert Professionals',
      marquee_8: 'Serving All of Solapur',
      marquee_9: 'Transparent Pricing',
      marquee_10: 'Premium Interior Design',

      // Services Preview
      services_tag: 'What We Build',
      services_title: 'Our <span>Construction</span> Services',
      services_subtitle: 'From concept to completion, we offer comprehensive construction services tailored to your vision and requirements.',
      service_res_title: 'Residential Construction',
      service_res_desc: 'Custom bungalows, villas, apartments, and townships built to your exact specifications with premium quality materials.',
      service_comm_title: 'Commercial Construction',
      service_comm_desc: 'State-of-the-art office buildings, retail spaces, hotels, and industrial facilities delivered on time and within budget.',
      service_renov_title: 'Renovation & Remodeling',
      service_renov_desc: 'Transform your existing spaces with expert renovation services — from complete overhauls to targeted improvements.',
      service_interior_title: 'Interior Design',
      service_interior_desc: 'Elevate your interiors with our design and execution expertise, from luxurious residential spaces to premium commercial interiors.',
      services_view_all: 'Explore All Services →',

      // Why Choose Us / Stats
      why_tag: 'Why Choose Us',
      why_title: 'A Legacy of <span>Trust</span> & Quality Construction',
      why_desc: "For over 30 years, Suyog Constructions has been turning architectural visions into reality. Our commitment to quality, transparency, and client satisfaction has made us one of Solapur's most trusted construction companies.",
      why_f1_title: 'ISO Certified Quality Standards',
      why_f1_desc: 'Every project meets international quality benchmarks',
      why_f2_title: 'On-Time Delivery Guarantee',
      why_f2_desc: '98% of our projects delivered within agreed timelines',
      why_f3_title: 'Transparent Pricing',
      why_f3_desc: 'No hidden costs — detailed quotations from day one',
      stat_projects: 'Projects Completed',
      stat_years: 'Years of Experience',
      stat_pros: 'Expert Professionals',
      stat_satisfaction: 'Client Satisfaction',

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
      projects_tag: 'Our Portfolio',
      projects_title: 'Featured <span>Projects</span>',
      projects_subtitle: 'A glimpse of our finest work — each project a testament to our commitment to quality and craftsmanship.',
      projects_view_all: 'View All Projects →',

      // Projects Page
      proj_hero_title: 'Our <span>Project Portfolio</span>',
      proj_hero_sub: '1000+ completed projects across Solapur — each one a story of quality and craftsmanship.',
      proj_work_tag: 'Our Work',
      proj_main_title: 'Completed &amp; <span>Ongoing Projects</span>',
      proj_sub: 'Filter by category to explore our diverse portfolio of construction projects.',
      filter_all: '🏛️ All Projects',
      filter_res: '🏠 Residential',
      filter_comm: '🏢 Commercial',
      filter_renov: '🔨 Renovation',
      filter_int: '🎨 Interior',
      filter_ong: '🚧 Ongoing',
      proj_load_more: 'Load More Projects',

      // About Page
      about_title: 'About <span>Suyog Constructions</span>',
      about_hero_sub: 'Thirty years of building trust, quality, and extraordinary spaces across Solapur.',
      about_story_tag: 'Our Story',
      about_story_title: 'From Foundation to <span class="text-accent">Legacy</span>',
      about_start_btn: 'Start Your Project →',
      about_purpose_tag: 'Our Purpose',
      about_vision_mission_title: 'Vision &amp; <span>Mission</span>',
      about_vision_title: 'Our Vision',
      about_vision_desc: 'To be Maharashtra\'s most trusted and innovative construction company — recognized for delivering projects that combine world-class engineering, aesthetic excellence, and sustainable practices.',
      about_mission_title: 'Our Mission',
      about_mission_desc: 'To deliver construction projects that exceed client expectations through transparent communication, skilled craftsmanship, and the use of premium materials.',
      about_cap_tag: 'Our Capabilities',
      about_exp_title: 'Areas of <span>Expertise</span>',
      about_values_tag: 'Our Core Values',
      about_values_title: 'What We <span>Stand For</span>',
      val_q_title: 'Quality First',
      val_q_desc: 'We use only premium materials and proven construction techniques to ensure lasting quality in every project.',
      val_i_title: 'Integrity',
      val_i_desc: 'Transparent pricing, honest communication, and ethical business practices are at the core of everything we do.',
      val_e_title: 'Excellence',
      val_e_desc: 'We are not satisfied with good — we strive for excellence in design, execution, and after-service support.',
      val_inn_title: 'Innovation',
      val_inn_desc: 'We continuously adopt modern construction technologies and innovative solutions for better outcomes.',
      about_cta_tag: 'Work With Us',
      about_cta_title: 'Ready to Build Something <span>Extraordinary?</span>',
      about_cta_desc: 'Contact us today for a free consultation and let\'s discuss how we can bring your vision to life.',

      // Services Page
      serv_hero_title: 'Our <span>Construction Services</span>',
      serv_hero_sub: 'Comprehensive solutions from foundation to finish — designed to exceed your expectations.',
      serv_offer_tag: 'What We Offer',
      serv_main_title: 'Expert Services for <span>Every Need</span>',
      serv_sub: 'From the ground up to the final touches, we provide end-to-end construction and design services tailored to your project requirements.',
      serv_proc_tag: 'How We Work',
      serv_proc_title: 'Our Construction <span>Process</span>',
      serv_proc_sub: 'A transparent, step-by-step approach to every project we undertake.',

      // Contact Page
      contact_hero_title: 'Get In <span>Touch</span>',
      contact_hero_sub: 'We\'re ready to discuss your project. Reach us by phone, email, or WhatsApp — or fill out our inquiry form below.',
      contact_info_tag: 'Contact Information',
      contact_reach_title: 'Reach <span>Us Directly</span>',
      contact_reach_desc: 'Have a project in mind or any questions? We\'d love to hear from you. Our team is available Monday to Saturday, 5 PM to 8 PM.',
      contact_call_title: 'Call Us',
      contact_email_title: 'Email Us',
      contact_visit_title: 'Visit Our Office',
      contact_hours_title: 'Office Hours',
      contact_wa_box_title: '💬 Chat with Us on WhatsApp',
      contact_wa_box_desc: 'Prefer a quick chat? Message us on WhatsApp and we\'ll respond within minutes during business hours.',
      contact_form_title: 'Send Us a Message',
      contact_form_sub: 'Fill out this form and we\'ll get back to you within 24 hours.',
      contact_lbl_name: 'Full Name',
      contact_lbl_phone: 'Phone Number',
      contact_lbl_email: 'Email Address',
      contact_lbl_subject: 'Subject',
      contact_lbl_message: 'Message',
      contact_btn_send: 'Send Message →',
      inq_tag: 'Project Quotation',
      inq_title: 'Request a <span>Free Quote</span>',
      inq_sub: 'Tell us about your construction project and get a detailed, no-obligation quotation from our expert team.',
      inq_form_title: 'Project Inquiry Form',
      inq_form_sub: 'Fill in your project details and we\'ll prepare a tailored quotation for you.',
      inq_lbl_service: 'Service Required',
      inq_lbl_budget: 'Approximate Budget',
      inq_lbl_location: 'Project Location',
      inq_lbl_desc: 'Describe Your Project',
      inq_btn_submit: '🏗️ Submit Inquiry &amp; Request Quote',

      // Testimonials
      test_tag: 'Client Stories',
      test_title: 'What Our <span>Clients</span> Say',

      // CTA Banner
      cta_tag: 'Start Today',
      cta_title: 'Ready to Build Your <span>Dream Project?</span>',
      cta_desc: "Get in touch with our team for a free consultation and detailed quotation. Let's bring your vision to life!",
      cta_btn_quote: '🏗️ Get Free Quote',
      cta_btn_wa: '💬 WhatsApp Us',

      // Footer
      footer_desc: 'Building dreams and crafting excellence for over 30 years. Your trusted construction partner in Solapur, Maharashtra.',
      footer_quick_links: 'Quick Links',
      footer_services_title: 'Our Services',
      footer_contact_title: 'Contact Us',
      footer_address: 'Daji Peth, Solapur, Maharashtra, India',
      footer_copyright: '© 2026 Suyog Constructions. All rights reserved. Solapur, Maharashtra.',
    },

    mr: {
      // Navbar & Global
      nav_home: 'मुख्यपृष्ठ',
      nav_about: 'आमच्याबद्दल',
      nav_services: 'सेवा',
      nav_projects: 'प्रकल्प',
      nav_estimator: 'खर्च अंदाज गणक',
      nav_contact: 'संपर्क',
      nav_quote: 'कोटेशन मिळवा',
      lang_btn_text: 'English',

      // Hero Section (Homepage)
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

      // Floating Badges & Marquee
      badge_award_strong: 'पुरस्कार प्राप्त',
      badge_award_sub: 'विश्वसनीय बांधकाम कंपनी',
      badge_clients_strong: '५००+ समाधानी कुटुंबे',
      badge_clients_sub: 'सोलापूर आणि परिसरात',
      marquee_1: '५००+ यशस्वी बांधकाम प्रकल्प',
      marquee_2: 'आयएसओ प्रमाणित सर्वोच्च गुणवत्ता',
      marquee_3: '९८% वेळेवर प्रकल्प पूर्ण',
      marquee_4: 'दर्जेदार निवासी बंगले व इमारती',
      marquee_5: 'आधुनिक व्यावसायिक संकुले',
      marquee_6: 'तज्ज्ञ घर नूतनीकरण सेवा',
      marquee_7: '५०+ अनुभवी इंजिनिअर्स व कारागीर',
      marquee_8: 'संपूर्ण सोलापूरमध्ये अव्वल सेवा',
      marquee_9: '१००% पारदर्शक दर व हिशोब',
      marquee_10: 'प्रीमियम इंटिरिअर डिझाइन',

      // Services Preview
      services_tag: 'आमच्या सेवा',
      services_title: 'सर्वसमावेशक <span>बांधकाम सेवा</span>',
      services_subtitle: 'संकल्पनेपासून ते गृहप्रवेशापर्यंत, आपल्या गरजेनुसार उच्च दर्जाचे मजबूत आणि सुंदर बांधकाम.',
      service_res_title: 'निवासी बांधकाम (Residential)',
      service_res_desc: 'आलिशान बंगले, रो-हाऊस आणि आधुनिक अपार्टमेंट्सचे मजबूत भूकंपरोधक व दर्जेदार बांधकाम.',
      service_comm_title: 'व्यावसायिक संकुल (Commercial)',
      service_comm_desc: 'दुकान, ऑफिस आणि व्यापारी इमारतींसाठी टिकाऊ, आधुनिक आणि आकर्षक व्यावसायिक संकुले.',
      service_renov_title: 'घर नूतनीकरण (Renovation)',
      service_renov_desc: 'जुन्या घरांची स्ट्रक्चरल मजबुती, आधुनिक एलिव्हेशन आणि नवीन लुकसह संपूर्ण कायापालट.',
      service_interior_title: 'इंटिरिअर डिझाइन (Interior)',
      service_interior_desc: 'पॉप/फॉल्स सिलिंग, आकर्षक लाइटिंग, मॉड्युलर किचन, लाकडी काम आणि मार्बल फिनिशिंग.',
      services_view_all: 'सर्व सेवा सविस्तर पहा →',

      // Why Choose Us / Stats
      why_tag: 'आम्हालाच का निवडावे?',
      why_title: '३०+ वर्षांचा <span>विश्वास</span> आणि दर्जेदार बांधकाम',
      why_desc: 'गेल्या ३० हून अधिक वर्षांपासून सुयोग कन्स्ट्रक्शन्स सोलापूरकरांची स्वप्ने सत्यात उतरवत आहे. सचोटी, पारदर्शकता आणि अव्वल दर्जा यामुळे आम्ही सोलापूरमधील सर्वाधिक पसंतीची बांधकाम कंपनी ठरलो आहोत.',
      why_f1_title: 'आयएसओ प्रमाणित गुणवत्ता',
      why_f1_desc: 'प्रत्येक बांधकामात आंतरराष्ट्रीय गुणवत्तेच्या मानकांचे तंतोतंत पालन',
      why_f2_title: 'वेळेवर पूर्ततेची पक्की हमी',
      why_f2_desc: '९८% प्रकल्प ठरवून दिलेल्या मुदतीत ग्राहकांच्या स्वाधीन',
      why_f3_title: '१००% पारदर्शक दरपत्रक',
      why_f3_desc: 'कोणताही लपलेला खर्च नाही — पहिल्या दिवसापासून स्पष्ट आणि लेखी अंदाज',
      stat_projects: 'पूर्ण झालेले प्रकल्प',
      stat_years: 'वर्षांचा समृद्ध अनुभव',
      stat_pros: 'कुशल इंजिनिअर्स व तज्ज्ञ',
      stat_satisfaction: 'ग्राहक समाधान दर',

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

      // Projects Page
      proj_hero_title: 'आमचे <span>प्रकल्प दालन</span>',
      proj_hero_sub: 'सोलापूरमध्ये १०००+ यशस्वीरित्या पूर्ण झालेले प्रकल्प — प्रत्येक वास्तूत गुणवत्तेची साक्ष.',
      proj_work_tag: 'आमचे काम',
      proj_main_title: 'पूर्ण झालेले आणि <span>चालू प्रकल्प</span>',
      proj_sub: 'आमचे विविध बांधकाम प्रकल्प पाहण्यासाठी प्रकार निवडा.',
      filter_all: '🏛️ सर्व प्रकल्प',
      filter_res: '🏠 निवासी प्रकल्प',
      filter_comm: '🏢 व्यावसायिक',
      filter_renov: '🔨 नूतनीकरण',
      filter_int: '🎨 इंटिरिअर',
      filter_ong: '🚧 चालू प्रकल्प',
      proj_load_more: 'अधिक प्रकल्प पहा',

      // About Page
      about_title: 'सुयोग कन्स्ट्रक्शन्स <span>बद्दल</span>',
      about_hero_sub: 'सोलापूरमध्ये ३० वर्षांपासून विश्वास, गुणवत्ता आणि भव्य वास्तूंची उभारणी.',
      about_story_tag: 'आमचा प्रवास',
      about_story_title: 'पायाभरणीपासून ते <span class="text-accent">वैभवापर्यंत</span>',
      about_start_btn: 'बांधकाम सुरू करा →',
      about_purpose_tag: 'आमचे उद्दिष्ट',
      about_vision_mission_title: 'ध्येय आणि <span>उद्दिष्ट</span>',
      about_vision_title: 'आमचे ध्येय (Vision)',
      about_vision_desc: 'महाराष्ट्रातील सर्वात विश्वासू व नाविन्यपूर्ण बांधकाम कंपनी बनणे — जिथे जागतिक दर्जाचे इंजिनिअरिंग आणि सौंदर्य यांचा संगम घडतो.',
      about_mission_title: 'आमचे उद्दिष्ट (Mission)',
      about_mission_desc: 'पारदर्शक संवाद, कुशल कारागिरी आणि उच्च दर्जाचे साहित्य वापरून ग्राहकांच्या अपेक्षेपेक्षाही सरस बांधकाम वेळेत आणि बजेटमध्ये पूर्ण करणे.',
      about_cap_tag: 'आमची कार्यक्षमता',
      about_exp_title: 'आमची <span>प्रमुख कौशल्ये</span>',
      about_values_tag: 'आमची जीवनमूल्ये',
      about_values_title: 'आम्ही कशासाठी <span>बांधील आहोत?</span>',
      val_q_title: 'सर्वोच्च गुणवत्ता',
      val_q_desc: 'प्रत्येक बांधकामात फक्त प्रमाणित ब्रँडेड साहित्य व सिद्ध बांधकाम तंत्रज्ञान.',
      val_i_title: 'विश्वास व सचोटी',
      val_i_desc: 'पारदर्शक दर, प्रामाणिक संवाद आणि नैतिक व्यवसाय पद्धती आमचा पाया आहेत.',
      val_e_title: 'उत्कृष्टता',
      val_e_desc: 'फक्त चांगले नव्हे, तर डिझाइन, काम आणि सेवेत सर्वोत्तम देण्याचा आमचा ध्यास.',
      val_inn_title: 'आधुनिक तंत्रज्ञान',
      val_inn_desc: 'उत्कृष्ट परिणामांसाठी आम्ही सातत्याने नवीन तंत्रज्ञान आणि पद्धतींचा अवलंब करतो.',
      about_cta_tag: 'आमच्यासोबत काम करा',
      about_cta_title: 'काहीतरी भव्य आणि <span>चिरंतन बांधूया!</span>',
      about_cta_desc: 'मोफत कन्सल्टेशनसाठी आजच आमच्याशी संपर्क साधा आणि आपले स्वप्न सत्यात उतरवा.',

      // Services Page
      serv_hero_title: 'आमच्या <span>बांधकाम सेवा</span>',
      serv_hero_sub: 'पायाभरणीपासून गृहप्रवेशापर्यंत सर्वसमावेशक सेवा — आपल्या अपेक्षेपेक्षाही उत्तम.',
      serv_offer_tag: 'आम्ही काय देतो',
      serv_main_title: 'प्रत्येक गरजेसाठी <span>तज्ज्ञ सेवा</span>',
      serv_sub: 'पायाभरणीपासून ते गृहप्रवेशाच्या फिनिशिंगपर्यंत, आपल्या गरजेनुसार दर्जेदार बांधकाम आणि डिझाइन सेवा.',
      serv_proc_tag: 'आमची कार्यपद्धती',
      serv_proc_title: 'बांधकाम <span>प्रक्रिया</span>',
      serv_proc_sub: 'प्रत्येक प्रकल्पासाठी पारदर्शक, नियोजनबद्ध आणि टप्प्याटप्प्याने होणारी खात्रीशीर प्रक्रिया.',

      // Contact Page
      contact_hero_title: 'थेट <span>संपर्क साधा</span>',
      contact_hero_sub: 'आम्ही आपल्या प्रकल्पावर चर्चा करण्यास सज्ज आहोत. फोन, ईमेल किंवा व्हॉट्सअ‍ॅपद्वारे संपर्क साधा किंवा खालील अर्ज भरा.',
      contact_info_tag: 'संपर्क माहिती',
      contact_reach_title: 'आमच्याशी <span>थेट जोडा</span>',
      contact_reach_desc: 'बांधकामाविषयी काही शंका आहेत? आमच्याशी आजच संपर्क करा. आमची टीम सोमवार ते शनिवार, सायंकाळी ५ ते रात्री ८ उपलब्ध असते.',
      contact_call_title: 'कॉल करा',
      contact_email_title: 'ईमेल करा',
      contact_visit_title: 'कार्यालयास भेट द्या',
      contact_hours_title: 'कार्यालयीन वेळ',
      contact_wa_box_title: '💬 व्हॉट्सअ‍ॅपवर थेट चॅट करा',
      contact_wa_box_desc: 'झटपट माहिती हवी आहे? व्हॉट्सअ‍ॅपवर संदेश पाठवा, आम्ही त्वरित उत्तर देऊ.',
      contact_form_title: 'आम्हाला संदेश पाठवा',
      contact_form_sub: 'हा अर्ज भरा, आमची टीम २४ तासांत आपल्याशी संपर्क करेल.',
      contact_lbl_name: 'पूर्ण नाव',
      contact_lbl_phone: 'मोबाईल नंबर',
      contact_lbl_email: 'ईमेल पत्ता',
      contact_lbl_subject: 'विषय',
      contact_lbl_message: 'संदेश',
      contact_btn_send: 'संदेश पाठवा →',
      inq_tag: 'प्रकल्प कोटेशन',
      inq_title: 'मोफत <span>कोटेशन मिळवा</span>',
      inq_sub: 'आपल्या प्रकल्पाची माहिती द्या आणि आमच्या तज्ज्ञांकडून मोफत सविस्तर कोटेशन मिळवा.',
      inq_form_title: 'प्रकल्प चौकशी अर्ज',
      inq_form_sub: 'प्रकल्पाची माहिती भरा आणि आम्ही आपल्यासाठी सविस्तर कोटेशन तयार करू.',
      inq_lbl_service: 'आवश्यक सेवा',
      inq_lbl_budget: 'अंदाजे बजेट',
      inq_lbl_location: 'प्रकल्पाचे ठिकाण',
      inq_lbl_desc: 'प्रकल्पाचे सविस्तर वर्णन',
      inq_btn_submit: '🏗️ चौकशी अर्ज पाठवा',

      // Testimonials
      test_tag: 'ग्राहकांचे अनुभव',
      test_title: 'आमच्या <span>ग्राहकांचे</span> अभिप्राय',

      // CTA Banner
      cta_tag: 'बांधकाम सुरू करा',
      cta_title: 'आपले <span>स्वप्नातील घर</span> साकारण्यास तयार आहात?',
      cta_desc: 'सोलापूरमधील आमच्या वरिष्ठ सिव्हिल इंजिनिअर्ससोबत मोफत साईट कन्सल्टेशनसाठी संपर्क साधा.',
      cta_btn_quote: '🏗️ मोफत कोटेशन मिळवा',
      cta_btn_wa: '💬 व्हॉट्सअ‍ॅपवर बोला',

      // Footer
      footer_desc: 'सोलापूरमध्ये ३० हून अधिक वर्षांपासून विश्वासू आणि दर्जेदार बांधकाम सेवा देणारे अग्रगण्य नाव.',
      footer_quick_links: 'महत्त्वाच्या लिंक्स',
      footer_services_title: 'आमच्या सेवा',
      footer_contact_title: 'संपर्क पत्ता',
      footer_address: 'दाजी पेठ, सोलापूर, महाराष्ट्र, भारत',
      footer_copyright: '© २०२६ सुयोग कन्स्ट्रक्शन्स. सर्व हक्क राखीव. सोलापूर, महाराष्ट्र.',
    }
  };

  // ── Universal Phrase Map for Cross-Page & Dynamic Translation ───────────────
  // Translates matching text nodes anywhere on About, Services, Projects, Contact pages
  const phraseMap = [
    // Breadcrumbs & Nav
    ['Home', 'मुख्यपृष्ठ'],
    ['About Us', 'आमच्याबद्दल'],
    ['Services', 'सेवा'],
    ['Projects', 'प्रकल्प'],
    ['Portfolio', 'प्रकल्प दालन'],
    ['Cost Estimator', 'बांधकाम खर्च अंदाज'],
    ['Contact', 'संपर्क'],
    ['Contact Us', 'आमच्याशी संपर्क साधा'],
    ['Get a Quote', 'कोटेशन मिळवा'],
    ['Get a Free Quote', 'मोफत कोटेशन मिळवा'],
    ['Get Free Quote', 'मोफत कोटेशन मिळवा'],
    ['Start Your Project', 'बांधकाम सुरू करा'],
    ['Start Your Project →', 'बांधकाम सुरू करा →'],
    ['View Our Portfolio', 'प्रकल्प पहा'],
    ['View Portfolio', 'प्रकल्प पहा'],
    ['View All Projects →', 'सर्व प्रकल्प पहा →'],
    ['View Details', 'तपशील पहा'],
    ['🔍 View Photos', '🔍 फोटो पहा'],
    ['Load More Projects', 'अधिक प्रकल्प पहा'],
    ['Loading projects...', 'प्रकल्प लोड होत आहेत...'],
    ['No projects found', 'कोणतेही प्रकल्प आढळले नाहीत'],
    ['Try selecting a different category filter.', 'कृपया वेगळा प्रकार निवडून पहा.'],

    // Filters & Badges
    ['🏛️ All Projects', '🏛️ सर्व प्रकल्प'],
    ['🏠 Residential', '🏠 निवासी प्रकल्प'],
    ['🏢 Commercial', '🏢 व्यावसायिक'],
    ['🔨 Renovation', '🔨 नूतनीकरण'],
    ['🎨 Interior', '🎨 इंटिरिअर डिझाइन'],
    ['🚧 Ongoing', '🚧 चालू प्रकल्प'],
    ['Completed', 'पूर्ण'],
    ['Ongoing', 'काम सुरू'],

    // About Page Specifics
    ['About Suyog Constructions', 'सुयोग कन्स्ट्रक्शन्स बद्दल माहिती'],
    ['Thirty years of building trust, quality, and extraordinary spaces across Solapur.', 'सोलापूरमध्ये ३० वर्षांपासून विश्वास, गुणवत्ता आणि भव्य वास्तूंची उभारणी.'],
    ['Our Story', 'आमची गोष्ट'],
    ['From Foundation to Legacy', 'पायाभरणीपासून ते वैभवापर्यंत'],
    ['Our Purpose', 'आमचे उद्दिष्ट'],
    ['Vision & Mission', 'ध्येय आणि उद्दिष्ट'],
    ['Our Vision', 'आमचे ध्येय (Vision)'],
    ['Our Mission', 'आमचे उद्दिष्ट (Mission)'],
    ['Our Capabilities', 'आमची कार्यक्षमता'],
    ['Areas of Expertise', 'आमची प्रमुख कौशल्ये'],
    ['Our Core Values', 'आमची जीवनमूल्ये'],
    ['What We Stand For', 'आमची तत्त्वे'],
    ['Quality First', 'सर्वोच्च गुणवत्ता'],
    ['Integrity', 'विश्वास व प्रामाणिकपणा'],
    ['Excellence', 'उत्कृष्टता'],
    ['Innovation', 'आधुनिक तंत्रज्ञान'],
    ['Structural Engineering', 'स्ट्रक्चरल इंजिनिअरिंग'],
    ['Green Construction', 'पर्यावरणपूरक बांधकाम'],
    ['Work With Us', 'आमच्यासोबत काम करा'],
    ['Ready to Build Something Extraordinary?', 'काहीतरी भव्य आणि चिरंतन बांधण्यास तयार आहात?'],
    ["Contact us today for a free consultation and let's discuss how we can bring your vision to life.", 'मोफत कन्सल्टेशनसाठी आजच आमच्याशी संपर्क साधा आणि आपले स्वप्न सत्यात उतरवा.'],

    // Services Page Specifics
    ['Our Construction Services', 'आमच्या बांधकाम सेवा'],
    ['Comprehensive solutions from foundation to finish — designed to exceed your expectations.', 'पायाभरणीपासून गृहप्रवेशापर्यंत सर्वसमावेशक सेवा — आपल्या अपेक्षेपेक्षाही उत्तम.'],
    ['What We Offer', 'आम्ही काय देतो'],
    ['Expert Services for Every Need', 'प्रत्येक गरजेसाठी तज्ज्ञ सेवा'],
    ['Residential Construction', 'निवासी बांधकाम'],
    ['Commercial Projects', 'व्यावसायिक संकुले'],
    ['Renovation & Restoration', 'घर नूतनीकरण व डागडुजी'],
    ['Interior Design & Fit-out', 'प्रीमियम इंटिरिअर डिझाइन'],
    ['Structural Engineering Works', 'स्ट्रक्चरल व आरसीसी कामे'],
    ['Green & Sustainable Construction', 'पर्यावरणपूरक हरित बांधकाम'],
    ['Get Residential Quote →', 'निवासी कोटेशन मिळवा →'],
    ['Get Commercial Quote →', 'व्यावसायिक कोटेशन मिळवा →'],
    ['Get Renovation Quote →', 'नूतनीकरण कोटेशन मिळवा →'],
    ['Get Interior Quote →', 'इंटिरिअर कोटेशन मिळवा →'],
    ['Get Structural Quote →', 'स्ट्रक्चरल कोटेशन मिळवा →'],
    ['Get Green Quote →', 'हरित बांधकाम कोटेशन मिळवा →'],
    ['How We Work', 'आमची कार्यपद्धती'],
    ['Our Construction Process', 'बांधकाम प्रक्रिया'],
    ['A transparent, step-by-step approach to every project we undertake.', 'प्रत्येक प्रकल्पासाठी पारदर्शक आणि टप्प्याटप्प्याने केली जाणारी नियोजनबद्ध प्रक्रिया.'],
    ['Consultation', '१. सल्ला व चर्चा (Consultation)'],
    ['Design & Planning', '२. डिझाइन व प्लॅनिंग'],
    ['Quotation', '३. पारदर्शक कोटेशन'],
    ['Construction', '४. दर्जेदार बांधकाम'],
    ['Handover', '५. गृहप्रवेश व ताबा'],
    ['Tell Us About Your Project', 'आपल्या बांधकामाविषयी सांगा'],
    ['Share your construction requirements and get a detailed quotation from our experts — completely free of charge.', 'आपल्या बांधकामाची माहिती द्या आणि आमच्या तज्ज्ञांकडून मोफत सविस्तर कोटेशन मिळवा.'],
    ['Request a Quote', 'कोटेशन मिळवा'],
    ['💬 WhatsApp Us', '💬 व्हॉट्सअ‍ॅपवर संपर्क करा'],

    // Contact Page Specifics
    ['Get In Touch', 'संपर्क साधा'],
    ["We're ready to discuss your project. Reach us by phone, email, or WhatsApp — or fill out our inquiry form below.", 'आम्ही आपल्या प्रकल्पावर चर्चा करण्यास सज्ज आहोत. फोन, ईमेल किंवा व्हॉट्सअ‍ॅपद्वारे संपर्क साधा किंवा खालील अर्ज भरा.'],
    ['Contact Information', 'संपर्क माहिती'],
    ['Reach Us Directly', 'थेट संपर्क साधा'],
    ['Call Us', 'कॉल करा'],
    ['Email Us', 'ईमेल करा'],
    ['Visit Our Office', 'आमचे कार्यालय'],
    ['Office Hours', 'कार्यालयीन वेळ'],
    ['Monday — Saturday', 'सोमवार ते शनिवार'],
    ['5:00 PM — 8:00 PM IST', 'सायंकाळी ५:०० ते रात्री ८:००'],
    ['💬 Chat with Us on WhatsApp', '💬 व्हॉट्सअ‍ॅपवर थेट चॅट करा'],
    ['💬 Start WhatsApp Chat', '💬 व्हॉट्सअ‍ॅप सुरू करा'],
    ['Prefer a quick chat? Message us on WhatsApp and we\'ll respond within minutes during business hours.', 'झटपट माहिती हवी आहे? व्हॉट्सअ‍ॅपवर संदेश पाठवा, आम्ही त्वरित उत्तर देऊ.'],
    ['Send Us a Message', 'आम्हाला संदेश पाठवा'],
    ["Fill out this form and we'll get back to you within 24 hours.", 'हा अर्ज भरा, आमची टीम २४ तासांत आपल्याशी संपर्क करेल.'],
    ['Full Name', 'पूर्ण नाव'],
    ['Phone Number', 'मोबाईल नंबर'],
    ['Mobile Number', 'मोबाईल नंबर'],
    ['Email Address', 'ईमेल पत्ता'],
    ['Subject', 'विषय'],
    ['Message', 'संदेश'],
    ['Send Message →', 'संदेश पाठवा →'],
    ['Message Sent!', 'संदेश पाठवला गेला!'],
    ['Thank you for reaching out. Our team will get back to you within 24 hours.', 'संपर्क केल्याबद्दल धन्यवाद. आमची टीम २४ तासांत आपल्याशी संपर्क साधेल.'],
    ['Project Quotation', 'प्रकल्प कोटेशन'],
    ['Request a Free Quote', 'मोफत कोटेशन मिळवा'],
    ['Project Inquiry Form', 'प्रकल्प चौकशी अर्ज'],
    ['Fill in your project details and we\'ll prepare a tailored quotation for you.', 'आपल्या प्रकल्पाची माहिती भरा आणि आम्ही आपल्यासाठी सविस्तर कोटेशन तयार करू.'],
    ['Service Required', 'आवश्यक सेवा'],
    ['-- Select Service --', '-- सेवा निवडा --'],
    ['Approximate Budget', 'अंदाजे बजेट'],
    ['-- Select Budget Range --', '-- बजेट निवडा --'],
    ['Under ₹10 Lakh', '१० लाखांपेक्षा कमी'],
    ['₹10 – ₹25 Lakh', '₹१० ते ₹२५ लाख'],
    ['₹25 – ₹50 Lakh', '₹२५ ते ₹५० लाख'],
    ['₹50 Lakh – ₹1 Crore', '₹५० लाख ते ₹१ कोटी'],
    ['₹1 – ₹2 Crore', '₹१ ते ₹२ कोटी'],
    ['Above ₹2 Crore', '₹२ कोटींपेक्षा जास्त'],
    ['Project Location', 'प्रकल्पाचे ठिकाण'],
    ['Describe Your Project', 'प्रकल्पाचे सविस्तर वर्णन'],
    ['🏗️ Submit Inquiry & Request Quote', '🏗️ चौकशी अर्ज पाठवा'],
    ['Inquiry Submitted!', 'चौकशी अर्ज स्वीकारला!'],

    // Common Footer / Meta
    ['Quick Links', 'महत्त्वाच्या लिंक्स'],
    ['Our Services', 'आमच्या सेवा'],
    ['sqft', 'चौरस फूट'],
  ];

  // Build bidirectional lookup maps
  const enToMr = new Map();
  const mrToEn = new Map();
  phraseMap.forEach(([en, mr]) => {
    enToMr.set(en.trim(), mr.trim());
    mrToEn.set(mr.trim(), en.trim());
  });

  let currentLang = localStorage.getItem('suyog_lang') || 'en';

  /**
   * Translates untagged DOM elements using phraseMap
   */
  function translateDOM(lang) {
    const isMr = lang === 'mr';
    const map = isMr ? enToMr : mrToEn;

    // Elements to check
    const elements = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, span, a, button, label, option, .section-tag, .badge, .project-category, .project-view-btn, .breadcrumb span, .breadcrumb a'
    );

    elements.forEach(el => {
      // Skip if explicitly managed by data-i18n
      if (el.hasAttribute('data-i18n')) return;
      if (el.closest('#cost-estimator') && el.hasAttribute('data-type')) return;

      // Only check elements with direct text or simple children
      const text = el.textContent.trim();
      if (!text) return;

      if (isMr) {
        if (enToMr.has(text)) {
          if (!el.hasAttribute('data-orig-en')) {
            el.setAttribute('data-orig-en', text);
          }
          el.textContent = enToMr.get(text);
        }
      } else {
        // Restore English
        if (el.hasAttribute('data-orig-en')) {
          el.textContent = el.getAttribute('data-orig-en');
          el.removeAttribute('data-orig-en');
        } else if (mrToEn.has(text)) {
          el.textContent = mrToEn.get(text);
        }
      }
    });

    // Also translate placeholders
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      const ph = input.getAttribute('placeholder');
      if (!ph) return;
      if (isMr) {
        if (enToMr.has(ph)) {
          if (!input.hasAttribute('data-orig-ph')) input.setAttribute('data-orig-ph', ph);
          input.setAttribute('placeholder', enToMr.get(ph));
        }
      } else {
        if (input.hasAttribute('data-orig-ph')) {
          input.setAttribute('placeholder', input.getAttribute('data-orig-ph'));
          input.removeAttribute('data-orig-ph');
        }
      }
    });
  }

  /**
   * Applies selected language across the entire page
   */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('suyog_lang', lang);
    document.documentElement.lang = lang;

    const dict = translations[lang] || translations.en;

    // 1. Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (dict[key].includes('<')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 2. Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.placeholder = dict[key];
    });

    // 3. Update switcher button text
    document.querySelectorAll('.lang-btn-text').forEach(btn => {
      btn.textContent = dict.lang_btn_text;
    });

    // 4. Translate all common headings, buttons, and badges via phrase map
    translateDOM(lang);

    // 5. Dispatch event for interactive components (Cost Estimator, Projects, etc.)
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
    t: (key) => (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key,
    translateDOM: () => translateDOM(currentLang)
  };

  // Initialize on load
  function init() {
    applyLanguage(currentLang);

    // Bind switcher buttons
    document.querySelectorAll('.lang-switch-btn').forEach(btn => {
      btn.removeEventListener('click', toggleLanguage);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLanguage();
      });
    });

    // Auto-translate dynamic elements when they are injected (e.g. project cards)
    const observer = new MutationObserver((mutations) => {
      let shouldTranslate = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldTranslate = true;
          break;
        }
      }
      if (shouldTranslate && currentLang === 'mr') {
        translateDOM('mr');
      }
    });

    const target = document.getElementById('projects-grid') ||
                   document.getElementById('featured-projects-grid') ||
                   document.querySelector('.container');
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
