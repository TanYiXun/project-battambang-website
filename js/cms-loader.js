document.addEventListener('DOMContentLoaded', function () {
  // Mobile Nav Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Determine current page JSON path
  const path = window.location.pathname.split('/').pop() || 'index.html';

  // Load Header / Footer Content
  fetch('content/header_footer.json')
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (!data) return;

      const brandLogo = document.querySelector('.brand-logo');
      if (brandLogo && data.logo_image) brandLogo.src = data.logo_image;

      const brandTitle = document.querySelector('.brand-title');
      if (brandTitle && data.site_title) brandTitle.textContent = data.site_title;

      const brandTagline = document.querySelector('.brand-tagline');
      if (brandTagline && data.tagline) brandTagline.textContent = data.tagline;

      const copyright = document.querySelector('.footer-copyright');
      if (copyright && data.copyright_text) copyright.textContent = data.copyright_text;

      const emailLink = document.querySelector('.footer-email');
      if (emailLink && data.contact_email) {
        emailLink.href = 'mailto:' + data.contact_email;
        emailLink.textContent = data.contact_email;
      }
    })
    .catch(err => console.log('Header/Footer JSON load:', err));

  // Page Specific Content Loaders
  if (path === '' || path === 'index.html') {
    fetch('content/home.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;

        // Hero Section
        if (data.hero) {
          if (data.hero.title && document.querySelector('.hero-title')) document.querySelector('.hero-title').textContent = data.hero.title;
          if (data.hero.subtitle && document.querySelector('.hero-subtitle')) document.querySelector('.hero-subtitle').textContent = data.hero.subtitle;
          if (data.hero.description && document.querySelector('.hero-description')) document.querySelector('.hero-description').textContent = data.hero.description;
          if (data.hero.button_text && document.querySelector('.hero-btn')) document.querySelector('.hero-btn').textContent = data.hero.button_text;
        }

        // Roots Section
        if (data.roots) {
          if (data.roots.title && document.querySelector('.who-title')) document.querySelector('.who-title').textContent = data.roots.title;
          if (data.roots.story && document.querySelector('.who-text')) document.querySelector('.who-text').textContent = data.roots.story;
        }

        // Vision & Mission
        if (data.vision_mission) {
          if (data.vision_mission.vision && document.querySelector('.vision-text')) document.querySelector('.vision-text').textContent = data.vision_mission.vision;
          if (data.vision_mission.mission && document.querySelector('.mission-text')) document.querySelector('.mission-text').textContent = data.vision_mission.mission;
        }

        // Values Grid
        const valuesGrid = document.querySelector('.values-grid');
        if (valuesGrid && Array.isArray(data.values) && data.values.length > 0) {
          valuesGrid.innerHTML = data.values.map(val => `
            <div class="card value-card" style="padding: 1.5rem;">
              <h3 style="color: var(--color-primary); margin-bottom: 0.5rem; font-size: 1.15rem;">${val.name || ''}</h3>
              <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.5;">${val.description || ''}</p>
            </div>
          `).join('');
        }

        // Initiatives Grid
        const initiativesGrid = document.querySelector('.initiatives-grid');
        if (initiativesGrid && Array.isArray(data.initiatives) && data.initiatives.length > 0) {
          initiativesGrid.innerHTML = data.initiatives.map(item => `
            <div class="card">
              <img src="${item.image || 'images/logo_exact.png'}" alt="${item.title || ''}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${item.title || ''}</h3>
                <p class="card-text">${item.description || ''}</p>
                <a href="${item.link || '#'}" class="btn btn-outline" style="align-self: start;">Learn More</a>
              </div>
            </div>
          `).join('');
        }
      });
  } else if (path.includes('meet-the-team')) {
    fetch('content/team.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title && document.querySelector('.page-title')) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text && document.querySelector('.page-intro')) document.querySelector('.page-intro').textContent = data.intro_text;

        const heroImg = document.getElementById('team-hero-img');
        if (heroImg && data.hero_image) heroImg.src = data.hero_image;

        const grid = document.querySelector('.team-grid');
        if (grid && Array.isArray(data.members) && data.members.length > 0) {
          grid.innerHTML = data.members.map(m => `
            <div class="card">
              <img src="${m.image || 'images/logo_exact.png'}" alt="${m.name || ''}" class="card-image" style="object-fit: cover; height: 220px; width: 100%; border-radius: 8px 8px 0 0;" />
              <div class="card-body">
                <h3 class="card-title">${m.name || ''}</h3>
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-accent); margin-bottom: 0.5rem; display: block;">${m.role || ''}</span>
                <p class="card-text">${m.bio || ''}</p>
              </div>
            </div>
          `).join('');
        }
      });
  } else if (path.includes('support-services')) {
    fetch('content/support.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title && document.querySelector('.page-title')) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text && document.querySelector('.page-intro')) document.querySelector('.page-intro').textContent = data.intro_text;

        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid && Array.isArray(data.stats) && data.stats.length > 0) {
          statsGrid.innerHTML = data.stats.map(s => `
            <div class="stat-card">
              <div class="stat-value">${s.value || ''}</div>
              <div class="stat-label">${s.label || ''}</div>
            </div>
          `).join('');
        }

        const areasGrid = document.querySelector('.areas-grid');
        if (areasGrid && Array.isArray(data.areas) && data.areas.length > 0) {
          areasGrid.innerHTML = data.areas.map(a => `
            <div class="card">
              <img src="${a.image || 'images/logo_exact.png'}" alt="${a.title || ''}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${a.title || ''}</h3>
                <p class="card-text">${a.description || ''}</p>
              </div>
            </div>
          `).join('');
        }
      });
  } else if (path.includes('education-outreach')) {
    fetch('content/education.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title && document.querySelector('.page-title')) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text && document.querySelector('.page-intro')) document.querySelector('.page-intro').textContent = data.intro_text;

        const programmesGrid = document.querySelector('.programmes-grid');
        if (programmesGrid && Array.isArray(data.programmes) && data.programmes.length > 0) {
          programmesGrid.innerHTML = data.programmes.map(p => `
            <div class="card">
              <img src="${p.image || 'images/logo_exact.png'}" alt="${p.title || ''}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${p.title || ''}</h3>
                <p class="card-text">${p.description || ''}</p>
              </div>
            </div>
          `).join('');
        }
      });
  } else if (path.includes('development')) {
    fetch('content/development.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title && document.querySelector('.page-title')) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text && document.querySelector('.page-intro')) document.querySelector('.page-intro').textContent = data.intro_text;

        const devHero = document.getElementById('dev-hero-img');
        if (devHero && data.hero_image) devHero.src = data.hero_image;

        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid && Array.isArray(data.projects) && data.projects.length > 0) {
          projectsGrid.innerHTML = data.projects.map(p => `
            <div class="card">
              <img src="${p.image || 'images/logo_exact.png'}" alt="${p.title || ''}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${p.title || ''}</h3>
                <p class="card-text">${p.description || ''}</p>
              </div>
            </div>
          `).join('');
        }

        if (data.future_outlook) {
          const futureTitle = document.querySelector('.future-title');
          const futureDesc = document.querySelector('.future-desc');
          if (futureTitle && data.future_outlook.title) futureTitle.textContent = data.future_outlook.title;
          if (futureDesc && data.future_outlook.description) futureDesc.textContent = data.future_outlook.description;
        }
      });
  } else if (path.includes('post-trip-reports')) {
    fetch('content/reports.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title && document.querySelector('.page-title')) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text && document.querySelector('.page-intro')) document.querySelector('.page-intro').textContent = data.intro_text;

        const reportsGrid = document.querySelector('.reports-grid');
        if (reportsGrid && Array.isArray(data.reports) && data.reports.length > 0) {
          reportsGrid.innerHTML = data.reports.map(r => `
            <div class="card">
              <img src="${r.image || 'images/logo_exact.png'}" alt="${r.title || ''}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${r.title || ''}</h3>
                <p class="card-text">${r.summary || ''}</p>
                <a href="${r.pdf || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="align-self: start;">View Full Report (PDF)</a>
              </div>
            </div>
          `).join('');
        }
      });
  } else if (path.includes('get-involved')) {
    fetch('content/get-involved.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title && document.querySelector('.page-title')) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text && document.querySelector('.page-intro')) document.querySelector('.page-intro').textContent = data.intro_text;

        const oppGrid = document.querySelector('.opportunities-grid');
        if (oppGrid && Array.isArray(data.opportunities) && data.opportunities.length > 0) {
          oppGrid.innerHTML = data.opportunities.map(o => `
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">${o.title || ''}</h3>
                <p class="card-text">${o.description || ''}</p>
                <a href="${o.link || '#'}" class="btn btn-primary" style="align-self: start;">${o.button_text || 'Get Involved'}</a>
              </div>
            </div>
          `).join('');
        }
      });
  } else if (path.includes('services-4')) {
    fetch('content/donation.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title && document.querySelector('.page-title')) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text && document.querySelector('.page-intro')) document.querySelector('.page-intro').textContent = data.intro_text;

        if (data.paynow) {
          const paynowTitle = document.querySelector('.paynow-title');
          const paynowInst = document.querySelector('.paynow-instructions');
          const qrCodeImg = document.querySelector('.qr-code-img');
          if (paynowTitle && data.paynow.title) paynowTitle.textContent = data.paynow.title;
          if (paynowInst && data.paynow.instructions) paynowInst.textContent = data.paynow.instructions;
          if (qrCodeImg && data.paynow.qr_code_image) qrCodeImg.src = data.paynow.qr_code_image;
        }

        if (data.cheque) {
          const chequeTitle = document.querySelector('.cheque-title');
          const chequeInst = document.querySelector('.cheque-instructions');
          if (chequeTitle && data.cheque.title) chequeTitle.textContent = data.cheque.title;
          if (chequeInst && data.cheque.instructions) chequeInst.textContent = data.cheque.instructions;
        }

        if (data.contact_email) {
          const donationEmail = document.querySelector('.donation-email');
          if (donationEmail) {
            donationEmail.href = 'mailto:' + data.contact_email;
            donationEmail.textContent = data.contact_email;
          }
        }
      });
  }
});
