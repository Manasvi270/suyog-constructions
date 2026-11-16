/**
 * Suyog Constructions — ai-advisor.js
 * Intelligent Bilingual AI Civil & Vastu Advisor Widget
 */
(function () {
  'use strict';

  // ── UI Texts per Language ──────────────────────────────────────────────────
  const UI = {
    en: {
      launcherTitle: '🤖 AI Civil & Vastu Advisor',
      launcherSub: 'Ask anything · 24/7 Online',
      headerTitle: 'Suyog AI Construction Advisor',
      headerSub: 'Online · Civil & Vastu Assistant',
      inputPlaceholder: 'Ask about materials, budget, or Vastu...',
      sendBtnAria: 'Send message',
      welcome: `Hello! 👋 I am your **Suyog AI Civil & Vastu Advisor**.\n\nI can help you with:\n- 🏠 **Material & Cost Estimates** (Cement, Steel, Bricks for your plot size)\n- 🧭 **Vastu Shastra Guidelines** (Kitchen, Master Bedroom, Pooja Room directions)\n- 🏛️ **Solapur Municipal (SMC) Sanction & Approval Process**\n- ⏱️ **Construction Stages & RCC Curing Timelines**\n\nWhat are you planning to build or renovate in Solapur?`,
      chips: [
        '🏠 1500 sqft Cost & Materials',
        '🧭 Kitchen Vastu Direction',
        '🏛️ SMC Building Approval Steps',
        '⏱️ RCC Slab Curing Days',
      ],
      disclaimer: 'Powered by Suyog Civil Standards',
      waText: '💬 Talk to Er. Sham Vinnu on WhatsApp'
    },
    mr: {
      launcherTitle: '🤖 सुयोग AI सिव्हिल सल्लागार',
      launcherSub: 'वास्तु व बांधकाम माहिती · २४ तास',
      headerTitle: 'सुयोग AI सिव्हिल व वास्तु सल्लागार',
      headerSub: 'ऑनलाईन · २४ तास उपलब्ध',
      inputPlaceholder: 'बांधकाम खर्च, मटेरियल किंवा वास्तु विचारा...',
      sendBtnAria: 'संदेश पाठवा',
      welcome: `नमस्कार! 👋 मी **सुयोग AI सिव्हिल व वास्तु सल्लागार** आहे.\n\nमी आपल्याला सोलापूरमधील बांधकामाविषयी संपूर्ण मार्गदर्शन करू शकतो:\n- 🏠 **मटेरियल व खर्च अंदाज** (आपल्या प्लॉटसाठी सिमेंट, स्टील, विटा व बजेट)\n- 🧭 **वास्तुशास्त्र नियम** (स्वयंपाकघर, मुख्य दरवाजा, बेडरूम, देवघर)\n- 🏛️ **सोलापूर महापालिका (SMC) बांधकाम परवानगी व कागदपत्रे**\n- ⏱️ **बांधकामाचे टप्पे व स्लॅब क्युरिंगचे दिवस**\n\nआपल्या प्लॉटचा आकार किती आहे किंवा आपल्या मनात काय प्रश्न आहे?`,
      chips: [
        '🏠 १५०० चौरस फूट खर्च व मटेरियल?',
        '🧭 स्वयंपाकघर वास्तु दिशा कोणती?',
        '🏛️ महापालिका परवानगी कशी काढावी?',
        '⏱️ स्लॅब टाकल्यावर किती दिवस पाणी मारावे?'
      ],
      disclaimer: 'सुयोग सिव्हिल इंजिनिअरिंग मानकांवर आधारित',
      waText: '💬 इंजिनिअर शाम विन्नू यांच्याशी व्हॉट्सअ‍ॅपवर बोला'
    }
  };

  let isOpen = false;
  let isSending = false;

  function getLang() {
    if (window.SuyogI18n && typeof window.SuyogI18n.getLang === 'function') {
      return window.SuyogI18n.getLang();
    }
    return localStorage.getItem('suyog_lang') || 'en';
  }

  // ── Simple Markdown to HTML Formatter ──────────────────────────────────────
  function formatMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');

    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Bullet points
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/gim, '');

    // Line breaks
    html = html.replace(/\n\n/g, '<br><br>');
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  // ── Build DOM Elements ─────────────────────────────────────────────────────
  function initWidget() {
    if (document.getElementById('suyog-ai-launcher')) return;

    const lang = getLang();
    const t = UI[lang] || UI.en;

    // 1. Floating Launcher
    const launcher = document.createElement('button');
    launcher.id = 'suyog-ai-launcher';
    launcher.setAttribute('aria-label', 'Open Suyog AI Advisor');
    launcher.innerHTML = `
      <div class="ai-launcher-icon-wrap">
        <span>🤖</span>
        <span class="ai-pulse-dot"></span>
      </div>
      <div class="ai-launcher-text">
        <span class="ai-launcher-title" id="ai-launcher-title">${t.launcherTitle}</span>
        <span class="ai-launcher-sub" id="ai-launcher-sub">${t.launcherSub}</span>
      </div>
    `;

    // 2. Chat Modal
    const modal = document.createElement('div');
    modal.id = 'suyog-ai-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Suyog AI Construction Advisor');
    modal.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-header-left">
          <div class="ai-header-avatar">🏗️</div>
          <div class="ai-header-info">
            <h4 id="ai-header-title">${t.headerTitle}</h4>
            <p id="ai-header-sub">${t.headerSub}</p>
          </div>
        </div>
        <div class="ai-header-actions">
          <button class="ai-header-btn" id="ai-modal-clear" title="Clear chat">🗑️</button>
          <button class="ai-header-btn" id="ai-modal-close" title="Close">✕</button>
        </div>
      </div>

      <div class="ai-chat-body" id="ai-chat-body">
        <!-- Messages will be injected here -->
      </div>

      <div class="ai-chat-footer">
        <div class="ai-input-row">
          <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="${t.inputPlaceholder}" autocomplete="off" />
          <button class="ai-send-btn" id="ai-send-btn" aria-label="${t.sendBtnAria}">➤</button>
        </div>
        <div class="ai-footer-actions">
          <a href="https://wa.me/919422458982?text=Hello%20Suyog%20Constructions!%20I%20have%20a%20construction%20query." target="_blank" rel="noopener" class="ai-wa-link" id="ai-wa-link">
            ${t.waText}
          </a>
          <span id="ai-disclaimer">${t.disclaimer}</span>
        </div>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(modal);

    // Event listeners
    launcher.addEventListener('click', toggleModal);
    document.getElementById('ai-modal-close').addEventListener('click', toggleModal);
    document.getElementById('ai-modal-clear').addEventListener('click', clearChat);
    document.getElementById('ai-send-btn').addEventListener('click', handleSend);
    document.getElementById('ai-chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Load message history or initial welcome
    loadMessages();

    // Listen for global language switch
    window.addEventListener('suyog_lang_changed', (e) => {
      updateUILanguage(e.detail.lang);
    });
  }

  function toggleModal() {
    const modal = document.getElementById('suyog-ai-modal');
    if (!modal) return;
    isOpen = !isOpen;
    modal.classList.toggle('open', isOpen);
    if (isOpen) {
      setTimeout(() => {
        document.getElementById('ai-chat-input')?.focus();
        scrollToBottom();
      }, 100);
    }
  }

  function updateUILanguage(lang) {
    const t = UI[lang] || UI.en;
    const lTitle = document.getElementById('ai-launcher-title');
    const lSub = document.getElementById('ai-launcher-sub');
    const hTitle = document.getElementById('ai-header-title');
    const hSub = document.getElementById('ai-header-sub');
    const input = document.getElementById('ai-chat-input');
    const waLink = document.getElementById('ai-wa-link');
    const disc = document.getElementById('ai-disclaimer');

    if (lTitle) lTitle.textContent = t.launcherTitle;
    if (lSub) lSub.textContent = t.launcherSub;
    if (hTitle) hTitle.textContent = t.headerTitle;
    if (hSub) hSub.textContent = t.headerSub;
    if (input) input.placeholder = t.inputPlaceholder;
    if (waLink) waLink.innerHTML = t.waText;
    if (disc) disc.textContent = t.disclaimer;
  }

  function scrollToBottom() {
    const body = document.getElementById('ai-chat-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function appendMessage(sender, text, chips = []) {
    const body = document.getElementById('ai-chat-body');
    if (!body) return;

    const msgEl = document.createElement('div');
    msgEl.className = `ai-message ${sender}`;

    const avatar = sender === 'bot' ? '🤖' : '👤';
    const formattedHtml = formatMarkdown(text);

    let chipsHtml = '';
    if (chips && chips.length > 0) {
      chipsHtml = `<div class="ai-chips-wrap">
        ${chips.map(c => `<button class="ai-chip" data-chip="${encodeURIComponent(c)}">${c}</button>`).join('')}
      </div>`;
    }

    msgEl.innerHTML = `
      <div class="ai-msg-avatar">${avatar}</div>
      <div class="ai-msg-bubble">
        ${formattedHtml}
        ${chipsHtml}
      </div>
    `;

    body.appendChild(msgEl);

    // Bind chip clicks
    msgEl.querySelectorAll('.ai-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = decodeURIComponent(btn.getAttribute('data-chip'));
        const input = document.getElementById('ai-chat-input');
        if (input) {
          input.value = query;
          handleSend();
        }
      });
    });

    scrollToBottom();
  }

  function showTyping() {
    const body = document.getElementById('ai-chat-body');
    if (!body) return;
    const typing = document.createElement('div');
    typing.id = 'ai-typing-indicator';
    typing.className = 'ai-message bot';
    typing.innerHTML = `
      <div class="ai-msg-avatar">🤖</div>
      <div class="ai-msg-bubble" style="padding: 8px 12px;">
        <div class="ai-typing-indicator">
          <div class="ai-typing-dot"></div>
          <div class="ai-typing-dot"></div>
          <div class="ai-typing-dot"></div>
        </div>
      </div>
    `;
    body.appendChild(typing);
    scrollToBottom();
  }

  function hideTyping() {
    const typing = document.getElementById('ai-typing-indicator');
    if (typing) typing.remove();
  }

  async function handleSend() {
    const input = document.getElementById('ai-chat-input');
    if (!input || isSending) return;

    const message = input.value.trim();
    if (!message) return;

    // Clear input & append user message
    input.value = '';
    appendMessage('user', message);

    isSending = true;
    showTyping();

    const lang = getLang();

    try {
      const res = await fetch('/api/v1/ai-advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, lang })
      });

      const json = await res.json();
      hideTyping();
      isSending = false;

      if (json.success && json.data) {
        appendMessage('bot', json.data.text, json.data.chips);
        saveHistory();
      } else {
        appendMessage('bot', lang === 'mr'
          ? 'माफ करा, तांत्रिक अडचणीमुळे उत्तर देता आले नाही. कृपया पुन्हा प्रयत्न करा किंवा थेट व्हॉट्सअ‍ॅपवर संपर्क साधा.'
          : 'Sorry, I could not process your query. Please try again or reach out on WhatsApp.');
      }
    } catch (err) {
      console.error('[AI ADVISOR CHAT ERROR]', err);
      hideTyping();
      isSending = false;
      appendMessage('bot', lang === 'mr'
        ? 'सर्व्हरशी संपर्क होऊ शकला नाही. कृपया थोड्या वेळाने प्रयत्न करा.'
        : 'Network error. Please check your connection and try again.');
    }
  }

  function saveHistory() {
    try {
      const body = document.getElementById('ai-chat-body');
      if (body) {
        sessionStorage.setItem('suyog_ai_chat_html', body.innerHTML);
      }
    } catch (e) {}
  }

  function loadMessages() {
    const body = document.getElementById('ai-chat-body');
    if (!body) return;

    const saved = sessionStorage.getItem('suyog_ai_chat_html');
    if (saved && saved.trim().length > 0) {
      body.innerHTML = saved;
      // Rebind chip listeners
      body.querySelectorAll('.ai-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const query = decodeURIComponent(btn.getAttribute('data-chip'));
          const input = document.getElementById('ai-chat-input');
          if (input) {
            input.value = query;
            handleSend();
          }
        });
      });
      scrollToBottom();
    } else {
      // First time welcome
      const lang = getLang();
      const t = UI[lang] || UI.en;
      appendMessage('bot', t.welcome, t.chips);
    }
  }

  function clearChat() {
    sessionStorage.removeItem('suyog_ai_chat_html');
    const body = document.getElementById('ai-chat-body');
    if (body) body.innerHTML = '';
    const lang = getLang();
    const t = UI[lang] || UI.en;
    appendMessage('bot', t.welcome, t.chips);
  }

  // Auto init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

})();
