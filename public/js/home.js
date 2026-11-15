/**
 * Suyog Constructions — home.js
 * Homepage-specific: hero particles, testimonial slider, auto counters, particle effects
 */
(function () {
  'use strict';

  // ── Hero Particles ────────────────────────────────────────────────────────────
  const particlesContainer = document.getElementById('particles');

  if (particlesContainer) {
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${Math.random() * 0.5 + 0.2};
      `;
      particlesContainer.appendChild(particle);
    }
  }


  // ── Testimonials Slider ───────────────────────────────────────────────────────
  const track    = document.getElementById('testimonials-track');
  const slides   = document.querySelectorAll('.testimonial-slide');
  const dotsWrap = document.getElementById('testimonial-dots');
  const prevBtn  = document.getElementById('testimonial-prev');
  const nextBtn  = document.getElementById('testimonial-next');

  if (track && slides.length > 0) {
    let current  = 0;
    let autoplay = null;

    // Create dots
    const dots = [];
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap?.appendChild(dot);
      dots.push(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    function startAutoplay() {
      autoplay = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplay);
    }

    prevBtn?.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
    nextBtn?.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
      }
    });

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // ── Featured Projects Dynamic Loader ─────────────────────────────────────────
  const featuredGrid = document.getElementById('featured-projects-grid');
  if (featuredGrid) {
    const CATEGORY_EMOJIS = {
      residential: '🏠',
      commercial:  '🏢',
      renovation:  '🔨',
      interior:    '🎨',
      structural:  '🏗️',
      ongoing:     '🚧',
    };

    fetch('/api/v1/projects?featured=true&limit=3')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data && res.data.projects && res.data.projects.length > 0) {
          featuredGrid.innerHTML = res.data.projects.map(p => {
            const emoji = CATEGORY_EMOJIS[p.category] || '🏗️';
            const hasImg = p.image_urls && p.image_urls.length > 0;
            const imgHtml = hasImg
              ? `<img src="${p.image_urls[0]}" alt="${p.title}" class="project-real-img" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                 <div class="project-img-placeholder" style="display:none;">${emoji}</div>`
              : `<div class="project-img-placeholder">${emoji}</div>`;
            const statusBadge = p.status === 'ongoing'
              ? `<span class="badge badge-blue" style="position:absolute;top:12px;right:12px;z-index:2;">🚧 Ongoing</span>`
              : '';
            return `
              <div class="project-card" data-category="${p.category}" data-status="${p.status}">
                <div class="project-img-wrap">
                  ${imgHtml}
                  ${statusBadge}
                  <div class="project-overlay">
                    <a href="/projects" class="project-view-btn">View Details</a>
                  </div>
                </div>
                <div class="project-info">
                  <span class="project-category">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</span>
                  <h3 class="project-title">${p.title}</h3>
                  <div class="project-meta">
                    <span class="project-meta-item">📍 ${p.location}</span>
                    ${p.area_sqft ? `<span class="project-meta-item">📐 ${p.area_sqft.toLocaleString()} sqft</span>` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('');
        }
      })
      .catch(err => console.error('[FEATURED PROJECTS]', err));
  }

})();
