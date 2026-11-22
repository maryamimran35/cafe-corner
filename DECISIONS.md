# Cafe Corner — Frontend Decisions

## Student and assignment

- **Student:** Maryam Imran
- **Roll number:** i242070
- **Section:** CY-5A
- **Course:** Web Programming
- **Assignment:** Assignment 02 — Business Website Development Using React
- **Business:** Cafe Corner, Islamabad
- **Reference website investigated:** https://crustologycafe.com/menu?order_type=delivery
- **Live implementation:** https://cafe-corner-rosy.vercel.app
- **Source repository:** https://github.com/maryamimran35/cafe-corner

This document records three frontend decisions corresponding to the three reference-site problems investigated. The observations below describe the reference-site behaviour recorded during the investigation; possible business consequences are stated as possibilities, not measured results.

---

## Decision 1 — Give customers enough information to compare menu items

### Problem
The reference menu listings provided too little useful information to compare some dishes confidently.

**Reference:** Crustology Cafe — https://crustologycafe.com/menu?order_type=delivery  
**Test date recorded:** 21 November 2026  
**User task:** Choose a dish to order from the menu.

### What I observed
In the Special Burgers & Wraps category, the investigation recorded that all 9 dishes used the same placeholder logo instead of food photographs, and 8 of the 9 descriptions repeated only the dish name. In Baked Pasta, 2 of 4 dishes used the placeholder and shared generic text. The cards did not provide serving or ingredient details.

### Possible business consequence
Customers may not have enough information beyond the item name and price to compare dishes. This could create uncertainty or contribute to an abandoned order; no sales impact was measured.

### Decision
Cafe Corner uses a local menu data record for each item with a unique description, serving information, vegetarian status, allergen information, price, category, and image path. The item details page presents the serving, diet, and allergen information. `ItemImage` provides a fallback if an image cannot be displayed.

### Alternative considered
Use compact cards containing only the item name and price, and reveal all additional information only after opening the item details page.

### Reason for the decision
Showing useful details during browsing helps customers compare products before opening a details page. The full details page then provides serving and allergen information before adding an item.

### Tradeoff
More informative cards can become taller and require careful spacing at smaller screen widths. The local menu records also need to be maintained when product details change.

### Code location
- `src/data/menuItems.js` — descriptions, serving details, vegetarian status, allergens, prices, categories, and image mapping.
- `src/components/ItemCard.jsx` — menu-card presentation.
- `src/components/ItemImage.jsx` — image display and fallback.
- `src/pages/ItemDetailsPage.jsx` — full item information.
- `src/index.css` — responsive visual layout.

### Evidence to include
Add screenshots from the final Cafe Corner implementation to the report and, if desired, save them in `docs/evidence/` using these names:
- `decision-1-menu-desktop.png` — menu cards with product images and descriptions.
- `decision-1-item-details.png` — item detail showing serving, diet, and allergens.
- `decision-1-menu-mobile.png` — menu layout at approximately 390px width.

**Capture steps:** Open the menu and show multiple products; open one item details page; capture the same menu at mobile width. The screenshots must show Cafe Corner, not only the reference website.

---

## Decision 2 — Enforce one valid deal choice while allowing customers to change it

### Problem
The reference deal customization flow did not let the customer recover easily after removing a required option.

**Reference:** Crustology Cafe — https://crustologycafe.com/menu?order_type=delivery  
**Test date recorded:** 21 November 2026  
**User task:** Customize Student Deal 4 and add it to the order.

### What I observed
The investigation recorded that Student Deal 4 displayed `2/1 selected` for the 345ml drink option. After pressing minus, the display changed to `0/1 selected` and the 345ml row became greyed out. The same option could not be selected again. Pressing Add to Order then showed “Select an option for Drink”, even though the option could no longer be selected.

### Possible business consequence
A customer may be unable to complete a deal after changing an option and may abandon the order.

### Decision
Each Cafe Corner deal defines its own allowed drink IDs and requires exactly one valid drink. Clicking the selected option removes it, so it can be selected again. Clicking a different allowed option replaces the current selection. The page shows the selected count, and Add to order remains disabled until one valid choice is selected. The cart provider checks the deal choice again when adding and placing an order.

### Alternative considered
Lock the first selected drink and require the customer to remove the whole deal before choosing another drink.

### Reason for the decision
Customers can correct their choice without restarting the deal. Restricting the selection to the deal's allowed IDs and exactly one option prevents invalid combinations.

### Tradeoff
The selection state and validation are more involved than a simple dropdown. The item page and cart provider must apply the same rule so invalid choices cannot bypass the interface.

### Code location
- `src/data/menuItems.js` — each deal's `choiceLabel` and allowed `choiceIds`.
- `src/utils/dealRule.js` — `nextSelection()` and `checkDealChoice()`.
- `src/pages/ItemDetailsPage.jsx` — choice controls, selected count, and disabled Add action.
- `src/context/CartProvider.jsx` — validation when adding and placing an order.

### Evidence to include
Add screenshots from the final Cafe Corner implementation to the report and, if desired, save them in `docs/evidence/` using these names:
- `decision-2-deal-zero-selected.png` — deal showing `0/1 selected` and Add disabled.
- `decision-2-deal-one-selected.png` — deal showing one valid drink selected and Add enabled.
- `decision-2-reselect-choice.png` — show a choice being deselected and selected again.

**Capture steps:** Open Study Break Deal or Burger Combo. Select one allowed drink, deselect it, and select it again. Also try a different allowed drink to demonstrate replacement. Do not use screenshots from the reference website as evidence of Cafe Corner's implementation.

---

## Decision 3 — Show opening status before ordering and offer scheduling when closed

### Problem
The reference site showed a closed status but still allowed the customer to build an order. The blocking condition appeared later in the checkout journey, without a clear next step.

**Reference:** Crustology Cafe — https://crustologycafe.com/menu?order_type=delivery  
**Test date recorded:** 21 November 2026  
**User task:** Place an order that the cafe can prepare and fulfil.

### What I observed
The investigation recorded a red `CLOSED` badge while the Add action still added Family Deal 1 to the cart. At checkout, the Delivery Time window said “We are closed.” but did not offer an available time or a later opening option. Continuing then showed “Please select a delivery time”, leaving the customer unable to complete the order at that time.

### Possible business consequence
Customers may spend time building an order that cannot be completed, become frustrated, and leave. This is a possible consequence, not a measured result.

### Decision
Cafe Corner displays its opening status near the ordering controls. Orders are accepted from 9:00 AM through 10:30 PM inclusive. When closed, normal adding and quantity increases are blocked, and the interface shows the next opening time. The customer can choose **Schedule for [next opening]**; the simulated order can then proceed and the confirmation identifies the scheduled opening.

### Alternative considered
Allow customers to build a cart at any time and reveal the opening restriction only at checkout.

### Reason for the decision
Showing availability before the customer builds an order prevents avoidable effort. Offering scheduling provides a next step instead of leaving the customer at a dead end.

### Tradeoff
The opening-hours rule must be shared across the menu, item details, cart, and checkout. The app also needs to handle the time boundaries and provide a labelled control for testing different times.

### Code location
- `src/data/storeInfo.js` — opening time, last-order time, address, and delivery areas.
- `src/utils/openingRule.js` — time parsing and `checkStoreOpen()`.
- `src/context/StoreProvider.jsx` — real time, simulated time, and scheduled-order state.
- `src/components/OpenStatus.jsx` — open, closed, and scheduled status messages and scheduling action.
- `src/context/CartProvider.jsx` — blocks invalid additions, checks the rule when placing an order, and stores the scheduled label in the confirmation.
- `src/components/Footer.jsx` — labelled demo time control.

### Evidence to include
Add screenshots from the final Cafe Corner implementation to the report and, if desired, save them in `docs/evidence/` using these names:
- `decision-3-open-status.png` — open status and last-order time.
- `decision-3-closed-status.png` — closed status, next opening, and schedule action.
- `decision-3-scheduled-status.png` — scheduled status after choosing the next opening.

**Capture steps:** Open **Footer → Demo controls (for testing only)**. Set the time to `08:59` and capture the closed state. Choose the schedule action and capture the scheduled state. Set the time to `09:00` and capture the open boundary. Also test `22:30` and `22:31`. The app uses local browser time unless a simulated time is entered.

---

## Evidence completion checklist

- [ ] Attach the three Decision 1 implementation screenshots to the report.
- [ ] Attach the three Decision 2 implementation screenshots to the report.
- [ ] Attach the three Decision 3 implementation screenshots to the report.
- [ ] Keep the reference-site screenshots and their URLs in the investigation section of the report.
- [ ] Record the tested action, expected result, and observed result for each investigated improvement.
- [ ] Confirm that all listed code paths still match the final submitted source.

**Important:** The evidence filenames above are suggested names, not claims that those screenshot files are already included in this repository. Complete the checklist using actual screenshots from the final deployed or submitted app before handing in the assignment.
