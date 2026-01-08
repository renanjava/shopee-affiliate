"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: "commission" | "discount";
  onSortChange: (sortBy: "commission" | "discount") => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          className={`px-5 py-2 rounded-full text-[0.95rem] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer hover:bg-[#e9ecef] hover:-translate-y-0.5 ${
            selectedCategory === ""
              ? "bg-shopee-orange text-white shadow-md"
              : "bg-[#f1f3f5] text-shopee-text-primary"
          }`}
          onClick={() => onSelectCategory("")}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-5 py-2 rounded-full text-[0.95rem] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer hover:bg-[#e9ecef] hover:-translate-y-0.5 ${
              selectedCategory === category
                ? "bg-shopee-orange text-white shadow-md"
                : "bg-[#f1f3f5] text-shopee-text-primary"
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          className={`px-5 py-2 rounded-full text-[0.95rem] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer border-2 shadow-sm ${
            sortBy === "discount"
              ? "bg-shopee-orange border-shopee-orange text-white shadow-md"
              : "bg-white border-shopee-border text-shopee-text-primary hover:border-shopee-orange hover:text-shopee-orange"
          }`}
          onClick={() => onSortChange("discount")}
        >
          Maior Desconto
        </button>
      </div>
    </div>
  );
}
