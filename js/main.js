document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }
});
