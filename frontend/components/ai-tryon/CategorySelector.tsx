import * as React from "react";
import { JEWELRY_CATEGORIES } from "../../constants/categories";
import { cn } from "../../lib/utils";
import { Sparkles, PlusCircle, Wand2 } from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  customCategoryName?: string;
  onChangeCustomCategoryName?: (name: string) => void;
  customPlacement?: string;
  onChangeCustomPlacement?: (placement: string) => void;
  disabled?: boolean;
}

const CUSTOM_PRESETS = [
  { name: "Nath / Nose Ring", placement: "nose & nostril" },
  { name: "Kamarbandh / Waist Chain", placement: "waist & hips" },
  { name: "Bajuband / Armlet", placement: "upper arm & bicep" },
  { name: "Finger Ring", placement: "finger & hand" },
  { name: "Brooch / Pin", placement: "lapel & upper chest" },
  { name: "Tiara / Crown", placement: "top of head & hair" },
];

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
  customCategoryName = "",
  onChangeCustomCategoryName,
  customPlacement = "",
  onChangeCustomPlacement,
  disabled,
}: CategorySelectorProps) {
  const isCustomSelected = selectedCategory === "custom";

  const handleApplyPreset = (preset: { name: string; placement: string }) => {
    onSelectCategory("custom");
    onChangeCustomCategoryName?.(preset.name);
    onChangeCustomPlacement?.(preset.placement);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-[#1A1715] flex items-center gap-1.5">
          <span>Jewelry Category</span>
          <span className="text-xs font-normal text-[#8A837A]">
            (9 Presets + Custom)
          </span>
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

        {/* 8th Card: Custom Category */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelectCategory("custom")}
          className={cn(
            "relative flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:opacity-50",
            isCustomSelected
              ? "border-[#B38541] bg-[#FAF5EB] shadow-sm ring-1 ring-[#B38541]/50"
              : "border-dashed border-[#D6CCC0] bg-[#FCFAF7] hover:border-[#B38541] hover:bg-[#FAF6EF]"
          )}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span
              className={cn(
                "text-xs font-semibold tracking-tight flex items-center gap-1",
                isCustomSelected ? "text-[#1A1715]" : "text-[#524B43]"
              )}
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#B38541]" />
              <span>Custom Category</span>
            </span>
            <span
              className={cn(
                "text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded",
                isCustomSelected
                  ? "bg-[#EFE3CF] text-[#7A561E]"
                  : "bg-[#EFE9E0] text-[#8C6428]"
              )}
            >
              CUSTOM
            </span>
          </div>
          <p
            className={cn(
              "text-[11px] line-clamp-1 leading-snug",
              isCustomSelected ? "text-[#7A561E]" : "text-[#8A837A]"
            )}
          >
            Nath, Kamarbandh, Bajuband, Rings &amp; more
          </p>
        </button>
      </div>

      {/* Expandable Custom Category Details Form */}
      {isCustomSelected && (
        <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#EBE3D6] space-y-3.5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1715]">
              <Wand2 className="w-4 h-4 text-[#B38541]" />
              <span>Configure Custom Jewelry &amp; Placement</span>
            </div>
            <span className="text-[11px] text-[#8A8175]">
              AI Neural Adaptor Active
            </span>
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] text-[#7A736B] font-medium block mb-1.5">
              Popular Presets (Click to fill):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CUSTOM_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#F2EDE4] hover:bg-[#E8DFC9] text-[#2C2723] transition-colors border border-[#E2DAD0]"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#524B43]">
                Custom Category Name
              </label>
              <input
                type="text"
                value={customCategoryName}
                onChange={(e) => onChangeCustomCategoryName?.(e.target.value)}
                placeholder="e.g. Nath / Nose Ring, Kamarbandh, Brooch"
                className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-[#DFD7CC] bg-white text-[#1A1715] placeholder:text-[#A69E94] focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-[#C89E58]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#524B43]">
                Placement Target on Body
              </label>
              <input
                type="text"
                value={customPlacement}
                onChange={(e) => onChangeCustomPlacement?.(e.target.value)}
                placeholder="e.g. nose, waist, upper arm, fingers, lapel"
                className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-[#DFD7CC] bg-white text-[#1A1715] placeholder:text-[#A69E94] focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-[#C89E58]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
