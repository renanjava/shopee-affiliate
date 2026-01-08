"use client";

import { useState, useRef, useEffect } from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: "commission" | "discount";
  onSortChange: (sort: "commission" | "discount") => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
}: CategoryFilterProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    onSelectCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-shopee-border -mx-4 md:-mx-6 px-4 md:px-6 py-2 mb-4">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
              selectedCategory || isCategoryOpen
                ? "border-shopee-orange text-shopee-orange bg-shopee-orange/5"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            <span>{selectedCategory || "Categorias"}</span>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
            >
              <polyline points="1 1 5 5 9 1" />
            </svg>
          </button>

          {isCategoryOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fadeInUp">
              <div className="max-h-[60vh] overflow-y-auto py-1">
                <button
                  onClick={() => handleCategorySelect("")}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between ${
                    selectedCategory === "" ? "text-shopee-orange font-semibold bg-orange-50" : "text-gray-700"
                  }`}
                >
                  Todas
                  {selectedCategory === "" && <span className="text-shopee-orange">✓</span>}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between border-t border-gray-50 ${
                      selectedCategory === category ? "text-shopee-orange font-semibold bg-orange-50" : "text-gray-700"
                    }`}
                  >
                    {category}
                    {selectedCategory === category && <span className="text-shopee-orange">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex bg-gray-100 p-1 rounded-md">
          <button
            onClick={() => onSortChange("commission")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              sortBy === "commission"
                ? "bg-white text-shopee-orange shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Tendência
          </button>
          <button
            onClick={() => onSortChange("discount")}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              sortBy === "discount"
                ? "bg-white text-shopee-orange shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            + Desconto
          </button>
        </div>
      </div>
    </div>
  );
}
