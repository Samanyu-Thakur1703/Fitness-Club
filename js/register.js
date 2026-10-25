/* ===========================================================================
 * js/register.js — Sign Up page behaviour
 * =========================================================================== */

(function () {
  'use strict';

  const form = document.getElementById('registerForm');
  const errorBox = document.getElementById('registerError');
  const submitBtn = form.querySelector('button[type="submit"]');

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function clearError() {
    errorBox.textContent = '';
    errorBox.hidden = true;
  }

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'CREATING…' : 'CREATE ACCOUNT';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearError();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;

    if (password !== confirm) {
      showError('Passwords do not match.');
      return;
    }

    setLoading(true);

    VYBEauth
      .register({ name: name, email: email, password: password })
      .then(function () {
        try {
          window.localStorage.setItem('vybe-login-toast', 'registered:' + name);
        } catch (_) {}
        window.location.href = 'login.html';
      })
      .catch(function (err) {
        showError(err.message || 'Registration failed. Please try again.');
        setLoading(false);
      });
  });
})();