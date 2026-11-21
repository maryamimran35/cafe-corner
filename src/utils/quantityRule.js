// Rule 1 (capacity): one to MAX_QUANTITY of any single item per order.
export const MAX_QUANTITY = 10;
export function checkQuantity(quantity, itemName = "this item") {
  if (!Number.isInteger(quantity)) {
    return { ok: false, message: "Quantity must be a whole number." };
  }
  if (quantity < 1) {
    return { ok: false, message: "Quantity must be at least 1." };
  }
  if (quantity > MAX_QUANTITY) {
    return { ok: false, message: `You can order at most ${MAX_QUANTITY} of ${itemName}.` };
  }
  return { ok: true, message: "" };
}