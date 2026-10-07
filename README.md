# PINCOF — Specialty Coffee Roasters & Café
### High-Performance Editorial Web Application with React 19, Vite, Tailwind CSS, GSAP & Lenis

PINCOF is an artisanal specialty coffee café and roastery web application crafted with an editorial luxury aesthetic, custom typography, buttery smooth scrolling, advanced GSAP micro-interactions, and a clean, high-performance architecture.

---

## ☕ Key Highlights & Features

- **Inertial Smooth Scrolling (Lenis + GSAP ScrollTrigger)**:
  - Powered by **Lenis** (`lenis`) for momentum-based inertial scrolling across the entire site.
  - Synchronized directly into GSAP's central ticker (`gsap.ticker.add`) with `lagSmoothing(0)` to keep all parallax, pinned tracks, and reveal triggers in lockstep.
  - Intelligently pauses during the initial loading sequence, refreshes triggers on complete, and automatically resets scroll to top on route transitions.

- **Precision Layered Custom Cursor**:
  - Engineered with lightweight, hardware-accelerated `gsap.quickTo` setters.
  - **Dual-Tiered Inertia**: Precision inner pinpoint dot (`0.07s` smooth follow) and fluid outer follower ring (`0.24s` graceful trailing lag).
  - Razor-sharp hover states over buttons, links, and cards with zero backdrop blur or edge fringing.
  - Tactile `mousedown` feedback scaling and automatic touch-device detection.

- **Live Web3Forms Contact & Reservation System**:
  - Fully submittable form wired to the **Web3Forms** API (`https://api.web3forms.com/submit`).
  - Toast feedback powered by **React Hot Toast** (`react-hot-toast`) styled in PINCOF's signature dark espresso and caramel aesthetic.
  - **Minimalist Custom Dropdown**: Elegant, unified select component matching the form's glassmorphic text inputs without visual clutter.
  - **Browser Autofill Protection**: Robust CSS overrides in `index.css` preventing Chrome/Edge/Safari/Firefox from turning dark inputs white or pale blue upon autofill.

- **"The Chapters of Our Growth" Timeline Animation (`About.jsx`)**:
  - **Dynamic Scrubbed Golden Spine**: Vertical progress rail that dynamically draws downward as you scroll through the milestones.
  - **Milestone Bead Blooms**: Year marker beads illuminate with glowing caramel blooms (`boxShadow`, scale, and expanding pulse rings) as the golden line reaches them.
  - **Staggered Card & Photo Parallax Entrances**: Directional slide-ins with inner image parallax and crisp typography reveals.

- **Optimized Client-Side Menu Engine (`src/services/menuService.js`)**:
  - In-memory query engine featuring O(1) indexed ID lookups, instant multi-category filtering, keyword search, and dietary preference filters with zero network latency.

- **GSAP Motion System**:
  - Initial loading sequence with SVG coffee bean path drawing and brand mark reveal.
  - Full-screen pinned horizontal scroll section for the architectural roastery experience.
  - Live numerical stat counters triggered on scroll entrance.
  - Multi-layer cinematic page route transitions.
  - Magnetic button hover physics.

- **Responsive & Accessible Design**:
  - Tailored layouts for 390px mobile, 768px tablet, and 1440px+ ultrawide viewports.
  - Fullscreen mobile drawer navigation with body scroll lock.
  - Native `prefers-reduced-motion` compliance across all animation hooks and timelines.
  - Dynamic SEO meta titles and descriptions per route via `useDocumentTitle`.

---

## 📁 Clean Project Architecture

```
Pincof-Cafe/
│
├── public/
│   └── favicon.svg                 # Custom coffee bean brand mark
│
├── src/
│   ├── animations/                 # Active GSAP interaction utilities
│   │   ├── magnetic.js             # Magnetic cursor button hover physics
│   │   └── tilt.js                 # 3D interactive card tilt effect
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── AromaSteam.jsx          # Ambient canvas coffee steam effect
│   │   ├── Button.jsx              # Magnetic & luxury variant button
│   │   ├── ContactForm.jsx         # Web3Forms contact form with custom dropdown
│   │   ├── CustomCursor.jsx        # Dual-tiered smooth tracking follower cursor
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
│   │   ├── menuData.js             # Curated artisan menu collection
│   │   ├── testimonials.js         # Guest critiques & publications
│   │   └── timeline.js             # Heritage milestones
│   │
│   ├── hooks/
│   │   ├── useDocumentTitle.js     # Route title & meta description updater
│   │   ├── useScrollDirection.js   # Navbar auto-hide on downward scroll
│   │   └── useSmoothScroll.js      # Lenis smooth scrolling with GSAP ticker sync
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Editorial hero, showcase, philosophy, gallery
│   │   ├── Menu.jsx                # Instant filterable artisan coffee & food menu
│   │   ├── About.jsx               # Roastery heritage & animated growth timeline
│   │   ├── Contact.jsx             # Location, hours & reservation inquiries
│   │   ├── PrivacyPolicy.jsx       # Data privacy notice
│   │   ├── TermsConditions.jsx     # Café policies & booking terms
│   │   └── NotFound.jsx            # Custom 404 page
│   │
│   ├── services/
│   │   ├── api.js                  # Unified service export interface
│   │   └── menuService.js          # In-memory search, filter & ID lookup
│   │
│   ├── App.jsx                     # Route definitions, Lenis init & Toast container
│   ├── index.css                   # Tailwind directives, dark autofill & design tokens
│   └── main.jsx                    # Application entry point
│
├── index.html                      # HTML root template with Cormorant typography
├── package.json                    # Project dependencies & scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Theme colors, fonts & keyframe animations
├── vercel.json                     # SPA rewrite rules for production deployment
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

### 4. Code Quality & Linting
```bash
npm run lint
```
Runs `oxlint` for high-speed static analysis with zero warnings and zero errors.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🚀 Deployment

Because this project is an optimized single-page application (SPA), it can be deployed with zero backend configuration on any static hosting platform:

- **Vercel**: Import repository -> Framework: `Vite` -> Build Command: `npm run build` -> Output Directory: `dist` (SPA rewrites configured in `vercel.json`).
- **Netlify**: Build Command: `npm run build` -> Publish Directory: `dist`
- **Cloudflare Pages / GitHub Pages**: Connect repository and set build output to `dist`.

---

## 📄 License
ISC © PINCOF Coffee Roasters
