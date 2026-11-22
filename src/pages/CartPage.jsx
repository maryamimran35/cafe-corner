import { Link } from "react-router-dom";
import { menuItems } from "../data/menuItems";
import { useCart } from "../context/useCart";
import { useStore } from "../context/useStore";
import OpenStatus from "../components/OpenStatus";
import { MAX_QUANTITY } from "../utils/quantityRule";
import { countOfItem, getSubtotal } from "../utils/cartHelpers";
import { formatPrice } from "../utils/format";

function CartPage() {
  const { lines, removeLine, setLineQuantity } = useCart();
  const { orderingAllowed } = useStore();

  if (lines.length === 0) {
    return (
      <>
        <h1>Your order</h1>
        <p>Your order is empty. Add something from the menu to get started.</p>
        <Link className="btn btn-primary" to="/">
          Browse the menu
        </Link>
      </>
    );
  }

  // Derived value: recalculated from the current cart on every render
  const subtotal = getSubtotal(lines, menuItems);

  return (
    <>
      <h1>Your order</h1>
      <OpenStatus />
      <p className="max-note">Maximum {MAX_QUANTITY} of any one item per order.</p>

      <ul className="cart-list">
        {lines.map((line) => {
          const item = menuItems.find((entry) => entry.id === line.itemId);
          if (!item) return null;
          const atLimit = countOfItem(lines, line.itemId) >= MAX_QUANTITY;
          // For deals, find the drink the customer chose
          const choice = line.choiceId
            ? menuItems.find((entry) => entry.id === line.choiceId)
            : null;

          return (
            <li key={line.id} className="cart-line">
              <div className="cart-info">
                <h2 className="cart-name">{item.name}</h2>
                {choice && item.deal && (
                  <p className="cart-each">
                    {item.deal.choiceLabel}: {choice.name}
                  </p>
                )}
                <p className="cart-each">{formatPrice(item.price)} each</p>
                {atLimit && <p className="limit-note">Limit reached ({MAX_QUANTITY} per order)</p>}
              </div>

              <div className="qty" role="group" aria-label={`Quantity of ${item.name}`}>
                <button
                  type="button"
                  className="btn btn-secondary qty-btn"
                  aria-label={`Decrease quantity of ${item.name}`}
                  onClick={() => setLineQuantity(line.id, line.quantity - 1)}
                >
                  -
                </button>
                <span className="qty-value">{line.quantity}</span>
                <button
                  type="button"
                  className="btn btn-secondary qty-btn"
                  aria-label={`Increase quantity of ${item.name}`}
                  disabled={atLimit || !orderingAllowed}
                  onClick={() => setLineQuantity(line.id, line.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className="cart-total">{formatPrice(item.price * line.quantity)}</p>
              <button type="button" className="link-button" onClick={() => removeLine(line.id)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>

      <p className="subtotal">
        Subtotal: <strong>{formatPrice(subtotal)}</strong>
      </p>
      <p className="max-note">Checkout is added in a later stage.</p>
    </>
  );
}

export default CartPage;
