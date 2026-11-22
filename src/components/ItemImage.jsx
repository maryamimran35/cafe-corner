import { useState } from "react";

function ItemImage({ item }) {
  const [failed, setFailed] = useState(false);

  if (!item.image || failed) {
    return (
      <span className="card-fallback" aria-hidden="true">
        {item.name.charAt(0)}
      </span>
    );
  }

  return <img src={item.image} alt={item.name} loading="lazy" onError={() => setFailed(true)} />;
}

export default ItemImage;
