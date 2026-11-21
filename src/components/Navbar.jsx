import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/useCart";
import { getCartCount } from "../utils/cartHelpers";

function Navbar() {
  const { lines } = useCart();
  const count = getCartCount(lines);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          Cafe Corner
        </Link>
        <nav aria-label="Main">
          <ul className="nav-list">
            <li>
              <NavLink to="/" end>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart ({count})</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;