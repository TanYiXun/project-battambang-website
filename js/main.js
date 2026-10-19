document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
