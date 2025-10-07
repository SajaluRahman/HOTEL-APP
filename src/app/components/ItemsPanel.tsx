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
  setActiveSubcategory: (sub: string | null) => void; // Added
};

const ItemsPanel: React.FC<Props> = ({
  activeCategory,
  activeSubcategory,
  setSelectedItem,
  setActiveSubcategory,
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const cat = categories.find((c) => c.key === activeCategory);
  let filteredItems = items.filter((i) => i.categoryKey === activeCategory);
  if (activeSubcategory) {
    filteredItems = filteredItems.filter((i) => i.subcategory === activeSubcategory);
  }

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {cat?.name || "Category"} {activeSubcategory ? `- ${activeSubcategory}` : "Collection"}
        </h2>
        <p className="text-gray-500 text-base">
          {activeCategory === "breakfast"
            ? "Start your day with our premium breakfast selections"
            : `Explore our ${cat?.name?.toLowerCase() || "category"} delights`}
        </p>
      </div>
      {/* Subcategories Tabs */}
      {cat && (
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeSubcategory === null
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setActiveSubcategory(null)}
          >
            All
          </button>
          {cat.subcategories.map((sub) => (
            <button
              key={sub}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeSubcategory === sub
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveSubcategory(activeSubcategory === sub ? null : sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition relative cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <button
                className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full shadow hover:scale-110 transition border ${
                  wishlist[item.id] ? "bg-yellow-500 text-white" : "bg-white text-gray-600"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
              >
                <span className="text-lg">{wishlist[item.id] ? "♥" : "♡"}</span>
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-400 text-sm">
                  ${item.originalPrice.toFixed(2)}
                </span>
                <span className="text-yellow-600 font-bold text-base">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No items found in this subcategory.</p>
      )}
    </div>
  );
};

export default ItemsPanel;