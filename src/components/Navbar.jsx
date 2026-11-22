import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Coffee, MapPin, ShoppingCart, UtensilsCrossed } from "lucide-react";
import { useCart } from "../context/useCart";
import { getCartCount } from "../utils/cartHelpers";
import NavShowcase from "./NavShowcase";

// A static navbar: it is always visible at the top of the page and scrolls away with it.
function Navbar() {
  const { lines } = useCart();
  const count = getCartCount(lines);

  return (
    <header className="topbar">
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
            {/* The key changes with the count, so the badge replays its pop animation */}
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

      {/* Always-visible showcase: intro, categories and the auto-changing product display */}
      <NavShowcase />
    </header>
  );
}

export default Navbar;
