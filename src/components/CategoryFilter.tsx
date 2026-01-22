"use client";

import { useState, useRef, useEffect } from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: "commission" | "discount" | "price_low" | "price_under_20";
  onSortChange: (sort: "commission" | "discount" | "price_low" | "price_under_20") => void;
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
    <div className="bg-white py-3 md:py-4 mb-2 border-b border-shopee-border overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 md:pb-0">
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-bold border-2 transition-all active:scale-95 ${
                selectedCategory || isCategoryOpen
                  ? "border-shopee-orange text-shopee-orange bg-shopee-orange/5"
                  : "border-shopee-bg text-shopee-text-secondary bg-shopee-bg hover:border-shopee-border"
              }`}
            >
              <span className="whitespace-nowrap">{selectedCategory || "Categorias"}</span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
              >
                <polyline points="1 1 5 5 9 1" />
              </svg>
            </button>

            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fadeInUp z-50">
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

          <div className="flex gap-2 items-center">
            <button
              onClick={() => onSortChange("commission")}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 shrink-0 ${
                sortBy === "commission"
                  ? "bg-shopee-orange border-shopee-orange text-white shadow-sm"
                  : "bg-white border-shopee-border text-shopee-text-secondary hover:border-shopee-orange hover:text-shopee-orange"
              }`}
            >
              🔥 Tendência
            </button>
            <button
              onClick={() => onSortChange("discount")}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 shrink-0 ${
                sortBy === "discount"
                  ? "bg-shopee-orange border-shopee-orange text-white shadow-sm"
                  : "bg-white border-shopee-border text-shopee-text-secondary hover:border-shopee-orange hover:text-shopee-orange"
              }`}
            >
              💰 + Desconto
            </button>
            <button
              onClick={() => onSortChange("price_low")}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 shrink-0 ${
                sortBy === "price_low"
                  ? "bg-shopee-orange border-shopee-orange text-white shadow-sm"
                  : "bg-white border-shopee-border text-shopee-text-secondary hover:border-shopee-orange hover:text-shopee-orange"
              }`}
            >
              ⬇️ Menor Preço
            </button>
            <button
              onClick={() => onSortChange("price_under_20")}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 shrink-0 ${
                sortBy === "price_under_20"
                  ? "bg-shopee-orange border-shopee-orange text-white shadow-sm"
                  : "bg-white border-shopee-border text-shopee-text-secondary hover:border-shopee-orange hover:text-shopee-orange"
              }`}
            >
              🏷️ Abaixo de R$20
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
