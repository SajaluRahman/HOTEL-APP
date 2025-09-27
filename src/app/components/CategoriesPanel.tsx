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
  <div className="w-full lg:w-72 bg-white border-r border-gray-200 py-8 overflow-y-auto">
    <div className="px-8 pb-8 border-b border-gray-100 mb-8">
      <h1 className="text-xl font-bold text-gray-900 tracking-tight">
        Luxe Dining
      </h1>
    </div>
    {categories.map((cat) => (
      <div key={cat.key}>
        <div
          className={`px-8 py-3 cursor-pointer transition border-l-4 ${
            activeCategory === cat.key
              ? "bg-gray-50 border-yellow-500 text-yellow-600"
              : "border-transparent hover:bg-gray-50"
          }`}
          onClick={() => {
            setActiveCategory(cat.key);
            if (activeSubcategory) setActiveSubcategory(null);
          }}
        >
          <div className="font-medium mb-2">{cat.name}</div>
        </div>
        {activeCategory === cat.key && (
          <div className="ml-8 text-sm transition-all max-h-48">
            {cat.subcategories.map((sub) => (
              <div
                key={sub}
                className={`py-1 cursor-pointer hover:text-yellow-600 transition ${
                  activeSubcategory === sub
                    ? "font-semibold text-yellow-600"
                    : "text-gray-500"
                }`}
                onClick={() =>
                  setActiveSubcategory(activeSubcategory === sub ? null : sub)
                }
              >
                {sub}
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default CategoriesPanel;