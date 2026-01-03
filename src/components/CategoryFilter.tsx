"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: "discount";
  onSortChange: (sortBy: "discount") => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-4">
      <div className="category-filter flex flex-wrap gap-3 mb-3">
        <button
          className={`category-button px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === '' ? 'bg-orange-500 text-white shadow' : 'bg-gray-100 text-gray-900'
          }`}
          onClick={() => onSelectCategory('')}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category ? 'bg-orange-500 text-white shadow' : 'bg-gray-100 text-gray-900'
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="sort-filter flex gap-3">
        <button
          className={`sort-button px-3 py-2 rounded-full text-sm font-medium ${
            sortBy === 'discount' ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-700'
          }`}
          onClick={() => onSortChange('discount')}
        >
          Maior Desconto
        </button>
      </div>
    </div>
  );
}
