import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "../context/useMenu";
import { STORE } from "../data/storeInfo";
import { useCart } from "../context/useCart";
import OpenStatus from "../components/OpenStatus";
import OrderTotals from "../components/OrderTotals";
import { buildOrderLines, getSubtotal } from "../utils/cartHelpers";
import { DELIVERY_FEE, FREE_DELIVERY_FROM, getOrderTotals } from "../utils/feeRules";
import { formatPrice } from "../utils/format";
import { FIELD_ORDER, NOTES_MAX, normalizePhone, validateCheckout } from "../utils/checkoutValidation";

const EMPTY_FORM = { name: "", phone: "", method: "pickup", area: "", address: "", notes: "" };

function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, placeOrder } = useCart();
  const { items: menuItems } = useMenu();
  // One object holds every field. Each change copies it, so state is never changed in place.
  const [form, setForm] = useState(EMPTY_FORM);
  // Fields the customer has already left, so errors do not appear while they are still typing for the first time
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // A problem found when placing the order (shop closed, cart changed...)
  const [formError, setFormError] = useState("");

  if (lines.length === 0) {
    return (
      <>
        <h1>Checkout</h1>
        <p>Your order is empty, so there is nothing to check out yet.</p>
        <Link className="btn btn-primary" to="/">
          Browse the menu
        </Link>
      </>
    );
  }

  // Derived values: recalculated from the current form and cart on every render
  const errors = validateCheckout(form);
  const errorKeys = FIELD_ORDER.filter((key) => errors[key]);
  const shown = (key) => (submitted || touched[key] ? errors[key] : undefined);
  const subtotal = getSubtotal(lines, menuItems);
  const totals = getOrderTotals(subtotal, form.method);
  const summaryLines = buildOrderLines(lines, menuItems);

  function updateField(key, value) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setFormError("");
  }

  function markTouched(key) {
    setTouched((previous) => ({ ...previous, [key]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (errorKeys.length > 0) {
      // Send the keyboard to the first problem. Everything already typed stays in the form.
      document.getElementById(`checkout-${errorKeys[0]}`)?.focus();
      return;
    }
    const result = placeOrder({
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      method: form.method,
      area: form.method === "delivery" ? form.area : "",
      address: form.method === "delivery" ? form.address.trim() : "",
      notes: form.notes.trim(),
    });
    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    navigate("/confirmation");
  }

  // Props shared by the text inputs: label link, error link and invalid flag
  function inputProps(key) {
    const message = shown(key);
    return {
      id: `checkout-${key}`,
      value: form[key],
      "aria-invalid": message ? "true" : undefined,
      "aria-describedby": message ? `checkout-${key}-error` : undefined,
      onChange: (event) => updateField(key, event.target.value),
      onBlur: () => markTouched(key),
    };
  }

  function renderError(key) {
    const message = shown(key);
    return message ? (
      <p className="field-error" id={`checkout-${key}-error`}>
        Error: {message}
      </p>
    ) : null;
  }

  return (
    <>
      <h1>Checkout</h1>
      <p className="demo-note">
        Demo only: nothing is sent or charged. Please use made-up details (for example Ali Test, 0300 0000000).
      </p>
      <OpenStatus />

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          {(submitted && errorKeys.length > 0) || formError ? (
            <div className="error-summary" role="alert">
              <h2>{formError ? "We could not place your order" : `Please fix ${errorKeys.length} ${errorKeys.length === 1 ? "problem" : "problems"}`}</h2>
              {formError ? (
                <p>{formError}</p>
              ) : (
                <ul>
                  {errorKeys.map((key) => (
                    <li key={key}>{errors[key]}</li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          <div className="field">
            <label htmlFor="checkout-name">Your name</label>
            <input type="text" autoComplete="off" {...inputProps("name")} />
            {renderError("name")}
          </div>

          <div className="field">
            <label htmlFor="checkout-phone">Phone number</label>
            <input type="tel" autoComplete="off" placeholder="0300 0000000" {...inputProps("phone")} />
            {renderError("phone")}
          </div>

          <fieldset className="field method-field">
            <legend>How would you like your order?</legend>
            <label className="radio-row">
              <input
                type="radio"
                name="method"
                value="pickup"
                checked={form.method === "pickup"}
                onChange={() => updateField("method", "pickup")}
              />
              <span>Pickup from the counter (free)</span>
            </label>
            <label className="radio-row">
              <input
                type="radio"
                name="method"
                value="delivery"
                checked={form.method === "delivery"}
                onChange={() => updateField("method", "delivery")}
              />
              <span>
                Delivery ({formatPrice(DELIVERY_FEE)}, free on orders of {formatPrice(FREE_DELIVERY_FROM)} or more)
              </span>
            </label>
          </fieldset>

          {form.method === "delivery" && (
            <>
              <div className="field">
                <label htmlFor="checkout-area">Delivery area</label>
                <select {...inputProps("area")}>
                  <option value="">Choose a sector</option>
                  {STORE.deliveryAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {renderError("area")}
              </div>

              <div className="field">
                <label htmlFor="checkout-address">Street or house details</label>
                <input type="text" autoComplete="off" placeholder="e.g. House 12, Street 4" {...inputProps("address")} />
                {renderError("address")}
              </div>
            </>
          )}

          <div className="field">
            <label htmlFor="checkout-notes">Notes for the kitchen (optional)</label>
            <textarea rows={3} {...inputProps("notes")} />
            <p className="field-hint">
              {form.notes.length}/{NOTES_MAX} characters
            </p>
            {renderError("notes")}
          </div>

          <div className="checkout-actions">
            <button type="submit" className="btn btn-primary">
              Place order (simulated)
            </button>
            <Link className="btn btn-secondary" to="/cart">
              Back to your order
            </Link>
          </div>
        </form>

        <aside className="summary-box" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Order summary</h2>
          <OrderTotals lines={summaryLines} totals={totals} />
        </aside>
      </div>
    </>
  );
}

export default CheckoutPage;
