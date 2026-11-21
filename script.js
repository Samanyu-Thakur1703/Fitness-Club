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

  /* =========================================================================
   * Dynamic Authentication & Session State Management across all pages
   * ========================================================================= */
  function syncAuthNavbar() {
    const isSubdir = window.location.pathname.includes('/html/');
    const sessionId = localStorage.getItem('vybe-session');
    const rawUsers = localStorage.getItem('vybe-users');

    let activeUser = null;
    if (sessionId && rawUsers) {
      try {
        const store = JSON.parse(rawUsers);
        if (store && Array.isArray(store.users)) {
          activeUser = store.users.find((u) => u.id === sessionId);
        }
      } catch (_) {}
    }

    const signinLinks = document.querySelectorAll('a.signin');
    const signupButtons = document.querySelectorAll('#signupBtn, #mobileSignupBtn');

    if (activeUser) {
      // User is logged in: Show "👤 <First Name>" and "LOGOUT"
      const firstName = (activeUser.name || 'Athlete').trim().split(' ')[0];
      const profilePath = isSubdir ? '../profile.html' : 'profile.html';

      signinLinks.forEach((link) => {
        link.textContent = `👤 ${firstName.toUpperCase()}`;
        link.href = profilePath;
        link.title = `View profile for ${activeUser.name}`;
      });

      signupButtons.forEach((btn) => {
        btn.textContent = 'LOGOUT';
        btn.style.background = '#e04f4f';
        btn.style.boxShadow = '0 0 20px rgba(224, 79, 79, 0.4)';
        btn.onclick = (e) => {
          e.preventDefault();
          if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('vybe-session');
            alert('You have been logged out.');
            window.location.href = isSubdir ? '../home.html' : 'home.html';
          }
        };
      });
    } else {
      // User is guest: Show "SIGN IN" and "SIGN UP"
      const loginPath = isSubdir ? 'login.html' : 'html/login.html';
      const registerPath = isSubdir ? 'register.html' : 'html/register.html';

      signinLinks.forEach((link) => {
        link.textContent = 'SIGN IN';
        link.href = loginPath;
      });

      signupButtons.forEach((btn) => {
        btn.textContent = 'SIGN UP';
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.onclick = (e) => {
          e.preventDefault();
          window.location.href = registerPath;
        };
      });
    }
  }

  syncAuthNavbar();

  /* =========================================================================
   * Asynchronous Contact Form Submission using a JavaScript Promise
   * =========================================================================
   * A Promise represents the eventual completion (resolve) or failure (reject)
   * of an asynchronous operation (e.g. an API call to a backend server).
   * ========================================================================= */

  /**
   * sendInquiry(formData) -> Promise
   * Simulates an asynchronous server request with network latency.
   */
  function sendInquiry(formData) {
    return new Promise((resolve, reject) => {
      // Simulate network request delay (1.5 seconds)
      setTimeout(() => {
        if (!formData.name || !formData.email) {
          // Reject state: when required parameters are missing
          reject(new Error('Please fill in your name and email address.'));
        } else {
          // Resolve state: when the operation succeeds
          resolve({
            status: 200,
            message: `Thank you, ${formData.name}! Your inquiry regarding "${formData.program}" has been received. Our coaching team will reach out shortly.`
          });
        }
      }, 1500);
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      // Extract form values
      const formData = {
        name: document.getElementById('fullName') ? document.getElementById('fullName').value.trim() : '',
        email: document.getElementById('emailAddr') ? document.getElementById('emailAddr').value.trim() : '',
        program: document.getElementById('programInterest') ? document.getElementById('programInterest').value : 'General'
      };

      // 1. Pending state: Disable button and show loading text
      submitBtn.disabled = true;
      submitBtn.textContent = 'SENDING MESSAGE…';

      // 2. Consume the Promise
      sendInquiry(formData)
        .then((response) => {
          // Fulfilled / Resolved: handle successful result
          alert(response.message);
          contactForm.reset();
        })
        .catch((error) => {
          // Rejected: handle any errors
          alert(error.message || 'Failed to send your message. Please try again.');
        })
        .finally(() => {
          // Settled: always restores the button regardless of success or failure
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });
  }
});
