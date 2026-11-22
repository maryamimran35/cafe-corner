// Pure helper functions that calculate values from the cart lines.

// Total quantity of one menu item across all cart lines
export function countOfItem(lines, itemId) {
  return lines
    .filter((line) => line.itemId === itemId)
    .reduce((sum, line) => sum + line.quantity, 0);
}

// Number of items in the whole cart (shown in the navbar)
export function getCartCount(lines) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

// Subtotal in rupees, calculated from current menu prices
export function getSubtotal(lines, items) {
  return lines.reduce((sum, line) => {
    const item = items.find((entry) => entry.id === line.itemId);
    return item ? sum + item.price * line.quantity : sum;
  }, 0);
}

// Id of a cart line: the item id plus the chosen drink (for deals), e.g. "13-3" or "1-none"
export function makeLineId(itemId, choiceId) {
  return `${itemId}-${choiceId ?? "none"}`;
}
