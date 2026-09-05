import { getCategoryById } from "../constants/categories.js";

export const BACKGROUND_PROMPTS: Record<string, string> = {
  studio: "clean premium jewelry studio background with soft directional commercial lighting",
  luxury: "elegant luxury Indian jewelry campaign environment with warm ambient reflections",
  minimal: "warm neutral minimalist fashion background with gentle gradient shadows",
  outdoor: "tasteful softly blurred outdoor fashion environment in golden hour natural light",
};

export function getPlacementPromptForCategory(
  categoryId: string,
  customName?: string,
  customPlacement?: string
): string {
  const category = getCategoryById(categoryId);
  if (category) {
    return category.promptInstructions;
  }

  // Custom Category prompt formulation
  const name = customName || categoryId;
  const placementLocation = customPlacement || "appropriate anatomical location";

  return `Place the exact jewelry product (${name}) naturally and seamlessly on the model's ${placementLocation}.
Preserve:
- full jewelry geometry and craftsmanship
- gemstones, metalwork, and delicate ornaments
- proportions and natural perspective
Make it physically wrap or attach to the model's ${placementLocation} with realistic contact shadows and photorealistic reflections.`;
}

export function getBackgroundPrompt(background?: string): string {
  if (!background) return BACKGROUND_PROMPTS.studio;
  return BACKGROUND_PROMPTS[background.toLowerCase()] || BACKGROUND_PROMPTS.studio;
}
