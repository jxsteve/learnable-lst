# Bandage

An e-commerce landing page and shopping cart, built from Figma designs for the
Learnable 25.26 Frontend Standardisation Test. Products are pulled live from the
DummyJSON API.

**Live:** https://learnablelst.netlify.app
**Repo:** https://github.com/jxsteve/learnable-lst

## Stack

React 19 + Vite, TypeScript, vanilla CSS, Redux Toolkit and RTK Query. No CSS
framework or component library — every style here is hand-written.

## Running it

Needs Node 20.19+ (I used Node 24).

```bash
git clone https://github.com/jxsteve/learnable-lst.git
cd learnable-lst
npm install
npm run dev
```

The product grid needs an internet connection, since it fetches from DummyJSON.

```bash
npm run build     # type-check, then build to dist/
npm run preview   # serve the build locally
npm run lint      # oxlint
```

## Deploying

Static build, deployed on Netlify from `main`:

- Build command: `npm run build`
- Publish directory: `dist`

No environment variables — the API is public and its base URL lives in
`productsApi.ts`. `public/_redirects` holds the SPA fallback so `/cart` works on
a direct visit instead of 404ing.

## Structure

```
src/
├── app/         store, typed hooks, localStorage persistence
├── assets/      icons and images exported from Figma
├── components/  one folder per component, styles alongside
├── features/    cart, wishlist, products (RTK Query)
├── hooks/
├── pages/       LandingPage, CartPage
├── styles/      reset and design tokens
├── types/
└── utils/
```

Components keep their markup and CSS together. State is grouped by domain under
`features/`, one slice each.

## Design tokens

`styles/global.css` holds the colours, type scale and container widths as CSS
variables, taken from the Figma variables, so components reference tokens rather
than hardcoded values.

There are two sets, because the brief supplied two separate Figma files: the
landing page uses Montserrat with a `--color-*` palette, and the product card
uses Rubik with its own greys as `--card-*`. I kept them separate instead of
merging them into one palette.

## API

Three endpoints on one RTK Query API, all against DummyJSON.

**Only the fields I use.** The list request sends `?select=`, dropping
description, dimensions, warranty, shipping and the rest that never reach the
screen — about 40% off each response. `ProductSummary` describes exactly what
comes back, and the select list is derived from its keys so the two can't drift.

**Real pagination.** Load more pages with `skip` and merges each page into a
single cache entry, rather than growing `limit` and re-downloading everything you
already have. Forty products went from ~148 KB to ~35 KB. The merge de-duplicates
by id, because StrictMode double-invokes in development and would otherwise
append a page twice.

**Caching.** Pages are kept for five minutes, and `setupListeners` is called in
the store — without it `refetchOnReconnect` silently does nothing.

The grid shows skeletons while loading and a retry button if the request fails.

## Notes and assumptions

**Scope.** The brief's closing line says to build the landing page, but the
opening question asks for a cart page and the marking scheme grades cart
behaviour, so both are here.

**Prices.** DummyJSON quotes `price` before the discount, so the payable amount
is derived (`price × (1 − discountPercentage / 100)`). That calculation lives in
`utils/format.ts` so the card, the notification and the cart can't disagree.
Everything is shown in USD to match the data, even though the cart mockup is in
Naira — the layout matches, only the symbol differs.

**Missing data.** Roughly half the catalogue has no `brand`, so the card falls
back to `category` and the type marks it optional. About 60% of products have a
second image; the hover crossfade is skipped for the rest rather than fading the
card to blank.

**Where the two Figma files disagree.** The landing page lays out five 183px
product tiles, but the standalone product card design is 300px wide. I followed
the card, which fits four across. Similarly, the mockup grows the card on hover
to reveal "Add to basket" — I reserve that space permanently instead, so the grid
doesn't reflow under the cursor. Hover-only controls stay visible on touch, which
has no hover to reveal them.

**Things I read as mockup artefacts.** The testimonials frame clips the image
grid, cutting the bottom row of photos; the tiles render in full here.

**Cart behaviour.** Cart and wishlist persist to localStorage and restore on
start-up, so a refresh doesn't empty the basket — the read is shape-checked and
guarded, falling back to an empty cart if the stored value is unusable. Subtotals
are summed unrounded and formatted once, so quantity doesn't accumulate rounding
error. Stepping quantity down stops at 1: removal has its own control, and a
stepper that silently deletes is too easy to hit by accident.

**Related products** come from the category of the first item in the cart,
excluding anything already there. The mockup shows a static grid; driving it from
the cart makes the section do something.

**Placeholders.** Footer and social links are `href="#"`, and "Pages" in the nav
has no real counterpart on a two-page site, so it points at the CTA section.

## Accessibility

Keyboard-only focus rings, accessible names on every control, `aria-pressed` on
the wishlist toggle, empty `alt` on decorative images, and `prefers-reduced-motion`
honoured. Checked for horizontal overflow at 320, 768, 1024 and 1440px.

## What I'd change with more time

The stylesheets are desktop-first (`max-width` breakpoints). Behaviour is correct
at every width, but the brief asks for mobile-first and I'd invert them.

There are no tests. The price calculation and the cart reducers would be first —
pure functions with real edge cases.

Related products key off a single cart item, so a mixed basket only gets
suggestions for one category.
