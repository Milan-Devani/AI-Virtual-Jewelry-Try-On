import { config } from "../config/index.js";
import { logger } from "../utils/logger.js";
import { getCategoryById } from "../constants/categories.js";

export interface VisionValidationResult {
  valid: boolean;
  errorCode?: string;
  reason?: string;
  suggestedCategory?: string;
  detectedModelRegions?: string[];
  detectedJewelryType?: string;
}

export interface ValidateCompatibilityParams {
  modelBuffer: Buffer;
  modelMime: string;
  jewelryBuffer: Buffer;
  jewelryMime: string;
  category: string;
  customCategoryName?: string;
  customPlacement?: string;
}

export async function validateTryOnCompatibility(
  params: ValidateCompatibilityParams
): Promise<VisionValidationResult> {
  const apiKey = config.gemini.apiKey;
  if (!apiKey) {
    return { valid: true };
  }

  const categoryObj = getCategoryById(params.category);
  const categoryName = categoryObj
    ? categoryObj.name
    : params.customCategoryName || params.category;
  const placement = categoryObj
    ? categoryObj.placement
    : params.customPlacement || "body";

  const prompt = `You are an expert AI vision validator for a luxury jewelry virtual try-on platform.
You are given two images:
- IMAGE 1: The Human Model photo.
- IMAGE 2: The Jewelry Product photo.
- USER SELECTED CATEGORY: "${params.category}" (Name: "${categoryName}", intended placement on model: "${placement}").

Analyze both images carefully:
1. MODEL IMAGE ANALYSIS:
   - Is a human model / person visible?
   - What body regions are clearly visible? (Options: ["head_face", "ears", "neck_chest", "hands_wrists", "ankles_feet", "waist", "nose", "arms", "full_body"])
   - Does the model image contain the necessary body part to wear the jewelry on the intended placement ("${placement}")?

2. JEWELRY IMAGE ANALYSIS:
   - What jewelry item is actually shown in Image 2?
   - Is this jewelry item compatible with the intended category "${categoryName}" on "${placement}"?

3. FINAL DECISION:
   - If the model image DOES NOT show the required body part for placement on "${placement}" (e.g. user selected feet/ankles/waist but model is only head/face/upper body), set "valid": false.
   - If the jewelry item is clearly completely incompatible with "${categoryName}", set "valid": false.
   - If the model image shows the appropriate body part and jewelry matches, set "valid": true.

Return ONLY a valid JSON object matching this schema:
{
  "valid": boolean,
  "modelShowsRequiredBodyPart": boolean,
  "jewelryMatchesCategory": boolean,
  "detectedModelRegions": string[],
  "detectedJewelryType": string,
  "reason": "Detailed, polite explanation if valid is false, explaining why the selected category doesn't match the visible model body parts or product type, and suggesting the correct category to choose.",
  "suggestedCategory": "earrings" | "necklaces-pendants" | "bracelets-wristwear" | "jhumkas" | "payal-anklets" | "maang-tikka" | "haath-phool" | "mangalsutra" | "mangalsutra-earrings" | "full-bridal-set"
}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const modelBase64 = params.modelBuffer.toString("base64");
    const jewelryBase64 = params.jewelryBuffer.toString("base64");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              { inline_data: { mime_type: params.modelMime, data: modelBase64 } },
              { inline_data: { mime_type: params.jewelryMime, data: jewelryBase64 } },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      logger.warn({ status: response.status }, "Vision compatibility pre-check skipped due to API response");
      return { valid: true };
    }

    const data = (await response.json()) as any;
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return { valid: true };
    }

    const parsed = JSON.parse(rawText);
    logger.info({ parsed, category: params.category }, "Vision compatibility analysis result");

    if (parsed.valid === false) {
      return {
        valid: false,
        errorCode: "INVALID_CATEGORY",
        reason:
          parsed.reason ||
          `The selected category '${categoryName}' is not compatible with the visible parts in the model photo or the uploaded jewelry product.`,
        suggestedCategory: parsed.suggestedCategory,
        detectedModelRegions: parsed.detectedModelRegions,
        detectedJewelryType: parsed.detectedJewelryType,
      };
    }

    return { valid: true };
  } catch (err: unknown) {
    logger.warn({ err: (err as Error)?.message }, "Vision compatibility pre-check failed, continuing with generation");
    return { valid: true };
  }
}
