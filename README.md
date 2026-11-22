# Cafe Corner — React Business Website

## Student and Assignment

- **Student:** Maryam Imran
- **Roll Number:** i242070
- **Section:** CY-5A
- **Course:** Web Programming
- **Assignment:** Assignment 02 — Business Website Development Using React

## Project Overview

Cafe Corner is a fictional cafe website based in Islamabad. It is designed for students and nearby customers who want to browse drinks, bakery products, savoury food and special deals.

The website provides a complete simulated ordering experience, from browsing the menu to customizing products, managing a shopping cart and completing checkout.

- **Live Website:** https://cafe-corner-rosy.vercel.app
- **GitHub Repository:** https://github.com/maryamimran35/cafe-corner
- **Deployment Platform:** Vercel

## Main Features

- Responsive React single-page application.
- 14 local menu records across five categories.
- Product search, category filtering, vegetarian filtering and sorting.
- Individual product detail pages.
- Deal customization with required drink selections.
- Shopping cart with add, remove and quantity controls.
- Cart persistence using browser localStorage.
- Validation of saved cart data when restored.
- Controlled checkout form with field-specific validation.
- Automatic subtotal, delivery fee and total calculation.
- Simulated order confirmation.
- Asynchronous mock menu loading.
- Loading, error, retry and empty-menu states.
- Demonstration controls for testing loading failures, store hours and changed menu availability.
- Cart recovery when a previously selected product becomes unavailable.
- Keyboard-accessible controls and responsive layouts.

## Business Profile

Cafe Corner is a fictional cafe located at Shop 4, Student Plaza, H-11 Markaz, Islamabad.

Its intended customers are students and nearby residents looking for coffee, cold drinks, bakery products, savoury food and affordable deals.

The application demonstrates a simulated ordering process. It does not connect to a real restaurant, payment gateway or delivery service.

## Operating Rules

### 1. Item Quantity and Capacity

Customers can order between 1 and 10 units of an individual menu item. Quantities above 10 are rejected.

**Implementation:**
- `src/utils/quantityRule.js`
- `src/context/CartProvider.jsx`

### 2. Deal Compatibility

Each deal requires exactly one drink selected from its allowed drink IDs.

- Study Break Deal uses its permitted hot drinks.
- Burger Combo uses its permitted cold drinks.
- Missing or invalid selections cannot be added or placed.
- Customers can change or reselect their drink.

**Implementation:**
- `src/utils/dealRule.js`
- `src/pages/ItemDetailsPage.jsx`
- `src/context/CartProvider.jsx`

### 3. Store Opening and Fulfilment

The store accepts orders from 9:00 AM through 10:30 PM, inclusive.

When the store is closed:
- Normal ordering is blocked.
- The next opening time is displayed.
- Customers can schedule an order for the next opening.

**Implementation:**
- `src/data/storeInfo.js`
- `src/utils/openingRule.js`
- `src/context/StoreProvider.jsx`
- `src/components/OpenStatus.jsx`
- `src/context/CartProvider.jsx`

## Delivery and Pickup Pricing

| Order type | Fee |
|---|---:|
| Pickup | Rs 0 |
| Delivery below Rs 1,000 | Rs 150 |
| Delivery of Rs 1,000 or more | Free |

The free-delivery threshold includes an exact subtotal of Rs 1,000.

Delivery areas include H-10, H-11, H-12, I-8, I-9, I-10 and I-11.

**Implementation:**
- `src/utils/feeRules.js`
- `src/utils/checkoutValidation.js`

## Application Routes

| Route | Purpose |
|---|---|
| `/` | Menu browsing, search, filtering and sorting |
| `/items/:id` | Product details and deal customization |
| `/cart` | Review and manage cart items |
| `/checkout` | Enter order details and review totals |
| `/confirmation` | Display simulated order confirmation |
| `/contact` | Cafe contact information |
| `*` | Not-found page |

The application uses React Router. Vercel routing configuration supports direct navigation and refreshing nested routes.

## Technology Stack

- React 19
- Vite
- React Router
- JavaScript
- CSS
- lucide-react
- Node.js built-in test runner (`node:test`)
- Node.js assertions (`node:assert/strict`)

## Installation and Local Development

### Requirements

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/maryamimran35/cafe-corner.git
cd cafe-corner
npm install
```

### Start the development server

```bash
npm run dev
```

Vite displays the local development URL in the terminal, normally `http://localhost:5173`.

## Build, Lint and Test

Build the production application:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Run automated tests:

```bash
npm test
```

Preview the production build locally:

```bash
npm run preview
```

The quantity-rule tests are located in `src/utils/quantityRule.test.js`.

They check:
- A normal valid quantity.
- The maximum permitted quantity of 10.
- Rejection of a quantity above 10.

## Demonstrating Edge Cases

The footer contains labelled demonstration controls for testing different application states.

### Quantity Limit

Increase an item's quantity to 10. Further increases should be blocked.

### Deal Compatibility

Open a deal and try adding it without selecting a drink. Select one valid drink, deselect it and select it again. The deal must contain exactly one valid drink.

### Store Opening Hours

Use the footer's demonstration controls to simulate different times.

Test:
- 08:59 — closed.
- 09:00 — open.
- 22:30 — open.
- 22:31 — closed.

### Menu Loading

Use the demonstration controls to simulate:
- A successful menu load.
- A loading failure with retry.
- An empty menu response.

### Changed Menu Availability

Use the demonstration option **Spanish Latte is no longer available** and reload the menu.

If Spanish Latte is already saved in the cart, the application revalidates the saved selection, removes the unavailable item and displays an update notification.

Restore normal menu availability using the demonstration controls.

### Search With No Results

Search for a term that does not exist in the menu. The application displays a no-matching-results message.

### Invalid Product URL

Open `/items/999999` to display the item-not-found message.

### Cart Persistence

Add an item to the cart and refresh the browser. The application restores saved cart data and checks it against current menu availability and business rules.

### Checkout Validation

Submit an incomplete checkout form and review the field-specific validation messages. Correct the fields and verify that valid information remains available.

### Nested Route Refresh

Directly open and refresh:
- `/items/1`
- `/cart`
- `/checkout`

These routes should load correctly on the deployed website.

## React and JavaScript Concept Map

| Concept | Main files |
|---|---|
| Application routes and layout | `src/App.jsx`, `src/components/Layout.jsx` |
| Reusable components and props | `src/components/` |
| Local menu data and stable IDs | `src/data/menuItems.js` |
| Shared state and React Context | `src/context/` |
| Search, filtering and sorting | `src/utils/menuFilters.js`, `src/pages/MenuPage.jsx` |
| Quantity and deal rules | `src/utils/quantityRule.js`, `src/utils/dealRule.js` |
| Opening-hours rule | `src/utils/openingRule.js`, `src/data/storeInfo.js` |
| Delivery fees and totals | `src/utils/feeRules.js`, `src/components/OrderTotals.jsx` |
| Checkout validation | `src/pages/CheckoutPage.jsx`, `src/utils/checkoutValidation.js` |
| Cart persistence | `src/utils/cartStorage.js`, `src/context/CartProvider.jsx` |
| Asynchronous menu loading | `src/services/menuService.js`, `src/context/MenuProvider.jsx` |
| Automated tests | `src/utils/quantityRule.test.js` |

## Project Limitations

- Menu records and images are stored locally.
- There is no live backend or database.
- Menu loading is simulated using a Promise and delay.
- Cart information is stored in the current browser's localStorage and is not synchronized across devices.
- Checkout and order confirmation are simulated.
- No real payment is collected.
- No real restaurant order or delivery request is submitted.
- Cafe Corner and its contact details are fictional demonstration data.
