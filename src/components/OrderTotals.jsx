import { formatPrice } from "../utils/format";
import { FREE_DELIVERY_FROM } from "../utils/feeRules";

// Lines + totals of an order. It only shows what it is given (props), so the checkout page
// and the confirmation page use the same component.
function OrderTotals({ lines, totals }) {
  return (
    <>
      <ul className="summary-lines">
        {lines.map((line) => (
          <li key={line.key} className="summary-line">
            <span>
              {line.quantity} &times; {line.name}
              {line.detail && <small className="summary-detail">{line.detail}</small>}
            </span>
            <span>{formatPrice(line.lineTotal)}</span>
          </li>
        ))}
      </ul>
      <dl className="totals">
        <dt>Subtotal</dt>
        <dd>{formatPrice(totals.subtotal)}</dd>
        <dt>{totals.method === "delivery" ? "Delivery" : "Pickup"}</dt>
        <dd>
          {totals.deliveryFee === 0
            ? totals.method === "delivery"
              ? `Free (order of ${formatPrice(FREE_DELIVERY_FROM)} or more)`
              : "Free"
            : formatPrice(totals.deliveryFee)}
        </dd>
        <dt className="totals-grand">Total</dt>
        <dd className="totals-grand">{formatPrice(totals.total)}</dd>
      </dl>
    </>
  );
}

export default OrderTotals;
