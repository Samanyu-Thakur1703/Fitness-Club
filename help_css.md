# 📘 Comprehensive CSS & Viva Preparation Guide (`help_css.md`)
**Project:** THE VYBE - Fitness Club Multi-Page Website  
**Aesthetic:** Royal Champagne Gold & Obsidian Luxury Athletic Theme  
**Architecture:** Mobile-First Responsive Design using Direct, Semantic CSS3 (Zero `-webkit-` vendor prefixes, zero `:root` / CSS Variables)

---

## 📑 Table of Contents
1. [Multi-Page Architecture & Overview](#1-multi-page-architecture--overview)
2. [Color Palette Reference (Direct Hex & RGBA)](#2-color-palette-reference-direct-hex--rgba)
3. [HTML5 Semantic Tags & Multi-Page Structure](#3-html5-semantic-tags--multi-page-structure)
4. [Classes & ID Selectors Across All Pages](#4-classes--id-selectors-across-all-pages)
5. [CSS Pseudo-Classes & Pseudo-Elements](#5-css-pseudo-classes--pseudo-elements)
6. [Layout Models: Flexbox, CSS Grid & Forms](#6-layout-models-flexbox-css-grid--forms)
7. [Mobile-First Responsive Design & Media Queries](#7-mobile-first-responsive-design--media-queries)
8. [Why No `-webkit-` Vendor Prefixes or `:root` Variables Were Used](#8-why-no--webkit--vendor-prefixes-or-root-variables-were-used)
9. [🎓 College Viva Exam: Questions & Answers Cheat Sheet](#9--college-viva-exam-questions--answers-cheat-sheet)

---

## 1. Multi-Page Architecture & Overview

The project is structured as a complete, multi-page fitness club platform:

| Webpage | File Name | Purpose & Features |
| :--- | :--- | :--- |
| **Loading Page** | `index.html` | Preloader screen with logo pulse and progress bar auto-redirect |
| **Home Page** | `home.html` | Hero banner, program cards overview, quick contact strip, global footer |
| **Strength Training** | `strength-training.html` | Power & hypertrophy breakdown, 4-day workout routine, coach spotlight, pricing |
| **Cardio Fitness** | `cardio-fitness.html` | HIIT & heart-rate zone conditioning, endurance schedule, calorie metrics |
| **Flexibility & Mobility** | `flexibility-mobility.html` | Restorative yoga, joint mobility flow, postural alignment, recovery lounge |
| **Nutrition Coaching** | `nutrition-coaching.html` | Macro planning, sports nutritionist guidance, 4-phase transformation roadmap |
| **Contact Us** | `contact.html` | Interactive inquiry form, club operating hours, directions, location, FAQs |

---

## 2. Color Palette Reference (Direct Hex & RGBA)

| Color Name | Hex / RGBA Value | Role / Usage in Project |
| :--- | :--- | :--- |
| **Obsidian Dark** | `#0d0e12` | Default page body and footer background |
| **Charcoal Surface** | `#14161e` | Stats bar, contact banner, and section background |
| **Card Surface (Dark)** | `rgba(22, 25, 35, 0.85)` | Glassmorphism container for program, form, and info cards |
| **Card Hover (Dark)** | `rgba(28, 32, 45, 0.95)` | Interactive card background on mouse hover |
| **Ivory Pearl** | `#f5efe6` | Primary high-contrast body text in dark mode |
| **Warm Sand / Slate** | `#c8c0b5` | Secondary descriptive text in dark mode |
| **Champagne Gold** | `#d4af37` | Primary luxury metallic gold accent and headings |
| **Light Champagne** | `#f3e5ab` | Taglines, badges, and card subheadings |
| **Gold 3-Stop Gradient** | `linear-gradient(135deg, #f5dfa2 0%, #d4af37 50%, #9e782f 100%)` | Metallic gradient for buttons and progress fill |
| **Silk Cream (Light)** | `#f9f6f0` | Light theme body background |
| **Warm Linen (Light)** | `#f0eae1` | Light theme secondary surface |
| **Deep Slate (Light)** | `#18191f` | Light theme primary text |
| **Burnished Gold (Light)**| `#b38728` | Light theme gold accent and headings |

---

## 3. HTML5 Semantic Tags & Multi-Page Structure

- **`<header>` & `<nav>`**: Shared across all pages. Contains brand logo, desktop navigation links (`home.html#hero`, `home.html#programs`, `contact.html`), native mobile hamburger `<details>`, and theme toggle button.
- **`<main>`**: Primary container for page-specific content with top padding offset (`68px` on mobile, `80px` on desktop) to prevent overlap with the fixed navbar.
- **`<section>`**: Logical page blocks (Hero banners, stats bars, overview grids, schedule routines, pricing matrices, FAQ sections).
- **`<article>`**: Self-contained cards (`.program-card`, `.schedule-card`, `.pricing-card`, `.faq-card`).
- **`<form>`**: Contact form containing `<input>`, `<select>`, `<textarea>`, and `<button type="submit">`.
- **`<footer>`**: Unified footer with branding, motivational tagline, and copyright.

---

## 4. Classes & ID Selectors Across All Pages

### Global Navigation & Header
- **`.site-header`**: Fixed navbar (`position: fixed; top: 0; width: 100%; z-index: 1000`).
- **`.navbar`**: Centered flex container (`max-width: 1320px; justify-content: space-between`).
- **`.logo`**: Anchor combining the logo image and styled "VYBE" title.
- **`.desktop-nav`**: Horizontal navigation bar (`display: none` on mobile, `display: flex` on `>= 992px`).
- **`.mobile-menu`**: Native `<details>` dropdown container for mobile devices.
- **`.menu-button`**: Circular `<summary>` trigger with 48px touch target area.
- **`#themeToggle`**: Theme switch button displaying the Sun SVG in dark mode and Moon SVG in light mode.

### Program Pages Selectors (`program.css`)
- **`.program-hero`**: Hero banner with specific background images (`.strength-bg`, `.cardio-bg`, `.flexibility-bg`, `.nutrition-bg`).
- **`.stats-bar-section` & `.stats-grid`**: 4-column responsive metrics bar (Intensity, Duration, Schedule, Level).
- **`.overview-grid`**: 2-column layout pairing description & benefits with equipment specs.
- **`.schedule-cards-grid` & `.schedule-card`**: Timeline matrix displaying weekly workout routines.
- **`.coach-card`**: Trainer spotlight with circular avatar, credentials, and bio.
- **`.pricing-grid` & `.pricing-card`**: 3-tier membership packages (Drop-In, Monthly Unlimited, VIP Coaching).
- **`.program-cta-banner`**: High-impact bottom conversion banner.

### Contact Page Selectors (`contact.css`)
- **`.contact-hero-banner`**: Header section for the contact page.
- **`.contact-layout-grid`**: 2-column responsive layout (Form on left, Info on right).
- **`.form-control`**: Standardized input, select, and textarea elements with gold focus ring.
- **`.form-submit-btn`**: Full-width gold gradient submission button.
- **`.hours-table` & `.hours-row`**: Clean table layout for gym opening and closing times.
- **`.faq-grid` & `.faq-card`**: 2-column grid answering common prospective member questions.

---

## 5. CSS Pseudo-Classes & Pseudo-Elements

| Selector | Usage & Explanation |
| :--- | :--- |
| `*`, `*::before`, `*::after` | Universal reset establishing `box-sizing: border-box`, `margin: 0`, and `padding: 0`. |
| `[data-theme="light"]` | Attribute selector activated on `<html>` when light mode is toggled. |
| `.mobile-menu[open]` | Selects `<details>` when open to transform hamburger lines into an 'X'. |
| `:focus-visible` / `:focus` | Keyboard accessibility ring (`outline: 2px solid #d4af37` or `#b38728`). |
| `:hover` | Micro-interactions: card elevation (`transform: translateY(-4px)`), button glow, link underline animations. |
| `summary::marker` | Uses standard CSS `display: none;` to hide default browser disclosure bullets without `-webkit-` hacks. |

---

## 6. Layout Models: Flexbox, CSS Grid & Forms

1. **Flexbox (1-Dimensional)**:
   - Used for navigation bars, hero text vertical centering, badge pills, coach profile layout, and footer content.
2. **CSS Grid (2-Dimensional)**:
   - Used for the Programs Grid (`1fr` ➔ `repeat(2, 1fr)` ➔ `repeat(4, 1fr)`).
   - Used for Stats bars, Schedule routines, Pricing tables, and the 2-column Contact layout.
3. **Responsive Forms**:
   - Built using a flexible grid system (`.form-row`) that stacks fields vertically on mobile and expands to a 2-column side-by-side layout on tablets and desktop screens.

---

## 7. Mobile-First Responsive Design & Media Queries

```css
/* Base Styles: Smartphones (< 640px) */
/* Single column layouts, 100% width cards, hamburger dropdown */

/* Small Tablets & Large Phones (>= 640px) */
@media (min-width: 640px) {
  .stats-grid { grid-template-columns: repeat(4, 1fr); }
  .schedule-cards-grid { grid-template-columns: repeat(2, 1fr); }
  .pricing-grid { grid-template-columns: repeat(3, 1fr); }
  .form-row { grid-template-columns: repeat(2, 1fr); }
  .faq-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Tablets & Small Laptops (>= 768px) */
@media (min-width: 768px) {
  main { padding-top: 80px; }
  .overview-grid { grid-template-columns: 1.2fr 0.8fr; }
  .coach-card { flex-direction: row; text-align: left; }
}

/* Desktop Monitors (>= 992px / 1024px) */
@media (min-width: 992px) {
  .mobile-menu { display: none; }
  .desktop-nav { display: flex; }
  .contact-layout-grid { grid-template-columns: 1.2fr 0.8fr; }
}
```

---

## 8. Why No `-webkit-` Vendor Prefixes or `:root` Variables Were Used

1. **Simplicity & Directness**: Standard CSS properties like `color: #d4af37;`, `list-style: none;`, and `backdrop-filter: blur(14px);` are natively supported by all modern browsers without experimental `-webkit-` vendor prefixes.
2. **Viva Readiness**: In college viva examinations, professors often ask students to explain the exact mechanics of their code. Using direct, standard CSS properties makes every line obvious, readable, and easy to explain with total confidence.

---

## 9. 🎓 College Viva Exam: Questions & Answers Cheat Sheet

### Q1: What is the CSS Box Model?
> **Answer:** The CSS Box Model describes how elements are rendered as rectangular boxes composed of **Content**, **Padding**, **Border**, and **Margin**. We apply `box-sizing: border-box` globally so that padding and border are calculated within the declared width, preventing unexpected layout overflows.

### Q2: Why is the website designed with a "Mobile-First" approach?
> **Answer:** Mobile-First means writing the base CSS rules for small mobile devices first without media queries. We then use `min-width` media queries (e.g., `@media (min-width: 992px)`) to add styles as screen width expands. This provides optimal performance and cleaner, progressive enhancement.

### Q3: How do you choose between Flexbox and CSS Grid?
> **Answer:** We use **Flexbox** for **1-dimensional** directional layouts (such as the header navbar, hero copy column, and footer) and **CSS Grid** for **2-dimensional** matrix layouts (such as the 4-column program grid, schedule cards, pricing tables, and contact form columns).

### Q4: How does the Dark / Light mode toggle work across pages?
> **Answer:** 
> 1. JavaScript reads the user's preference or `localStorage`.
> 2. Clicking the `#themeToggle` button adds or removes the `data-theme="light"` attribute on the `<html>` element.
> 3. CSS attribute selectors like `[data-theme="light"] body` and `[data-theme="light"] .form-container` override surface and text colors cleanly with smooth transitions.

### Q5: How is form validation handled in `contact.html`?
> **Answer:** Standard HTML5 validation attributes (`required`, `type="email"`, `type="tel"`) ensure valid data entry natively in the browser, while JavaScript handles the `submit` event with `e.preventDefault()`, displays an inquiry confirmation alert, and resets the form.
