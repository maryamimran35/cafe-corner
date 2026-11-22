import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Coffee, MapPin, ShoppingCart, UtensilsCrossed } from "lucide-react";
import { useCart } from "../context/useCart";
import { getCartCount } from "../utils/cartHelpers";
import { useHideOnScroll } from "../hooks/useHideOnScroll";

function Navbar() {
  const { lines } = useCart();
  const count = getCartCount(lines);
  const scrollingDown = useHideOnScroll();
  const [focusInside, setFocusInside] = useState(false);
  const hidden = scrollingDown && !focusInside;

  return (
    <header
      className={hidden ? "topbar topbar-hidden" : "topbar"}
      onFocus={() => setFocusInside(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false);
      }}
    >
      <div className="container topbar-inner">
        <Link to="/" className="topbar-brand">
          <Coffee aria-hidden="true" />
          <span>
            Cafe <b>Corner</b>
          </span>
        </Link>

        <nav aria-label="Main" className="topbar-nav">
          <ul className="topbar-links">
            <li>
              <NavLink to="/" end>
                <UtensilsCrossed aria-hidden="true" />
                <span>Menu</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                <MapPin aria-hidden="true" />
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="topbar-actions">
          <NavLink
            to="/cart"
            className="cart-link"
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingCart aria-hidden="true" />
            <span>Cart</span>
            {count > 0 && (
              <span className="badge" key={count} aria-hidden="true">
                {count}
              </span>
            )}
          </NavLink>
          <Link to="/" className="order-btn">
            Order now
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
