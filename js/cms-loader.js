// Dynamic CMS Loader - Safely updates content without breaking Wix CSS/HTML structure
(function() {
  async function fetchJson(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.warn('CMS Loader: Failed to fetch ' + path, e);
      return null;
    }
  }

  // Load Header & Footer safely
  async function loadHeaderFooter() {
    const data = await fetchJson('content/header_footer.json');
    if (!data) return;

    if (data.footer_text) {
      const footerSpan = document.querySelector('#comp-jia9on1h span.color_15') || document.querySelector('#comp-jia9on1h p');
      if (footerSpan) footerSpan.textContent = data.footer_text;
    }
    if (data.instagram_url) {
      const instaLinks = document.querySelectorAll('a[href*="instagram.com"]');
      instaLinks.forEach(a => a.href = data.instagram_url);
    }
  }

  // Load Homepage safely without replacing structural Wix spans
  async function loadHomePage() {
    const isHome = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html') || window.location.pathname === '';
    if (!isHome) return;
    const data = await fetchJson('content/home.json');
    if (!data) return;

    // Safely update WHO WE ARE title if innermost span exists
    if (data.who_we_are_title || data.title) {
      const titleText = data.who_we_are_title || data.title;
      const titleContainer = document.querySelector('#comp-jiyxfd341');
      if (titleContainer) {
        const spans = titleContainer.querySelectorAll('span');
        if (spans.length) {
          spans[spans.length - 1].textContent = titleText;
        }
      }
    }

    // Safely update WHO WE ARE description if innermost span exists
    if (data.who_we_are_text || data.text) {
      const descText = data.who_we_are_text || data.text;
      const descContainer = document.querySelector('#comp-jiyxfd351 p');
      if (descContainer) {
        const spans = descContainer.querySelectorAll('span');
        if (spans.length) {
          spans[spans.length - 1].textContent = descText;
        }
      }
    }
  }

  function applyScrollbarFix() {
    let style = document.getElementById('fix-cms-scrollbars');
    if (!style) {
      style = document.createElement('style');
      style.id = 'fix-cms-scrollbars';
      style.innerHTML = `
        div[id^="comp-"], section[id^="comp-"], .wixui-column-strip, .wixui-column-strip__column, .wixui-rich-text {
          overflow: visible !important;
          overflow-y: visible !important;
          overflow-x: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyScrollbarFix();
      loadHeaderFooter();
      loadHomePage();
    });
  } else {
    applyScrollbarFix();
    loadHeaderFooter();
    loadHomePage();
  }
})();
