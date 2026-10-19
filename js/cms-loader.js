// Dynamic CMS Loader & Modular À La Carte Block Renderer
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

  // Load Header & Footer
  async function loadHeaderFooter() {
    const data = await fetchJson('content/header_footer.json');
    if (!data) return;

    if (data.footer_text) {
      const footerEl = document.querySelector('#comp-jia9on1h p, footer p');
      if (footerEl) footerEl.innerText = data.footer_text;
    }
    if (data.instagram_url) {
      const instaLinks = document.querySelectorAll('a[href*="instagram.com"]');
      instaLinks.forEach(a => a.href = data.instagram_url);
    }
  }

  // Main init loader
  async function init() {
    loadHeaderFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
