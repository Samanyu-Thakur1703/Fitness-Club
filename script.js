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
      const isSubdir = window.location.pathname.includes('/html/');
      window.location.href = isSubdir ? 'register.html' : 'html/register.html';
    });
  });

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
