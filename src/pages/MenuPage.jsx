import { CATEGORIES, menuItems } from "../data/menuItems";
import ItemCard from "../components/ItemCard";

function MenuPage() {
  return (
    <>
      <h1>Our Menu</h1>
      <p className="intro">Coffee, bakes and bites for study breaks.</p>

      {CATEGORIES.map((category) => {
        // Keep only the items that belong to this category
        const items = menuItems.filter((item) => item.category === category);
        const headingId = `cat-${category.replace(/\W+/g, "-")}`;

        return (
          <section key={category} aria-labelledby={headingId}>
            <h2 id={headingId}>{category}</h2>
            <div className="card-grid">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

export default MenuPage;