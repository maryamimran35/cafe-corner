import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, ChevronDown, Coffee, MapPin, Menu, ShoppingCart, UtensilsCrossed, X } from "lucide-react";
import { useCart } from "../context/useCart";
import { getCartCount } from "../utils/cartHelpers";
import MegaMenu from "./MegaMenu";

function Navbar() {
  const { lines } = useCart();
  const count = getCartCount(lines);
  // megaOpen = the big dropdown, mobileOpen = the phone menu
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeAll() {
    setMegaOpen(false);
    setMobileOpen(false);
  }

  return (
    <header
      className="topbar"
      onMouseLeave={() => setMegaOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") closeAll();
      }}
      onBlur={(event) => {
        // Close the dropdown when keyboard focus moves out of the header
        if (!event.currentTarget.contains(event.relatedTarget)) setMegaOpen(false);
      }}
    >
      <div className="container topbar-inner">
        <Link to="/" className="topbar-brand" onClick={closeAll}>
          <Coffee aria-hidden="true" />
          <span>
            Cafe <b>Corner</b>
          </span>
        </Link>

        <nav id="main-nav" aria-label="Main" className={mobileOpen ? "topbar-nav topbar-nav-open" : "topbar-nav"}>
          <ul className="topbar-links">
            <li onMouseEnter={() => setMegaOpen(true)}>
              <NavLink to="/" end onClick={closeAll}>
                <UtensilsCrossed aria-hidden="true" />
                <span>Menu</span>
              </NavLink>
              <button
                type="button"
                className="mega-toggle"
                aria-expanded={megaOpen}
                aria-controls="mega-panel"
                aria-label="Show menu categories"
                onClick={() => setMegaOpen((previous) => !previous)}
              >
                <ChevronDown aria-hidden="true" />
              </button>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeAll}>
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
            onClick={closeAll}
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
          <Link to="/" className="order-btn" onClick={closeAll}>
            Order now
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={mobileOpen}
          aria-controls="main-nav"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((previous) => !previous)}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Only on the page while open, so its timer stops when it closes */}
      {megaOpen && <MegaMenu onNavigate={closeAll} />}
    </header>
  );
}

export default Navbar;
