import { CATEGORIES } from "../data/menuItems";

function SearchFilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  vegOnly,
  onVegOnlyChange,
  sortBy,
  onSortByChange,
}) {
  return (
    <form className="filters" role="search" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="search">Search the menu</label>
        <input
          id="search"
          type="search"
          value={query}
          placeholder="e.g. latte, waffle"
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="All">All categories</option>
          {CATEGORIES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sortBy} onChange={(event) => onSortByChange(event.target.value)}>
          <option value="menu">Menu order</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div className="field field-check">
        <input
          id="veg"
          type="checkbox"
          checked={vegOnly}
          onChange={(event) => onVegOnlyChange(event.target.checked)}
        />
        <label htmlFor="veg">Vegetarian only</label>
      </div>
    </form>
  );
}

export default SearchFilterBar;