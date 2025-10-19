"use client";
import React from "react";
import { categories } from "./CategoryData";

type Props = {
  activeCategory: string;
  setActiveCategory: (key: string) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (sub: string | null) => void;
};

const CategoriesPanel: React.FC<Props> = ({
  activeCategory,
  setActiveCategory,
  activeSubcategory,
  setActiveSubcategory,
}) => (
  <div className="w-full lg:w-80 bg-gradient-to-b from-amber-50 to-white overflow-y-auto shadow-xl">
    {/* Header Section */}
    <div className="px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">✨</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
          Luxe Dining
        </h1>
      </div>
      <p className="text-sm text-gray-500 ml-13">Exquisite flavors await</p>
    </div>

    {/* Categories List */}
    <div className="px-4 pb-6 space-y-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.key;
        
        return (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              if (activeSubcategory) setActiveSubcategory(null);
            }}
            className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-amber-50 hover:shadow-md hover:scale-102"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-semibold text-base ${isActive ? "text-white" : "text-gray-800"}`}>
                  {cat.name}
                </div>
                <div className={`text-xs mt-1 ${isActive ? "text-amber-100" : "text-gray-500"}`}>
                  {cat.subcategories.length} varieties
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isActive ? "bg-white bg-opacity-20" : "bg-amber-100"
              }`}>
                <span className={`text-lg ${isActive ? "text-white" : "text-amber-600"}`}>
                  {isActive ? "→" : "›"}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>

    {/* Footer Decoration */}
    <div className="px-8 py-6 mt-4 border-t border-amber-100">
      <div className="text-center text-xs text-gray-400">
        🍽️ Crafted with love
      </div>
    </div>
  </div>
);

export default CategoriesPanel;