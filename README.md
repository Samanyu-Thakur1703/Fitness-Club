# 🏋️‍♂️ Fitness Club Website

A responsive, semantic HTML5/CSS3 frontend architecture built for a modern Fitness Club. Designed with clean modular layout principles using relative file paths to ensure seamless future migration to **React** and **DBMS (SQL / MongoDB)** integration.

---

## 📌 Features & Functional Requirements

### 1. Navigation Bar (Global Header)
* **Position:** Fixed to the top (`position: fixed; top: 0; width: 100%`) so it never scrolls out of view.
* **Semantic Tag:** Built using `<header>` and `<nav>`.
* **Navigation Links:**
  * **Home:** Points to relative path `./index.html` (or `../index.html` from subfolders).
  * **Sign In (Login):** Includes email/password fields, CAPTCHA verification, and a "Forgot Password?" link.
  * **Sign Up (Register):** Full registration form with CAPTCHA verification and password confirmation.
  * **Log Out:** Redirects the user to `index.html` while triggering a visible toast banner: *"You have been successfully logged out."*

### 2. Home Page (`index.html`)
* **Hero Banner & Features:** Built using `<main>`, `<section>`, and `<article>` tags.
* **Semantic Structure:** Complete separation of header, main body, sections, side content, and footer.

### 3. Footer Section (Home Page)
* **Semantic Tag:** Built using `<footer>`.
* **About Us:** Highlighting club history, mission, and facilities.
* **Contact Us Form:** User feedback and enquiry form with name, email, subject, and message inputs.

---

## 📁 Directory & File Architecture

```text
fitness-club/
├── index.html                   # Landing / Home Page
├── README.md                    # Project Documentation
├── css/
│   ├── style.css                # Global & Navigation Layout
│   ├── home.css                 # Home Page Custom Styles
│   └── auth.css                 # Forms, Modals & Auth Styles
├── js/
│   ├── main.js                  # Logout notification & general scripts
│   └── captcha.js               # Captcha generation / validation logic
├── html/
│   ├── login.html               # Sign In Page
│   ├── register.html            # Sign Up / Registration Page
│   └── forgot-password.html     # Account Recovery Page
└── images/                      # Visual Assets
    ├── logo.png
    └── hero-bg.jpg
