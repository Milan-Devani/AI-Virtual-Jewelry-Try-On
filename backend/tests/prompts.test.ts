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
    ];

    const categoryIds = JEWELRY_CATEGORIES.map((c) => c.id);
    expectedCategories.forEach((cat) => {
      expect(categoryIds).toContain(cat);
      const catObj = getCategoryById(cat);
      expect(catObj).toBeDefined();
      expect(catObj?.promptInstructions).toBeTruthy();
    });
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
