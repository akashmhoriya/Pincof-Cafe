# PINCOF — Specialty Coffee Roasters & Café
### High-Performance Frontend Website with React 19, Vite, Tailwind CSS & GSAP

PINCOF is a high-performance, standalone frontend portfolio web application crafted with an editorial luxury aesthetic, custom typography, advanced GSAP animations, and an optimized client-side data architecture.

---

## ☕ Key Highlights

- **Pure Frontend Architecture**: Zero external backend or database setup required. Runs out of the box with `npm install` and `npm run dev`.
- **Optimized Client-Side Data Engine**:
  - **Menu Service (`src/services/menuService.js`)**: In-memory query engine featuring O(1) indexed ID lookups, instant multi-category filtering, keyword search, and dietary preference filters with zero network latency.
  - **Contact & Reservation Service (`src/services/contactService.js`)**: Client-side form validation (email regex, field sanitization), realistic micro-delay simulation (350ms) for smooth GSAP feedback, and persistent storage in browser `localStorage`.
  - **Lightweight Footprint**: Removed heavy HTTP libraries (`axios`), saving ~58 kB of bundle overhead.
- **Aesthetic & Brand System**: Warm espresso brown, dark obsidian, caramel tones, and cream palettes paired with *Cormorant Garamond* and *Plus Jakarta Sans* editorial typography.
- **GSAP Animation Engine**:
  - Initial loading sequence with SVG coffee bean path drawing and brand mark reveal
  - Smooth magnetic desktop follower cursor with interaction awareness and magnetic button pull
  - Full-screen pinned horizontal scroll section for the architectural roastery experience
  - Split-screen mask reveal for the café introduction
  - Live numerical counters triggered by GSAP ScrollTrigger
  - Cinematic multi-layer page transition route wipes
  - Staggered entrance animations for menu cards and navigation drawers
- **Responsive & Accessible Design**:
  - Full support for 390px mobile, 768px tablet, and 1440px+ ultrawide viewports
  - Mobile fullscreen drawer navigation with body-scroll prevention
  - `prefers-reduced-motion` compliance
  - Dynamic SEO meta titles and descriptions per route

---

## 📁 Project Architecture

```
Pincof-Coffee-Cafe/
│
├── public/
│   ├── favicon.svg                 # Custom coffee bean brand mark
│   └── icons.svg                   # Brand asset icons
│
├── src/
│   ├── animations/                 # Reusable GSAP & ScrollTrigger utilities
│   │   ├── counter.js              # Numerical count-up animations
│   │   ├── imageReveal.js          # Masking & scale reveals
│   │   ├── magnetic.js             # Magnetic cursor button hover physics
│   │   ├── menuAnimations.js       # Staggered card filters
│   │   ├── pageTransition.js       # Cinematic route transitions
│   │   ├── parallax.js             # Pinned sections & parallax scrub
│   │   ├── textReveal.js           # Line-by-line editorial reveals
│   │   └── tilt.js                 # 3D interactive tilt effect
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── AromaSteam.jsx          # Ambient canvas coffee steam effect
│   │   ├── Button.jsx              # Magnetic & luxury variant button
│   │   ├── ContactForm.jsx         # Validated form with GSAP success states
│   │   ├── CustomCursor.jsx        # Smooth follower cursor
│   │   ├── Footer.jsx              # Editorial footer with hours & newsletter
│   │   ├── Gallery.jsx             # Asymmetric editorial photo grid
│   │   ├── Icons.jsx               # Custom SVG brand icons
│   │   ├── LoadingScreen.jsx       # Coffee bean SVG loading screen
│   │   ├── MenuCard.jsx            # Product card with zoom & badge tags
│   │   ├── MenuFilter.jsx          # Category filter pill selector
│   │   ├── MobileMenu.jsx          # Fullscreen mobile drawer navigation
│   │   ├── Navbar.jsx              # Glassmorphic scroll-reactive navbar
│   │   ├── PageTransition.jsx      # Route transition wipe overlay
│   │   ├── RoastProfileDial.jsx    # Interactive SVG roast selector dial
│   │   ├── SectionHeading.jsx      # Editorial typography section headings
│   │   ├── StatCounter.jsx         # Animated counter item
│   │   └── TestimonialCard.jsx     # Editorial quote card
│   │
│   ├── data/                       # Structured client-side datasets
│   │   ├── cafeInfo.js             # Café address, telephone, hours & social links
│   │   ├── menuData.js             # 21 curated artisan menu items
│   │   ├── testimonials.js         # Guest critiques & publications
│   │   └── timeline.js             # Heritage milestones
│   │
│   ├── hooks/
│   │   ├── useDocumentTitle.js     # Route title & meta description updater
│   │   └── useScrollDirection.js   # Navbar auto-hide on downward scroll
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Editorial hero, showcase, philosophy, gallery
│   │   ├── Menu.jsx                # Instant filterable artisan coffee & food menu
│   │   ├── About.jsx               # Roastery heritage, craft & brewing dials
│   │   ├── Contact.jsx             # Location, hours & reservation inquiries
│   │   ├── PrivacyPolicy.jsx       # Data privacy notice
│   │   ├── TermsConditions.jsx     # Café policies & booking terms
│   │   └── NotFound.jsx            # Custom 404 page
│   │
│   ├── services/                   # High-performance client-side services
│   │   ├── api.js                  # Unified service export interface
│   │   ├── menuService.js          # In-memory search, filter & ID lookup
│   │   └── contactService.js       # Client validation & localStorage store
│   │
│   ├── App.jsx                     # Route definitions & Suspense boundaries
│   ├── index.css                   # Tailwind directives & design tokens
│   └── main.jsx                    # Application entry point
│
├── index.html                      # HTML root template with web fonts
├── package.json                    # Project dependencies & scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Theme colors, fonts & keyframe animations
└── vite.config.js                  # Vite configuration with chunk splitting
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Clone & Install
```bash
# Navigate to the project directory
cd Pincof-Coffee-Cafe

# Install dependencies
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🚀 Deployment

Because this project is a standalone, optimized single-page application (SPA), it can be deployed with zero backend configuration on any static hosting platform:

- **Vercel**: Import repository -> Framework: `Vite` -> Build Command: `npm run build` -> Output Directory: `dist`
- **Netlify**: Build Command: `npm run build` -> Publish Directory: `dist`
- **GitHub Pages / Cloudflare Pages**: Connect repo and set output to `dist`.

---

## 📄 License
ISC © PINCOF Coffee Roasters
