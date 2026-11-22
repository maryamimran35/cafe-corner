import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee, Croissant, GlassWater, Pause, Play, Sandwich, Star } from "lucide-react";
import { CATEGORIES } from "../data/menuItems";
import { useMenu } from "../context/useMenu";
import { formatPrice } from "../utils/format";
import ItemImage from "./ItemImage";

const CATEGORY_ICONS = {
  "Hot Drinks": Coffee,
  "Cold Drinks": GlassWater,
  "Sweets & Bakery": Croissant,
  Savoury: Sandwich,
  Deals: Star,
};

const SLIDE_MS = 2500;

// Static showcase under the top bar. Left: short intro. Middle: categories.
// Right: a display that steps through the products of one category, then moves to the next category.
function NavShowcase() {
  const { items } = useMenu();
  // Built from the loaded menu, so it can never show a product that is missing from it:
  // [{ name, items: [...] }, ...]
  const groups = useMemo(
    () =>
      CATEGORIES.map((name) => ({
        name,
        items: items.filter((item) => item.category === name),
      })).filter((entry) => entry.items.length > 0),
    [items],
  );
  // One state object, so the "next product / next category" step is a single functional update
  const [position, setPosition] = useState({ category: 0, product: 0 });
  // Paused by the mouse or keyboard being inside the panel
  const [hovering, setHovering] = useState(false);
  // Paused by the Pause button. Starts paused for people who asked their device for less motion.
  const [userPaused, setUserPaused] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const paused = hovering || userPaused;
  // groups can change (for example after a reload), so fall back to the first one
  const group = groups[position.category] ?? groups[0];

  useEffect(() => {
    if (paused || groups.length === 0) return undefined;
    const timer = setTimeout(() => {
      setPosition((previous) => {
        const current = groups[previous.category] ?? groups[0];
        if (previous.product < current.items.length - 1) {
          return { ...previous, product: previous.product + 1 };
        }
        return { category: (previous.category + 1) % groups.length, product: 0 };
      });
    }, SLIDE_MS);
    // Cleanup: cancel the timer if the position or pause state changes first
    return () => clearTimeout(timer);
  }, [paused, position, groups]);

  function previewCategory(index) {
    setPosition({ category: index, product: 0 });
  }

  // Keyboard users: stay paused while focus is anywhere inside the panel
  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setHovering(false);
  }

  // Nothing to show while the menu is loading, failed, or empty
  if (!group) return null;

  const CategoryIcon = CATEGORY_ICONS[group.name];

  return (
    <section
      className="showcase"
      aria-label="Menu showcase"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={handleBlur}
    >
      <div className="container showcase-inner">
        <div className="showcase-intro">
          <p className="showcase-eyebrow">DISCOVER OUR MENU</p>
          <p className="showcase-title">
            Explore the <span>taste of Cafe Corner.</span>
          </p>
          <p className="showcase-text">Fresh coffee, warm bakes and quick bites for study breaks.</p>
        </div>

        <nav className="showcase-categories" aria-label="Menu categories">
          <p className="showcase-eyebrow">EXPLORE CATEGORIES</p>
          <ul className="showcase-category-list">
            {groups.map((entry, index) => {
              const Icon = CATEGORY_ICONS[entry.name];
              return (
                <li key={entry.name}>
                  <Link
                    to={`/?category=${encodeURIComponent(entry.name)}`}
                    className={index === position.category ? "showcase-category showcase-category-active" : "showcase-category"}
                    onMouseEnter={() => previewCategory(index)}
                    onFocus={() => previewCategory(index)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{entry.name}</span>
                    <ArrowRight aria-hidden="true" className="showcase-arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="showcase-display">
          <div className="showcase-heading">
            <div>
              <p className="showcase-eyebrow">NOW EXPLORING</p>
              <p className="showcase-current">
                <CategoryIcon aria-hidden="true" />
                {group.name}
              </p>
            </div>
            <div className="showcase-controls">
              <span className="showcase-counter" aria-hidden="true">
                {position.product + 1} / {group.items.length}
              </span>
              <button
                type="button"
                className="showcase-pause"
                aria-pressed={userPaused}
                onClick={() => setUserPaused((previous) => !previous)}
              >
                {userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
                <span>{userPaused ? "Play" : "Pause"}</span>
                <span className="sr-only"> showcase animation</span>
              </button>
            </div>
          </div>

          <ul className="showcase-products">
            {group.items.map((item, index) => (
              <li key={item.id}>
                <Link
                  to={`/items/${item.id}`}
                  className={index === position.product ? "showcase-product showcase-product-active" : "showcase-product"}
                  onMouseEnter={() => setPosition((previous) => ({ ...previous, product: index }))}
                  onFocus={() => setPosition((previous) => ({ ...previous, product: index }))}
                >
                  <span className="showcase-img">
                    <ItemImage item={item} />
                  </span>
                  <span className="showcase-product-name">{item.name}</span>
                  <span className="showcase-product-price">{formatPrice(item.price)}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/" className="showcase-all">
            Explore full menu
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NavShowcase;
