document.addEventListener('DOMContentLoaded', function () {
  // Dynamic Component Loader for Header & Footer
  loadComponents();

  function loadComponents() {
    const headerElem = document.querySelector('header.site-header');
    const footerElem = document.querySelector('footer');

    if (headerElem) {
      fetch('components/header.html')
        .then(res => res.text())
        .then(html => {
          headerElem.innerHTML = html;
          const currentPath = window.location.pathname.split('/').pop() || 'index.html';
          const navLinks = headerElem.querySelectorAll('.nav-link');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
              link.classList.add('active');
            } else if (href !== 'services-4.html') {
              link.classList.remove('active');
            }
          });
          const toggleBtn = headerElem.querySelector('.mobile-menu-toggle');
          const navMenu = headerElem.querySelector('.nav-menu');
          if (toggleBtn && navMenu) {
            toggleBtn.addEventListener('click', function () {
              navMenu.classList.toggle('active');
            });
          }
        })
        .catch(err => console.error('Failed to load header component:', err));
    }

    if (footerElem) {
      fetch('components/footer.html')
        .then(res => res.text())
        .then(html => {
          footerElem.innerHTML = html;
        })
        .catch(err => console.error('Failed to load footer component:', err));
    }
  }

  // Mobile Nav Toggle Fallback
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

  const CMS_ENABLED = false; // Set to false to disable CMS overwrites during manual image review

  const SANITY_PROJECT_ID = 'zebgjkan';
  const SANITY_DATASET = 'production';

  const DEFAULT_IMAGE_MAP = {
    // Pages / Hero Defaults (home has no hero background image)
    'home': null,
    'team': 'images/logo.png',
    'support': 'images/logo.png',
    'education': 'images/logo.png',
    'development': 'images/logo.png',
    'reports': 'images/logo.png',
    'paynow': 'images/fd6b4f_df866b26580e49a99e6019cc6bcc5cc6~mv2.jpg',

    // Home Pillars (using authentic field photos from target pages)
    'Health Screening': 'images/logo.png',
    'Education Outreach': 'images/logo.png',
    'Education Development': 'images/logo.png',
    'Post-Trip Reports': 'images/logo.png',

    // Education Modules
    'Light A Dream Scholarship (LADS)': 'images/logo.png',
    'Light-A-Dream Scholarship (LADS)': 'images/logo.png',
    'School Support Programme': 'images/logo.png',
    'Post-Screening Health Education': 'images/logo.png',
    'Primary School Hygiene & Health Modules': 'images/logo.png',
    'Community Engagement & Cultural Exchange': 'images/logo.png',

    // Development Projects
    'VEASNA Mobile Screening System': 'images/logo.png',
    'VEASNA': 'images/logo.png',
    'Door-To-Door Household Surveys': 'images/logo.png',
    'Door To Door Surveys': 'images/logo.png',
    'School Upgrading & Infrastructure': 'images/logo.png',
    'School Upgrading Initiatives': 'images/logo.png',
    'Stories of Poipet': 'images/logo.png',
    'Water Pump Initiative': 'images/logo.png',
    'Koh Dach Island & Groundwork': 'images/logo.png',
    'Koh Dach Island Development': 'images/logo.png',
    'Health-Seeking Behavior Research': 'images/logo.png',

    // Support Services Areas
    'Mass Village & Door-to-Door Clinics': 'images/logo.png',
    'Subsidised Referrals & Follow-Up Care': 'images/logo.png',
    'Multidisciplinary Healthcare Team': 'images/logo.png',
    'Future Plans & Groundwork': 'images/logo.png',

    // Reports
    '2026 May Recce Post Trip Report': 'images/report_2026.jpg',
    '2024 Post Trip Report': 'images/report_2024.jpg',
    '2023 Post Trip Report': 'images/report_2023.jpg',
    '2022 Post Trip Report': 'images/report_2022.jpg',

    // Team Members
    'Dr Ong Yew Jin': 'images/logo.png',
    'Project Directors': 'images/logo.png',
    'Medical Screening Committee': 'images/logo.png',
    'Education Committee': 'images/logo.png',
    'Development Committee': 'images/logo.png',
    'Logistics Committee': 'images/logo.png',
    'Sponsorship & Finance Committee': 'images/logo.png'
  };

  // Helper to convert Sanity image asset object, URL string, or title fallback to valid image URL
  function getSanityImageUrl(img, titleOrFallback) {
    // 1. Check explicit img object / URL string FIRST (never let DEFAULT_IMAGE_MAP override valid img)
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

    // 2. Check if titleOrFallback itself is an image URL/path
    if (typeof titleOrFallback === 'string' && (titleOrFallback.startsWith('images/') || titleOrFallback.startsWith('http'))) {
      return titleOrFallback;
    }

    // 3. Fallback to DEFAULT_IMAGE_MAP by title key
    if (titleOrFallback && DEFAULT_IMAGE_MAP[titleOrFallback] !== undefined) {
      return DEFAULT_IMAGE_MAP[titleOrFallback];
    }

    return null;
  }

  // Helper to fetch content JSON from Sanity CDN (fetching drafts first for live preview in Sanity Studio) or fallback to local JSON
  function fetchContent(filename, slug) {
    const isEmbeddedInStudio = (window.parent !== window);
    if (isEmbeddedInStudio && slug && SANITY_PROJECT_ID) {
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
    if (data.page_title && document.querySelector('.page-title')) {
      document.querySelector('.page-title').textContent = data.page_title;
    }
    if (data.introText && document.querySelector('.page-intro')) {
      document.querySelector('.page-intro').textContent = data.introText;
    }
    if (data.intro_text && document.querySelector('.page-intro')) {
      document.querySelector('.page-intro').textContent = data.intro_text;
    }

    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    // If sections array is missing or empty (e.g. from flat local JSON files), synthesize section blocks
    if (!data.sections || !Array.isArray(data.sections) || data.sections.length === 0) {
      data.sections = [];
      if (data.hero) {
        data.sections.push({
          _type: 'heroBlock',
          title: data.hero.title,
          subtitle: data.hero.subtitle,
          description: data.hero.description,
          buttonText: data.hero.button_text || data.hero.buttonText
        });
      }
      if (data.vision_mission) {
        data.sections.push({
          _type: 'visionMissionBlock',
          vision: data.vision_mission.vision,
          mission: data.vision_mission.mission
        });
      }
      if (data.roots) {
        data.sections.push({
          _type: 'rootsBlock',
          title: data.roots.title,
          story: data.roots.story
        });
      }
      if (data.values) {
        data.sections.push({
          _type: 'valuesBlock',
          title: 'OUR VALUES (LIBRA)',
          items: data.values
        });
      }
      if (data.initiatives) {
        data.sections.push({
          _type: 'cardsGridBlock',
          title: 'Our Key Initiatives',
          items: data.initiatives
        });
      }
      if (data.stats) {
        data.sections.push({
          _type: 'statsBannerBlock',
          title: data.stats_title || 'SCREENING STATISTICS 2024',
          stats: data.stats
        });
      }
      if (data.areas) {
        data.sections.push({
          _type: 'cardsGridBlock',
          items: data.areas
        });
      }
      if (data.programmes) {
        data.sections.push({
          _type: 'cardsGridBlock',
          items: data.programmes
        });
      }
      if (data.projects) {
        data.sections.push({
          _type: 'cardsGridBlock',
          items: data.projects
        });
      }
      if (data.reports) {
        data.sections.push({
          _type: 'reportsGridBlock',
          reports: data.reports
        });
      }
      if (data.opportunities) {
        data.sections.push({
          _type: 'cardsGridBlock',
          items: data.opportunities.map(o => ({
            image: o.image,
            title: o.title,
            description: o.description,
            link: o.link,
            buttonText: o.button_text || o.buttonText
          }))
        });
      }
      if (data.members) {
        data.sections.push({
          _type: 'teamGridBlock',
          members: data.members
        });
      }
      if (data.paynow || data.cheque) {
        data.sections.push({
          _type: 'donationBlock',
          paynowTitle: data.paynow ? data.paynow.title : null,
          paynowInstructions: data.paynow ? data.paynow.instructions : null,
          qrCodeImage: data.paynow ? data.paynow.qr_code_image : null,
          chequeTitle: data.cheque ? data.cheque.title : null,
          chequeInstructions: data.cheque ? data.cheque.instructions : null,
          contactEmail: data.contact_email
        });
      }
      if (data.future_outlook) {
        data.sections.push({
          _type: 'futureOutlookBlock',
          title: data.future_outlook.title,
          description: data.future_outlook.description,
          images: data.future_outlook.images
        });
      }
    }

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
            const slugKey = data.slug ? data.slug.current : null;
            const bgImg = getSanityImageUrl(block.heroImage, slugKey);
            if (bgImg) {
              el.style.backgroundImage = `url('${bgImg}')`;
            } else {
              el.style.backgroundImage = '';
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
              if (s) {
                // Do not overwrite with legacy short 2-sentence snippet from initial Sanity seed
                const isLegacyShortSnippet = block.story.length < 300 && block.story.includes('At the heart of Project Battambang');
                if (!isLegacyShortSnippet) {
                  s.textContent = block.story;
                }
              }
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
            if (block.title && !block.title.toLowerCase().includes('core values')) {
              const vt = el.querySelector('.values-title');
              if (vt) vt.textContent = block.title;
            }
            if (valGrid && Array.isArray(block.items) && block.items.length > 0) {
              valGrid.innerHTML = block.items.map(v => {
                const nameStr = v.name || v.title || '';
                const letter = v.letter || nameStr.charAt(0);
                const restName = v.letter ? nameStr : (nameStr.startsWith(letter) ? nameStr.slice(1) : nameStr);
                return `
                  <div class="card" style="padding: 1.5rem; text-align: center;">
                    <h4 style="color: var(--color-accent); font-size: 1.2rem; margin-bottom: 0.5rem;"><strong style="font-size: 1.5rem; color: var(--color-primary);">${letter}</strong>${restName}</h4>
                    <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.5;">${v.description || ''}</p>
                  </div>
                `;
              }).join('');
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
              gridEl.innerHTML = cardsList.map(item => {
                const imgSrc = getSanityImageUrl(item.image, item.title);
                return `
                  <div class="card">
                    ${imgSrc ? `<img src="${imgSrc}" alt="${item.title || ''}" class="card-image" />` : ''}
                    <div class="card-body">
                      <h3 class="card-title">${item.title || ''}</h3>
                      <p class="card-text">${item.description || ''}</p>
                      ${item.link ? `<a href="${item.link}" class="btn btn-outline" style="align-self: start;">${item.buttonText || 'Learn More'}</a>` : ''}
                    </div>
                  </div>
                `;
              }).join('');
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
            if (block.heroImage) {
              const heroImg = document.getElementById('team-hero-img') || el.querySelector('.team-hero-img');
              const hSrc = getSanityImageUrl(block.heroImage, 'team');
              if (heroImg && hSrc) heroImg.src = hSrc;
            }
            if (teamGrid && Array.isArray(block.members) && block.members.length > 0) {
              teamGrid.innerHTML = block.members.map(m => {
                const mImg = getSanityImageUrl(m.image, m.name);
                return `
                  <div class="card">
                    ${mImg ? `<img src="${mImg}" alt="${m.name || ''}" class="card-image" style="object-fit: cover; height: 220px; width: 100%; border-radius: 8px 8px 0 0;" />` : ''}
                    <div class="card-body">
                      <h3 class="card-title">${m.name || ''}</h3>
                      <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-accent); margin-bottom: 0.5rem; display: block;">${m.role || ''}</span>
                      <p class="card-text">${m.bio || ''}</p>
                    </div>
                  </div>
                `;
              }).join('');
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
              reportsGrid.innerHTML = block.reports.map(r => {
                const rImg = getSanityImageUrl(r.image, r.title);
                return `
                  <div class="card">
                    ${rImg ? `<img src="${rImg}" alt="${r.title || ''}" class="card-image" />` : ''}
                    <div class="card-body">
                      <h3 class="card-title">${r.title || ''}</h3>
                      <p class="card-text">${r.summary || ''}</p>
                      <a href="${r.pdf || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="align-self: start;">View Full Report (PDF)</a>
                    </div>
                  </div>
                `;
              }).join('');
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
              const qrSrc = getSanityImageUrl(block.qrCodeImage, 'paynow');
              if (qr && qrSrc) qr.src = qrSrc;
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
        } else if (type === 'futureOutlookBlock') {
          const futureEl = document.querySelector('.future-box');
          if (futureEl) el = futureEl;
          if (futureEl) {
            if (block.title) {
              const ft = futureEl.querySelector('.future-title');
              if (ft) ft.textContent = block.title;
            }
            if (block.description) {
              const fd = futureEl.querySelector('.future-desc');
              if (fd) fd.textContent = block.description;
            }
            if (Array.isArray(block.images) && block.images.length > 0) {
              const imgContainer = futureEl.querySelector('.future-images');
              if (imgContainer) {
                imgContainer.innerHTML = block.images.map((img, idx) => {
                  const imgSrc = getSanityImageUrl(img, `future_${idx}`);
                  return `
                    <div class="future-img-wrapper">
                      <img src="${imgSrc}" alt="${block.title || 'Future Directions'} photo ${idx + 1}" />
                    </div>
                  `;
                }).join('');
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
    if (!CMS_ENABLED) return;
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
