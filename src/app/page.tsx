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
  const [showCategories, setShowCategories] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <WishlistProvider>
      {/* Mobile Navigation Bar */}
      <nav className="lg:hidden bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-amber-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30 shadow-lg backdrop-blur-sm bg-opacity-95">
        <button
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105"
          onClick={() => {
            setShowCategories(!showCategories);
            setShowCheckout(false);
          }}
        >
          <span className="text-2xl">☰</span>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">✨</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Luxe Dining
          </h1>
        </div>
        
        <button
          className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105"
          onClick={() => {
            setShowCheckout(!showCheckout);
            setShowCategories(false);
          }}
        >
          <span className="text-white text-xl">🛒</span>
        </button>
      </nav>

      {/* Main Layout */}
      <main className="flex flex-col lg:flex-row h-screen mx-auto bg-gradient-to-br from-amber-50 to-white overflow-hidden pt-20 lg:pt-0">
        {/* Categories Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 transform ${
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
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setShowCategories(false)}
          ></div>
        )}

        {/* Items Panel */}
        <ItemsPanel
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          setSelectedItem={setSelectedItem}
          setActiveSubcategory={setActiveSubcategory}
        />

        {/* Checkout Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full z-40 transition-transform duration-300 transform ${
            showCheckout ? "translate-x-0" : "translate-x-full"
          } lg:static lg:translate-x-0 lg:flex`}
        >
          <CheckoutPanel />
        </div>

        {/* Checkout Backdrop */}
        {showCheckout && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setShowCheckout(false)}
          ></div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all"
                onClick={() => setSelectedItem(null)}
              >
                <span className="text-gray-600 text-xl font-bold">×</span>
              </button>
              
              {/* Price Badge */}
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-400 text-sm">
                    ${selectedItem.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-amber-600 font-bold text-xl">
                    ${selectedItem.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {selectedItem.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              {/* Savings Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full mb-6 shadow-md">
                <span className="text-sm font-bold">
                  💰 Save ${(selectedItem.originalPrice - selectedItem.price).toFixed(2)}
                </span>
              </div>

              {/* Ingredients Section */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🥗</span>
                  <span>Ingredients</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedItem.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl px-3 py-2 text-sm text-gray-700 shadow-sm"
                    >
                      • {ing}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setSelectedItem(null);
                }}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      )}
    </WishlistProvider>
  );
};

export default HomePage;