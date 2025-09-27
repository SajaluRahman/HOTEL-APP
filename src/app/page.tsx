"use client";
import React, { useState } from "react";
import CategoriesPanel from "./components/CategoriesPanel";
import ItemsPanel from "./components/ItemsPanel";
import CheckoutPanel from "./components/CheckoutPanel";
import { WishlistProvider } from "./components/WishlistContext";
import { categories } from "./components/CategoryData";
import { Item } from "./components/ItemData";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showCategories, setShowCategories] = useState(false); // New: Toggle categories
  const [showCheckout, setShowCheckout] = useState(false); // New: Toggle checkout

  return (
    <WishlistProvider>
      {/* Navbar for tablet/mobile */}
      <nav className="lg:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
        <button
          className="text-gray-900 text-2xl"
          onClick={() => {
            setShowCategories(!showCategories);
            setShowCheckout(false); // Close other sidebar
          }}
        >
          <i className="fas fa-bars"> 🍔</i> {/* Hamburger icon */}
        </button>
        <h1 className="text-xl font-bold text-gray-900">Luxe Dining</h1>
        <button
          className="text-gray-900 text-2xl"
          onClick={() => {
            setShowCheckout(!showCheckout);
            setShowCategories(false); // Close other sidebar
          }}
        >
          <i className="fas fa-heart">❤️</i> {/* Heart icon */}
        </button>
      </nav>
      <main className="flex flex-col lg:flex-row h-screen  mx-auto bg-white shadow-2xl overflow-hidden pt-16 lg:pt-0">
        {/* Categories Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full z-40 bg-white transition-transform duration-300 transform ${
            showCategories ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:translate-x-0 lg:flex`}
        >
          <CategoriesPanel
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeSubcategory={activeSubcategory}
            setActiveSubcategory={setActiveSubcategory}
          />
        </div>
        {/* Categories Backdrop */}
        {showCategories && (
          <div
            className="fixed inset-0  bg-opacity-50 z-30 lg:hidden"
            onClick={() => setShowCategories(false)}
          ></div>
        )}
        {/* Items Panel */}
        <ItemsPanel
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          setSelectedItem={setSelectedItem}
        />
        {/* Checkout Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full z-40 bg-white transition-transform duration-300 transform ${
            showCheckout ? "translate-x-0" : "translate-x-full"
          } lg:static lg:translate-x-0 lg:flex`}
        >
          <CheckoutPanel />
        </div>
        {/* Checkout Backdrop */}
        {showCheckout && (
          <div
            className="fixed inset-0  bg-opacity-50 z-30 lg:hidden"
            onClick={() => setShowCheckout(false)}
          ></div>
        )}
      </main>
      {/* Product Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{selectedItem.name}</h2>
              <p className="text-gray-600 mb-4">{selectedItem.description}</p>
              <div className="flex gap-2 items-center mb-4">
                <span className="line-through text-gray-400">
                  ${selectedItem.originalPrice.toFixed(2)}
                </span>
                <span className="text-yellow-600 font-bold">
                  ${selectedItem.price.toFixed(2)}
                </span>
              </div>
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                {selectedItem.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
              <button
                className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold"
                onClick={() => {
                  setSelectedItem(null);
                }}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </WishlistProvider>
  );
};

export default HomePage;