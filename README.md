# Cafe Corner — React Business Website

## Student and assignment

- **Student:** Maryam Imran
- **Roll number:** i242070
- **Section:** CY-5A
- **Course:** Web Programming
- **Assignment:** Assignment 02 — Business Website Development Using React

## Project overview

Cafe Corner is a fictional cafe website for students and nearby customers in Islamabad. It lets visitors browse a local menu, search and filter products, view item details, customize deals, build a cart, and complete a simulated pickup or delivery order.

- **Live website:** https://cafe-corner-rosy.vercel.app
- **GitHub repository:** https://github.com/maryamimran35/cafe-corner
- **Deployment:** Vercel
- **Current source commit:** `a4e1292d5174240185f334356f6a3ad5e6a4e15a`

## Main features

- React single-page application with browser routes and a shared navigation layout.
- 14 local menu records across Hot Drinks, Cold Drinks, Sweets & Bakery, Savoury, and Deals.
- Search, category filter, vegetarian-only filter, and sorting by menu order, price, or name.
- Parameterized product pages at `/items/:id`, including useful feedback for an unknown item ID.
- Deal customization with one required, deal-specific drink choice.
- Shared cart state with add, remove, and quantity controls.
- Cart persistence in browser `localStorage`, with validation when saved data is restored.
- Controlled checkout form with field-specific validation and a calculated order summary.
- Simulated order confirmation; no real payment or server-side order processing.
- Mock asynchronous menu loading, loading/error/empty states, and retry controls.
- Footer demo controls for simulating store time and menu-load outcomes.
- Responsive layout and semantic, keyboard-accessible controls.

## Business profile

Cafe Corner is a fictional cafe at Shop 4, Student Plaza, H-11 Markaz, Islamabad. Its intended audience is students and nearby customers looking for drinks, bakery items, savoury food, and value deals. The app demonstrates browsing and a simulated order journey. It does not connect to a live restaurant, payment gateway, or delivery service.

## Operating rules

1. **Item quantity / capacity:** A customer may order from 1 to 10 units of a menu item in one order. A quantity above 10 is rejected. Implemented in `src/utils/quantityRule.js` and enforced in `src/context/CartProvider.jsx`.
2. **Deal compatibility:** Each deal requires exactly one drink selected from that deal's allowed drink IDs. The Study Break Deal allows the listed hot drinks; Burger Combo allows the listed cold drinks. Invalid or missing choices cannot be added or placed. Implemented in `src/utils/dealRule.js`, `src/pages/ItemDetailsPage.jsx`, and `src/context/CartProvider.jsx`.
3. **Opening / fulfilment:** Orders are accepted from 9:00 AM through 10:30 PM inclusive. When closed, normal ordering is blocked and the next opening is shown. A customer can explicitly schedule for the next opening. Implemented in `src/data/storeInfo.js`, `src/utils/openingRule.js`, `src/context/StoreProvider.jsx`, `src/components/OpenStatus.jsx`, and `src/context/CartProvider.jsx`.

### Delivery and pickup pricing

- Pickup fee: Rs 0.
- Delivery fee: Rs 150 when the food subtotal is below Rs 1,000.
- Delivery fee: Rs 0 when the food subtotal is Rs 1,000 or more (including exactly Rs 1,000).
- Delivery areas are H-10, H-11, H-12, I-8, I-9, I-10, and I-11.
- Pricing logic is in `src/utils/feeRules.js`; delivery form validation is in `src/utils/checkoutValidation.js`.

## Routes

| Route | Purpose |
|---|---|
| `/` | Menu browsing, search, filters, and sorting |
| `/items/:id` | Menu item details and deal choices |
| `/cart` | Review, change, or remove cart items |
| `/checkout` | Enter order details and review totals |
| `/confirmation` | Show the latest simulated order confirmation |
| `/contact` | Cafe contact information |
| `*` | Not-found page for unknown routes |

The app uses React Router. `vercel.json` rewrites requests to `index.html` so direct navigation and refresh on nested routes work on Vercel.

## Technology

- React 19
- Vite
- React Router
- lucide-react icons
- JavaScript and CSS
- Node.js built-in test runner (`node:test`) and assertions (`node:assert/strict`)

## Run locally

Use Node.js and npm. From the project root:

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal (normally `http://localhost:5173`).

## Build, lint, and test

```bash
npm run build
npm run lint
npm test
```

To preview a production build locally:

```bash
npm run build
npm run preview
```

The quantity rule tests are in `src/utils/quantityRule.test.js`. They cover a valid quantity, the exact maximum of 10, and a quantity above the maximum. **Verification performed for this documentation update:** `npm test` completed with 3 tests passed and 0 failed. Run the commands again on the final submitted copy.

## Demonstrating edge cases

- **Quantity limit:** Open an item and increase its quantity to 10; another increase should be blocked.
- **Deal choice:** Open Study Break Deal or Burger Combo. Try adding with no drink selected, select one allowed drink, deselect it, and select it again. Exactly one valid choice is required.
- **Store hours:** Open the footer's **Demo controls (for testing only)**. Set a time before 09:00 or after 22:30 to show the closed state and next opening. Set 09:00 and 22:30 to check the inclusive boundaries.
- **Menu loading:** In the same demo controls, choose **Fails** and select **Reload menu now** to show the error/retry state. Choose **Works normally** to load the menu again. Choose **Returns an empty menu** to show the empty-data state.
- **Search with no matches:** Search for a term that is not in the menu; clear the search and filters to restore the menu.
- **Invalid item URL:** Open `/items/999999` to see the item-not-found message and return link.
- **Cart persistence:** Add an item, refresh the browser, and check that the cart is restored. The app revalidates saved cart entries against the current menu and rules.
- **Checkout validation:** Submit an incomplete form. Correct the displayed fields and check that valid entries remain in the form. Delivery requires an allowed area and street/house details.
- **Nested-route hosting:** Open `/items/1`, `/cart`, and `/checkout` directly on the deployed site and refresh each page.

## Code map: React and JavaScript concepts

| Concept / responsibility | Main files |
|---|---|
| Application routes and layout | `src/App.jsx`, `src/components/Layout.jsx` |
| Reusable UI components and props | `src/components/` |
| Local menu data and stable IDs | `src/data/menuItems.js` |
| Shared state with Context and hooks | `src/context/MenuProvider.jsx`, `src/context/CartProvider.jsx`, `src/context/StoreProvider.jsx` |
| Search, filter, and sort using array methods | `src/utils/menuFilters.js`, `src/pages/MenuPage.jsx` |
| Quantity and deal business rules | `src/utils/quantityRule.js`, `src/utils/dealRule.js` |
| Opening-hours rule | `src/utils/openingRule.js`, `src/data/storeInfo.js` |
| Delivery fee and calculated totals | `src/utils/feeRules.js`, `src/components/OrderTotals.jsx` |
| Form state and validation | `src/pages/CheckoutPage.jsx`, `src/utils/checkoutValidation.js` |
| Persistence and restoration | `src/utils/cartStorage.js`, `src/context/CartProvider.jsx` |
| Async mock loading and retry | `src/services/menuService.js`, `src/context/MenuProvider.jsx` |
| Automated rule tests | `src/utils/quantityRule.test.js` |

## Limitations

- Menu records and images are local project assets; there is no live backend or database.
- Menu loading is simulated with a Promise and delay; it is not a real network request.
- Cart data is stored in the current browser's local storage and is not synchronized between devices.
- Checkout and confirmation simulate an order only. No payment is collected and no real order is sent to a restaurant.
- The contact details and business are fictional demonstration data.
