import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";

// "item" is a prop: the parent (MenuPage) passes one menu record in.
function ItemCard({ item }) {
  return (
    <article className="card">
      <div className="card-media">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          // Designed fallback when an item has no photo
          <span className="card-fallback" aria-hidden="true">
            {item.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="card-body">
        <p className="card-category">{item.category}</p>
        <h3 className="card-title">{item.name}</h3>
        <p className="card-desc">{item.description}</p>
        <p className="card-serving">{item.serving}</p>
        <div className="card-footer">
          <span className="card-price">{formatPrice(item.price)}</span>
          <Link className="btn btn-secondary" to={`/items/${item.id}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;