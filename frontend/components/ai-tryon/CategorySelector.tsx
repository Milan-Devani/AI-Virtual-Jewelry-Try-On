import * as React from "react";
import { JEWELRY_CATEGORIES } from "../../constants/categories";
import { cn } from "../../lib/utils";
import { Sparkles } from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  disabled?: boolean;
}

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
  disabled,
}: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-[#1A1715] flex items-center gap-1.5">
          <span>Jewelry Category</span>
          <span className="text-xs font-normal text-[#8A837A]">(7 Supported)</span>
        </label>
        <span className="text-xs text-[#8C6428] font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Anatomical Placement AI
        </span>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {JEWELRY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "relative flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:opacity-50",
                isSelected
                  ? "border-[#B38541] bg-[#FAF5EB] shadow-sm ring-1 ring-[#B38541]/50"
                  : "border-[#E8E1D6] bg-white hover:border-[#D6CCC0] hover:bg-[#FDFBF8]"
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className={cn(
                    "text-xs font-semibold tracking-tight",
                    isSelected ? "text-[#1A1715]" : "text-[#2E2A25]"
                  )}
                >
                  {cat.name}
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded",
                    isSelected
                      ? "bg-[#EFE3CF] text-[#7A561E]"
                      : "bg-[#F3EEE7] text-[#7A736B]"
                  )}
                >
                  {cat.placement}
                </span>
              </div>
              <p
                className={cn(
                  "text-[11px] line-clamp-1 leading-snug",
                  isSelected ? "text-[#7A561E]" : "text-[#8A837A]"
                )}
              >
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
