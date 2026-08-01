HELP LANDING PAGE IMPLEMENTATION GUIDE

This guide helps you build the Fitness Club home page in `index.html`.
It is written so you can type the HTML, CSS, and JS yourself using the required structure.

1. REQUIRED FILES AND ORGANIZED FOLDER STRUCTURE

- Home landing page: `index.html` in the project root folder.
- CSS files:
  - `./css/style.css` for global styling and fixed navigation styles.
  - `./css/home.css` for home page specific layout and section styles.
- JavaScript file:
  - `./js/main.js` for behavior such as logout feedback.
- Images folder:
  - Place assets in `./images/` and reference them with relative paths only.
- Sub-pages folder:
  - Put login and register pages inside `./html/`.
  - `./html/login.html` for Sign In.
  - `./html/register.html` for Sign Up.

2. SEMANTIC HTML5 STRUCTURE FOR `index.html`

Your page should follow this semantic hierarchy:

- `<header>`
  - Contains a fixed top `<nav>` bar.
- `<main>`
  - Contains the landing page core sections:
    - `<section id="hero">` for the main headline and banner.
    - `<section id="programs">` for the fitness program cards.
- `<footer>`
  - Contains two sections:
    - `<section id="about-us">` for about-us content.
    - `<section id="contact-us">` for the footer contact form.

3. NAVIGATION BAR REQUIREMENTS

- The nav bar must be fixed at the top of the page and should not scroll with content.
- Use semantic `<nav>` inside `<header>`.
- Include these links/items:
  - Home (links to `index.html`)
  - Sign In (links to `./html/login.html`)
  - Sign Up (links to `./html/register.html`)
  - Log Out (a button or clickable element handled by JS)
- Use relative paths only, for example `./html/login.html` and `./html/register.html`.
- The fixed nav should remain visible while the page content scrolls under it.

4. SIGN IN / SIGN UP NAV LINK DETAILS

- `Sign In` goes to `./html/login.html`.
- `Sign Up` goes to `./html/register.html`.
- Both pages should include:
  - a login/register form on their own page
  - a "Forget Password" option on the Sign In page
  - a captcha field or placeholder for captcha on both pages
- The landing page itself does not need these fields, but must link to the correct pages.

5. LOGOUT BEHAVIOR ON `index.html`

- Add a `Log Out` control in the nav bar.
- In `./js/main.js`, write JavaScript that:
  - listens for the logout click
  - prevents any unwanted navigation if needed
  - displays a message on `index.html`:
    - "You have been successfully logged out"
  - keeps the user on the home page
- The logout message can be shown as a banner, toast, or visible status block.

6. PROGRAMS GRID SECTION

- Inside `<main>`, create `<section id="programs">`.
- Add a grid wrapper for the program cards.
- Use a 12-column CSS Grid system in `home.css`.
- Create exactly four `<article>` cards.
- Each card should include:
  - a program title
  - a short description
  - an image or icon from `./images/`
  - an optional action label or highlight
- The cards should be responsive, with the grid adjusting for smaller screens.

7. FOOTER REQUIREMENTS

- Add a `<footer>` after `<main>`.
- Include two semantic sections:
  - `<section id="about-us">` for the club description.
  - `<section id="contact-us">` for the contact form.
- The contact form should include:
  - `name` input field
  - `email` input field
  - `subject` input field
  - `message` textarea field
  - a submit button
- All inputs should have corresponding `<label>` elements.

8. RELATIVE PATH RULES

- Every path in the page must use relative references only.
- Examples:
  - `./css/style.css`
  - `./css/home.css`
  - `./js/main.js`
  - `./images/your-image.jpg`
  - `./html/login.html`
  - `./html/register.html`
- Do not use absolute or network paths anywhere in the HTML/CSS/JS.

9. STEP-BY-STEP IMPLEMENTATION WORKFLOW

Step 1: Create the page shell
- Create `index.html` in the project root.
- Add `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.
- Add metadata and the two stylesheet links in `<head>`.
- Add a script reference to `./js/main.js` at the end of `<body>`.

Self-Check:
- Is `index.html` in the root folder, not nested incorrectly?
- Are both CSS files linked with `./css/...` paths?
- Is the JS file linked using `./js/main.js`?
- Is the HTML document valid with `<!DOCTYPE html>`?

Step 2: Build the fixed navigation
- Inside `<body>`, add `<header>`.
- Inside `<header>`, add `<nav>`.
- Add a logo anchor or brand name that links to `index.html`.
- Add nav links for Home, Sign In, Sign Up, and Log Out.
- Make the nav fixed with CSS and ensure the page content starts below it.

Self-Check:
- Is `<nav>` nested inside `<header>`?
- Do Home, Sign In, and Sign Up use relative links only?
- Is Log Out a separate button or clickable element?
- Does the nav remain fixed at the top when the page scrolls?

Step 3: Add the hero section
- Add `<main>` after the header.
- Add `<section id="hero">` inside `<main>`.
- Add a bold headline, supporting text, and a CTA.
- Add a hero image from `./images/`.

Self-Check:
- Is hero content inside `<section id="hero">`?
- Are images referenced via `./images/`?
- Can the hero section be styled separately in `home.css`?
- Does the hero feel like the main landing message?

Step 4: Add the programs section
- Under the hero section, add `<section id="programs">`.
- Add a grid container around the cards.
- Create four `<article>` elements.
- Put title, description, and an image/icon inside each article.

Self-Check:
- Are there exactly four cards inside the `programs` section?
- Is the wrapper prepared for a 12-column grid layout?
- Are the cards semantic `<article>` elements?
- Can these cards be arranged with CSS Grid?

Step 5: Add the footer and contact form
- Add `<footer>` after `</main>`.
- Add `<section id="about-us">` with a short description.
- Add `<section id="contact-us">` that contains the contact form.
- Add labels and fields for name, email, subject, message, and submit.

Self-Check:
- Is the footer semantic with two sections?
- Does the contact form include every required field?
- Are labels present for each input?
- Is the footer only on the home page?

Step 6: Implement logout message behavior
- In `./js/main.js`, select the logout control by a unique ID or class.
- Add a click listener.
- Create or reveal a message block that says:
  - "You have been successfully logged out"
- Keep the user on `index.html` and avoid redirecting away.

Self-Check:
- Does the logout element have a unique selector?
- Does the JS show the exact logout text?
- Does `index.html` remain displayed after logout?
- Can you style the banner/toast from CSS?

Step 7: Verify folder organization and paths
- Confirm `index.html` uses only relative paths.
- Confirm CSS files are in `./css/`.
- Confirm JS file is in `./js/`.
- Confirm images are in `./images/`.
- Confirm sub-pages are in `./html/`.

Self-Check:
- Are all folders separate and organized correctly?
- Are no absolute paths used anywhere?
- Are scripts and styles joined via relative pathing?
- Is the home page purely in `index.html` with linked assets?

10. NOTES

- The Sign In and Sign Up pages themselves should be built in `./html/login.html` and `./html/register.html`.
- The `login.html` page should include a "Forget Password" option and a captcha placeholder.
- The `register.html` page should also include a captcha placeholder.
- The landing page only needs to link to those pages; it does not need the login/register forms directly.

Use this guide to type your landing page step by step. Follow the checklists after each step to audit your structure and relative paths.