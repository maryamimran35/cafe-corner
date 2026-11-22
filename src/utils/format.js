// Formats a number as Pakistani rupees, e.g. 1150 -> "Rs 1,150"
export function formatPrice(amount) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

// Turns minutes after midnight into a clock time, e.g. 1350 -> "10:30 PM"
export function formatTime(totalMinutes) {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}
