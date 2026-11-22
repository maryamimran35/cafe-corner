// Delivery pricing. No React code here, so it is easy to read and to test.
// Pickup is always free. Delivery costs DELIVERY_FEE, unless the food subtotal
// is FREE_DELIVERY_FROM or more (exactly Rs 1,000 already qualifies).
export const DELIVERY_FEE = 150;
export const FREE_DELIVERY_FROM = 1000;

export function getDeliveryFee(subtotal, method) {
  if (method !== "delivery") return 0;
  return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}

// Everything the summary needs, calculated from the subtotal and the chosen method
export function getOrderTotals(subtotal, method) {
  const deliveryFee = getDeliveryFee(subtotal, method);
  return {
    method,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    freeDelivery: method === "delivery" && deliveryFee === 0,
  };
}

// How much more food the customer must add to get free delivery (0 when already free)
export function amountToFreeDelivery(subtotal) {
  return Math.max(0, FREE_DELIVERY_FROM - subtotal);
}
