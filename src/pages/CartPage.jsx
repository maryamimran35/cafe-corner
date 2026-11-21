import { Link } from "react-router-dom";

function CartPage() {
  return (
    <>
      <h1>Your order</h1>
      <p>Your cart is empty. Ordering is added in the next stage.</p>
      <Link className="btn btn-primary" to="/">
        Browse the menu
      </Link>
    </>
  );
}

export default CartPage;