/* ===========================================================================
 * js/login.js — Sign In page behaviour
 * =========================================================================== */

(function () {
  'use strict';

  const form = document.getElementById('loginForm');
  const errorBox = document.getElementById('loginError');
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
    submitBtn.textContent = isLoading ? 'SIGNING IN…' : 'SIGN IN';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearError();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    setLoading(true);

    VYBEauth
      .login({ email: email, password: password })
      .then(function (account) {
        // Persist a "logged in" banner so the destination page can greet the user.
        try {
          window.localStorage.setItem('vybe-login-toast', 'signed-in:' + account.name);
        } catch (_) {}
        window.location.href = '../profile.html';
      })
      .catch(function (err) {
        showError(err.message || 'Sign in failed. Please try again.');
        setLoading(false);
      });
  });
})();