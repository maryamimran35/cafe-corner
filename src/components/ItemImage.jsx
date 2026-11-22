import { useState } from "react";

// Shows the item photo. If the item has no photo, or the file fails to load,
// a designed fallback (the first letter of the name) is shown instead.
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
