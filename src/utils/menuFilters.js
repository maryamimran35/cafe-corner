export function getVisibleItems(items, { query, category, vegOnly, sortBy }) {
  const text = query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const searchable = `${item.name} ${item.description} ${item.category}`.toLowerCase();
    const matchesText = text === "" || searchable.includes(text);
    const matchesCategory = category === "All" || item.category === category;
    const matchesVeg = !vegOnly || item.vegetarian;
    return matchesText && matchesCategory && matchesVeg;
  });

  const sorted = [...filtered];
  if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}