// Formats a number as Pakistani rupees, e.g. 1150 -> "Rs 1,150"
export function formatPrice(amount) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}