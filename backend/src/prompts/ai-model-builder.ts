import { AiModelConfig } from "../types/index.js";

const REGIONAL_ATTIRE_MAP: Record<string, string> = {
  gujarati:
    "traditional Gujarati attire wearing an opulent red and white Panetar / Gharchola silk saree or designer Chaniya Choli with intricate gold zari embroidery and Bandhani tie-dye motifs",
  "south-indian":
    "regal South Indian attire draped in an authentic pure Kanjeevaram / Kanchipuram silk saree with rich golden temple zari borders and traditional temple bridal finish",
  maharashtrian:
    "authentic Maharashtrian look wearing a royal pure silk Nauvari Paithani saree with signature peacock motifs, broad golden zari pallu border, and traditional aesthetic",
  punjabi:
    "vibrant Punjabi festive / bridal look wearing a heavily embroidered Phulkari silk suit or opulent designer bridal lehenga choli with ornate gotta patti craftsmanship",
  kerala:
    "graceful traditional Kerala attire wearing a pure off-white and rich golden-bordered Kasavu silk saree (Mundu Neriyathu) with clean, radiant silk sheen",
  bengali:
    "regal Bengali bridal / festive look draped in an authentic white silk saree with broad crimson-red borders (Lal Par Sada) or Baluchari silk with subtle traditional artistry",
  "tamil-nadu":
    "classic Tamil bridal attire draped in a traditional vibrant Kanchipuram / Madurai silk saree with rich contrast gold zari borders and classic pleats",
  rajasthani:
    "opulent royal Rajasthani look wearing a traditional Rajputi Poshak / Marwari Gota Patti lehenga with heavily embroidered sheer odhni draped with royal grace",
  assamese:
    "graceful traditional Assamese attire wearing an authentic natural golden-luster Muga silk Mekhela Sador with red and gold Kingkhap weave motifs",
  "pan-indian":
    "luxurious contemporary Indian couture bridal / festive attire in rich royal crimson and champagne gold silk with delicate handcrafted zardozi embroidery",
  western:
    "sophisticated luxury Western evening gown in tailored silk satin with elegant décolletage and modern minimalist high-fashion editorial styling",
  "mens-sherwani":
    "regal royal Indian groom attire wearing a bespoke raw silk embroidered ivory/gold Sherwani with ornate placket and regal royal presence",
  "mens-bandhgala":
    "distinguished royal Indian Jodhpuri Bandhgala suit in rich textured velvet / dark bespoke tailoring",
  "mens-kurta":
    "clean luxury festive silk Kurta with fine embroidery and crisp royal finish",
  "mens-tuxedo":
    "tailored classic black-tie Western tuxedo with silk lapels and crisp formal dress shirt",
};

const SKIN_TONE_MAP: Record<string, string> = {
  fair: "fair, radiant porcelain skin tone with natural warm luminous undertones",
  wheatish: "gorgeous warm golden-wheatish / warm olive Indian skin tone with healthy natural glow",
  dusky: "stunning rich dusky / sun-kissed golden honey skin tone with dewy radiance",
  deep: "deep, flawless caramel / rich dark skin tone with smooth velvet texture and soft highlights",
};

const HAIR_TYPE_MAP: Record<string, string> = {
  straight: "sleek, polished straight glossy hair",
  wavy: "soft, voluminous cascading natural waves",
  curly: "bouncy, well-defined lustrous curls with natural texture and bounce",
  coily: "rich tight textured coils with beautiful shape and natural sheen",
  "bridal-updo": "elaborate bridal hair bun / elegant couture updo styled with fresh floral adornments (gajra)",
  "traditional-braid": "long traditional braid (jada / choti) draped neatly over the shoulder with hair accessories",
};

const HAIR_COLOR_MAP: Record<string, string> = {
  "natural-black": "natural deep black hair with silky sheen",
  "dark-brown": "rich dark espresso brown hair",
  chestnut: "warm chestnut brown hair with soft subtle highlights",
  burgundy: "deep burgundy / wine tinted highlights",
  blonde: "natural warm honey blonde hair",
};

const EYE_COLOR_MAP: Record<string, string> = {
  "deep-brown": "expressive, warm deep brown eyes with detailed irises",
  "amber-hazel": "luminous amber-hazel eyes with golden flecks",
  black: "striking, deep glossy black eyes",
  "forest-green": "alluring forest green eyes with natural depth",
  "slate-gray": "mesmerizing slate-gray eyes",
};

export function buildAiModelPersonaPrompt(config?: AiModelConfig): string {
  if (!config) {
    return `Generate a breathtakingly beautiful, photorealistic professional Indian fashion model (Female, 20s) with glowing golden-wheatish skin, dark expressive eyes, and elegant traditional bridal attire.`;
  }

  const genderStr = config.gender === "male" ? "male model (Men's Fashion, 20s-30s)" : "female model (High-Fashion, 20s)";

  const attireKey = (config.clothingStyle || config.ethnicityRegion || "pan-indian").toLowerCase();
  const attireDesc =
    REGIONAL_ATTIRE_MAP[attireKey] ||
    REGIONAL_ATTIRE_MAP[config.ethnicityRegion?.toLowerCase() || "pan-indian"] ||
    config.clothingStyle ||
    "luxurious traditional Indian couture attire with fine embroidery";

  const skinDesc = SKIN_TONE_MAP[config.skinTone?.toLowerCase()] || SKIN_TONE_MAP.wheatish;
  const hairTypeDesc = HAIR_TYPE_MAP[config.hairType?.toLowerCase()] || HAIR_TYPE_MAP.wavy;
  const hairColorDesc = HAIR_COLOR_MAP[config.hairColor?.toLowerCase()] || HAIR_COLOR_MAP["natural-black"];
  const eyeDesc = EYE_COLOR_MAP[config.eyeColor?.toLowerCase()] || EYE_COLOR_MAP["deep-brown"];
  const expression = config.expression || "serene, confident, and regal editorial expression";

  return `AI MODEL PERSONA SPECIFICATIONS:
Generate a photorealistic, world-class luxury human ${genderStr} with:
- COMPLEXION & SKIN: ${skinDesc}, with natural pore texture and lifelike subsurface scattering.
- ATTIRE & STYLING: Dressed in ${attireDesc}.
- HAIRSTYLE: ${hairTypeDesc} in ${hairColorDesc}.
- FACIAL FEATURES & EYES: ${eyeDesc}, natural symmetrical facial proportions, and ${expression}.
- LIGHTING & PERSPECTIVE: The model must be seamlessly lit with commercial fashion studio lighting that perfectly highlights the worn jewelry.`;
}
