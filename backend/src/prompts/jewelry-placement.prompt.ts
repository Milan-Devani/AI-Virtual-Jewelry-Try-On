import { getCategoryById } from "../constants/categories.js";

export const BACKGROUND_PROMPTS: Record<string, string> = {
  studio: "clean premium jewelry studio background with soft directional commercial lighting",
  luxury: "elegant luxury Indian jewelry campaign environment with warm ambient reflections",
  minimal: "warm neutral minimalist fashion background with gentle gradient shadows",
  outdoor: "tasteful softly blurred outdoor fashion environment in golden hour natural light",
};

export function getPlacementPromptForCategory(categoryId: string): string {
  const category = getCategoryById(categoryId);
  if (!category) {
    return "Place the exact jewelry product naturally on the model in the anatomically correct position with realistic contact shadows and scale.";
  }
  return category.promptInstructions;
}

export function getBackgroundPrompt(background?: string): string {
  if (!background) return BACKGROUND_PROMPTS.studio;
  return BACKGROUND_PROMPTS[background.toLowerCase()] || BACKGROUND_PROMPTS.studio;
}
