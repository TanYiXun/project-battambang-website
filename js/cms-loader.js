// Dynamic CMS Loader for Project Battambang Website
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

  // Load Homepage
  async function loadHomePage() {
    const isHome = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html') || window.location.pathname === '';
    if (!isHome) return;
    const data = await fetchJson('content/home.json');
    if (!data) return;

    if (data.who_we_are_title) {
      const titleEl = document.querySelector('#comp-jiyxfd341 h4, #comp-jiyxfd341');
      if (titleEl) titleEl.innerText = data.who_we_are_title;
    }

    if (data.who_we_are_text) {
      const textEl = document.querySelector('#comp-jiyxfd351 p, #comp-jiyxfd351');
      if (textEl) textEl.innerText = data.who_we_are_text;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadHeaderFooter();
      loadHomePage();
    });
  } else {
    loadHeaderFooter();
    loadHomePage();
  }
})();
