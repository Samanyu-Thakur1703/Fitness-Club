CSS HELPER GUIDE FOR THE FITNESS CLUB LANDING PAGE

This helper file explains the CSS structure and the key properties used.

1. Global reset and base styling (`style.css`)
- `*, *::before, *::after { box-sizing: border-box; }`: ensures all elements calculate size consistently.
- `html, body { margin: 0; padding: 0; }`: removes default page spacing.
- `font-family: Inter, system-ui, sans-serif;`: base typography for the site.
- `a { text-decoration: none; }` and `button { font: inherit; }`: normalize link and button styling.
- `header { position: fixed; top: 0; left: 0; right: 0; }`: pins the nav bar to the top.
- `main { padding-top: 100px; }`: creates space for the fixed header.

2. Navigation styles (`style.css`)
- `nav { display: flex; align-items: center; justify-content: space-between; }`: horizontal layout.
- `.nav-links { display: flex; gap: 1.5rem; }`: spaces nav links.
- `#logoutBtn { background: #00796b; color: #ffffff; }`: styled logout button.

3. Hero section layout (`home.css`)
- `#hero { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2rem; }`: uses a 12-column grid system.
- `.hero-copy { grid-column: 1 / span 6; }`: left-side content spans 6 columns.
- `.hero-image { grid-column: 7 / span 6; }`: image area spans the remaining 6 columns.
- `clamp(2.7rem, 4vw, 5rem)`: fluid heading sizing across devices.

4. Programs grid layout (`home.css`)
- `.programs-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1.5rem; }`: 12-column grid wrapper.
- `.programs-grid article { grid-column: span 3; }`: each card spans 3 columns, producing 4 cards in a row.
- `box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);`: adds soft card depth.

5. Footer layout (`home.css`)
- `footer { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2rem; }`: footer content is also arranged on a grid.
- `#about-us { grid-column: span 5; }` and `#contact-us { grid-column: span 7; }`: balanced footer sections.

6. Responsive behavior (`home.css`)
- `@media (max-width: 960px)`: adjusts layout for tablets.
  - Hero becomes single-column.
  - Program cards span 6 columns.
  - Footer sections stack vertically.
- `@media (max-width: 650px)`: improves mobile layout.
  - Navigation wraps.
  - Program cards span full width.

7. Path notes
- The hero background image uses the relative path `../images/hero-overlay.png` inside `home.css` because CSS is in the `css` folder.
- All other images are also referenced from `./images/` in the HTML.

8. Implementation tips
- Use the 12-column grid system consistently for layout sections.
- Keep the fixed header height in mind when positioning page content.
- Use `gap` instead of margins between grid items for cleaner spacing.
- Use rounded corners and shadows to create a polished card appearance.
