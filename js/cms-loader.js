document.addEventListener('DOMContentLoaded', function () {
  // Mobile Nav Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Initialize Sanity Visual Editing if embedded in Sanity Studio iframe
  if (window.parent !== window) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://esm.sh/@sanity/visual-editing-standalone@2/styles.css';
    document.head.appendChild(css);

    import('https://esm.sh/@sanity/visual-editing-standalone@2')
      .then(mod => {
        if (mod && typeof mod.enableVisualEditing === 'function') {
          mod.enableVisualEditing();
          console.log('[Sanity] Visual Editing enabled');
        }
      })
      .catch(err => console.log('[Sanity] Visual Editing standalone script load:', err));
  }

  const SANITY_PROJECT_ID = 'zebgjkan';
  const SANITY_DATASET = 'production';

  const DEFAULT_IMAGE_MAP = {
    // Pages / Hero Defaults
    'home': 'images/fd6b4f_51b6f9e2026f4252a4488715cd114e59~mv2.jpg',
    'team': 'images/fd6b4f_cbbb014d5e194215995eb20575abc765~mv2.jpg',
    'support': 'images/fd6b4f_a7855784021d4c7eaa20451d8f6ed1e0~mv2_d_3456_5184_s_4_2.jpg',
    'education': 'images/fd6b4f_128ce014b5d34a9e97833f8ccd8ce50a~mv2.jpeg',
    'development': 'images/fd6b4f_2420aedd929d41a8be5cdedf9a57baae~mv2.jpg',
    'reports': 'images/fd6b4f_efe55caf23244a65b05524a3c7abf9e6~mv2.jpg',
    'paynow': 'images/fd6b4f_df866b26580e49a99e6019cc6bcc5cc6~mv2.jpg',

    // Home Pillars
    'Health Screening': 'images/fd6b4f_51b6f9e2026f4252a4488715cd114e59~mv2.jpg',
    'Education Outreach': 'images/fd6b4f_870ded152cbd4e9c955d1bf0ce8c5090~mv2.jpg',
    'Post-Trip Reports': 'images/fd6b4f_efe55caf23244a65b05524a3c7abf9e6~mv2.jpg',

    // Team Members & Committees
    'Dr Ong Yew Jin': 'images/fd6b4f_5903f2f5bf0445c3b814453181dcf698~mv2.jpg',
    'Project Directors': 'images/fd6b4f_51b6f9e2026f4252a4488715cd114e59~mv2.jpg',
    'Medical Screening Committee': 'images/fd6b4f_870ded152cbd4e9c955d1bf0ce8c5090~mv2.jpg',
    'Education Committee': 'images/fd6b4f_74951fccec43452aabb6f0b53296110c~mv2.jpg',
    'Development Committee': 'images/fd6b4f_7fbbeedc33824a56a084fdd358712ca7~mv2.jpg',
    'Logistics Committee': 'images/fd6b4f_3b0ba32b0a554b9ca942eb73b99be359~mv2.jpg',
    'Sponsorship & Finance Committee': 'images/fd6b4f_13fa10a043a94768b8c762e0e7788b37~mv2.jpg',

    // Support Services Areas
    'Mass Village & Door-to-Door Clinics': 'images/fd6b4f_a7855784021d4c7eaa20451d8f6ed1e0~mv2_d_3456_5184_s_4_2.jpg',
    'Subsidised Referrals & Follow-Up Care': 'images/fd6b4f_9f44eb17f17942c2a1e0a8ab0b2a0249~mv2.jpg',
    'Multidisciplinary Healthcare Team': 'images/fd6b4f_1b6393589efd403ea6aaa2675ab2f891~mv2_d_3456_2304_s_2.jpg',
    'Future Plans & Groundwork': 'images/fd6b4f_735810e1693447399f05d7c631c221ed~mv2_d_6000_4000_s_4_2.jpg',

    // Education Modules
    'Primary School Hygiene & Health Modules': 'images/fd6b4f_4872a2e679904d8e9de5e684ce3a7401~mv2.jpg',
    'Light-A-Dream Scholarship (LADS)': 'images/fd6b4f_1c6ad1f3db174abc82341c487f0dcb61~mv2_d_5184_3456_s_4_2.jpg',
    'Community Engagement & Cultural Exchange': 'images/fd6b4f_4edbb130a76a4658af25845fd8ae4210~mv2_d_6000_4000_s_4_2.jpg',

    // Development Projects
    'Koh Dach Island Development': 'images/fd6b4f_2420aedd929d41a8be5cdedf9a57baae~mv2.jpg',
    'Health-Seeking Behavior Research': 'images/fd6b4f_222c083e2f0b4325849397f703c4d5ef~mv2_d_4779_3186_s_4_2.jpg',
    'On-Ground Capacity Building': 'images/fd6b4f_f12cb94f31f04171a39bcead24bfa1e1~mv2_d_5560_3707_s_4_2.jpg',

    // Reports
    '2026 May Recce Post Trip Report': 'images/fd6b4f_efe55caf23244a65b05524a3c7abf9e6~mv2.jpg',
    '2024 Post Trip Report': 'images/fd6b4f_2420aedd929d41a8be5cdedf9a57baae~mv2.jpg',
    '2023 Post Trip Report': 'images/fd6b4f_7bb2f20282fd4068b430353b2793a168~mv2.jpg',
    '2022 Post Trip Report': 'images/fd6b4f_67959562b029412fb822bb5358a3e9c9~mv2.png',

    // Opportunities / Get Involved
    'Calling All Doctors & Healthcare Professionals': 'images/fd6b4f_b395341d430a4416aafa3efec20912d3~mv2.jpg',
    'Make a Donation': 'images/fd6b4f_df866b26580e49a99e6019cc6bcc5cc6~mv2.jpg',
    'Partner with Us': 'images/fd6b4f_222c083e2f0b4325849397f703c4d5ef~mv2_d_4779_3186_s_4_2.jpg'
  };

  // Helper to convert Sanity image asset object, URL string, or title fallback to valid image URL
  function getSanityImageUrl(img, titleOrFallback) {
    if (img) {
      if (typeof img === 'string' && img.trim() !== '') return img;
      if (img.asset && img.asset._ref) {
        const ref = img.asset._ref;
        const parts = ref.split('-');
        if (parts.length >= 4) {
          const id = parts[1];
          const dimensions = parts[2];
          const format = parts[3];
          return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`;
        }
      }
      if (img.asset && img.asset.url) return img.asset.url;
    }

    if (titleOrFallback) {
      if (DEFAULT_IMAGE_MAP[titleOrFallback]) {
        return DEFAULT_IMAGE_MAP[titleOrFallback];
      }
      if (typeof titleOrFallback === 'string' && (titleOrFallback.startsWith('images/') || titleOrFallback.startsWith('http'))) {
        return titleOrFallback;
      }
    }

    return 'images/logo_exact.png';
  }

  // Helper to fetch content JSON from Sanity CDN (fetching drafts first for live preview) or fallback to local JSON
  function fetchContent(filename, slug) {
    if (slug && SANITY_PROJECT_ID) {
      // Query draft first if exists, otherwise published
      const groqQuery = `*[_type == "page" && slug.current == "${slug}"] | order(_updatedAt desc)[0]`;
      const sanityUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(groqQuery)}`;
      return fetch(sanityUrl)
        .then(res => res.ok ? res.json() : null)
        .then(sanityRes => {
          if (sanityRes && sanityRes.result) {
            return sanityRes.result;
          }
          return fetchLocal(filename);
        })
        .catch(() => fetchLocal(filename));
    }
    return fetchLocal(filename);
  }

  function fetchLocal(filename) {
    return fetch('content/pages/' + filename)
      .then(res => res.ok ? res.json() : fetch('content/' + filename).then(r => r.ok ? r.json() : null))
      .catch(() => fetch('content/' + filename).then(r => r.ok ? r.json() : null));
  }

  // Determine current page JSON path and slug
  const path = window.location.pathname.split('/').pop() || 'index.html';

  // Load Header / Footer Content
  fetchContent('header_footer.json')
    .then(data => {
      if (!data) return;

      const brandLogo = document.querySelector('.brand-logo');
      if (brandLogo && data.logo_image) brandLogo.src = getSanityImageUrl(data.logo_image);

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

  // Function to re-append DOM sections in the exact dynamic order specified by Sanity sections array
  function applyModularSections(data) {
    if (!data) return;

    // Update top-level page title & intro if present
    if (data.title && document.querySelector('.page-title')) {
      document.querySelector('.page-title').textContent = data.title;
    }
    if (data.introText && document.querySelector('.page-intro')) {
      document.querySelector('.page-intro').textContent = data.introText;
    }

    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    if (Array.isArray(data.sections) && data.sections.length > 0) {
      const sectionElements = [];

      data.sections.forEach(block => {
        const type = block._type;
        let el = null;

        if (type === 'heroBlock') {
          el = document.querySelector('.hero-section');
          if (el) {
            if (block.title) {
              const t = el.querySelector('.hero-title');
              if (t) t.textContent = block.title;
            }
            if (block.subtitle) {
              const st = el.querySelector('.hero-subtitle');
              if (st) st.textContent = block.subtitle;
            }
            if (block.description) {
              const d = el.querySelector('.hero-description');
              if (d) d.textContent = block.description;
            }
            if (block.buttonText) {
              const btn = el.querySelector('.hero-btn');
              if (btn) btn.textContent = block.buttonText;
            }
            if (block.heroImage || true) {
              const bgImg = getSanityImageUrl(block.heroImage, data.slug ? data.slug.current : 'home');
              if (bgImg) el.style.backgroundImage = `url('${bgImg}')`;
            }
          }
        } else if (type === 'rootsBlock') {
          const titleEl = document.querySelector('.who-title');
          if (titleEl) el = titleEl.closest('section');
          if (el) {
            if (block.title) {
              const t = el.querySelector('.who-title');
              if (t) t.textContent = block.title;
            }
            if (block.story) {
              const s = el.querySelector('.who-text');
              if (s) s.textContent = block.story;
            }
          }
        } else if (type === 'visionMissionBlock') {
          const visEl = document.querySelector('.vision-text');
          if (visEl) el = visEl.closest('section');
          if (el) {
            if (block.vision) {
              const v = el.querySelector('.vision-text');
              if (v) v.textContent = block.vision;
            }
            if (block.mission) {
              const m = el.querySelector('.mission-text');
              if (m) m.textContent = block.mission;
            }
          }
        } else if (type === 'valuesBlock') {
          const valGrid = document.querySelector('.values-grid');
          if (valGrid) el = valGrid.closest('section');
          if (el) {
            if (block.title) {
              const vt = el.querySelector('.values-title');
              if (vt) vt.textContent = block.title;
            }
            if (valGrid && Array.isArray(block.items) && block.items.length > 0) {
              valGrid.innerHTML = block.items.map(v => `
                <div class="card value-card" style="padding: 1.5rem;">
                  <h3 style="color: var(--color-primary); margin-bottom: 0.5rem; font-size: 1.15rem;">${v.name || v.title || ''}</h3>
                  <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.5;">${v.description || ''}</p>
                </div>
              `).join('');
            }
          }
        } else if (type === 'cardsGridBlock') {
          const gridEl = document.querySelector('.initiatives-grid') || document.querySelector('.areas-grid') || document.querySelector('.programmes-grid') || document.querySelector('.projects-grid') || document.querySelector('.opportunities-grid');
          if (gridEl) el = gridEl.closest('section');
          if (el) {
            if (block.title) {
              const st = el.querySelector('.section-title') || el.querySelector('.initiatives-title') || el.querySelector('.future-title');
              if (st) st.textContent = block.title;
            }
            const cardsList = block.items || block.cards;
            if (gridEl && Array.isArray(cardsList) && cardsList.length > 0) {
              gridEl.innerHTML = cardsList.map(item => `
                <div class="card">
                  <img src="${getSanityImageUrl(item.image, item.title)}" alt="${item.title || ''}" class="card-image" />
                  <div class="card-body">
                    <h3 class="card-title">${item.title || ''}</h3>
                    <p class="card-text">${item.description || ''}</p>
                    ${item.link ? `<a href="${item.link}" class="btn btn-outline" style="align-self: start;">${item.buttonText || 'Learn More'}</a>` : ''}
                  </div>
                </div>
              `).join('');
            }
          }
        } else if (type === 'statsBannerBlock') {
          const statsGrid = document.querySelector('.stats-grid');
          if (statsGrid) el = statsGrid.closest('section');
          if (el) {
            if (block.title) {
              const sbt = el.querySelector('.stats-banner-title');
              if (sbt) sbt.textContent = block.title;
            }
            if (statsGrid && Array.isArray(block.stats) && block.stats.length > 0) {
              const iconSvgs = {
                calendar: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
                location: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
                people: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
                bandage: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"></path></svg>'
              };
              const iconBgColors = { calendar: '#a8e6cf', location: '#fdb8c0', people: '#fbe285', bandage: '#78c6fb' };

              statsGrid.innerHTML = block.stats.map(s => {
                const iconKey = s.icon || 'calendar';
                const svg = iconSvgs[iconKey] || iconSvgs.calendar;
                const bg = iconBgColors[iconKey] || '#78c6fb';
                return `
                  <div class="stat-card">
                    <div class="stat-icon" style="background: ${bg}; color: #1e293b;">
                      ${svg}
                    </div>
                    <div class="stat-value">${s.value || ''}</div>
                    <div class="stat-label">${s.label || ''}</div>
                  </div>
                `;
              }).join('');
            }
          }
        } else if (type === 'teamGridBlock') {
          const teamGrid = document.querySelector('.team-grid');
          if (teamGrid) el = teamGrid.closest('section');
          if (el) {
            if (block.title) {
              const st = el.querySelector('.section-title');
              if (st) st.textContent = block.title;
            }
            if (block.heroImage || true) {
              const heroImg = document.getElementById('team-hero-img') || el.querySelector('.team-hero-img');
              if (heroImg) heroImg.src = getSanityImageUrl(block.heroImage, 'team');
            }
            if (teamGrid && Array.isArray(block.members) && block.members.length > 0) {
              teamGrid.innerHTML = block.members.map(m => `
                <div class="card">
                  <img src="${getSanityImageUrl(m.image, m.name)}" alt="${m.name || ''}" class="card-image" style="object-fit: cover; height: 220px; width: 100%; border-radius: 8px 8px 0 0;" />
                  <div class="card-body">
                    <h3 class="card-title">${m.name || ''}</h3>
                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-accent); margin-bottom: 0.5rem; display: block;">${m.role || ''}</span>
                    <p class="card-text">${m.bio || ''}</p>
                  </div>
                </div>
              `).join('');
            }
          }
        } else if (type === 'reportsGridBlock') {
          const reportsGrid = document.querySelector('.reports-grid');
          if (reportsGrid) el = reportsGrid.closest('section');
          if (el) {
            if (block.title) {
              const st = el.querySelector('.section-title');
              if (st) st.textContent = block.title;
            }
            if (reportsGrid && Array.isArray(block.reports) && block.reports.length > 0) {
              reportsGrid.innerHTML = block.reports.map(r => `
                <div class="card">
                  <img src="${getSanityImageUrl(r.image, r.title)}" alt="${r.title || ''}" class="card-image" />
                  <div class="card-body">
                    <h3 class="card-title">${r.title || ''}</h3>
                    <p class="card-text">${r.summary || ''}</p>
                    <a href="${r.pdf || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="align-self: start;">View Full Report (PDF)</a>
                  </div>
                </div>
              `).join('');
            }
          }
        } else if (type === 'donationBlock') {
          const paynowTitle = document.querySelector('.paynow-title');
          if (paynowTitle) el = paynowTitle.closest('section');
          if (el) {
            if (block.paynowTitle) {
              const pt = el.querySelector('.paynow-title');
              if (pt) pt.textContent = block.paynowTitle;
            }
            if (block.paynowInstructions) {
              const pi = el.querySelector('.paynow-instructions');
              if (pi) pi.textContent = block.paynowInstructions;
            }
            if (block.qrCodeImage || true) {
              const qr = el.querySelector('.qr-image') || el.querySelector('.qr-code-img');
              if (qr) qr.src = getSanityImageUrl(block.qrCodeImage, 'paynow');
            }
            if (block.chequeTitle) {
              const ct = el.querySelector('.cheque-title');
              if (ct) ct.textContent = block.chequeTitle;
            }
            if (block.chequeInstructions) {
              const ci = el.querySelector('.cheque-instructions');
              if (ci) ci.textContent = block.chequeInstructions;
            }
            if (block.contactEmail) {
              const em = el.querySelector('.contact-email') || el.querySelector('.donation-email');
              if (em) {
                em.href = 'mailto:' + block.contactEmail;
                em.textContent = block.contactEmail;
              }
            }
          }
        }

        if (el) {
          sectionElements.push(el);
        }
      });

      // Re-append DOM section elements in exact array order from Sanity
      sectionElements.forEach(secEl => {
        footer.parentNode.insertBefore(secEl, footer);
      });
    }
  }

  // Load Page Data based on active route
  function loadPageData() {
    if (path === '' || path === 'index.html') {
      fetchContent('home.json', 'home').then(data => {
        if (!data) return;
        applyModularSections(data);
      });
    } else if (path.includes('meet-the-team')) {
      fetchContent('team.json', 'team').then(data => {
        if (!data) return;
        applyModularSections(data);
      });
    } else if (path.includes('support-services')) {
      fetchContent('support.json', 'support').then(data => {
        if (!data) return;
        applyModularSections(data);
      });
    } else if (path.includes('education-outreach')) {
      fetchContent('education.json', 'education').then(data => {
        if (!data) return;
        applyModularSections(data);
      });
    } else if (path.includes('development')) {
      fetchContent('development.json', 'development').then(data => {
        if (!data) return;
        applyModularSections(data);
      });
    } else if (path.includes('post-trip-reports')) {
      fetchContent('reports.json', 'reports').then(data => {
        if (!data) return;
        applyModularSections(data);
      });
    } else if (path.includes('get-involved')) {
      fetchContent('get-involved.json', 'get-involved').then(data => {
        if (!data) return;
        applyModularSections(data);
      });
    } else if (path.includes('services-4')) {
      fetchContent('donation.json', 'donation').then(data => {
        if (!data) return;
        applyModularSections(data);
      });
    }
  }

  // Initial load
  loadPageData();

  // If running inside Sanity Studio Presentation iframe, poll every 2 seconds for real-time draft reorder updates
  if (window.parent !== window) {
    setInterval(loadPageData, 2000);
  }
});
