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
    <div>
      <div className="category-filter">
        <button
          className={`category-button ${
            selectedCategory === "" ? "active" : ""
          }`}
          onClick={() => onSelectCategory("")}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="sort-filter">
        <button
          className={`sort-button ${sortBy === "commission" ? "active" : ""}`}
          onClick={() => onSortChange("commission")}
        >
          Maior Comissão
        </button>
        <button
          className={`sort-button ${sortBy === "discount" ? "active" : ""}`}
          onClick={() => onSortChange("discount")}
        >
          Maior Desconto
        </button>
      </div>
    </div>
  );
}
