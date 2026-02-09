document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navbarToggle && navbarMenu) {
    // Toggle menu when hamburger is clicked
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }
});