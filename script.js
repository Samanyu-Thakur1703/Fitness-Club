document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('vybe-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    if (savedTheme === 'light') {
      root.setAttribute('data-theme', 'light');
    }
  } else {
    root.removeAttribute('data-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      if (currentTheme === 'light') {
        root.removeAttribute('data-theme');
        localStorage.setItem('vybe-theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('vybe-theme', 'light');
      }
    });
  }

  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a, button');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.removeAttribute('open');
      });
    });

    document.addEventListener('click', (event) => {
      if (mobileMenu.hasAttribute('open') && !mobileMenu.contains(event.target)) {
        mobileMenu.removeAttribute('open');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileMenu.hasAttribute('open')) {
        mobileMenu.removeAttribute('open');
      }
    });
  }

  const signupButtons = document.querySelectorAll('#signupBtn, #mobileSignupBtn');
  signupButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      alert('Welcome to THE VYBE! Registration portal is opening soon.');
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullName') ? document.getElementById('fullName').value : 'Athlete';
      alert(`Thank you, ${name}! Your inquiry has been received. Our team will contact you shortly.`);
      contactForm.reset();
    });
  }
});
