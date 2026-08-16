# Bandage — E-Commerce

A responsive e-commerce landing page and shopping cart built for the Learnable
25.26 Frontend Standardisation Test. The layout is implemented from the provided Figma designs
and the product catalogue is served live from the DummyJSON API.

**Live site:** https://learnablelst.netlify.app

**Repository:** https://github.com/jxsteve/learnable-lst

---

## Tech stack

| Concern          | Choice                                  |
| ---------------- | --------------------------------------- |
| Framework        | React 19 + Vite 8                       |
| Language         | TypeScript                              |
| Styling          | Vanilla CSS (one stylesheet per component) |
| State management | Redux Toolkit                           |
| Data fetching    | RTK Query                               |
| Linting          | oxlint                                  |

No CSS framework or component library is used; every style in the project is
hand-written CSS driven by custom properties.

---

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+ (developed on Node 24)
- npm

### Install

```bash
git clone https://github.com/jxsteve/learnable-lst.git
cd learnable-lst
npm install
```

### Run locally

```bash
npm run dev
```

Vite prints a local URL (`http://localhost:5173` by default). The app fetches
products from the public DummyJSON API, so an internet connection is needed for
the product grid to populate.

### Other scripts

```bash
npm run build     # type-check with tsc, then produce a production build in dist/
npm run preview   # serve the built output locally
npm run lint      # run oxlint
```

---

## Deployment

The site is a static build and deploys to Netlify directly from this repository.

| Setting            | Value           |
| ------------------ | --------------- |
| Build command      | `npm run build` |
| Publish directory  | `dist`          |
| Node version       | 20 or later     |

To deploy: connect the repository in Netlify, apply the settings above, and
deploy the `main` branch. No environment variables are required — the API is
public and its base URL is set in `src/features/products/productsApi.ts`.

---

## Project structure

```
src/
├── app/            store configuration and typed Redux hooks
├── assets/         icons and images exported from Figma
├── components/     one folder per component, each with its own stylesheet
├── features/
│   ├── cart/       cart slice and selectors
│   ├── products/   RTK Query API definition
│   └── wishlist/   wishlist slice and selectors
├── hooks/          shared hooks
├── pages/          route-level pages (landing, cart)
├── styles/         global reset and design tokens
├── types/          shared TypeScript types
└── utils/          formatting helpers
```

Components are grouped by folder rather than by file type so that a component's
markup and styles sit together. State lives under `features/`, following the
Redux Toolkit convention of one slice per domain.

---

## Design tokens

`src/styles/global.css` holds the colours, type scale and container widths as CSS
custom properties, taken from the Figma variables. Components reference the
tokens rather than hard-coding values, so the two stay in step.

The page uses two distinct kits, because the brief supplies two separate design
files:

- **Landing page** — Montserrat, with the `--color-*` palette.
- **Product card** — Rubik, with its own greys, exposed as `--card-*` tokens.

They are deliberately kept separate rather than merged into one palette.

---

## API integration

Products come from [DummyJSON](https://dummyjson.com/docs/products) via RTK Query.

- **Field selection.** The list request sends `?select=` with only the fields the
  card renders, which removes roughly 40% of each response.
- **Pagination.** "Load more" pages with `skip` and merges each page into a single
  cache entry, so a page fetches only the next ten products instead of
  re-requesting everything. Loading 40 products transfers about 35 KB rather than
  148 KB.
- **Caching.** Pages are held for five minutes, and `setupListeners` is wired up so
  a request that failed while offline retries on reconnect.
- **States.** The grid renders skeletons while loading and offers a retry control
  if the request fails.

`ProductSummary` is the type describing exactly what `select` returns, and the
select list is derived from its keys so the two cannot drift apart.

---

## Implementation notes and assumptions

**Scope.** The brief's final instruction is to build the landing page; a shopping
cart page is included as well, since the opening question asks for one and the
Functionality criteria grade cart behaviour. `react-router-dom` provides the two
routes, and `public/_redirects` gives Netlify the SPA fallback so `/cart` resolves
on a direct visit.

**Prices.** DummyJSON quotes `price` before the available discount, so the amount
shown as payable is derived as `price × (1 − discountPercentage / 100)`. Prices
are formatted in USD, matching the API's own currency, rather than the euro shown
in the card mockup. `src/utils/format.ts` is the single place to change this.

**Missing brand.** Roughly half of the catalogue has no `brand` field, so the card
falls back to `category`. `brand` is typed as optional to reflect this.

**Second product image.** The card crossfades to an alternate shot on hover. Around
60% of products ship a second image; where there is none, the crossfade is skipped
rather than fading the card to blank.

**Card footer.** The mockup grows the card from 442px to 482px on hover to reveal
"Add to basket". The space is reserved at all times instead, so the grid does not
reflow under the cursor. Hover-only controls are always visible on touch devices,
which have no hover state to reveal them.

**Testimonials gallery.** The Figma frame clips the 3×3 image grid to 426px of
460px of content, cutting the bottom row of photographs. This is treated as an
artefact of the mockup and the tiles render in full.

**Product grid columns.** The landing page frame lays out five 183px product tiles.
The separate product card design is 300px wide, so the grid follows the card and
fits four columns at desktop width. The two files cannot both be satisfied.

**Navigation.** Nav items scroll to sections on the page. "Pages" has no natural
counterpart on a single-page site and points at the call-to-action section.
Footer and social links are placeholders (`href="#"`), as no destinations are
specified.

**Cart persistence.** The basket and wishlist are written to localStorage and
restored on start-up, so a refresh does not empty the cart. Reads are validated
and guarded, so corrupt or unavailable storage falls back to an empty state
rather than failing. The add-to-basket notification is deliberately not
persisted, being transient.

**Quantity stepper.** Stepping down stops at 1 rather than deleting the line;
removal has its own REMOVE control in the design, and a stepper that silently
deletes is easy to trigger by accident.

**Cart.** Adding to the basket updates the header count and shows the confirmation
notification from the design. The header cart icon links to `/cart`, which
implements the cart design: line items with stock and rating, quantity steppers,
per-line removal, an order summary and an empty state. Subtotals are summed from
unrounded prices and formatted once, so quantity does not accumulate rounding
error.

**Related products.** The cart page suggests more items from the category of the
first product in the cart, via `/products/category/{slug}`, excluding anything
already in the cart. The design shows a static grid; driving it from the cart's
own contents makes the section meaningful.

**Cart currency.** The cart design prices in Naira. Amounts are shown in USD to
match what the API actually returns; only the symbol differs from the mockup.

**Delivery charges.** The summary shows the design's "add your delivery address"
note and excludes delivery from the total, as no address capture exists.

**Wishlist.** Liking a product is held in its own slice; the heart fills and the
header counter reflects the total.

**Responsiveness.** The layout is verified free of horizontal overflow at 320,
768, 1024 and 1440px. The stylesheets are authored desktop-first, using
`max-width` breakpoints, rather than mobile-first with `min-width`; the
responsive behaviour is equivalent, but inverting the breakpoints would better
match a mobile-first brief and is the first thing I would change with more time.

---

## Accessibility

- A single visible focus ring, shown for keyboard users only.
- Interactive controls carry accessible names; the wishlist toggle exposes
  `aria-pressed`, and live counters are announced politely.
- Decorative images use empty `alt`; meaningful images are described.
- `prefers-reduced-motion` disables animation and smooth scrolling.
- Verified free of horizontal overflow at 320, 768, 1024 and 1440px.
