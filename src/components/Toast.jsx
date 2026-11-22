import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, TriangleAlert, X } from "lucide-react";
import { useCart } from "../context/useCart";

// A small message that slides up after the customer adds something (or breaks a rule).
function Toast() {
  const { notice, clearNotice } = useCart();

  useEffect(() => {
    // Messages about removed cart items stay until the customer dismisses them
    if (!notice || notice.persist) return undefined;
    const timer = setTimeout(clearNotice, 4000);
    return () => clearTimeout(timer);
  }, [notice, clearNotice]);

  const isSuccess = notice && notice.type === "success";

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {notice && (
        <div key={notice.id} className={isSuccess ? "toast" : "toast toast-error"}>
          {isSuccess ? <Check aria-hidden="true" /> : <TriangleAlert aria-hidden="true" />}
          <div>
            <p className="toast-text">{notice.text}</p>
            {isSuccess && (
              <p className="toast-sub">
                {notice.count} {notice.count === 1 ? "item" : "items"} in your cart
              </p>
            )}
          </div>
          {isSuccess && (
            <Link to="/cart" className="toast-link">
              View cart
            </Link>
          )}
          <button type="button" className="toast-close" aria-label="Dismiss message" onClick={clearNotice}>
            <X aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Toast;
