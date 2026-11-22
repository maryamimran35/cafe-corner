import { useCallback, useEffect, useState } from "react";
import { CartContext } from "./cartContext";
import { useStore } from "./useStore";
import { checkQuantity } from "../utils/quantityRule";
import { checkDealChoice } from "../utils/dealRule";
import { buildOrderLines, countOfItem, getCartCount, getSubtotal, makeLineId } from "../utils/cartHelpers";
import { getOrderTotals } from "../utils/feeRules";
import { restoreCart } from "../utils/cartStorage";
import { useMenu } from "./useMenu";


function CartProvider({ children }) {
  const { orderingAllowed, status, setScheduled } = useStore();
  const { items: menuItems, status: menuStatus } = useMenu();
  const [lines, setLines] = useState([]);
  const [cartReady, setCartReady] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [notice, setNotice] = useState(null);


  useEffect(() => {
    if (menuStatus !== "ready" || cartReady) return;

    try {
      const savedCart = window.localStorage.getItem("cafe-corner-cart");
      if (savedCart) {
        const restored = restoreCart(savedCart, menuItems);
        setLines(restored.lines);

        if (restored.conflicts.length > 0) {
          setNotice({
            id: Date.now(),
            type: "error",
            text: `Some saved items could not be restored: ${restored.conflicts.join(" ")}`,
          });
        }
      }
    } catch {
      setNotice({
        id: Date.now(),
        type: "error",
        text: "Your saved cart could not be read. You can start a new order.",
      });
    }

    setCartReady(true);
  }, [menuStatus, cartReady, menuItems]);

  useEffect(() => {
    if (!cartReady) return;

    try {
      if (lines.length === 0) {
        window.localStorage.removeItem("cafe-corner-cart");
      } else {
        window.localStorage.setItem("cafe-corner-cart", JSON.stringify(lines));
      }
    } catch {
      setNotice({
        id: Date.now(),
        type: "error",
        text: "Your cart is working, but this browser could not save it for the next visit.",
      });
    }
  }, [lines, cartReady]);

  const clearNotice = useCallback(() => setNotice(null), []);

  function showError(message) {
    setNotice({ id: Date.now(), type: "error", text: message });
  }

  function addItem(item, choiceId = null) {
    // Rule 3: nothing can be added while the store is closed (unless the order is scheduled)
    if (!orderingAllowed) {
      showError(status.message);
      return { ok: false, message: status.message };
    }

    // Rule 2: a deal can only be added with exactly one valid drink
    if (item.deal) {
      const dealCheck = checkDealChoice(item.deal, choiceId === null ? [] : [choiceId]);
      if (!dealCheck.ok) {
        showError(dealCheck.message);
        return dealCheck;
      }
    }

    // Rule 1: never more than the maximum of one item
    const check = checkQuantity(countOfItem(lines, item.id) + 1, item.name);
    if (!check.ok) {
      showError(check.message);
      return check;
    }

    const lineId = makeLineId(item.id, choiceId);
    setLines((previous) => {
      const exists = previous.some((line) => line.id === lineId);
      if (exists) {
        return previous.map((line) =>
          line.id === lineId ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...previous, { id: lineId, itemId: item.id, choiceId, quantity: 1 }];
    });

    setNotice({
      id: Date.now(),
      type: "success",
      text: `Added ${item.name}`,
      count: getCartCount(lines) + 1,
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

    // Rule 3: removing is always allowed, but adding more needs the store to be open
    if (newQuantity > line.quantity && !orderingAllowed) {
      showError(status.message);
      return { ok: false, message: status.message };
    }

    const item = menuItems.find((entry) => entry.id === line.itemId);
    const otherLines = countOfItem(lines, line.itemId) - line.quantity;
    const check = checkQuantity(otherLines + newQuantity, item ? item.name : undefined);
    if (!check.ok) {
      showError(check.message);
      return check;
    }

    setLines((previous) =>
      previous.map((entry) =>
        entry.id === lineId ? { ...entry, quantity: newQuantity } : entry,
      ),
    );
    return check;
  }

  function placeOrder(details) {
    const fail = (message) => ({ ok: false, message });

    if (lines.length === 0) return fail("Your order is empty. Add something from the menu first.");
    // Rule 3: closed and not scheduled
    if (!orderingAllowed) return fail(status.message);

    for (const line of lines) {
      const item = menuItems.find((entry) => entry.id === line.itemId);
      if (!item) return fail("An item in your order is no longer on the menu. Please review your order.");
      // Rule 1: quantity limit
      const quantityCheck = checkQuantity(countOfItem(lines, item.id), item.name);
      if (!quantityCheck.ok) return fail(quantityCheck.message);
      // Rule 2: deals need exactly one valid drink
      if (item.deal) {
        const dealCheck = checkDealChoice(item.deal, line.choiceId === null ? [] : [line.choiceId]);
        if (!dealCheck.ok) return fail(`${item.name}: ${dealCheck.message}`);
      }
    }

    const totals = getOrderTotals(getSubtotal(lines, menuItems), details.method);
    const order = {
      number: `CC-${Date.now().toString().slice(-6)}`,
      details,
      lines: buildOrderLines(lines, menuItems),
      count: getCartCount(lines),
      scheduledFor: status.open ? "" : status.nextOpenLabel,
      ...totals,
    };
    setLastOrder(order);
    setLines([]);
    setScheduled(false);
    return { ok: true, message: "", order };
  }

  const value = { lines, lastOrder, notice, clearNotice, addItem, removeLine, setLineQuantity, placeOrder };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
