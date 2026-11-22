import { checkQuantity } from "./quantityRule.js";
import { checkDealChoice } from "./dealRule.js";
import { makeLineId } from "./cartHelpers.js";

// Read saved cart data and keep only lines that still match today's menu and rules.
// Invalid lines are skipped and explained to the customer instead of crashing the app.
export function restoreCart(savedText, menuItems) {
  let savedLines;

  try {
    savedLines = JSON.parse(savedText);
  } catch {
    return {
      lines: [],
      conflicts: ["The saved cart data was damaged and could not be restored."],
    };
  }

  if (!Array.isArray(savedLines)) {
    return {
      lines: [],
      conflicts: ["The saved cart format was not valid."],
    };
  }

  const lines = [];
  const conflicts = [];

  for (const savedLine of savedLines) {
    if (!savedLine || typeof savedLine !== "object") {
      conflicts.push("An invalid cart entry was removed.");
      continue;
    }

    const item = menuItems.find((entry) => entry.id === savedLine.itemId);
    if (!item) {
      conflicts.push("An item that is no longer on the menu was removed.");
      continue;
    }

    const quantityCheck = checkQuantity(savedLine.quantity, item.name);
    if (!quantityCheck.ok) {
      conflicts.push(`${item.name} was removed because its saved quantity is invalid.`);
      continue;
    }

    const choiceId = savedLine.choiceId ?? null;

    // A saved drink that has since left the menu is a conflict, even if the deal still lists it
    if (choiceId !== null && !menuItems.some((entry) => entry.id === choiceId)) {
      conflicts.push(`${item.name} was removed because its chosen drink is no longer available.`);
      continue;
    }

    if (item.deal) {
      const choiceCheck = checkDealChoice(
        item.deal,
        choiceId === null ? [] : [choiceId],
      );
      if (!choiceCheck.ok) {
        conflicts.push(`${item.name} was removed because its drink choice is no longer valid.`);
        continue;
      }
    } else if (choiceId !== null) {
      conflicts.push(`${item.name} was removed because it has an unexpected option.`);
      continue;
    }

    const expectedId = makeLineId(item.id, choiceId);
    if (savedLine.id !== expectedId || lines.some((line) => line.id === expectedId)) {
      conflicts.push(`${item.name} had a duplicate or invalid saved entry and was removed.`);
      continue;
    }

    lines.push({
      id: expectedId,
      itemId: item.id,
      choiceId,
      quantity: savedLine.quantity,
    });
  }

  return { lines, conflicts };
}
