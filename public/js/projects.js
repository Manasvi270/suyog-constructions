/**
 * Suyog Constructions — projects.js
 * Portfolio page: fetch projects from API, filter, render, paginate
 */
(function () {
  'use strict';

  const grid        = document.getElementById('projects-grid');
  const loadingEl   = document.getElementById('projects-loading');
  const emptyEl     = document.getElementById('projects-empty');
  const loadMoreWrap = document.getElementById('load-more-wrap');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const filterBtns  = document.querySelectorAll('.filter-btn');

  const CATEGORY_EMOJIS = {
    residential: '🏠',
    commercial:  '🏢',
    renovation:  '🔨',
    interior:    '🎨',
    structural:  '🏗️',
    ongoing:     '🚧',
  };

  const LIMIT = 6;
  let currentFilter = 'all';
  let currentPage   = 1;
  let allProjects   = [];
  let totalProjects = 0;

  // ── Fetch Projects ─────────────────────────────────────────────────────────
  async function fetchProjects(filter, page) {
    let url = `/api/v1/projects?limit=${LIMIT}&page=${page}`;
    if (filter !== 'all' && filter !== 'ongoing') {
      url += `&category=${filter}`;
    } else if (filter === 'ongoing') {
      url += `&status=ongoing`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    return data;
  }

  // ── Render Project Card ────────────────────────────────────────────────────
  function createProjectCard(project) {
    const emoji = CATEGORY_EMOJIS[project.category] || '🏗️';
    const statusBadge = project.status === 'ongoing'
      ? `<span class="badge badge-blue" style="position:absolute;top:12px;right:12px;z-index:2;">🚧 Ongoing</span>`
      : '';

    const hasImage = project.image_urls && project.image_urls.length > 0;
    const imgHtml = hasImage
      ? `<img src="${project.image_urls[0]}" alt="${project.title}" class="project-real-img" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
         <div class="project-img-placeholder" style="display:none;">${emoji}</div>`
      : `<div class="project-img-placeholder">${emoji}</div>`;

    const extraImgCount = hasImage && project.image_urls.length > 1
      ? `<span class="project-img-count">📷 ${project.image_urls.length}</span>`
      : '';

    return `
      <article class="project-card" data-category="${project.category}" data-status="${project.status}" ${hasImage ? `data-images='${JSON.stringify(project.image_urls)}' data-title="${project.title}"` : ''}>
        <div class="project-img-wrap" style="cursor:${hasImage ? 'zoom-in' : 'default'}">
          ${imgHtml}
          ${statusBadge}
          ${extraImgCount}
          <div class="project-overlay">
            <span class="project-view-btn">${hasImage ? '🔍 View Photos' : 'View Details'}</span>
          </div>
        </div>
        <div class="project-info">
          <span class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
          <h3 class="project-title">${project.title}</h3>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; margin-bottom: var(--space-3); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${project.description}
          </p>
          <div class="project-meta">
            <span class="project-meta-item">📍 ${project.location}</span>
            ${project.area_sqft ? `<span class="project-meta-item">📐 ${project.area_sqft.toLocaleString()} sqft</span>` : ''}
          </div>
          ${project.year_completed ? `<div style="margin-top: var(--space-2);"><span class="badge badge-gold">✅ Completed ${project.year_completed}</span></div>` : ''}
        </div>
      </article>
    `;
  }

  // ── Lightbox ────────────────────────────────────────────────────────────────
  function initLightbox() {
    // Create lightbox elements once
    if (document.getElementById('sc-lightbox')) return;
    const lb = document.createElement('div');
    lb.id = 'sc-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Project photo viewer');
    lb.innerHTML = `
      <div id="sc-lb-backdrop"></div>
      <div id="sc-lb-panel">
        <button id="sc-lb-close" aria-label="Close">✕</button>
        <button id="sc-lb-prev" aria-label="Previous photo">‹</button>
        <button id="sc-lb-next" aria-label="Next photo">›</button>
        <img id="sc-lb-img" src="" alt="">
        <div id="sc-lb-caption"></div>
        <div id="sc-lb-dots"></div>
      </div>
    `;
    document.body.appendChild(lb);

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
      #sc-lightbox { display:none; position:fixed; inset:0; z-index:9999; align-items:center; justify-content:center; }
      #sc-lightbox.open { display:flex; }
      #sc-lb-backdrop { position:absolute; inset:0; background:rgba(0,0,0,0.92); backdrop-filter:blur(8px); }
      #sc-lb-panel { position:relative; z-index:1; max-width:92vw; max-height:92vh; display:flex; flex-direction:column; align-items:center; gap:12px; }
      #sc-lb-img { max-width:88vw; max-height:78vh; object-fit:contain; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,0.6); transition:opacity 0.25s; }
      #sc-lb-close { position:fixed; top:20px; right:24px; background:rgba(255,255,255,0.15); border:none; color:#fff; font-size:22px; width:44px; height:44px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
      #sc-lb-close:hover { background:rgba(255,255,255,0.3); }
      #sc-lb-prev, #sc-lb-next { position:fixed; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.15); border:none; color:#fff; font-size:36px; width:52px; height:52px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
      #sc-lb-prev { left:16px; } #sc-lb-next { right:16px; }
      #sc-lb-prev:hover, #sc-lb-next:hover { background:rgba(255,255,255,0.3); }
      #sc-lb-caption { color:#e0e0e0; font-size:15px; text-align:center; max-width:70vw; }
      #sc-lb-dots { display:flex; gap:8px; }
      .sc-lb-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.35); cursor:pointer; transition:background 0.2s; }
      .sc-lb-dot.active { background:#d4a853; }
      .project-real-img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease; }
      .project-img-wrap:hover .project-real-img { transform:scale(1.05); }
      .project-img-count { position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.65); color:#fff; font-size:12px; padding:3px 9px; border-radius:20px; z-index:2; }
    `;
    document.head.appendChild(style);

    let currentImages = [];
    let currentIdx = 0;

    const lbEl    = document.getElementById('sc-lightbox');
    const lbImg   = document.getElementById('sc-lb-img');
    const lbCap   = document.getElementById('sc-lb-caption');
    const lbDots  = document.getElementById('sc-lb-dots');
    const lbClose = document.getElementById('sc-lb-close');
    const lbPrev  = document.getElementById('sc-lb-prev');
    const lbNext  = document.getElementById('sc-lb-next');

    function showImage(idx) {
      currentIdx = (idx + currentImages.length) % currentImages.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = currentImages[currentIdx];
        lbImg.alt = `Photo ${currentIdx + 1}`;
        lbImg.style.opacity = '1';
      }, 150);
      lbCap.textContent = `Photo ${currentIdx + 1} of ${currentImages.length}`;
      lbDots.querySelectorAll('.sc-lb-dot').forEach((d, i) => d.classList.toggle('active', i === currentIdx));
      lbPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
      lbNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
    }

    function openLightbox(images, title, startIdx = 0) {
      currentImages = images;
      lbDots.innerHTML = images.map((_, i) => `<div class="sc-lb-dot${i === startIdx ? ' active' : ''}" data-idx="${i}"></div>`).join('');
      lbDots.querySelectorAll('.sc-lb-dot').forEach(d => d.addEventListener('click', () => showImage(+d.dataset.idx)));
      lbCap.textContent = title || '';
      showImage(startIdx);
      lbEl.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lbEl.classList.remove('open');
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    document.getElementById('sc-lb-backdrop').addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => showImage(currentIdx - 1));
    lbNext.addEventListener('click', () => showImage(currentIdx + 1));
    document.addEventListener('keydown', e => {
      if (!lbEl.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIdx - 1);
      if (e.key === 'ArrowRight') showImage(currentIdx + 1);
    });

    // Delegate click on grid
    grid.addEventListener('click', e => {
      const card = e.target.closest('.project-card');
      if (!card || !card.dataset.images) return;
      try {
        const imgs = JSON.parse(card.dataset.images);
        if (imgs.length > 0) openLightbox(imgs, card.dataset.title);
      } catch (_) {}
    });
  }

  // ── Load & Render ──────────────────────────────────────────────────────────
  async function loadProjects(filter, page, append = false) {
    if (!append) {
      loadingEl.style.display = 'block';
      emptyEl.style.display   = 'none';
      loadMoreWrap.style.display = 'none';
      if (!append) grid.innerHTML = '';
    }
    loadMoreBtn && (loadMoreBtn.disabled = true);

    try {
      const response = await fetchProjects(filter, page);
      const projects  = response.data.projects;
      const pagination = response.data.pagination;

      totalProjects = pagination.total;

      if (projects.length === 0 && !append) {
        loadingEl.style.display = 'none';
        emptyEl.style.display   = 'block';
        return;
      }

      projects.forEach(p => {
        const div = document.createElement('div');
        div.innerHTML = createProjectCard(p);
        const card = div.firstElementChild;
        // Animate in
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        grid.appendChild(card);
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });

      allProjects = append ? [...allProjects, ...projects] : projects;

      // Show/hide load more
      if (allProjects.length < totalProjects) {
        loadMoreWrap.style.display = 'block';
      } else {
        loadMoreWrap.style.display = 'none';
      }

    } catch (err) {
      console.error('[PROJECTS]', err);
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: var(--space-12);">
          <p style="color: var(--color-error);">Failed to load projects. Please refresh the page.</p>
        </div>
      `;
    } finally {
      loadingEl.style.display = 'none';
      if (loadMoreBtn) loadMoreBtn.disabled = false;
    }
  }

  // ── Filters ────────────────────────────────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      currentPage   = 1;
      allProjects   = [];
      loadProjects(currentFilter, currentPage);
    });
  });

  // ── Load More ──────────────────────────────────────────────────────────────
  loadMoreBtn?.addEventListener('click', () => {
    currentPage++;
    loadProjects(currentFilter, currentPage, true);
  });

  // ── Initial Load ───────────────────────────────────────────────────────────
  initLightbox();
  loadProjects('all', 1);

})();
