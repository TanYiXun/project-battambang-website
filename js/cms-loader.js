document.addEventListener('DOMContentLoaded', function () {
  // Mobile Nav Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Determine current page JSON
  const path = window.location.pathname.split('/').pop() || 'index.html';

  // Load Header / Footer
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
        if (data.hero_title) document.querySelector('.hero-title').textContent = data.hero_title;
        if (data.hero_subtitle) document.querySelector('.hero-subtitle').textContent = data.hero_subtitle;
        if (data.hero_description) document.querySelector('.hero-description').textContent = data.hero_description;
        if (data.hero_button_text) document.querySelector('.hero-btn').textContent = data.hero_button_text;
        if (data.who_we_are_title) document.querySelector('.who-title').textContent = data.who_we_are_title;
        if (data.who_we_are_text) document.querySelector('.who-text').textContent = data.who_we_are_text;
        if (data.initiatives_title) document.querySelector('.initiatives-title').textContent = data.initiatives_title;

        // Render Initiatives Cards
        const grid = document.querySelector('.initiatives-grid');
        if (grid && Array.isArray(data.initiatives)) {
          grid.innerHTML = data.initiatives.map(item => `
            <div class="card">
              <img src="${item.image || 'images/logo_exact.png'}" alt="${item.title}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.description}</p>
                ${item.link ? `<a href="${item.link}" class="btn btn-outline" style="align-self: start;">Learn More</a>` : ''}
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
        if (data.page_title) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text) document.querySelector('.page-intro').textContent = data.intro_text;
        if (data.executive_title) document.querySelector('.section-title').textContent = data.executive_title;

        const grid = document.querySelector('.team-grid');
        if (grid && Array.isArray(data.members)) {
          grid.innerHTML = data.members.map(member => `
            <div class="card">
              <img src="${member.image || 'images/fd6b4f_b5fcae01ec1e44c7b500ec2c5c296f04~mv2.png'}" alt="${member.name}" class="card-image" style="object-fit: contain; padding: 1.5rem; background-color: var(--color-bg-subtle);" />
              <div class="card-body">
                <h3 class="card-title">${member.name}</h3>
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-accent); margin-bottom: 0.5rem; display: block;">${member.role || ''}</span>
                <p class="card-text">${member.bio || ''}</p>
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
        if (data.page_title) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text) document.querySelector('.page-intro').textContent = data.intro_text;
        if (data.paynow_title) document.querySelector('.paynow-title').textContent = data.paynow_title;
        if (data.qr_code_image) document.querySelector('.qr-image').src = data.qr_code_image;
        if (data.bank_details) document.querySelector('.bank-details').textContent = data.bank_details;

        const grid = document.querySelector('.impact-grid');
        if (grid && Array.isArray(data.impact_points)) {
          grid.innerHTML = data.impact_points.map(point => `
            <div class="card" style="padding: 1.5rem;">
              <h3 class="card-title" style="color: var(--color-accent); font-size: 1.35rem;">${point.title}</h3>
              <p class="card-text">${point.description}</p>
            </div>
          `).join('');
        }
      });
  } else if (path.includes('post-trip-reports')) {
    fetch('content/reports.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text) document.querySelector('.page-intro').textContent = data.intro_text;

        const grid = document.querySelector('.reports-grid');
        if (grid && Array.isArray(data.reports)) {
          grid.innerHTML = data.reports.map(report => `
            <div class="card">
              <img src="${report.cover_image || 'images/fd6b4f_efe55caf23244a65b05524a3c7abf9e6~mv2.jpg'}" alt="${report.year}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${report.year}</h3>
                <p class="card-text">${report.description || ''}</p>
                ${report.pdf_link ? `<a href="${report.pdf_link}" target="_blank" class="btn btn-primary" style="align-self: start;">Download Report (PDF)</a>` : ''}
              </div>
            </div>
          `).join('');
        }
      });
  } else if (path.includes('education-outreach') || path.includes('copy-of-education')) {
    fetch('content/education.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text) document.querySelector('.page-intro').textContent = data.intro_text;

        const grid = document.querySelector('.education-grid');
        if (grid && Array.isArray(data.initiatives)) {
          grid.innerHTML = data.initiatives.map(item => `
            <div class="card">
              <img src="${item.image || 'images/fd6b4f_128ce014b5d34a9e97833f8ccd8ce50a~mv2.jpeg'}" alt="${item.title}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.description}</p>
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
        if (data.page_title) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text) document.querySelector('.page-intro').textContent = data.intro_text;

        // Render Stats
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid && Array.isArray(data.stats)) {
          statsGrid.innerHTML = data.stats.map(stat => `
            <div class="stat-box">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
            </div>
          `).join('');
        }

        // Render Focus Sections
        const grid = document.querySelector('.support-grid');
        if (grid && Array.isArray(data.sections)) {
          grid.innerHTML = data.sections.map(sec => `
            <div class="card">
              <img src="${sec.image || 'images/fd6b4f_a7855784021d4c7eaa20451d8f6ed1e0~mv2_d_3456_5184_s_4_2.jpg'}" alt="${sec.title}" class="card-image" />
              <div class="card-body">
                <h3 class="card-title">${sec.title}</h3>
                <p class="card-text">${sec.description}</p>
              </div>
            </div>
          `).join('');
        }
      });
  }
});
