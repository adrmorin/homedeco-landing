# HOMEDECO · Landing page (React + Vite)

Luxury landing page for HOMEDECO LLC. HTML5 + CSS + JavaScript (React 18), built with Vite.
Language: American English. CTA: call +1 (754) 210-1105. Slogan: "Luxury, shaped by light."

## Run
    npm install
    npm run dev        # development at http://localhost:5173
    npm run build      # production build in /dist (works from any folder or subpath)
    npm run preview    # preview the build

## Structure
- `src/App.jsx`  page markup, carousel state and autoplay
- `src/data.js`  the 13 projects (commercial names, descriptions, photo order), gallery and process steps
- `src/styles.css`  animations (buttons, pebbles, slats, FAQ) with prefers-reduced-motion support
- `public/images/`  photos (p01a... = project 01, photo a, in before/after order) and logo

## Edit
- Phone: prop `phone` in `src/main.jsx` (`<App phone="..." />`) and the `tel:+17542101105` links in `App.jsx`.
- Footer city: Miami, Florida.
- Fonts load from Google Fonts (Cormorant Garamond, Montserrat, Inter).

## Pending before going live
Confirm client permission to publish each photo, "before" photos for 10 of 13 projects, LLC state and license, service area, and the US trademark check for the slogan.
