import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useMenu } from "../context/useMenu";
import ItemImage from "../components/ItemImage";
import { useCart } from "../context/useCart";
import { useStore } from "../context/useStore";
import OpenStatus from "../components/OpenStatus";
import { MAX_QUANTITY } from "../utils/quantityRule";
import { REQUIRED_CHOICES, checkDealChoice, nextSelection } from "../utils/dealRule";
import { countOfItem, makeLineId } from "../utils/cartHelpers";
import { formatPrice } from "../utils/format";

function ItemDetailsPage() {
  // useParams reads :id from the URL. URL values are text, so convert to a number.
  const { id } = useParams();
  const { items: menuItems } = useMenu();
  const item = menuItems.find((entry) => entry.id === Number(id));
  const { lines, addItem, setLineQuantity } = useCart();
  const { orderingAllowed, status } = useStore();
  // Ids of the drinks picked for a deal. Starts empty: 0 of 1 selected.
  const [selectedIds, setSelectedIds] = useState([]);

  // Invalid ID: show useful feedback and a way forward
  if (!item) {
    return (
      <>
        <h1>Item not found</h1>
        <p>We could not find a menu item with the ID "{id}".</p>
        <Link className="btn btn-primary" to="/">
          Back to the menu
        </Link>
      </>
    );
  }

  // Deals list which items can be chosen; look their names up from the data
  const dealChoices = item.deal
    ? item.deal.choiceIds
        .map((choiceId) => menuItems.find((entry) => entry.id === choiceId))
        .filter(Boolean)
    : [];

  const inCart = countOfItem(lines, item.id);
  // The cart line this page controls: for a deal it is the line of the chosen drink
  const lineId = makeLineId(item.id, item.deal ? (selectedIds[0] ?? null) : null);
  const currentLine = lines.find((line) => line.id === lineId);
  const lineQty = currentLine ? currentLine.quantity : 0;
  const atLimit = inCart >= MAX_QUANTITY;
  // Normal items need no choice, so they always pass
  const dealCheck = item.deal ? checkDealChoice(item.deal, selectedIds) : { ok: true, message: "" };
  const canAdd = dealCheck.ok && !atLimit && orderingAllowed;

  function handleAdd() {
    // addItem shows the success or error message in the toast
    addItem(item, item.deal ? selectedIds[0] : null);
  }

  return (
    <>
      <p>
        <Link to="/">&larr; Back to the menu</Link>
      </p>

      <div className="details">
        <div className="details-media">
          <ItemImage item={item} />
        </div>

        <div className="details-info">
          <p className="card-category">{item.category}</p>
          <h1>{item.name}</h1>
          <p className="details-price">{formatPrice(item.price)}</p>
          <p>{item.description}</p>

          <dl className="facts">
            <dt>Serving</dt>
            <dd>{item.serving}</dd>
            <dt>Diet</dt>
            <dd>{item.vegetarian ? "Vegetarian" : "Contains meat"}</dd>
            <dt>Allergens</dt>
            <dd>{item.allergens.length > 0 ? item.allergens.join(", ") : "None listed"}</dd>
          </dl>

          {item.deal && (
            <section className="deal-options" aria-labelledby="deal-heading">
              <h2 id="deal-heading">{item.deal.choiceLabel} (required)</h2>
              <p className="deal-count" aria-live="polite">
                {selectedIds.length}/{REQUIRED_CHOICES} selected
              </p>
              <ul className="option-list">
                {dealChoices.map((choice) => {
                  const selected = selectedIds.includes(choice.id);
                  return (
                    <li key={choice.id}>
                      <button
                        type="button"
                        className={selected ? "option option-selected" : "option"}
                        aria-pressed={selected}
                        onClick={() =>
                          setSelectedIds((previous) => nextSelection(previous, choice.id))
                        }
                      >
                        <span>{choice.name}</span>
                        {selected && <span className="option-state">Selected</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="order-box">
            <OpenStatus />
            <button type="button" className="btn btn-primary" disabled={!canAdd} onClick={handleAdd}>
              <ShoppingCart aria-hidden="true" className="btn-icon" />
              Add to order
            </button>
            {!orderingAllowed ? (
              <p className="hint">{status.message} Use the button above to schedule an order.</p>
            ) : (
              !dealCheck.ok && <p className="hint">{dealCheck.message}</p>
            )}
            <p className="max-note">
              Max {MAX_QUANTITY} per order.
              {atLimit && " Limit reached."}
            </p>
            {lineQty > 0 ? (
              <div className="in-cart-row">
                <span className="in-cart-label">
                  <ShoppingCart aria-hidden="true" />
                  In your order
                </span>
                {/* - and + change the amount; the number in between is the current amount */}
                <div className="stepper" role="group" aria-label={`Amount of ${item.name} in your order`}>
                  <button
                    type="button"
                    className="stepper-btn"
                    aria-label={`Remove one ${item.name}`}
                    onClick={() => setLineQuantity(lineId, lineQty - 1)}
                  >
                    <Minus aria-hidden="true" />
                  </button>
                  {/* The key changes with the number, so it replays its pop animation */}
                  <span className="stepper-value" key={lineQty} aria-live="polite">
                    {lineQty}
                  </span>
                  <button
                    type="button"
                    className="stepper-btn"
                    aria-label={`Add one more ${item.name}`}
                    disabled={!canAdd}
                    onClick={() => setLineQuantity(lineId, lineQty + 1)}
                  >
                    <Plus aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : (
              inCart > 0 && (
                <p className="in-cart" key={inCart}>
                  <ShoppingCart aria-hidden="true" />
                  {inCart} in your order (pick a drink to change the amount)
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemDetailsPage;
