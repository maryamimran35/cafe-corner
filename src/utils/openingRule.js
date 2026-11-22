// Rule 3 (fulfilment): orders are accepted from opening time up to and including the last-order time.
// Pure functions with no React code, so they can be tested on their own.
import { STORE } from "../data/storeInfo.js";
import { formatTime } from "./format.js";

// Minutes after midnight for a Date, e.g. 10:30 PM -> 1350
export function getMinutesOfDay(date) {
  return date.getHours() * 60 + date.getMinutes();
}

// Turns "22:30" (the value of a time input) into minutes, or null if it is not valid
export function parseClockTime(text) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(text);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

// Decides if the store accepts orders at a given time.
// Returns { open, message, nextOpenLabel }.
export function checkStoreOpen(minutes, hours = STORE) {
  const isOpen = minutes >= hours.openMinutes && minutes <= hours.lastOrderMinutes;
  if (isOpen) {
    return { open: true, message: "", nextOpenLabel: "" };
  }

  // Before opening: it opens later today. After the last order: it opens tomorrow.
  const when = minutes < hours.openMinutes ? "today" : "tomorrow";
  const nextOpenLabel = `${when} at ${formatTime(hours.openMinutes)}`;
  return { open: false, message: `We're closed. Opens ${nextOpenLabel}.`, nextOpenLabel };
}
