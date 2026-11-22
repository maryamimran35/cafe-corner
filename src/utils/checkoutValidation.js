// Checks the checkout form. Returns an object of messages: { fieldName: "message" }.
// An empty object means the form is valid. No React code here.
import { STORE } from "../data/storeInfo.js";

export const NOTES_MAX = 200;
// Order in which fields appear on screen (used to focus the first problem)
export const FIELD_ORDER = ["name", "phone", "area", "address", "notes"];

// "0300 000-0000" -> "03000000000"
export function normalizePhone(text) {
  return text.replace(/[\s-]/g, "");
}

export function validateCheckout(form) {
  const errors = {};

  const name = form.name.trim();
  if (name.length < 2) {
    errors.name = "Enter your name (at least 2 letters).";
  } else if (!/^\p{L}[\p{L} .'-]*$/u.test(name)) {
    errors.name = "Use letters, spaces, dots, apostrophes or hyphens only.";
  }

  const phone = normalizePhone(form.phone);
  if (phone === "") {
    errors.phone = "Enter a phone number.";
  } else if (!/^(03\d{9}|\+923\d{9})$/.test(phone)) {
    errors.phone = "Use a mobile number like 0300 0000000.";
  }

  // Area and address only matter for delivery
  if (form.method === "delivery") {
    if (form.area === "") {
      errors.area = "Choose your delivery area.";
    } else if (!STORE.deliveryAreas.includes(form.area)) {
      errors.area = "We do not deliver to that area.";
    }
    if (form.address.trim().length < 5) {
      errors.address = "Enter your street or house details (at least 5 characters).";
    }
  }

  if (form.notes.length > NOTES_MAX) {
    errors.notes = `Notes can be at most ${NOTES_MAX} characters (now ${form.notes.length}).`;
  }

  return errors;
}
