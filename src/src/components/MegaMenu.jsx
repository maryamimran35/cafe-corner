import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee, Croissant, GlassWater, Sandwich, Star } from "lucide-react";
import { CATEGORIES, menuItems } from "../data/menuItems";
import { formatPrice } from "../utils/format";
import ItemImage from "./ItemImage";

// One icon per category. Deals are shown separately at the bottom of the list.
const CATEGORY_ICONS = {
  "Hot Drinks": Coffee,
  "Cold Drinks": GlassWater,
  "Sweets & Bakery": Croissant,
  Savoury: Sandwich,
};
const MEGA_CATEGORIES = CATEGORIES.filter((name) => name !== "Deals");

// The big dropdown under the navbar. It is built from menuItems, so it can never
// show a product that is missing from the menu. onNavigate closes the dropdown.
function MegaMenu({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [paused, setPaused] = useState(false);

  const categoryName = MEGA_CATEGORIES[activeCategory];
  const products = menuItems.filter((item) => item.category === categoryName);
  const CategoryIcon = CATEGORY_ICONS[categoryName];

  // Move the highlight to the next product every 2.5 seconds, then to the next category.
  // It stops while the mouse or keyboard is inside, and for people who asked for less motion.
  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = setTimeout(() => {
      if (activeProduct < products.length - 1) {
        setActiveProduct((previous) => previous + 1);
      } else {
        setActiveCategory((previous) => (previous + 1) % MEGA_CATEGORIES.length);
        setActiveProduct(0);
      }
    }, 2500);
    // Cleanup: cancel the timer if anything changes before it fires
    return () => clearTimeout(timer);
  }, [paused, activeCategory, activeProduct, products.length]);

  function previewCategory(index) {
    setActiveCategory(index);
    setActiveProduct(0);
  }

  return (
    <div
      id="mega-panel"
      className="mega-menu"
      role="region"
      aria-label="Menu categories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
    >
      <div className="mega-intro">
        <p className="mega-eyebrow">DISCOVER OUR MENU</p>
        <p className="mega-title">
          Explore the <span>taste of Cafe Corner.</span>
        </p>
        <p className="mega-text">Freshly prepared coffee, delicious bites and sweet moments.</p>
      </div>

      <div className="mega-categories">
        <p className="mega-eyebrow">EXPLORE CATEGORIES</p>
        {MEGA_CATEGORIES.map((name, index) => {
          const Icon = CATEGORY_ICONS[name];
          return (
            <Link
              key={name}
              to={`/?category=${encodeURIComponent(name)}`}
              className={index === activeCategory ? "mega-category mega-category-active" : "mega-category"}
              onMouseEnter={() => previewCategory(index)}
              onFocus={() => previewCategory(index)}
              onClick={onNavigate}
            >
              <Icon aria-hidden="true" />
              <span>{name}</span>
              <ArrowRight aria-hidden="true" className="mega-arrow" />
            </Link>
          );
        })}
        <Link to="/?category=Deals" className="mega-deals" onClick={onNavigate}>
          <Star aria-hidden="true" />
          Special deals
        </Link>
      </div>

      <div className="mega-products">
        <div className="mega-heading">
          <div>
            <p className="mega-eyebrow">NOW EXPLORING</p>
            <p className="mega-category-title">
              <CategoryIcon aria-hidden="true" />
              {categoryName}
            </p>
          </div>
          <span className="mega-counter">
            {activeProduct + 1} / {products.length}
          </span>
        </div>

        <div className="mega-list">
          {products.map((item, index) => (
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className={index === activeProduct ? "mega-product mega-product-active" : "mega-product"}
              onMouseEnter={() => setActiveProduct(index)}
              onFocus={() => setActiveProduct(index)}
              onClick={onNavigate}
            >
              <div className="mega-image">
                <ItemImage item={item} />
              </div>
              <p className="mega-product-name">{item.name}</p>
              <p className="mega-product-price">{formatPrice(item.price)}</p>
            </Link>
          ))}
        </div>

        <Link to="/" className="mega-all" onClick={onNavigate}>
          Explore full menu
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default MegaMenu;
