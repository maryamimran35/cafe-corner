import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { menuItems } from "../data/menuItems";
import { useCart } from "../context/useCart";
import { MAX_QUANTITY } from "../utils/quantityRule";
import { REQUIRED_CHOICES, checkDealChoice, nextSelection } from "../utils/dealRule";
import { countOfItem } from "../utils/cartHelpers";
import { formatPrice } from "../utils/format";

function ItemDetailsPage() {
  // useParams reads :id from the URL. URL values are text, so convert to a number.
  const { id } = useParams();
  const item = menuItems.find((entry) => entry.id === Number(id));
  const { lines, addItem } = useCart();
  const [message, setMessage] = useState("");
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
  const atLimit = inCart >= MAX_QUANTITY;
  // Normal items need no choice, so they always pass
  const dealCheck = item.deal ? checkDealChoice(item.deal, selectedIds) : { ok: true, message: "" };
  const canAdd = dealCheck.ok && !atLimit;

  function handleAdd() {
    const result = addItem(item, item.deal ? selectedIds[0] : null);
    setMessage(result.ok ? `Added ${item.name} to your order.` : result.message);
  }

  return (
    <>
      <p>
        <Link to="/">&larr; Back to the menu</Link>
      </p>

      <div className="details">
        <div className="details-media">
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <span className="card-fallback" aria-hidden="true">
              {item.name.charAt(0)}
            </span>
          )}
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
            <button type="button" className="btn btn-primary" disabled={!canAdd} onClick={handleAdd}>
              Add to order
            </button>
            {!dealCheck.ok && <p className="hint">{dealCheck.message}</p>}
            <p className="max-note">
              Max {MAX_QUANTITY} per order. In your order: {inCart}.
              {atLimit && " Limit reached."}
            </p>
            <p className="status" role="status">
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemDetailsPage;