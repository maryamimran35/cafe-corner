import { Link, useParams } from "react-router-dom";
import { menuItems } from "../data/menuItems";
import { formatPrice } from "../utils/format";

function ItemDetailsPage() {
  // useParams reads :id from the URL. URL values are text, so convert to a number.
  const { id } = useParams();
  const item = menuItems.find((entry) => entry.id === Number(id));

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

  return (
    <>
      <p>
        <Link to="/">&larr; Back to the menu</Link>
      </p>
      <h1>{item.name}</h1>
      <p className="card-category">{item.category}</p>
      <p>{item.description}</p>
      <ul className="detail-list">
        <li>Price: {formatPrice(item.price)}</li>
        <li>Serving: {item.serving}</li>
        <li>{item.vegetarian ? "Vegetarian" : "Contains meat"}</li>
        <li>Allergens: {item.allergens.length > 0 ? item.allergens.join(", ") : "None listed"}</li>
      </ul>
    </>
  );
}

export default ItemDetailsPage;