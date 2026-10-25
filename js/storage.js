/* ===========================================================================
 * js/storage.js — THE VYBE persistence layer
 * ---------------------------------------------------------------------------
 * Backing store : window.localStorage (key "vybe-users")
 * Data shape    : { "users": [ {...}, ... ] }  — a plain JSON object
 * API           : every public function returns a Promise, so callers can
 *                 use .then() / async-await uniformly. Reads are resolved
 *                 synchronously wrapped in a Promise for a single consistent
 *                 contract; writes always complete before the promise resolves.
 *
 * Seed file      : data/users.json (loaded once on first visit when
 *                 localStorage is empty, so the demo account ships with the app).
 * =========================================================================== */

(function (global) {
  'use strict';

  const STORAGE_KEY = 'vybe-users';
  const SEED_PATH = '../data/users.json';

  /** Read the raw JSON string from localStorage, or null when absent. */
  function readRaw() {
    return window.localStorage.getItem(STORAGE_KEY);
  }

  /** Parse the stored JSON into a working in-memory object. */
  function parseStore(raw) {
    if (!raw) return null;
    try {
      const data = JSON.parse(raw);
      return data && Array.isArray(data.users) ? data : null;
    } catch (_) {
      return null; // corrupt store — treat as missing and re-seed
    }
  }

  /** Serialise the store object back to a localStorage string. */
  function writeRaw(store) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  /** Load the seed JSON shipped with the app (used only on first visit). */
  function loadSeed() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', SEED_PATH, true);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            reject(new Error('Seed data is not valid JSON.'));
          }
        } else {
          reject(new Error('Seed data could not be loaded (HTTP ' + xhr.status + ').'));
        }
      };
      xhr.onerror = function () {
        reject(new Error('Seed data could not be loaded (network error).'));
      };
      xhr.send();
    });
  }

  /**
   * ensureSeed() — guarantees the store exists.
   * If localStorage is empty, fetch the seed file and persist it. The
   * returned Promise resolves with the live store object either way.
   */
  function ensureSeed() {
    const existing = parseStore(readRaw());
    if (existing) return Promise.resolve(existing);
    return loadSeed().then(function (seed) {
      writeRaw(seed);
      return seed;
    });
  }

  /**
   * getStore() — Promise that resolves with a fresh copy of the current
   * store object. Always goes through ensureSeed first so a brand-new
   * browser gets the demo account seeded automatically.
   */
  function getStore() {
    return ensureSeed().then(function () {
      return parseStore(readRaw());
    });
  }

  /**
   * saveStore(store) — Promise that persists the given store object to
   * localStorage. Resolves with the store after the write completes.
   */
  function saveStore(store) {
    return new Promise(function (resolve) {
      writeRaw(store);
      resolve(store);
    });
  }

  /* ---- Account-level helpers (all Promise-based) ------------------------ */

  /** byEmail(email) -> Promise<account|null> (case-insensitive match). */
  function byEmail(email) {
    return getStore().then(function (store) {
      const target = String(email).trim().toLowerCase();
      return store.users.find(function (u) {
        return u.email.toLowerCase() === target;
      }) || null;
    });
  }

  /** findById(id) -> Promise<account|null>. */
  function findById(id) {
    return getStore().then(function (store) {
      return store.users.find(function (u) {
        return u.id === id;
      }) || null;
    });
  }

  /**
   * addAccount(account) -> Promise<account>
   * Rejects when the email is already registered. The caller supplies a
   * fully-formed record (id, email, passwordHash, passwordSalt, name,
   * createdAt, memberSince).
   */
  function addAccount(account) {
    return getStore().then(function (store) {
      const target = account.email.trim().toLowerCase();
      const duplicate = store.users.find(function (u) {
        return u.email.toLowerCase() === target;
      });
      if (duplicate) {
        return Promise.reject(new Error('An account with that email already exists.'));
      }
      store.users.push(account);
      return saveStore(store).then(function () {
        return account;
      });
    });
  }

  /** Public API. */
  global.VYBEstorage = {
    STORAGE_KEY: STORAGE_KEY,
    getStore: getStore,
    byEmail: byEmail,
    findById: findById,
    addAccount: addAccount,
    // expose internals for tests / debugging
    _parseStore: parseStore,
    _readRaw: readRaw
  };
})(window);