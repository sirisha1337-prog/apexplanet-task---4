# Task 4 — ApexPlanet Internship
### Personal Portfolio · To-Do Application · Product Listing Page

A single, framework-free front-end submission built with **HTML5, CSS3 and
Vanilla JavaScript (ES6+)** only — no Bootstrap, Tailwind, React, Vue, or
Angular anywhere in the stack.

The three required mini-projects are linked together into one cohesive
experience: the portfolio's **Projects** section links out to the To-Do App
and the Product Catalog, and every page shares the same design system
(`style.css`) and dark/light theme.

---

## 🔗 Pages

| Page | File | Description |
|---|---|---|
| Personal Portfolio | `index.html` | Hero, About, Skills, Projects, Education, Contact, Footer |
| To-Do Application | `todo.html` | Full task manager with search, filters & persistence |
| Product Listing Page | `products.html` | 24-product catalog with search, filters & sorting |

---

## 📁 Project Structure

```
Task-4/
│── index.html        # Portfolio markup
│── todo.html          # To-Do app markup
│── products.html      # Product listing markup
│── style.css          # Shared design tokens + portfolio styles
│── todo.css           # To-Do app styles (extends style.css)
│── products.css       # Product listing styles (extends style.css)
│── script.js          # Portfolio logic (nav, theme, reveal, contact form)
│── todo.js            # To-Do app logic (CRUD, search, filter, storage)
│── products.js        # Product catalog logic (data, filters, sort)
│── assets/
│     ├── images/
│     ├── icons/
│     └── screenshots/
└── README.md
```

> The original brief listed a single `style.css` / `script.js` pair. Because
> this submission bundles **three** distinct applications, each app's
> page-specific styles/logic live in their own file (`todo.css`/`todo.js`,
> `products.css`/`products.js`) while all shared tokens, resets, and
> components (navbar, buttons, chrome-window frame, scroll-to-top, etc.)
> stay centralized in `style.css`, which every page imports first.

---

## 1. Personal Portfolio Website (`index.html`)

**Design concept — "Editor Chrome":** as a front-end developer's own
workspace is a code editor, the signature visual motif is a faux
browser/editor window (`.chrome`) used around the hero code snippet and
every project card — tying the visual language directly to the subject.

**Features**
- Responsive glassmorphic navbar with scroll-spy active states & mobile hamburger menu
- Hero section with an animated "typed code" card and live stats
- About, Skills (animated progress bars), Projects, Education (timeline) and Contact sections
- Contact form with client-side validation and inline status messages
- Smooth scrolling via `scroll-behavior: smooth` + anchor links
- Scroll-triggered reveal animations using `IntersectionObserver`
- Dark / Light mode toggle, persisted in `localStorage`, respects OS preference on first visit
- Scroll-to-top button that fades in after scrolling

## 2. To-Do Application (`todo.html`)

- Add, edit (inline), delete and complete tasks
- Live search across task text
- Filter tabs: **All / Active / Completed**
- Persistent storage via `localStorage` (survives refresh/close)
- Live task counter ("X tasks left") and a "Clear completed" action
- Empty-state messaging, delete animation, fully responsive layout
- Built with event delegation on the task list (one listener handles
  toggle/edit/save/delete for every item)

## 3. Product Listing Page (`products.html`)

- **24 products** across 6 categories (exceeds the 20-product minimum)
- Each card shows image, name, category, price, star rating and description
- Live search across name + description
- Filters: category, price range, minimum rating
- Sort modes: Price Low→High, Price High→Low, Rating, Name A→Z, Name Z→A
- "Reset all filters" control and a live result counter
- "Add to Cart" micro-interaction persisted to `localStorage`

---

## 🎨 UI / CSS Highlights

- **CSS Variables** for a full theme-token system (colors, type, radius, easing)
- **Glassmorphism** navbar (`backdrop-filter: blur()`) and translucent cards
- **Gradient backgrounds** in the hero, buttons and accent text
- **CSS Grid + Flexbox** throughout (skills grid, project grid, product grid, forms)
- **Keyframe animations**: blinking cursor, scroll cue, card/item entrance, skill bars
- **Hover & transform effects** on every interactive surface (cards, buttons, nav links)
- **Custom scrollbar** styling
- Fully responsive: desktop, tablet (≤980px) and mobile (≤760px / ≤480px) breakpoints
- Respects `prefers-reduced-motion` and ships visible keyboard focus states

## ⚙️ JavaScript Highlights

- ES6+ (arrow functions, template literals, destructuring, spread/rest, optional chaining)
- Each file is wrapped in an IIFE and organized into small, named, reusable functions
  (`initTheme`, `initNav`, `renderProducts`, `getFilteredProducts`, etc.)
- DOM manipulation is done via lightweight `$`/`$$` query helpers
- **Event delegation** is used on the to-do list and product grid so dynamically
  rendered items never need individual listeners
- All `localStorage` reads/writes are wrapped in `try/catch` with console error logging
- State (filters, theme, tasks, cart) flows through plain JS objects/arrays — no globals leak

---

## ▶️ Running the project

No build step or dependencies are required.

1. Download / clone the `Task-4` folder.
2. Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).
3. Navigate to the To-Do App and Product Catalog via the navbar/footer links.

---

## ✅ Requirement Checklist

- [x] Pure HTML5 / CSS3 / Vanilla JS — no frameworks
- [x] Portfolio: nav, hero, about, skills, projects, education, contact, footer
- [x] Portfolio: smooth scrolling, scroll animations, dark/light mode, scroll-to-top
- [x] To-Do: add / edit / delete / complete / search / filter / counter / Local Storage
- [x] Products: 24 products, full card data, search, category/price/rating filters, 5 sort modes
- [x] Glassmorphism, gradients, hover & transform effects, responsive grid/flex layouts
- [x] CSS variables, media queries, keyframe animations, custom scrollbar
- [x] ES6+, modular functions, DOM manipulation, event delegation, error handling

---

**Author:** Aarav Mehta — ApexPlanet Software Internship, Task 4
