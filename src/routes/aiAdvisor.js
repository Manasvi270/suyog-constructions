const express = require('express');
const router = express.Router();
const { getDb } = require('../config/database');

// ── Solapur & Maharashtra Civil Engineering Knowledge Base ──────────────────
const KNOWLEDGE_BASE = {
  // Material multipliers per Sq.Ft (Standard IS 456 RCC Residential)
  materialRules: {
    cementBagsPerSqft: 0.42,      // ~420 bags per 1,000 sqft
    steelKgPerSqft: 4.0,           // ~4.0 kg TMT per sqft (4 MT per 1,000 sqft)
    sandCuftPerSqft: 1.85,         // ~1,850 cu.ft per 1,000 sqft
    aggregateCuftPerSqft: 1.35,    // ~1,350 cu.ft per 1,000 sqft
    bricksPerSqft: 8.5,            // ~8,500 red bricks per 1,000 sqft
  },

  rates: {
    standard: { min: 1650, max: 1850 },
    premium: { min: 1950, max: 2350 },
    luxury: { min: 2500, max: 3200 },
  },

  vastu: {
    entrance: {
      en: 'The **North (उत्तर)** and **East (पूर्व)** directions are most auspicious for the main entrance. In particular, the **North-East (ईशान्य - Ishanya)** zone invites maximum positive solar energy and prosperity.',
      mr: 'घराचे मुख्य प्रवेशद्वार **पूर्व (East)** किंवा **उत्तर (North)** दिशेला असणे अत्यंत शुभ मानले जाते. विशेषतः **ईशान्य कोपरा (Ishanya Zone)** सकाळच्या सूर्यकिरणांचे स्वागत करतो आणि घरात सकारात्मक ऊर्जा आणतो.'
    },
    kitchen: {
      en: 'The **South-East (आग्नेय - Agneya)** corner is governed by the Fire element (अग्नी) and is the ideal location for the kitchen. While cooking, one should ideally face East. The second alternative is North-West (वायव्य).',
      mr: 'स्वयंपाकघर (Kitchen) हे नेहमी **आग्नेय दिशेला (South-East / Agneya)** असावे, कारण ही अग्नीची दिशा आहे. स्वयंपाक करताना चेहरा पूर्वेकडे असावा. आग्नेय शक्य नसल्यास **वायव्य (North-West)** हा दुसरा चांगला पर्याय आहे.'
    },
    masterBedroom: {
      en: 'The Master Bedroom should strictly be located in the **South-West (नैऋत्य - Nairutya)** corner. This Earth element zone provides stability, strong health, and authority to the head of the family.',
      mr: 'मुख्य शयनकक्ष (Master Bedroom) हा घराच्या **नैऋत्य कोपऱ्यात (South-West / Nairutya)** असावा. ही पृथ्वी तत्त्वाची दिशा असल्याने कुटुंबप्रमुखाला स्थैर्य, दीर्घायुष्य आणि मानसिक शांतता प्रदान करते.'
    },
    poojaRoom: {
      en: 'The Pooja Room (देवघर) must be in the **North-East (ईशान्य - Ishanya)** corner. Idols should face West so you face East while praying.',
      mr: 'देवघर (Pooja Room) नेहमी **ईशान्य दिशेला (North-East / Ishanya)** असावे. पूजा करताना भक्ताचे तोंड पूर्व किंवा उत्तर दिशेकडे असावे.'
    },
    staircase: {
      en: 'Staircases should be located in the **South, West, or South-West** portion of the house. Steps should always climb in a **clockwise** direction.',
      mr: 'जिना (Staircase) घराच्या **दक्षिण (South)** किंवा **पश्चिम (West)** भागात असावा. पायऱ्या चढताना नेहमी **घड्याळाच्या काट्याच्या दिशेने (Clockwise)** वळाव्यात.'
    },
    waterTank: {
      en: '**Underground water tank/borewell:** North-East (ईशान्य).<br>**Overhead water tank:** South-West (नैऋत्य) or West to add load to the highest zone.',
      mr: '**भूमिगत पाण्याची टाकी / बोअरवेल:** ईशान्य दिशेला (North-East) असावी.<br>**छतावरील पाण्याची टाकी (Overhead Tank):** नैऋत्य (South-West) किंवा पश्चिम भागात असावी, ज्यामुळे योग्य भार राहतो.'
    }
  },

  solapurMunicipal: {
    en: `### 🏛️ Solapur Municipal Corporation (SMC) Building Sanction Process:
1. **Title Verification & 7/12 / Property Card:** Ensure land title is clear and in applicant's name.
2. **NA Order (अकृषक परवाना):** Non-Agricultural clearance for residential or commercial use.
3. **Architectural Blueprint & AutoDCR / BPAMS:** Submission of building layout through government online system by registered architect.
4. **Structural Stability Certificate:** Prepared by licensed civil/structural engineer (Er. Sham Vinnu's team provides this).
5. **Setback & FSI Compliance:** Adherence to Solapur DCR rules (Front, Rear, and Side margin spacing).
6. **Commencement Certificate (CC):** Received typically in 3 to 5 weeks after fee payment.`,
    mr: `### 🏛️ सोलापूर महानगरपालिका (SMC) बांधकाम परवानगी प्रक्रिया:
१. **मालकी हक्क व कागदपत्रे:** चालू ७/१२ उतारा किंवा मालमत्ता पत्रक (Property Card) आणि खरेदीखत.
२. **एन.ए. परवाना (NA Order):** जागा अकृषक (Non-Agricultural) असल्याचे सक्षम प्राधिकाऱ्याचे आदेश.
३. **ब्लूप्रिंट व ऑटो-डीसीआर (AutoDCR / BPAMS):** परवानाधारक वास्तुविशारदाकडून तयार केलेले इमारतीचे नकाशे.
४. **स्ट्रक्चरल स्थिरता प्रमाणपत्र:** अनुभवी सिव्हिल व स्ट्रक्चरल इंजिनिअरचे प्रमाणपत्र (सुयोग कन्स्ट्रक्शन्स ही सेवा पुरवते).
५. **साईड मार्जिन व एफएसआय (FSI):** सोलापूर महापालिकेच्या विकास नियंत्रण नियमांनुसार समोरील व बाजूची जागा सोडणे.
६. **जोते तपासणी व बांधकाम सुरू दाखला (CC):** सर्व फी भरून ३ ते ५ आठवड्यांत मंजुरी मिळते.`
  },

  curingAndTimeline: {
    en: `### ⏱️ Construction Timeline & RCC Curing Guide:
- **Footing & Plinth:** 3 to 4 weeks.
- **RCC Slab Curing:** Freshly poured RCC slabs must be continuously pond-cured with water for **minimum 14 to 21 days** for optimal 53-grade cement strength.
- **Formwork Removal (स्ट्रिपिंग):** Props under slabs up to 4.5m span should remain for 7 to 14 days minimum.
- **Brick Masonry & Plaster:** 6 to 8 weeks.
- **Average G+1 Bungalow (1,500 sq.ft):** Total construction time is approximately **6 to 8 months** under professional supervision.`,
    mr: `### ⏱️ बांधकाम कालावधी व आरसीसी क्युरिंग (पाणी मारणे):
- **पाया व प्लिंथ काम:** ३ ते ४ आठवडे.
- **स्लॅब क्युरिंग (पाणी मारणे):** नवीन आरसीसी स्लॅबवर **किमान १४ ते २१ दिवस** सतत पाणी भरून (Pond Curing) ठेवणे अनिवार्य आहे, ज्यामुळे ५३ ग्रेड सिमेंटची पूर्ण ताकद मिळते.
- **शटरिंग काढणे:** स्लॅबखालील टेकू किमान १४ दिवस न काढणे सुरक्षित असते.
- **वीटकाम व अंतर्गत/बाह्य गिलावा:** ६ ते ८ आठवडे.
- **१५०० चौरस फूट G+1 बंगला:** संपूर्ण बांधकाम दर्जेदार पद्धतीने पूर्ण होण्यास सुमारे **६ ते ८ महिने** लागतात.`
  }
};

// ── Smart Conversational Engine ──────────────────────────────────────────────
function generateAIResponse(userMessage, preferredLang) {
  const msg = (userMessage || '').trim().toLowerCase();
  
  // Detect language if not explicitly provided
  const hasDevanagari = /[\u0900-\u097F]/.test(userMessage);
  const lang = preferredLang === 'mr' || hasDevanagari ? 'mr' : 'en';

  // Check if message contains phone number (Lead Capture)
  const phoneMatch = userMessage.match(/(?:\+?91[\-\s]?)?[6-9]\d{9}/);
  if (phoneMatch) {
    const capturedPhone = phoneMatch[0];
    try {
      const db = getDb();
      const stmt = db.prepare(`
        INSERT INTO inquiries (name, email, phone, service_type, budget_range, project_location, message)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        'AI Advisor Visitor',
        'ai_visitor@suyog.local',
        capturedPhone,
        'residential',
        '10L-25L',
        'Solapur',
        `Lead captured via AI Advisor chat: "${userMessage}"`
      );
    } catch (e) {
      console.error('[AI LEAD CAPTURE ERROR]', e.message);
    }

    if (lang === 'mr') {
      return {
        text: `✅ **धन्यवाद!** आपला मोबाईल नंबर (**${capturedPhone}**) आमच्या सिव्हिल इंजिनिअरिंग टीमकडे नोंदवला गेला आहे.\n\n**इंजिनिअर शाम विन्नू** किंवा आमचे वरिष्ठ इंजिनिअर लवकरच आपल्याशी चर्चा करण्यासाठी कॉल करतील.\n\nआपल्याला तातडीने चर्चा करायची असल्यास आपण खालील बटणावर क्लिक करून थेट व्हॉट्सअ‍ॅपवरही बोलू शकता.`,
        chips: ['📞 थेट व्हॉट्सअ‍ॅपवर चॅट करा', '🏠 बांधकाम खर्च अंदाज', '🧭 वास्तु नियम विचार'],
        capturedLead: true
      };
    } else {
      return {
        text: `✅ **Thank you!** Your phone number (**${capturedPhone}**) has been shared with our senior civil engineering team.\n\n**Er. Sham Vinnu** or our site engineers in Solapur will reach out to you shortly.\n\nYou can also click the WhatsApp button below for an instant conversation.`,
        chips: ['💬 Chat on WhatsApp Now', '🏠 Estimate Cost for My Plot', '🧭 Ask Vastu Question'],
        capturedLead: true
      };
    }
  }

  // 1. Material estimation queries (detect numbers like "1200", "1500", "2000", "sqft", "cement", "steel")
  const areaMatch = msg.match(/(\d{3,5})\s*(?:sqft|sq\.ft|चौरस\s*फूट|फुटा|चौरस|square\s*feet|sq\s*ft)/i) ||
                    msg.match(/(?:area|builtup|plot|घर|जागा)\s*(?:is|of|for|आहे|साठी)?\s*(\d{3,5})/i) ||
                    (msg.match(/\b(\d{3,5})\b/) && (msg.includes('cement') || msg.includes('steel') || msg.includes('सिमेंट') || msg.includes('स्टील') || msg.includes('मटेरियल') || msg.includes('material')));

  if (areaMatch || msg.includes('cement') || msg.includes('steel') || msg.includes('सिमेंट') || msg.includes('स्टील') || msg.includes('मटेरियल') || msg.includes('material')) {
    const area = areaMatch ? parseInt(areaMatch[1], 10) : 1200;
    const r = KNOWLEDGE_BASE.materialRules;
    const cementBags = Math.round(area * r.cementBagsPerSqft);
    const steelTons = ((area * r.steelKgPerSqft) / 1000).toFixed(2);
    const sandBrass = (area * r.sandCuftPerSqft / 100).toFixed(1); // 1 Brass = 100 cuft
    const aggBrass = (area * r.aggregateCuftPerSqft / 100).toFixed(1);
    const bricks = Math.round(area * r.bricksPerSqft).toLocaleString();
    const estCostMin = ((area * KNOWLEDGE_BASE.rates.standard.min) / 100000).toFixed(1);
    const estCostMax = ((area * KNOWLEDGE_BASE.rates.premium.max) / 100000).toFixed(1);

    if (lang === 'mr') {
      return {
        text: `### 📊 **${area.toLocaleString()} चौरस फूट बांधकामासाठी अंदाजे मटेरियल व खर्च (IS 456 निकष):**

- 🧱 **सिमेंट (Cement):** सुमारे **${cementBags} पोती (Bags)** (अल्ट्राटेक / बिर्ला A1)
- 🏗️ **स्टील/सळया (TMT Steel):** सुमारे **${steelTons} टन (MT)** (Fe550D ब्रँडेड TMT)
- ⏳ **वाळू / क्रश सँड (M-Sand):** सुमारे **${sandBrass} ब्रास** (१ ब्रास = १०० घनफूट)
- 🪨 **खडी / कपची (Aggregates 10/20mm):** सुमारे **${aggBrass} ब्रास**
- 🧱 **लाल विटा (Red Clay Bricks):** सुमारे **${bricks} विटा** (किंवा AAC ब्लॉक्स वापरल्यास कमी खर्च)
- 💰 **एकूण अंदाजे बांधकाम खर्च:** **₹${estCostMin} लाख ते ₹${estCostMax} लाख** (सोलापूर मार्केट दर)

💡 *सुयोग कन्स्ट्रक्शन्स आपल्या प्लॉटवर प्रत्यक्ष भेट देऊन माती परीक्षण व सविस्तर कोटेशन मोफत उपलब्ध करून देते.*`,
        chips: ['🧭 मुख्य दरवाजाची वास्तु दिशा?', '🏛️ सोलापूर महापालिका परवाना कसा मिळवावा?', '📞 इंजिनिअरशी बोला']
      };
    } else {
      return {
        text: `### 📊 **Estimated Materials & Budget for ${area.toLocaleString()} Sq.Ft Built-up Area (IS 456 Standards):**

- 🧱 **Cement:** Approx. **${cementBags} bags** (Ultratech / Birla A1 53 Grade)
- 🏗️ **Steel (TMT Bars):** Approx. **${steelTons} Metric Tonnes** (Fe550D TMT)
- ⏳ **Sand / M-Sand:** Approx. **${sandBrass} Brass** (1 Brass = 100 cu.ft)
- 🪨 **Coarse Aggregates (10/20mm):** Approx. **${aggBrass} Brass**
- 🧱 **Red Bricks:** Approx. **${bricks} bricks** (or AAC lightweight blocks for lower deadload)
- 💰 **Estimated Budget:** **₹${estCostMin} Lakh to ₹${estCostMax} Lakh** (Solapur market standard)

💡 *Suyog Constructions provides free site inspection and architectural material BOQ for Solapur homeowners.*`,
        chips: ['🧭 Which direction is best for Kitchen?', '🏛️ Solapur Municipal Sanction steps', '📞 Talk to Engineer']
      };
    }
  }

  // 2. Vastu Shastra Queries
  if (msg.includes('vastu') || msg.includes('वास्तु') || msg.includes('दिशा') || msg.includes('direction') || msg.includes('kitchen') || msg.includes('bedroom') || msg.includes('entrance') || msg.includes('दरवाजा') || msg.includes('स्वयंपाकघर') || msg.includes('देवघर') || msg.includes('pooja')) {
    let specificTopic = null;
    if (msg.includes('kitchen') || msg.includes('स्वयंपाक') || msg.includes('किचन') || msg.includes('आग्नेय')) specificTopic = 'kitchen';
    else if (msg.includes('entrance') || msg.includes('दरवाजा') || msg.includes('door') || msg.includes('गेट') || msg.includes('प्रवेश')) specificTopic = 'entrance';
    else if (msg.includes('bedroom') || msg.includes('बेडरूम') || msg.includes('शयनकक्ष') || msg.includes('नैऋत्य')) specificTopic = 'masterBedroom';
    else if (msg.includes('pooja') || msg.includes('देवघर') || msg.includes('मंदिर') || msg.includes('ईशान्य')) specificTopic = 'poojaRoom';
    else if (msg.includes('stair') || msg.includes('जिना') || msg.includes('पायऱ्या')) specificTopic = 'staircase';
    else if (msg.includes('water') || msg.includes('टाकी') || msg.includes('tank') || msg.includes('borewell') || msg.includes('बोअर')) specificTopic = 'waterTank';

    if (specificTopic) {
      const topicData = KNOWLEDGE_BASE.vastu[specificTopic];
      const answer = lang === 'mr' ? topicData.mr : topicData.en;
      return {
        text: `### 🧭 **वास्तुशास्त्र सल्ला (Vastu Guidance):**\n\n${answer}\n\n*टीप: सुयोग कन्स्ट्रक्शन्सचे सर्व आर्किटेक्चरल प्लॅन १००% वास्तुशास्त्र आणि सिव्हिल इंजिनिअरिंग नियमांचे संतुलन ठेवून तयार केले जातात.*`,
        chips: ['🏠 स्वयंपाकघर कोणत्या दिशेला असावे?', '🧭 मुख्य प्रवेशद्वार वास्तु', '🧱 १५०० चौरस फुटासाठी मटेरियल किती लागेल?']
      };
    } else {
      // General Vastu Summary
      if (lang === 'mr') {
        return {
          text: `### 🧭 **घरासाठी महत्त्वाचे वास्तुशास्त्र नियम (Vastu Key Directions):**

1. 🚪 **मुख्य प्रवेशद्वार:** **पूर्व (East)** किंवा **उत्तर (North / ईशान्य)**.
2. 🍳 **स्वयंपाकघर (Kitchen):** **आग्नेय कोपरा (South-East)**. स्वयंपाक करताना चेहरा पूर्वेकडे असावा.
3. 🛏️ **मास्टर बेडरूम:** **नैऋत्य कोपरा (South-West)** स्थैर्य आणि सुखासाठी.
4. 🪔 **देवघर (Pooja Room):** **ईशान्य कोपरा (North-East)**.
5. 🪜 **जिना (Staircase):** **दक्षिण किंवा पश्चिम**, घड्याळाच्या काट्याच्या दिशेने चढणारा.
6. 💧 **पाण्याची टाकी:** बोअरवेल ईशान्येस, छतावरील ओव्हरहेड टाकी नैऋत्येस.

आपल्या विशिष्ट प्लॉटचा नकाशा तपासून घेण्यासाठी आपला नंबर लिहा किंवा संपर्क साधा!`,
          chips: ['🏠 1500 sqft चा खर्च किती?', '🏛️ सोलापूर महापालिका मंजुरी', '📞 इंजिनिअरशी थेट बोला']
        };
      } else {
        return {
          text: `### 🧭 **Essential Vastu Shastra Guidelines for Homes:**

1. 🚪 **Main Entrance:** **North** or **East** (North-East zone is ideal for positive energy).
2. 🍳 **Kitchen:** **South-East (Agneya)** corner. Cook facing East.
3. 🛏️ **Master Bedroom:** **South-West (Nairutya)** corner for stability and peace.
4. 🪔 **Pooja Room:** **North-East (Ishanya)** corner.
5. 🪜 **Staircase:** **South or West** walls, turning clockwise upwards.
6. 💧 **Water Storage:** Underground sump in North-East; Overhead tank in South-West.

Suyog Constructions integrates strict Vastu compliance with modern civil architecture for all residential homes in Solapur.`,
          chips: ['🏠 Estimate cost for 1500 sqft', '🏛️ Solapur Municipal Sanction steps', '📞 Talk to Engineer']
        };
      }
    }
  }

  // 3. Municipal Approval / Sanction / Permission queries
  if (msg.includes('sanction') || msg.includes('permission') || msg.includes('approval') || msg.includes('smc') || msg.includes('मंजुरी') || msg.includes('परवानगी') || msg.includes('नियम') || msg.includes('महापालिका') || msg.includes('7/12') || msg.includes('७/१२') || msg.includes('na') || msg.includes('dcr')) {
    return {
      text: lang === 'mr' ? KNOWLEDGE_BASE.solapurMunicipal.mr : KNOWLEDGE_BASE.solapurMunicipal.en,
      chips: ['📋 मोफत साईट व्हिजिट बुक करा', '🏠 बांधकाम खर्च अंदाज', '🧭 वास्तु नियम विचार']
    };
  }

  // 4. Timeline / Curing / Construction stages
  if (msg.includes('curing') || msg.includes('timeline') || msg.includes('time') || msg.includes('months') || msg.includes('काळ') || msg.includes('पाणी') || msg.includes('कालावधी') || msg.includes('क्युरिंग') || msg.includes('दिवस') || msg.includes('stage') || msg.includes('टप्पे')) {
    return {
      text: lang === 'mr' ? KNOWLEDGE_BASE.curingAndTimeline.mr : KNOWLEDGE_BASE.curingAndTimeline.en,
      chips: ['🧱 सिमेंट व स्टील प्रमाण किती लागते?', '🧭 वास्तु दिशा नियम', '📞 व्हॉट्सअ‍ॅपवर संपर्क करा']
    };
  }

  // 5. Renovation & Waterproofing
  if (msg.includes('renov') || msg.includes('waterproof') || msg.includes('leak') || msg.includes('नूतनीकरण') || msg.includes('गळती') || msg.includes('वॉटरप्रूफिंग') || msg.includes('दुरुस्ती') || msg.includes('जुने घर')) {
    if (lang === 'mr') {
      return {
        text: `### 🔨 **घर नूतनीकरण व वॉटरप्रूफिंग सल्ला:**

१. **छतावरील गळती (Terrace Waterproofing):** सोलापूरच्या तीव्र उन्हात साध्या सिमेंट लेपपेक्षा पॉलिमर-कोटेड इलास्टोमेरिक वॉटरप्रूफिंग किंवा चायना मोझॅक (China Mosaic) टाइल्स सर्वोत्तम ठरतात.
२. **भिंतीतील ओल (Dampness):** जुन्या घरांमध्ये डॅम्प-प्रूफ कोर्स (DPC) इंजेक्शन केमिकल ग्राउटिंगद्वारे ओलावा मुळापासून थांबवला जातो.
३. **स्ट्रक्चरल मजबुती:** जुन्या खांबांची व तुळ्यांची 'जॅकेटिंग' (Micro-concreting) करून घराचे आयुष्य ३०-४० वर्षांनी वाढवता येते.

सुयोग कन्स्ट्रक्शन्सने सोलापूरमध्ये शेकडो जुन्या वास्तूंचे यशस्वी नूतनीकरण केले आहे.`,
        chips: ['📋 साईट तपासणीसाठी संपर्क', '🏠 नवीन बांधकाम खर्च', '🧭 वास्तु नियम']
      };
    } else {
      return {
        text: `### 🔨 **Home Renovation & Waterproofing Insights:**

1. **Terrace Waterproofing:** Given Solapur's extreme heat and monsoon cycles, elastomeric acrylic polymer waterproofing or China Mosaic white tiles provide both leak protection and solar reflection.
2. **Rising Dampness Treatment:** Injection chemical grouting and waterproof plaster along plinth lines prevent moisture migration in older brick/stone walls.
3. **Structural Retrofitting:** Beam and column micro-concrete jacketing reinforces load-bearing capabilities, extending building lifespan by decades.

Suyog Constructions specializes in turnkey residential restorations across Solapur.`,
        chips: ['📋 Request Site Inspection', '🏠 New Construction Estimator', '🧭 Vastu Guide']
      };
    }
  }

  // 6. About Suyog Constructions / Er. Sham Vinnu
  if (msg.includes('suyog') || msg.includes('who are you') || msg.includes('कंपनी') || msg.includes('सुयोग') || msg.includes('sham') || msg.includes('vinnu') || msg.includes('experience') || msg.includes('अनुभव') || msg.includes('address') || msg.includes('पत्ता')) {
    if (lang === 'mr') {
      return {
        text: `### 🏗️ **सुयोग कन्स्ट्रक्शन्स बद्दल (About Suyog):**

- **स्थापना:** १९९२ (३०+ वर्षांचा समृद्ध अनुभव)
- **संस्थापक:** इंजिनिअर शाम विन्नू (Er. Sham Vinnu - Senior Civil Engineer)
- **पूर्ण झालेले प्रकल्प:** ५०० हून अधिक निवासी बंगले, व्यापारी संकुले व नूतनीकरण प्रकल्प.
- **कार्यालय:** दाजी पेठ, सोलापूर, महाराष्ट्र.
- **संपर्क:** +91 94224 58982 / +91 93706 91100
- **खासियत:** १००% पारदर्शक दर, वेळेवर ताबा, ISO प्रमाणित गुणवत्ता आणि वास्तुसम्मत रचना.`,
        chips: ['🏠 बांधकाम खर्च अंदाज काढा', '🧭 वास्तु नियम विचारा', '💬 थेट व्हॉट्सअ‍ॅपवर बोला']
      };
    } else {
      return {
        text: `### 🏗️ **About Suyog Constructions:**

- **Established:** 1992 (30+ Years of civil engineering legacy in Solapur)
- **Founder:** Er. Sham Vinnu (Senior Civil Engineer)
- **Track Record:** 500+ Residential bungalows, commercial hubs, and restoration projects delivered.
- **Office Location:** Daji Peth, Solapur, Maharashtra, India.
- **Helpline:** +91 94224 58982 / +91 93706 91100
- **Hallmark:** Transparent itemized pricing, earthquake-resistant RCC design, and strict Vastu alignment.`,
        chips: ['🏠 Estimate My Project Cost', '🧭 Vastu Directions Guide', '💬 WhatsApp Chief Engineer']
      };
    }
  }

  // 7. General fallback with polite civil guidance
  if (lang === 'mr') {
    return {
      text: `मी **सुयोग AI सिव्हिल व वास्तु सल्लागार** आहे! सोलापूरमधील बांधकामाविषयी मी आपल्याला अचूक माहिती देऊ शकतो.

आपण मला विचारू शकता:
- 🏠 **"१५०० चौरस फूट घरासाठी सिमेंट, स्टील आणि खर्च किती?"**
- 🧭 **"स्वयंपाकघर किंवा मुख्य दरवाजा कोणत्या दिशेला असावा?"**
- 🏛️ **"सोलापूर महापालिकेची बांधकाम परवानगी प्रक्रिया काय आहे?"**
- ⏱️ **"स्लॅब टाकल्यावर किती दिवस पाणी मारावे?"**

आपल्या प्लॉटचा आकार किती आहे किंवा आपल्या मनात काय प्रश्न आहे?`,
      chips: ['🏠 1200 sqft चा खर्च व मटेरियल?', '🧭 स्वयंपाकघर वास्तु दिशा', '🏛️ महापालिका परवानगी नियम', '📞 इंजिनिअरशी बोला']
    };
  } else {
    return {
      text: `Hello! I am your **Suyog AI Civil & Vastu Advisor** for Solapur and Maharashtra construction.

I can assist you with:
- 🏠 **"How much cement & steel is needed for 1,500 sq.ft?"**
- 🧭 **"What is the best Vastu direction for Kitchen or Main Door?"**
- 🏛️ **"What are the building sanction steps with Solapur Municipal Corporation?"**
- ⏱️ **"How many days should RCC slab curing take?"**

What is your plot size or what project are you planning?`,
      chips: ['🏠 1,200 sqft Cost & Materials', '🧭 Kitchen & Bedroom Vastu', '🏛️ Building Sanction Process', '📞 Talk to Engineer']
    };
  }
}

// ── API Route: POST /api/v1/ai-advisor/chat ──────────────────────────────────
router.post('/chat', (req, res) => {
  try {
    const { message, lang } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const response = generateAIResponse(message, lang);
    res.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[AI ADVISOR ERROR]', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while processing your request.'
    });
  }
});

module.exports = router;
