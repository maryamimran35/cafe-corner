import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, menuItems } from "../data/menuItems";
import { getVisibleItems } from "../utils/menuFilters";
import ItemCard from "../components/ItemCard";
import SearchFilterBar from "../components/SearchFilterBar";
import OpenStatus from "../components/OpenStatus";

function MenuPage() {
  // The four controls live here, so the list and the bar always agree
  const [query, setQuery] = useState("");
  // The navbar dropdown links here with ?category=Hot%20Drinks, so start with that category
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [category, setCategory] = useState(CATEGORIES.includes(categoryFromUrl) ? categoryFromUrl : "All");
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState("menu");

  // Derived value: calculated on every render, not stored in state
  const visibleItems = getVisibleItems(menuItems, { query, category, vegOnly, sortBy });

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setVegOnly(false);
    setSortBy("menu");
  }

  return (
    <>
      <h1>Our Menu</h1>
      <p className="intro">Coffee, bakes and bites for study breaks.</p>
      <OpenStatus />

      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        vegOnly={vegOnly}
        onVegOnlyChange={setVegOnly}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <p className="result-count" aria-live="polite">
        Showing {visibleItems.length} of {menuItems.length} items
      </p>

      {visibleItems.length === 0 ? (
        // Empty state: nothing matches, so explain and offer a next step
        <div className="empty-state">
          <h2>No items match your search</h2>
          <p>Try a different word, or remove the category and vegetarian filters.</p>
          <button type="button" className="btn btn-primary" onClick={clearFilters}>
            Clear search and filters
          </button>
        </div>
      ) : sortBy === "menu" ? (
        // Default order: group the visible items under category headings
        CATEGORIES.map((name) => {
          const items = visibleItems.filter((item) => item.category === name);
          if (items.length === 0) return null;
          const headingId = `cat-${name.replace(/\W+/g, "-")}`;
          return (
            <section key={name} aria-labelledby={headingId}>
              <h2 id={headingId}>{name}</h2>
              <div className="card-grid">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        // Any other sort: one flat list so the order is easy to see
        <div className="card-grid">
          {visibleItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

export default MenuPage;
