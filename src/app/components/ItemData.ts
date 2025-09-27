export type Item = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  categoryKey: string;
  subcategory: string;  // New: For filtering
  ingredients: string[];  // New: For popup details
  imageUrl: string;  // New: Real image URL
};

export const items: Item[] = [
  // Breakfast
  {
    id: 1,
    name: "French Croissant",
    price: 6.5,
    originalPrice: 8.0,
    description: "Buttery, flaky pastry baked fresh daily with premium French butter",
    categoryKey: "breakfast",
    subcategory: "Continental",
    ingredients: ["Flour", "Butter", "Yeast", "Salt"],
    imageUrl: "https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Belgian Pancakes",
    price: 14.5,
    originalPrice: 16.0,
    description: "Light and fluffy pancakes served with maple syrup and fresh berries",
    categoryKey: "breakfast",
    subcategory: "American",
    ingredients: ["Flour", "Eggs", "Milk", "Maple Syrup", "Berries"],
    imageUrl: "https://images.pexels.com/photos/14335957/pexels-photo-14335957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Truffle Eggs Benedict",
    price: 19.5,
    originalPrice: 22.0,
    description: "Poached eggs on toasted brioche with hollandaise and truffle oil",
    categoryKey: "breakfast",
    subcategory: "Continental",
    ingredients: ["Eggs", "Brioche", "Hollandaise", "Truffle Oil", "Ham"],
    imageUrl: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",  // Eggs Benedict example
  },
  {
    id: 4,
    name: "Artisan Waffle",
    price: 13.5,
    originalPrice: 15.0,
    description: "Crispy Belgian waffle with seasonal fruit and whipped cream",
    categoryKey: "breakfast",
    subcategory: "American",
    ingredients: ["Flour", "Eggs", "Butter", "Fruit", "Whipped Cream"],
    imageUrl: "https://images.unsplash.com/photo-1572448804125-7f1e3b9fc9e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1260&h=750&q=80",  // Waffle from Unsplash
  },
  {
    id: 5,
    name: "Avocado Toast Deluxe",
    price: 12.0,
    originalPrice: 14.0,
    description: "Sourdough bread topped with smashed avocado, feta, and microgreens",
    categoryKey: "breakfast",
    subcategory: "Healthy Options",
    ingredients: ["Avocado", "Sourdough", "Feta", "Microgreens", "Lemon"],
    imageUrl: "https://images.pexels.com/photos/4062617/pexels-photo-4062617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    name: "Full English Breakfast",
    price: 16.5,
    originalPrice: 18.0,
    description: "Traditional breakfast with eggs, bacon, sausage, beans, and toast",
    categoryKey: "breakfast",
    subcategory: "American",
    ingredients: ["Eggs", "Bacon", "Sausage", "Beans", "Toast"],
    imageUrl: "https://images.pexels.com/photos/19552394/pexels-photo-19552394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  // Lunch
  {
    id: 7,
    name: "Caesar Salad",
    price: 10.5,
    originalPrice: 12.0,
    description: "Crisp romaine with Caesar dressing, croutons, and parmesan",
    categoryKey: "lunch",
    subcategory: "Salads",
    ingredients: ["Romaine", "Caesar Dressing", "Croutons", "Parmesan"],
    imageUrl: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",  // Caesar Salad example
  },
  {
    id: 8,
    name: "Turkey Club Sandwich",
    price: 12.5,
    originalPrice: 14.0,
    description: "Toasted sandwich with turkey, bacon, lettuce, and mayo",
    categoryKey: "lunch",
    subcategory: "Sandwiches",
    ingredients: ["Turkey", "Bacon", "Lettuce", "Tomato", "Mayo"],
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1260&h=750&q=80",  // Turkey sandwich from Unsplash
  },
  {
    id: 9,
    name: "Tomato Basil Soup",
    price: 8.0,
    originalPrice: 9.5,
    description: "Creamy tomato soup with fresh basil and croutons",
    categoryKey: "lunch",
    subcategory: "Soups",
    ingredients: ["Tomatoes", "Basil", "Cream", "Croutons"],
    imageUrl: "https://images.pexels.com/photos/1279331/pexels-photo-1279331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",  // Tomato soup example
  },
  // Dinner
  {
    id: 10,
    name: "Grilled Ribeye Steak",
    price: 28.0,
    originalPrice: 32.0,
    description: "Juicy ribeye steak with herb butter and roasted vegetables",
    categoryKey: "dinner",
    subcategory: "Steaks",
    ingredients: ["Ribeye", "Herb Butter", "Vegetables"],
    imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1260&h=750&q=80",  // Grilled steak from Unsplash
  },
  {
    id: 11,
    name: "Pan-Seared Salmon",
    price: 24.0,
    originalPrice: 27.0,
    description: "Fresh salmon with lemon herb sauce and asparagus",
    categoryKey: "dinner",
    subcategory: "Seafood",
    ingredients: ["Salmon", "Lemon", "Herbs", "Asparagus"],
    imageUrl: "https://images.pexels.com/photos/555775/pexels-photo-555775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 12,
    name: "Mushroom Risotto",
    price: 18.5,
    originalPrice: 21.0,
    description: "Creamy risotto with wild mushrooms and parmesan",
    categoryKey: "dinner",
    subcategory: "Pasta",
    ingredients: ["Rice", "Mushrooms", "Parmesan", "Broth"],
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1260&h=750&q=80",  // Risotto from Unsplash
  },
  // Starters
  {
    id: 13,
    name: "Bruschetta",
    price: 7.5,
    originalPrice: 9.0,
    description: "Toasted bread with tomato, basil, and balsamic glaze",
    categoryKey: "starters",
    subcategory: "Cold Appetizers",
    ingredients: ["Bread", "Tomato", "Basil", "Balsamic"],
    imageUrl: "https://images.unsplash.com/photo-1559314809-0f31657def5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1260&h=750&q=80",  // Bruschetta from Unsplash
  },
  {
    id: 14,
    name: "Calamari Fritti",
    price: 9.5,
    originalPrice: 11.0,
    description: "Crispy fried calamari with marinara sauce",
    categoryKey: "starters",
    subcategory: "Hot Appetizers",
    ingredients: ["Calamari", "Flour", "Marinara"],
    imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",  // Calamari example
  },
  // Desserts
  {
    id: 15,
    name: "Chocolate Lava Cake",
    price: 8.0,
    originalPrice: 9.5,
    description: "Warm chocolate cake with a molten center and vanilla ice cream",
    categoryKey: "desserts",
    subcategory: "Cakes",
    ingredients: ["Chocolate", "Flour", "Eggs", "Ice Cream"],
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1260&h=750&q=80",  // Lava cake from Unsplash
  },
  {
    id: 16,
    name: "Crème Brûlée",
    price: 7.5,
    originalPrice: 8.5,
    description: "Classic vanilla custard with caramelized sugar top",
    categoryKey: "desserts",
    subcategory: "French Pastries",
    ingredients: ["Vanilla Custard", "Sugar"],
    imageUrl: "https://images.pexels.com/photos/633501/pexels-photo-633501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  // Drinks
  {
    id: 17,
    name: "Espresso",
    price: 4.0,
    originalPrice: 5.0,
    description: "Rich, bold espresso made with premium beans",
    categoryKey: "drinks",
    subcategory: "Coffee",
    ingredients: ["Coffee Beans", "Water"],
    imageUrl: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",  // Espresso example
  },
  {
    id: 18,
    name: "Fresh Orange Juice",
    price: 5.5,
    originalPrice: 6.5,
    description: "Freshly squeezed orange juice, served chilled",
    categoryKey: "drinks",
    subcategory: "Fresh Juices",
    ingredients: ["Oranges"],
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1260&h=750&q=80",  // Orange juice from Unsplash
  },
];