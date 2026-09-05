import { BASE_SYSTEM_PROMPT, BASE_AI_MODEL_SYSTEM_PROMPT } from "./base.prompt.js";
import { getPlacementPromptForCategory, getBackgroundPrompt } from "./jewelry-placement.prompt.js";
import { buildAiModelPersonaPrompt } from "./ai-model-builder.js";
import { AiModelConfig, TryOnMode } from "../types/index.js";

export interface PromptBuildOptions {
  category: string;
  customCategoryName?: string;
  customPlacement?: string;
  mode?: TryOnMode;
  modelConfig?: AiModelConfig;
  background?: string;
  aspectRatio?: string;
  imageSize?: string;
}

export function buildTryOnPrompt(options: PromptBuildOptions): string {
  const placement = getPlacementPromptForCategory(
    options.category,
    options.customCategoryName,
    options.customPlacement
  );
  const background = getBackgroundPrompt(options.background);

  let prompt = "";

  if (options.mode === "ai-model") {
    const persona = buildAiModelPersonaPrompt(options.modelConfig);
    prompt = BASE_AI_MODEL_SYSTEM_PROMPT.replace("{{MODEL_PERSONA}}", persona)
      .replace("{{CATEGORY_PLACEMENT}}", placement)
      .replace("{{BACKGROUND_SETTING}}", background);
  } else {
    prompt = BASE_SYSTEM_PROMPT.replace("{{CATEGORY_PLACEMENT}}", placement).replace(
      "{{BACKGROUND_SETTING}}",
      background
    );
  }

  if (options.aspectRatio) {
    prompt += `\n\nASPECT RATIO: Produce the image in an aspect ratio matching ${options.aspectRatio}.`;
  }

  if (options.imageSize) {
    prompt += `\nQUALITY TARGET: Master quality rendering at ${options.imageSize} resolution with ultra-crisp gemstone facets and fine metal textures.`;
  }

  return prompt;
}
