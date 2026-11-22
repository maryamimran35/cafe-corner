import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ItemImage from "./ItemImage";
import { formatPrice } from "../utils/format";

function ItemCard({ item }) {
  return (
    <article className="card">
      <div className="card-media">
        <ItemImage item={item} />
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
            <ArrowRight aria-hidden="true" className="btn-icon" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
