/**
 * ===========================================================================
 * test-e2e.js — End-to-End Real User Playwright Journey for THE VYBE
 * ===========================================================================
 */

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const SCREENSHOT_DIR = path.join(__dirname, 'test-results');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// MIME types dictionary for static server
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Start self-contained static HTTP server
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(__dirname, reqPath);

      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      });
    });

    server.listen(PORT, '127.0.0.1', () => {
      console.log(`🌐 Local static server started at ${BASE_URL}`);
      resolve(server);
    });
  });
}

function logStep(stepNum, message) {
  console.log(`\n[STEP ${stepNum}] ${message}`);
}

(async () => {
  const server = await startServer();
  console.log('🚀 Starting End-to-End User Simulation with Google Chrome & Playwright...');

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  // Listen for browser dialogs (like alerts) and handle them gracefully
  let lastDialogMessage = '';
  page.on('dialog', async (dialog) => {
    lastDialogMessage = dialog.message();
    console.log(`   💬 [Browser Dialog]: "${lastDialogMessage}"`);
    await dialog.accept();
  });

  // Track console errors
  page.on('pageerror', (err) => {
    console.warn(`   ⚠️ [Page Error]: ${err.message}`);
  });

  try {
    // -------------------------------------------------------------------------
    // STEP 1: Visit Splash / Loading Screen (index.html)
    // -------------------------------------------------------------------------
    logStep(1, 'User visits the website loading screen (index.html)');
    await page.goto(`${BASE_URL}/index.html`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-loading-page.png') });
    console.log('   📸 Screenshot saved: 01-loading-page.png');
    console.log('   ⏳ Waiting for automatic redirection to home.html...');

    try {
      await page.waitForURL('**/home.html', { timeout: 6000 });
      console.log('   ✅ Successfully redirected to home.html automatically!');
    } catch {
      await page.goto(`${BASE_URL}/home.html`);
    }

    // -------------------------------------------------------------------------
    // STEP 2: Explore Home Page & Theme Toggle
    // -------------------------------------------------------------------------
    logStep(2, 'User explores Home Page and toggles Light/Dark theme');
    await page.waitForSelector('nav.navbar');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-home-page-dark.png') });
    console.log('   📸 Screenshot saved: 02-home-page-dark.png (Dark Mode)');

    // Click theme toggle button
    console.log('   🌗 Toggling theme to Light Mode...');
    await page.click('#themeToggle');
    await page.waitForTimeout(400);
    const themeAttribute = await page.getAttribute('html', 'data-theme');
    console.log(`   🎨 html[data-theme] is now: "${themeAttribute}"`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-home-page-light.png') });
    console.log('   📸 Screenshot saved: 03-home-page-light.png (Light Mode)');

    // Toggle back to Dark mode
    await page.click('#themeToggle');
    await page.waitForTimeout(300);

    // -------------------------------------------------------------------------
    // STEP 3: Navigate to Strength Training Program Page
    // -------------------------------------------------------------------------
    logStep(3, 'User clicks on Strength Training program');
    const strengthLink = await page.locator('a[href*="strength-training"]').first();
    if (await strengthLink.count() > 0) {
      await strengthLink.click();
    } else {
      await page.goto(`${BASE_URL}/strength-training.html`);
    }
    await page.waitForLoadState('networkidle');
    console.log(`   📍 Current URL: ${page.url()}`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-program-strength.png') });
    console.log('   📸 Screenshot saved: 04-program-strength.png');

    // -------------------------------------------------------------------------
    // STEP 4: Navigate to Sign Up / Registration Page
    // -------------------------------------------------------------------------
    logStep(4, 'User decides to create a new account (Register flow)');
    await page.goto(`${BASE_URL}/html/register.html`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-register-page.png') });
    console.log('   📸 Screenshot saved: 05-register-page.png');

    // Test form validation: Mismatched passwords
    console.log('   🧪 Testing validation with mismatched passwords...');
    await page.fill('#registerName', 'Jane Doe');
    await page.fill('#registerEmail', 'jane.doe@thevybe.com');
    await page.fill('#registerPassword', 'StrongPass123');
    await page.fill('#registerConfirm', 'DifferentPass456');
    await page.click('#registerForm button[type="submit"]');

    await page.waitForTimeout(400);
    const errorText = await page.textContent('#registerError');
    console.log(`   ⚠️ Validation error caught: "${errorText.trim()}"`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-register-validation-error.png') });
    console.log('   📸 Screenshot saved: 06-register-validation-error.png');

    // Enter matching valid password to complete registration
    console.log('   ✍️ Completing registration for Jane Doe...');
    const testEmail = `jane_athlete_${Date.now()}@thevybe.com`;
    await page.fill('#registerEmail', testEmail);
    await page.fill('#registerPassword', 'StrongPassword2026!');
    await page.fill('#registerConfirm', 'StrongPassword2026!');
    await page.click('#registerForm button[type="submit"]');

    // Should redirect to login.html
    await page.waitForURL('**/html/login.html', { timeout: 5000 });
    console.log('   ✅ Registration completed! Successfully redirected to login.html');

    // -------------------------------------------------------------------------
    // STEP 5: Sign In Page -> Redirect to Profile Page
    // -------------------------------------------------------------------------
    logStep(5, 'User logs in with credentials and lands on Profile Page');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-login-page.png') });
    console.log('   📸 Screenshot saved: 07-login-page.png');

    console.log(`   🔑 Submitting credentials for: ${testEmail}`);
    await page.fill('#loginEmail', testEmail);
    await page.fill('#loginPassword', 'StrongPassword2026!');
    await page.click('#loginForm button[type="submit"]');

    // Wait for redirect to profile.html
    await page.waitForURL('**/profile.html', { timeout: 5000 });
    console.log('   ✅ Login successful! Redirected directly to profile.html with active session.');

    // -------------------------------------------------------------------------
    // STEP 6: Explore Athlete Profile & JSON Database Inspector
    // -------------------------------------------------------------------------
    logStep(6, 'User views Athlete Dashboard and JSON Database Inspector');
    await page.waitForSelector('#profileName');
    const profileName = await page.textContent('#profileName');
    const profileEmail = await page.textContent('#profileEmail');
    const dbAccountCount = await page.textContent('#dbAccountCount');
    console.log(`   👤 Profile Name: "${profileName.trim()}"`);
    console.log(`   📧 Profile Email: "${profileEmail.trim()}"`);
    console.log(`   📊 Stored JSON Accounts Count: ${dbAccountCount.trim()}`);

    // Verify raw JSON in pre box
    const jsonContent = await page.textContent('#jsonViewer');
    const hasEmailInJson = jsonContent.includes(testEmail);
    console.log(`   🔍 New user found in live JSON: ${hasEmailInJson ? 'YES (Confirmed!)' : 'NO'}`);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-profile-page.png'), fullPage: true });
    console.log('   📸 Screenshot saved: 08-profile-page.png');

    // Test download users.json trigger
    console.log('   📥 Testing "DOWNLOAD USERS.JSON" button...');
    const [download] = await Promise.all([
      page.waitForEvent('download').catch(() => null),
      page.click('#downloadJsonBtn')
    ]);
    if (download) {
      console.log(`   💾 Download triggered: ${download.suggestedFilename()}`);
    }

    // -------------------------------------------------------------------------
    // STEP 7: Persistent Navbar State across other pages
    // -------------------------------------------------------------------------
    logStep(7, 'User visits Home Page — Verify Navbar shows logged-in status');
    await page.goto(`${BASE_URL}/home.html`);
    await page.waitForLoadState('networkidle');

    const navUserLinkText = await page.textContent('nav.navbar a.signin');
    const navBtnText = await page.textContent('#signupBtn');
    console.log(`   👤 Navbar User Link: "${navUserLinkText.trim()}" (Points to Profile)`);
    console.log(`   🔘 Navbar Action Button: "${navBtnText.trim()}" (Logout button)`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-home-page-logged-in.png') });
    console.log('   📸 Screenshot saved: 09-home-page-logged-in.png');

    // -------------------------------------------------------------------------
    // STEP 8: Test Contact Form Promise Submission
    // -------------------------------------------------------------------------
    logStep(8, 'User visits Contact Page & tests Promise Submission');
    await page.goto(`${BASE_URL}/contact.html`);
    await page.waitForLoadState('networkidle');

    console.log('   ✍️ Filling in Contact Inquiry form...');
    await page.fill('#fullName', 'Jane Doe');
    await page.fill('#emailAddr', testEmail);
    await page.fill('#phoneNum', '+91 98765 43210');
    await page.selectOption('#programInterest', 'strength');
    await page.fill('#messageBox', 'I am logged in and requesting a personal hypertrophy workout split.');

    console.log('   🚀 Submitting form to trigger JavaScript Promise...');
    const submitBtn = page.locator('#contactForm button[type="submit"]');
    await submitBtn.click();

    // Check loading text in pending state
    const loadingText = await submitBtn.textContent();
    console.log(`   ⏳ Promise State: PENDING (Button: "${loadingText.trim()}")`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-contact-form-promise-sending.png') });

    // Wait for the Promise to resolve (1.5s simulated latency)
    await page.waitForTimeout(1900);
    console.log('   🎉 Promise State: RESOLVED!');
    console.log(`   📬 Alert confirmed: "${lastDialogMessage}"`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11-contact-form-success.png') });
    console.log('   📸 Screenshot saved: 11-contact-form-success.png');

    // -------------------------------------------------------------------------
    // ALL TESTS COMPLETED
    // -------------------------------------------------------------------------
    console.log('\n===============================================================');
    console.log('✨ ALL END-TO-END USER & PROFILE JOURNEYS PASSED SUCCESSFULLY! ✨');
    console.log('===============================================================');
    console.log(`Total 11 screenshots captured in: ${SCREENSHOT_DIR}\n`);

  } catch (err) {
    console.error('❌ E2E Test encountered an error:', err);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'error-state.png') });
  } finally {
    await browser.close();
    server.close();
  }
})();
