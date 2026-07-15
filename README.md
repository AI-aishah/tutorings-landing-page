# Tutorings Landing Page

A dependency-free storytelling landing page for Tutorings, an English and IELTS tutoring platform. The page moves learners from recognition of their challenge through a personalized learning path, a clear tutoring process, reasons to trust Tutorings, future outcomes, and a final booking invitation.

## Technology stack

- Semantic HTML5
- Native CSS with custom-property design tokens
- Native JavaScript ES modules
- Google Fonts for Manrope, with system-font fallbacks
- No framework, package manager, build step, or runtime dependency

## Project structure

```text
.
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── sections.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   └── animations.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── svg/
├── DESIGN_DECISIONS.md
├── PROJECT_AUDIT.md
└── README.md
```

## Run locally

No package installation is required. From the project directory, start a static server:

```bash
python -m http.server 8000
```

If `python` is not available as that command, use:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

Serving over HTTP is recommended because the JavaScript entry point uses native ES-module imports.

## CSS responsibilities

- `variables.css`: brand colors, typography, spacing, layout, motion, shadows, radii, and layering tokens.
- `base.css`: reset, document defaults, typography, forms, focus treatment, and accessibility utilities.
- `layout.css`: containers, section spacing, shared layout primitives, and typography helpers.
- `components.css`: buttons, navigation, cards, badges, icon wrappers, and shared content components.
- `sections.css`: the visual treatment for each landing-page section and the footer.
- `animations.css`: entrance states, path drawing, timeline states, and reduced-motion overrides.
- `responsive.css`: organized breakpoint adaptations at 1200px, 992px, 768px, and 480px.

## JavaScript responsibilities

- `main.js`: initializes page features and inserts the current footer year.
- `navigation.js`: navbar scroll state and accessible mobile-menu behavior.
- `animations.js`: one-time section reveals and requestAnimationFrame-throttled timeline progress.

## Content and asset maintenance

The Success Stories section in `index.html` intentionally contains clearly labeled sample testimonials and verified-result placeholders. Replace the three testimonial stories, student details, and two result entries only after Tutorings supplies approved data. Keep the visible development note until all placeholder content is verified.

The logo currently references the official remote Tutorings asset in the header, hero path, and footer. To remove that network dependency, place an optimized logo in `assets/images/` or `assets/svg/` and update all three `src` references in `index.html`. Preserve meaningful `alt="Tutorings"` text for linked brand logos and an empty `alt` for the decorative hero-path logo.

## Accessibility and motion

The page includes a skip link, semantic landmarks, logical headings, visible keyboard focus, accessible mobile navigation, descriptive link text, decorative-image treatment, and labeled placeholder content. Motion is progressive enhancement: `prefers-reduced-motion: reduce` displays content and paths in their completed states without staged movement or floating effects.

## Deployment

Deploy the project root to any static host, such as GitHub Pages, Cloudflare Pages, Netlify, an object-storage static website, or a conventional web server. No build command is required; publish `index.html` together with the `css/`, `js/`, and `assets/` directories. Configure HTTPS, compression, and appropriate cache headers in the chosen hosting platform.
