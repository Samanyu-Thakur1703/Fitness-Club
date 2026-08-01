HTML HELPER GUIDE FOR THE FITNESS CLUB LANDING PAGE

This helper file explains the HTML tags used, where they are used, and why.

1. Page shell and root tags
- `<!DOCTYPE html>`: declares HTML5.
- `<html lang="en">`: root element with language.
- `<head>`: contains metadata, title, and CSS links.
- `<body>`: contains visible content and the script link.

2. Header and navigation
- `<header>`: wraps the fixed navigation area.
- `<nav>`: contains navigation links and buttons.
- `<a class="logo" href="index.html">`: logo link back to the home page.
- `<ul class="nav-links">`: groups navigation links as list items.
- `<button id="logoutBtn">`: logout control handled by JS.

3. Main content
- `<main>`: holds the main landing content.
- `<section id="hero">`: hero section with headline, text, CTA, and image.
  - `.hero-copy`: left side text content.
  - `.hero-image`: right side hero image.
- `<section id="programs">`: program cards section.
  - `.programs-grid`: grid container for the program `<article>` cards.
  - `<article>`: one semantic card for each fitness program.

4. Footer content
- `<footer>`: bottom page area.
- `<section id="about-us">`: short club description.
- `<section id="contact-us">`: contact form section.
- `<form>`: form container for user messages.
  - `<label>`: accessible text label for each input.
  - `<input>`: fields for name, email, subject.
  - `<textarea>`: field for the message.
  - `<button type="submit">`: submit button.

5. Relative paths used in HTML
- CSS files: `./css/style.css`, `./css/home.css`
- JS file: `./js/main.js`
- Images: `./images/hero-banner.jpg`, `./images/program-strength.jpg`, `./images/program-cardio.jpg`, `./images/program-flexibility.jpg`, `./images/program-nutrition.jpg`
- Sub pages: `./html/login.html`, `./html/register.html`

6. Notes
- The nav is fixed at the top, so the page content begins below it.
- All paths are relative and do not use absolute or external URLs.
- The program cards use `<article>` tags to keep the section semantic.
