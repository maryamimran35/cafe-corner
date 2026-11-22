import { menuItems } from "../data/menuItems.js";

// Pretend network delay, so the loading state is visible
const DELAY_MS = 700;

// Mock loader. It behaves like a request to a server: it returns a Promise that resolves later.
// mode is only used by the demo controls in the footer:
//   "normal" -> resolves with the menu, "fail" -> rejects, "empty" -> resolves with no items.
export function loadMenu({ mode = "normal" } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === "fail") {
        reject(new Error("The menu could not be loaded. Please check your connection and try again."));
      } else if (mode === "empty") {
        resolve([]);
      } else {
        resolve(menuItems);
      }
    }, DELAY_MS);
  });
}
