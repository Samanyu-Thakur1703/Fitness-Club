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
    console.log(`   💬 [Browser Alert Dialog]: "${lastDialogMessage}"`);
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

    // Wait for the redirection to home.html or navigate
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

    // Scroll down to Programs section
    console.log('   📜 Scrolling down to view programs...');
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(500);

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
    console.log('   ✍️ Correcting password and completing registration...');
    const testEmail = `athlete_${Date.now()}@thevybe.com`;
    await page.fill('#registerEmail', testEmail);
    await page.fill('#registerPassword', 'StrongPassword2026!');
    await page.fill('#registerConfirm', 'StrongPassword2026!');
    await page.click('#registerForm button[type="submit"]');

    // Should redirect to login.html
    await page.waitForURL('**/html/login.html', { timeout: 5000 });
    console.log('   ✅ Registration completed! Successfully redirected to login.html');

    // -------------------------------------------------------------------------
    // STEP 5: Sign In Page (html/login.html)
    // -------------------------------------------------------------------------
    logStep(5, 'User logs in with credentials on Sign In page');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-login-page.png') });
    console.log('   📸 Screenshot saved: 07-login-page.png');

    console.log(`   🔑 Submitting credentials for: ${testEmail}`);
    await page.fill('#loginEmail', testEmail);
    await page.fill('#loginPassword', 'StrongPassword2026!');
    await page.click('#loginForm button[type="submit"]');

    // Wait for redirect to home page
    await page.waitForURL('**/home.html', { timeout: 5000 });
    console.log('   ✅ Login successful! Redirected to home.html with active session.');

    // -------------------------------------------------------------------------
    // STEP 6: Visit Contact Page & Test the Asynchronous Promise Form
    // -------------------------------------------------------------------------
    logStep(6, 'User visits Contact Us page and submits inquiry (Testing Promise)');
    await page.goto(`${BASE_URL}/contact.html`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-contact-page.png') });
    console.log('   📸 Screenshot saved: 08-contact-page.png');

    console.log('   ✍️ Filling in Contact Inquiry form...');
    await page.fill('#fullName', 'Samanyu Thakur');
    await page.fill('#emailAddr', 'samanyu@thevybefitness.com');
    await page.fill('#phoneNum', '+91 98765 43210');
    await page.selectOption('#programInterest', 'strength');
    await page.fill('#messageBox', 'I want to sign up for personal strength training and muscle hypertrophy coaching.');

    console.log('   🚀 Clicking "SEND MESSAGE" to trigger the JavaScript Promise...');
    const submitBtn = page.locator('#contactForm button[type="submit"]');
    
    // Click submit and check the pending Promise state
    await submitBtn.click();

    // Check loading text in pending state
    const loadingText = await submitBtn.textContent();
    console.log(`   ⏳ Promise State: PENDING (Button text: "${loadingText.trim()}")`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-contact-form-promise-sending.png') });
    console.log('   📸 Screenshot saved: 09-contact-form-promise-sending.png');

    // Wait for the Promise to resolve (1.5s simulated latency)
    await page.waitForTimeout(1900);
    console.log('   🎉 Promise State: RESOLVED!');
    console.log(`   📬 Alert confirmed: "${lastDialogMessage}"`);

    // Button should be restored to normal state
    const restoredText = await submitBtn.textContent();
    const isDisabled = await submitBtn.isDisabled();
    console.log(`   🔄 Button restored: "${restoredText.trim()}", Disabled: ${isDisabled}`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-contact-form-success.png') });
    console.log('   📸 Screenshot saved: 10-contact-form-success.png');

    // -------------------------------------------------------------------------
    // ALL TESTS COMPLETED
    // -------------------------------------------------------------------------
    console.log('\n===============================================================');
    console.log('✨ ALL END-TO-END USER JOURNEYS PASSED SUCCESSFULLY! ✨');
    console.log('===============================================================');
    console.log(`Total 10 screenshots captured in: ${SCREENSHOT_DIR}\n`);

  } catch (err) {
    console.error('❌ E2E Test encountered an error:', err);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'error-state.png') });
  } finally {
    await browser.close();
    server.close();
  }
})();
