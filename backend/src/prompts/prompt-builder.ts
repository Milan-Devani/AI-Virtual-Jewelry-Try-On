import { BASE_SYSTEM_PROMPT } from "./base.prompt.js";
import { getPlacementPromptForCategory, getBackgroundPrompt } from "./jewelry-placement.prompt.js";

export interface PromptBuildOptions {
  category: string;
  background?: string;
  aspectRatio?: string;
  imageSize?: string;
}

export function buildTryOnPrompt(options: PromptBuildOptions): string {
  const placement = getPlacementPromptForCategory(options.category);
  const background = getBackgroundPrompt(options.background);

  let prompt = BASE_SYSTEM_PROMPT.replace("{{CATEGORY_PLACEMENT}}", placement).replace(
    "{{BACKGROUND_SETTING}}",
    background
  );

  if (options.aspectRatio) {
    prompt += `\n\nASPECT RATIO: Produce the image in an aspect ratio matching ${options.aspectRatio}.`;
  }

  if (options.imageSize) {
    prompt += `\nQUALITY TARGET: Master quality rendering at ${options.imageSize} resolution with ultra-crisp gemstone facets and fine metal textures.`;
  }

  return prompt;
}
