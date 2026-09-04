import * as React from "react";
import { BACKGROUND_OPTIONS, RATIO_OPTIONS, QUALITY_OPTIONS } from "../../constants/categories";
import { BackgroundType, AspectRatio, ImageSizeQuality } from "../../types";

interface GenerationSettingsProps {
  background: BackgroundType;
  onChangeBackground: (val: BackgroundType) => void;
  aspectRatio: AspectRatio;
  onChangeAspectRatio: (val: AspectRatio) => void;
  imageSize: ImageSizeQuality;
  onChangeImageSize: (val: ImageSizeQuality) => void;
  disabled?: boolean;
}

export function GenerationSettings({
  background,
  onChangeBackground,
  aspectRatio,
  onChangeAspectRatio,
  imageSize,
  onChangeImageSize,
  disabled,
}: GenerationSettingsProps) {
  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-[#1A1715]">
          Generation Settings
        </label>
        <span className="text-xs text-[#8A837A]">Editorial Customization</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Background Setting */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-medium text-[#6B645D]">
            Background Environment
          </label>
          <select
            value={background}
            disabled={disabled}
            onChange={(e) => onChangeBackground(e.target.value as BackgroundType)}
            className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-[#E3DBD0] bg-white text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-[#C89E58] transition-colors disabled:opacity-50"
          >
            {BACKGROUND_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name} — {opt.description}
              </option>
            ))}
          </select>
        </div>

        {/* Aspect Ratio Setting */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-medium text-[#6B645D]">
            Aspect Ratio
          </label>
          <select
            value={aspectRatio}
            disabled={disabled}
            onChange={(e) => onChangeAspectRatio(e.target.value as AspectRatio)}
            className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-[#E3DBD0] bg-white text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-[#C89E58] transition-colors disabled:opacity-50"
          >
            {RATIO_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quality Target */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-medium text-[#6B645D]">
            Export Quality
          </label>
          <select
            value={imageSize}
            disabled={disabled}
            onChange={(e) => onChangeImageSize(e.target.value as ImageSizeQuality)}
            className="w-full h-10 px-3 text-xs font-medium rounded-xl border border-[#E3DBD0] bg-white text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-[#C89E58] transition-colors disabled:opacity-50"
          >
            {QUALITY_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
