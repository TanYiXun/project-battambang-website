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
        if (data.hero_title) document.querySelector('.hero-title').textContent = data.hero_title;
        if (data.hero_subtitle) document.querySelector('.hero-subtitle').textContent = data.hero_subtitle;
        if (data.hero_description) document.querySelector('.hero-description').textContent = data.hero_description;
        if (data.hero_button_text) document.querySelector('.hero-btn').textContent = data.hero_button_text;
        if (data.who_we_are_title) {
          const el = document.querySelector('.who-title');
          if (el) el.textContent = data.who_we_are_title;
        }
        if (data.who_we_are_text) {
          const el = document.querySelector('.who-text');
          if (el) el.textContent = data.who_we_are_text;
        }
        if (data.vision_title) {
          const el = document.querySelector('.vision-title');
          if (el) el.textContent = data.vision_title;
        }
        if (data.vision_text) {
          const el = document.querySelector('.vision-text');
          if (el) el.textContent = data.vision_text;
        }
        if (data.mission_title) {
          const el = document.querySelector('.mission-title');
          if (el) el.textContent = data.mission_title;
        }
        if (data.mission_text) {
          const el = document.querySelector('.mission-text');
          if (el) el.textContent = data.mission_text;
        }
        if (data.values_title) {
          const el = document.querySelector('.values-title');
          if (el) el.textContent = data.values_title;
        }

        const grid = document.querySelector('.initiatives-grid');
        if (grid) {
          const cards = [];
          if (data.card1_title) {
            cards.push(`
              <div class="card">
                <img src="${data.card1_image || 'images/logo_exact.png'}" alt="${data.card1_title}" class="card-image" />
                <div class="card-body">
                  <h3 class="card-title">${data.card1_title}</h3>
                  <p class="card-text">${data.card1_description || ''}</p>
                  <a href="support-services.html" class="btn btn-outline" style="align-self: start;">Learn More</a>
                </div>
              </div>
            `);
          }
          if (data.card2_title) {
            cards.push(`
              <div class="card">
                <img src="${data.card2_image || 'images/logo_exact.png'}" alt="${data.card2_title}" class="card-image" />
                <div class="card-body">
                  <h3 class="card-title">${data.card2_title}</h3>
                  <p class="card-text">${data.card2_description || ''}</p>
                  <a href="education-outreach.html" class="btn btn-outline" style="align-self: start;">Learn More</a>
                </div>
              </div>
            `);
          }
          if (data.card3_title) {
            cards.push(`
              <div class="card">
                <img src="${data.card3_image || 'images/logo_exact.png'}" alt="${data.card3_title}" class="card-image" />
                <div class="card-body">
                  <h3 class="card-title">${data.card3_title}</h3>
                  <p class="card-text">${data.card3_description || ''}</p>
                  <a href="post-trip-reports.html" class="btn btn-outline" style="align-self: start;">Learn More</a>
                </div>
              </div>
            `);
          }
          if (cards.length > 0) grid.innerHTML = cards.join('');
        }
      });
  } else if (path.includes('meet-the-team')) {
    fetch('content/team.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text) document.querySelector('.page-intro').textContent = data.intro_text;

        const grid = document.querySelector('.team-grid');
        if (grid) {
          const members = [
            { name: data.member1_name, role: data.member1_role, bio: data.member1_bio, image: data.member1_image },
            { name: data.member2_name, role: data.member2_role, bio: data.member2_bio, image: data.member2_image },
            { name: data.member3_name, role: data.member3_role, bio: data.member3_bio, image: data.member3_image },
            { name: data.member4_name, role: data.member4_role, bio: data.member4_bio, image: data.member4_image },
            { name: data.member5_name, role: data.member5_role, bio: data.member5_bio, image: data.member5_image },
            { name: data.member6_name, role: data.member6_role, bio: data.member6_bio, image: data.member6_image },
            { name: data.member7_name, role: data.member7_role, bio: data.member7_bio, image: data.member7_image }
          ].filter(m => m && m.name);

          if (members.length > 0) {
            grid.innerHTML = members.map(m => `
              <div class="card">
                <img src="${m.image || 'images/logo_exact.png'}" alt="${m.name}" class="card-image" style="object-fit: cover; height: 220px; width: 100%; border-radius: 8px 8px 0 0;" />
                <div class="card-body">
                  <h3 class="card-title">${m.name}</h3>
                  <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-accent); margin-bottom: 0.5rem; display: block;">${m.role || ''}</span>
                  <p class="card-text">${m.bio || ''}</p>
                </div>
              </div>
            `).join('');
          }
        }
      });
  } else if (path.includes('services-4')) {
    fetch('content/donation.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title) {
          const pt = document.querySelector('.page-title');
          if (pt) pt.textContent = data.page_title;
        }
        if (data.intro_text) {
          const pi = document.querySelector('.page-intro');
          if (pi) pi.textContent = data.intro_text;
        }
        if (data.paynow_title) {
          const pnt = document.querySelector('.paynow-title');
          if (pnt) pnt.textContent = data.paynow_title;
        }
        if (data.paynow_instructions) {
          const pni = document.querySelector('.paynow-instructions');
          if (pni) pni.textContent = data.paynow_instructions;
        }
        if (data.qr_code_image) {
          const qr = document.querySelector('.qr-image');
          if (qr) qr.src = data.qr_code_image;
        }
        if (data.cheque_title) {
          const ct = document.querySelector('.cheque-title');
          if (ct) ct.textContent = data.cheque_title;
        }
        if (data.cheque_instructions) {
          const ci = document.querySelector('.cheque-instructions');
          if (ci) ci.textContent = data.cheque_instructions;
        }
        if (data.contact_email) {
          const ce = document.querySelectorAll('.contact-email');
          ce.forEach(el => {
            el.href = 'mailto:' + data.contact_email;
            el.textContent = data.contact_email;
          });
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
        if (grid) {
          const reports = [
            { title: data.report1_title, image: data.report1_image, pdf: data.report1_pdf, desc: data.report1_description },
            { title: data.report2_title, image: data.report2_image, pdf: data.report2_pdf, desc: data.report2_description },
            { title: data.report3_title, image: data.report3_image, pdf: data.report3_pdf, desc: data.report3_description },
            { title: data.report4_title, image: data.report4_image, pdf: data.report4_pdf, desc: data.report4_description }
          ].filter(r => r && r.title);

          if (reports.length > 0) {
            grid.innerHTML = reports.map(r => `
              <div class="card">
                <img src="${r.image || 'images/fd6b4f_efe55caf23244a65b05524a3c7abf9e6~mv2.jpg'}" alt="${r.title}" class="card-image" />
                <div class="card-body">
                  <h3 class="card-title">${r.title}</h3>
                  <p class="card-text">${r.desc || ''}</p>
                  ${r.pdf ? `<a href="${r.pdf}" target="_blank" class="btn btn-primary" style="align-self: start;">Download Report (PDF)</a>` : ''}
                </div>
              </div>
            `).join('');
          }
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
        if (grid) {
          const progs = [
            { title: data.prog1_title, desc: data.prog1_description, image: data.prog1_image },
            { title: data.prog2_title, desc: data.prog2_description, image: data.prog2_image },
            { title: data.prog3_title, desc: data.prog3_description, image: data.prog3_image }
          ].filter(p => p && p.title);

          if (progs.length > 0) {
            grid.innerHTML = progs.map(p => `
              <div class="card">
                <img src="${p.image || 'images/fd6b4f_128ce014b5d34a9e97833f8ccd8ce50a~mv2.jpeg'}" alt="${p.title}" class="card-image" />
                <div class="card-body">
                  <h3 class="card-title">${p.title}</h3>
                  <p class="card-text">${p.desc || ''}</p>
                </div>
              </div>
            `).join('');
          }
        }
      });
  } else if (path.includes('support-services')) {
    fetch('content/support.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) return;
        if (data.page_title) document.querySelector('.page-title').textContent = data.page_title;
        if (data.intro_text) document.querySelector('.page-intro').textContent = data.intro_text;

        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) {
          const stats = [
            { label: data.stat1_label, value: data.stat1_value },
            { label: data.stat2_label, value: data.stat2_value },
            { label: data.stat3_label, value: data.stat3_value },
            { label: data.stat4_label, value: data.stat4_value }
          ].filter(s => s && s.label && s.value);

          if (stats.length > 0) {
            statsGrid.innerHTML = stats.map(s => `
              <div class="stat-box">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
              </div>
            `).join('');
          }
        }

        const grid = document.querySelector('.support-grid');
        if (grid) {
          const areas = [
            { title: data.area1_title, desc: data.area1_description, image: data.area1_image },
            { title: data.area2_title, desc: data.area2_description, image: data.area2_image },
            { title: data.area3_title, desc: data.area3_description, image: data.area3_image }
          ].filter(a => a && a.title);

          if (areas.length > 0) {
            grid.innerHTML = areas.map(a => `
              <div class="card">
                <img src="${a.image || 'images/fd6b4f_a7855784021d4c7eaa20451d8f6ed1e0~mv2_d_3456_5184_s_4_2.jpg'}" alt="${a.title}" class="card-image" />
                <div class="card-body">
                  <h3 class="card-title">${a.title}</h3>
                  <p class="card-text">${a.desc || ''}</p>
                </div>
              </div>
            `).join('');
          }
        }
      });
  }
});
