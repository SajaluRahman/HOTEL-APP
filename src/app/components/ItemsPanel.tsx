"use client";
import React from "react";
import { items } from "./ItemData";
import { useWishlist } from "./WishlistContext";
import { categories } from "./CategoryData";
import { Item } from "./ItemData";

type Props = {
  activeCategory: string;
  activeSubcategory: string | null;
  setSelectedItem: (item: Item | null) => void;
  setActiveSubcategory: (sub: string | null) => void;
};

const ItemsPanel: React.FC<Props> = ({
  activeCategory,
  activeSubcategory,
  setSelectedItem,
  setActiveSubcategory,
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const cat = categories.find((c) => c.key === activeCategory);
  
  // Filter items based on category and subcategory
  let filteredItems = items.filter((i) => i.categoryKey === activeCategory);
  if (activeSubcategory) {
    filteredItems = filteredItems.filter((i) => i.subcategory === activeSubcategory);
  }

  return (
    <div className="flex-1 p-6 lg:p-10 overflow-y-auto bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">🍽️</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {cat?.name || "Category"} {activeSubcategory ? `· ${activeSubcategory}` : "Collection"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {activeCategory === "breakfast"
                ? "Start your day with our premium breakfast selections ☀️"
                : `Explore our ${cat?.name?.toLowerCase() || "category"} delights ✨`}
            </p>
          </div>
        </div>
      </div>

      {/* Subcategories Pills */}
      {cat && (
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeSubcategory === null
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-600 border-2 border-amber-200 hover:border-amber-400 hover:shadow-md"
            }`}
            onClick={() => setActiveSubcategory(null)}
          >
            All Items
          </button>
          {cat.subcategories.map((sub) => (
            <button
              key={sub}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeSubcategory === sub
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-600 border-2 border-amber-200 hover:border-amber-400 hover:shadow-md"
              }`}
              onClick={() => setActiveSubcategory(activeSubcategory === sub ? null : sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredItems.map((item) => {
          const isInCart = wishlist[item.id];
          
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => setSelectedItem(item)}
            >
              {/* Item Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                  <span className="text-amber-600 font-bold text-sm">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">
                  {item.description}
                </p>

                {/* Pricing */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="line-through text-gray-400 text-sm">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Save ${(item.originalPrice - item.price).toFixed(2)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`w-full py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isInCart
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
                      : "bg-amber-50 text-amber-600 border-2 border-amber-200 hover:bg-amber-100 hover:border-amber-400"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                >
                  {isInCart ? "✓ In Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">🔍</span>
          </div>
          <p className="text-gray-400 text-lg font-medium">No items found in this category</p>
          <p className="text-gray-400 text-sm mt-2">Try selecting a different category or subcategory</p>
        </div>
      )}
    </div>
  );
};

export default ItemsPanel;