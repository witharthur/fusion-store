"use client"

import { Search } from "lucide-react"

interface ProductFiltersProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  selectedCategory: string
}

export default function ProductFilters({ onSearch, onCategoryChange, selectedCategory }: ProductFiltersProps) {
  const categories = ["All", "Audio", "Wearables", "Accessories", "Power"]

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
        />
      </div>

      {/* Category Filters */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category === "All" ? "" : category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                (category === "All" && !selectedCategory) || selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-muted-foreground">Under $25</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-muted-foreground">$25 - $50</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-muted-foreground">$50 - $100</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-muted-foreground">Over $100</span>
          </label>
        </div>
      </div>
    </div>
  )
}
