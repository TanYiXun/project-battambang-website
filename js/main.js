document.addEventListener('DOMContentLoaded', function () {
  loadComponents();

  function loadComponents() {
    const headerElem = document.querySelector('header.site-header');
    const footerElem = document.querySelector('footer');

    if (headerElem) {
      fetch('components/header.html')
        .then(res => res.text())
        .then(html => {
          headerElem.innerHTML = html;
          setupNav(headerElem);
        })
        .catch(err => {
          console.error('Failed to load header component:', err);
          setupNav(document);
        });
    } else {
      setupNav(document);
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

  function setupNav(container) {
    const toggleBtn = container.querySelector('.mobile-menu-toggle');
    const navMenu = container.querySelector('.nav-menu');
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
      });
    }

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = container.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else if (href !== 'services-4.html') {
        link.classList.remove('active');
      }
    });
  }
});
