import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { useCart } from "../context/useCart";
import OrderTotals from "../components/OrderTotals";

function ConfirmationPage() {
  const { lastOrder } = useCart();
  const headingRef = useRef(null);

  // Move keyboard and screen-reader attention to the result when the page opens
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // Opened directly (or after a refresh) with no order to show
  if (!lastOrder) {
    return (
      <>
        <h1>No recent order</h1>
        <p>There is no order to show here. Start one from the menu.</p>
        <Link className="btn btn-primary" to="/">
          Browse the menu
        </Link>
      </>
    );
  }

  const { details } = lastOrder;
  const isDelivery = lastOrder.method === "delivery";

  return (
    <>
      <h1 ref={headingRef} tabIndex={-1} className="confirm-title">
        <CircleCheck aria-hidden="true" />
        Order placed
      </h1>
      <p className="demo-note">This is a simulated order. Nothing was sent, prepared or charged.</p>

      <section className="summary-box" aria-labelledby="confirm-heading">
        <h2 id="confirm-heading">Order {lastOrder.number}</h2>
        <p>
          Thank you, {details.name}. We would contact you on {details.phone}.
        </p>
        <p>
          {isDelivery ? (
            <>
              <strong>Delivery</strong> to {details.address}, sector {details.area}.
            </>
          ) : (
            <>
              <strong>Pickup</strong> from the counter at our shop.
            </>
          )}
          {lastOrder.scheduledFor && <> Scheduled for {lastOrder.scheduledFor}.</>}
        </p>
        {details.notes && <p>Notes: {details.notes}</p>}
        <OrderTotals lines={lastOrder.lines} totals={lastOrder} />
      </section>

      <p>
        <Link className="btn btn-primary" to="/">
          Back to the menu
        </Link>
      </p>
    </>
  );
}

export default ConfirmationPage;
