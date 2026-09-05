import { describe, it, expect } from "vitest";
import { JEWELRY_CATEGORIES, getCategoryById } from "../src/constants/categories.js";
import { buildTryOnPrompt } from "../src/prompts/prompt-builder.js";
import { getPlacementPromptForCategory } from "../src/prompts/jewelry-placement.prompt.js";

describe("Jewelry Categories & Prompt Engine", () => {
  it("should support all 7 mandatory jewelry categories", () => {
    const expectedCategories = [
      "earrings",
      "necklaces-pendants",
      "bracelets-wristwear",
      "jhumkas",
      "payal-anklets",
      "maang-tikka",
      "haath-phool",
      "mangalsutra",
      "mangalsutra-earrings",
      "full-bridal-set",
      "mens-chains",
      "mens-kada",
      "mens-rings",
      "mens-brooch-kalgi",
      "mens-kurta-buttons",
      "mens-groom-mala",
      "mens-studs",
    ];

    const categoryIds = JEWELRY_CATEGORIES.map((c) => c.id);
    expectedCategories.forEach((cat) => {
      expect(categoryIds).toContain(cat);
      const catObj = getCategoryById(cat);
      expect(catObj).toBeDefined();
      expect(catObj?.promptInstructions).toBeTruthy();
    });
  });

  it("should generate category-specific placement instructions for Men's Chains & Pendants", () => {
    const prompt = buildTryOnPrompt({ category: "mens-chains", background: "studio" });
    expect(prompt).toContain("chain link style");
    expect(prompt).toContain("collarbones");
  });

  it("should generate category-specific placement instructions for Men's Kada", () => {
    const prompt = buildTryOnPrompt({ category: "mens-kada", background: "luxury" });
    expect(prompt).toContain("kada circular profile");
    expect(prompt).toContain("model's wrist");
  });

  it("should generate category-specific placement instructions for Groom Moti Mala", () => {
    const prompt = buildTryOnPrompt({ category: "mens-groom-mala", background: "luxury" });
    expect(prompt).toContain("multi-strand groom moti mala");
    expect(prompt).toContain("sherwani");
  });

  it("should generate category-specific placement instructions for Full Bridal / All-in-One Set", () => {
    const prompt = buildTryOnPrompt({ category: "full-bridal-set", background: "luxury" });
    expect(prompt).toContain("Complete Multi-Piece Luxury / Bridal Jewelry Set");
    expect(prompt).toContain("Forehead & Hairline");
    expect(prompt).toContain("Wrists & Hands");
  });

  it("should generate category-specific placement instructions for Mangalsutra", () => {
    const prompt = buildTryOnPrompt({ category: "mangalsutra", background: "luxury" });
    expect(prompt).toContain("black bead pattern");
    expect(prompt).toContain("upper chest");
  });

  it("should generate category-specific placement instructions for Mangalsutra with Earrings", () => {
    const prompt = buildTryOnPrompt({ category: "mangalsutra-earrings", background: "luxury" });
    expect(prompt).toContain("coordinated jewelry set consisting of a Mangalsutra and matching Earrings");
    expect(prompt).toContain("matching pair to both ears");
  });

  it("should generate category-specific placement instructions for Earrings", () => {
    const prompt = buildTryOnPrompt({ category: "earrings", background: "studio" });
    expect(prompt).toContain("MODEL IDENTITY PRESERVATION IS CRITICAL");
    expect(prompt).toContain("JEWELRY PRODUCT FIDELITY IS CRITICAL");
    expect(prompt).toContain("Place the exact jewelry product naturally on the model's ears");
  });

  it("should generate category-specific placement instructions for Necklaces & Pendants", () => {
    const prompt = buildTryOnPrompt({ category: "necklaces-pendants", background: "luxury" });
    expect(prompt).toContain("neck and upper chest");
    expect(prompt).toContain("luxury Indian jewelry campaign environment");
  });

  it("should generate category-specific placement instructions for Maang Tikka", () => {
    const prompt = buildTryOnPrompt({ category: "maang-tikka", background: "minimal" });
    expect(prompt).toContain("hair parting and centered on the forehead");
  });

  it("should generate category-specific placement instructions for Haath Phool", () => {
    const prompt = buildTryOnPrompt({ category: "haath-phool", background: "outdoor" });
    expect(prompt).toContain("Place the exact haath phool naturally on the model's hand");
  });

  it("should generate AI Model persona prompts with Gujarati regional attire", () => {
    const prompt = buildTryOnPrompt({
      category: "necklaces-pendants",
      mode: "ai-model",
      modelConfig: {
        gender: "female",
        ethnicityRegion: "gujarati",
        skinTone: "wheatish",
        hairType: "bridal-updo",
        hairColor: "natural-black",
        eyeColor: "deep-brown",
        clothingStyle: "gujarati",
      },
    });

    expect(prompt).toContain("AI MODEL PERSONA SPECIFICATIONS");
    expect(prompt).toContain("Panetar");
    expect(prompt).toContain("Gharchola");
    expect(prompt).toContain("wheatish");
    expect(prompt).toContain("bridal hair bun");
  });

  it("should generate AI Model persona prompts with South Indian Kanjeevaram attire", () => {
    const prompt = buildTryOnPrompt({
      category: "maang-tikka",
      mode: "ai-model",
      modelConfig: {
        gender: "female",
        ethnicityRegion: "south-indian",
        skinTone: "dusky",
        hairType: "traditional-braid",
        hairColor: "natural-black",
        eyeColor: "black",
        clothingStyle: "south-indian",
      },
    });

    expect(prompt).toContain("Kanjeevaram");
    expect(prompt).toContain("traditional braid");
    expect(prompt).toContain("dusky");
  });

  it("should generate AI Model persona prompts for Men's Royal Sherwani", () => {
    const prompt = buildTryOnPrompt({
      category: "mens-groom-mala",
      mode: "ai-model",
      modelConfig: {
        gender: "male",
        ethnicityRegion: "punjabi",
        skinTone: "wheatish",
        hairType: "straight",
        hairColor: "natural-black",
        eyeColor: "deep-brown",
        clothingStyle: "mens-sherwani",
      },
    });

    expect(prompt).toContain("male model");
    expect(prompt).toContain("Sherwani");
  });

  it("should handle custom aspect ratios and quality settings in prompt", () => {
    const prompt = buildTryOnPrompt({
      category: "jhumkas",
      aspectRatio: "4:5",
      imageSize: "2K",
    });
    expect(prompt).toContain("ASPECT RATIO: Produce the image in an aspect ratio matching 4:5");
    expect(prompt).toContain("QUALITY TARGET: Master quality rendering at 2K resolution");
  });
});
