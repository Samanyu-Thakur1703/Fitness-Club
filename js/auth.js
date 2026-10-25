/* ===========================================================================
 * js/auth.js — THE VYBE authentication logic
 * ---------------------------------------------------------------------------
 * Responsibilities:
 *   - Hash passwords with SHA-256 + a per-account salt before persisting.
 *   - Verify credentials against stored hashes.
 *   - Maintain the current session in memory (and a lightweight flag in
 *     localStorage so a refresh keeps the user signed in).
 *   - Expose helpers the UI calls: register(), login(), logout(),
 *     getCurrentUser(),_signedIn().
 * =========================================================================== */

(function (global) {
  'use strict';

  const SESSION_KEY = 'vybe-session'; // stores the logged-in account id

  /* ---------- hashing ---------------------------------------------------- */

  /**
   * sha256Hex(str) -> Promise<string>
   * Uses the browser's SubtleCrypto API. Returns a hex digest. The
   * Promise wrapper keeps the signature uniform with the storage layer.
   */
  function sha256Hex(str) {
    return global.crypto.subtle
      .digest('SHA-256', new TextEncoder().encode(str))
      .then(function (buf) {
        return Array.prototype.map
          .call(new Uint8Array(buf), function (b) {
            return b.toString(16).padStart(2, '0');
          })
          .join('');
      });
  }

  /**
   * hashPassword(password, salt) -> Promise<string>
   * Combines the salt and password before hashing so identical passwords
   * never produce identical stored hashes.
   */
  function hashPassword(password, salt) {
    return sha256Hex(salt + ':' + password);
  }

  /* ---------- session ---------------------------------------------------- */

  /** currentSession() -> account object or null. */
  function currentSession() {
    const id = global.localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    return global.VYBEstorage.findById(id);
  }

  /** persistSignedIn(account) -> void */
  function persistSignedIn(account) {
    global.localStorage.setItem(SESSION_KEY, account.id);
  }

  /** clearSession() -> void */
  function clearSession() {
    global.localStorage.removeItem(SESSION_KEY);
  }

  /* ---------- public API ------------------------------------------------- */

  /**
   * register({ email, password, name }) -> Promise<account>
   * Rejects on duplicate email, weak password, or storage failure.
   */
  function register(credentials) {
    const email = String(credentials.email || '').trim();
    const password = String(credentials.password || '');
    const name = String(credentials.name || '').trim();

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return Promise.reject(new Error('Please enter a valid email address.'));
    }
    if (password.length < 8) {
      return Promise.reject(new Error('Password must be at least 8 characters.'));
    }
    if (!name) {
      return Promise.reject(new Error('Please enter your full name.'));
    }

    const salt = 'vybe-salt-' + Math.random().toString(36).slice(2, 10);

    return hashPassword(password, salt).then(function (hash) {
      const account = {
        id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        email: email,
        passwordHash: hash,
        passwordSalt: salt,
        name: name,
        createdAt: new Date().toISOString(),
        memberSince: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
      };
      return global.VYBEstorage.addAccount(account);
    });
  }

  /**
   * login({ email, password }) -> Promise<account>
   * Rejects when the email is unknown or the password hash does not match.
   */
  function login(credentials) {
    const email = String(credentials.email || '').trim();
    const password = String(credentials.password || '');

    if (!email || !password) {
      return Promise.reject(new Error('Email and password are required.'));
    }

    return global.VYBEstorage.byEmail(email).then(function (account) {
      if (!account) {
        return Promise.reject(new Error('No account found with that email.'));
      }
      return hashPassword(password, account.passwordSalt).then(function (hash) {
        if (hash !== account.passwordHash) {
          return Promise.reject(new Error('Incorrect password.'));
        }
        persistSignedIn(account);
        return account;
      });
    });
  }

  /** logout() -> Promise<void> */
  function logout() {
    return new Promise(function (resolve) {
      clearSession();
      resolve();
    });
  }

  /** signedIn() -> Promise<account|null> */
  function signedIn() {
    return Promise.resolve(currentSession());
  }

  /* ---------- public API ------------------------------------------------- */
  global.VYBEauth = {
    register: register,
    login: login,
    logout: logout,
    signedIn: signedIn,
    SESSION_KEY: SESSION_KEY
  };
})(window);