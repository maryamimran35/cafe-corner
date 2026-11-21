export const CATEGORIES = [
  "Hot Drinks",
  "Cold Drinks",
  "Sweets & Bakery",
  "Savoury",
  "Deals",
];

export const menuItems = [
  {
    id: 1, name: "Caramel Macchiato", category: "Hot Drinks", price: 650,
    serving: "1 cup, 350 ml", vegetarian: true, allergens: ["Milk"],
    description: "Espresso poured over steamed milk and vanilla, finished with a caramel drizzle.",
    image: null,
  },
  {
    id: 2, name: "Spanish Latte", category: "Hot Drinks", price: 600,
    serving: "1 cup, 350 ml", vegetarian: true, allergens: ["Milk"],
    description: "A smooth latte sweetened with condensed milk for a creamy, rich taste.",
    image: null,
  },
  {
    id: 3, name: "Karak Chai", category: "Hot Drinks", price: 250,
    serving: "1 cup, 200 ml", vegetarian: true, allergens: ["Milk"],
    description: "Strong tea simmered with cardamom and milk, served hot.",
    image: null,
  },
  {
    id: 4, name: "Vanilla Cold Brew", category: "Cold Drinks", price: 620,
    serving: "1 glass, 400 ml", vegetarian: true, allergens: [],
    description: "Coffee steeped slowly for 12 hours, served over ice with vanilla syrup.",
    image: null,
  },
  {
    id: 5, name: "Mint Lemonade", category: "Cold Drinks", price: 350,
    serving: "1 glass, 400 ml", vegetarian: true, allergens: [],
    description: "Fresh lemon and crushed mint over ice. Sharp, cold and refreshing.",
    image: null,
  },
  {
    id: 6, name: "Oreo Milkshake", category: "Cold Drinks", price: 580,
    serving: "1 glass, 450 ml", vegetarian: true, allergens: ["Milk", "Wheat"],
    description: "Thick vanilla shake blended with Oreo cookie pieces and topped with cream.",
    image: null,
  },
  {
    id: 7, name: "Blueberry Pancakes", category: "Sweets & Bakery", price: 750,
    serving: "Stack of 3, serves 1 to 2", vegetarian: true, allergens: ["Egg", "Milk", "Wheat"],
    description: "Fluffy pancakes with blueberry compote, maple syrup and whipped butter.",
    image: null,
  },
  {
    id: 8, name: "Nutella Waffle", category: "Sweets & Bakery", price: 700,
    serving: "1 large waffle, serves 1", vegetarian: true, allergens: ["Egg", "Milk", "Wheat", "Nuts"],
    description: "Crisp waffle covered in warm Nutella, with banana slices and hazelnut crumble.",
    image: null,
  },
  {
    id: 9, name: "Butter Croissant", category: "Sweets & Bakery", price: 380,
    serving: "1 piece, about 80 g", vegetarian: true, allergens: ["Milk", "Wheat"],
    description: "Flaky, golden croissant baked fresh every morning with real butter.",
    image: null,
  },
  {
    id: 10, name: "New York Cheesecake", category: "Sweets & Bakery", price: 650,
    serving: "1 slice, about 150 g", vegetarian: true, allergens: ["Egg", "Milk", "Wheat"],
    description: "Dense baked cheesecake on a biscuit base, served with strawberry sauce.",
    image: null,
  },
  {
    id: 11, name: "Crispy Chicken Burger", category: "Savoury", price: 850,
    serving: "1 burger with fries, serves 1", vegetarian: false, allergens: ["Egg", "Wheat"],
    description: "Crunchy fried chicken fillet, lettuce and garlic mayo in a toasted brioche bun.",
    image: null,
  },
  {
    id: 12, name: "Loaded Nachos", category: "Savoury", price: 700,
    serving: "Large plate, serves 2", vegetarian: true, allergens: ["Milk"],
    description: "Tortilla chips with melted cheese, jalapenos, beans, salsa and sour cream.",
    image: null,
  },
  {
    id: 13, name: "Study Break Deal", category: "Deals", price: 800,
    serving: "1 croissant + 1 hot drink, serves 1", vegetarian: true, allergens: ["Milk", "Wheat"],
    description: "A butter croissant with your choice of hot drink. Made for a quick break between classes.",
    image: null,
    deal: { choiceLabel: "Hot drink", choiceIds: [3, 2, 1] },
  },
  {
    id: 14, name: "Burger Combo", category: "Deals", price: 1150,
    serving: "1 burger + 1 cold drink, serves 1", vegetarian: false, allergens: ["Egg", "Wheat", "Milk"],
    description: "Crispy Chicken Burger with fries and your choice of cold drink.",
    image: null,
    deal: { choiceLabel: "Cold drink", choiceIds: [5, 4, 6] },
  },
];