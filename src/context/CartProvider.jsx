import { useState } from "react";
import { CartContext } from "./cartContext";
import { menuItems } from "../data/menuItems";
import { checkQuantity } from "../utils/quantityRule";
import { countOfItem } from "../utils/cartHelpers";
import { checkDealChoice } from "../utils/dealRule";

// A cart line is { id, itemId, choiceId, quantity }.
// choiceId is for deals (the chosen drink); it is null for normal items.
function makeLineId(itemId, choiceId) {
  return `${itemId}-${choiceId ?? "none"}`;
}

function CartProvider({ children }) {
  const [lines, setLines] = useState([]);

  // Each action returns { ok, message } so the screen can tell the user what happened.
  function addItem(item, choiceId = null) {
        // Rule 2: a deal can only be added with exactly one valid drink
    if (item.deal) {
      const dealCheck = checkDealChoice(item.deal, choiceId === null ? [] : [choiceId]);
      if (!dealCheck.ok) return dealCheck;
    }
    const check = checkQuantity(countOfItem(lines, item.id) + 1, item.name);
    if (!check.ok) return check;

    const lineId = makeLineId(item.id, choiceId);
    // Functional update: the new list is built from the previous one, without changing it
    setLines((previous) => {
      const exists = previous.some((line) => line.id === lineId);
      if (exists) {
        return previous.map((line) =>
          line.id === lineId ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...previous, { id: lineId, itemId: item.id, choiceId, quantity: 1 }];
    });
    return check;
  }

  function removeLine(lineId) {
    setLines((previous) => previous.filter((line) => line.id !== lineId));
  }

  function setLineQuantity(lineId, newQuantity) {
    const line = lines.find((entry) => entry.id === lineId);
    if (!line) return { ok: false, message: "That item is no longer in your order." };

    // Going below 1 removes the line
    if (newQuantity < 1) {
      removeLine(lineId);
      return { ok: true, message: "" };
    }

    const item = menuItems.find((entry) => entry.id === line.itemId);
    const otherLines = countOfItem(lines, line.itemId) - line.quantity;
    const check = checkQuantity(otherLines + newQuantity, item ? item.name : undefined);
    if (!check.ok) return check;

    setLines((previous) =>
      previous.map((entry) =>
        entry.id === lineId ? { ...entry, quantity: newQuantity } : entry,
      ),
    );
    return check;
  }

  const value = { lines, addItem, removeLine, setLineQuantity };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;