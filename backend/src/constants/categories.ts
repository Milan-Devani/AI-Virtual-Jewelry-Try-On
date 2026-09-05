export interface JewelryCategory {
  id: string;
  name: string;
  placement: string;
  description: string;
  promptInstructions: string;
  suggestedAspectRatio: "1:1" | "3:4" | "4:5" | "16:9";
}

export const JEWELRY_CATEGORIES: JewelryCategory[] = [
  {
    id: "earrings",
    name: "Earrings",
    placement: "ears",
    description: "Classic drops, studs, chandeliers, hoops, and ear cuffs",
    suggestedAspectRatio: "4:5",
    promptInstructions: `Place the exact jewelry product naturally on the model's ears.
If the product contains a pair, use the same design on both ears.
The earrings must attach naturally to the ears.
Preserve:
- shape
- stones
- metalwork
- hanging elements
- proportions
- color
Do not redesign the earrings.`
  },
  {
    id: "necklaces-pendants",
    name: "Necklaces & Pendants",
    placement: "neck",
    description: "Chokers, collar necklaces, layered strings, pendants, and haar",
    suggestedAspectRatio: "4:5",
    promptInstructions: `Place the exact necklace or pendant naturally around the model's neck and upper chest.
Preserve the exact:
- chain
- pendant
- gemstones
- metalwork
- proportions
- design
Make the necklace follow the natural anatomy and perspective of the neck.`
  },
  {
    id: "bracelets-wristwear",
    name: "Bracelets & Wristwear",
    placement: "wrist",
    description: "Kadas, bangles, charm bracelets, tennis bracelets, and cuffs",
    suggestedAspectRatio: "1:1",
    promptInstructions: `Place the exact bracelet or wristwear naturally around the model's wrist.
Preserve:
- bracelet structure
- stones
- charms
- metalwork
- proportions
- color
Make it physically wrap around the wrist with realistic contact shadows.`
  },
  {
    id: "jhumkas",
    name: "Jhumkas",
    placement: "ears",
    description: "Traditional bell-shaped earrings with dome drops and latkans",
    suggestedAspectRatio: "4:5",
    promptInstructions: `Place the exact jhumka jewelry naturally on the model's ears.
Preserve:
- bell shape
- hanging elements
- beads
- stones
- metalwork
- proportions
Do not simplify or redesign the jhumka.`
  },
  {
    id: "payal-anklets",
    name: "Payal / Anklets",
    placement: "ankles",
    description: "Traditional payal, silver/gold anklets, and ghungroo chains",
    suggestedAspectRatio: "3:4",
    promptInstructions: `Place the exact payal/anklet naturally around the model's ankle.
Preserve:
- chain
- charms
- bells
- stones
- metalwork
- proportions
The anklet must follow the ankle anatomy naturally.`
  },
  {
    id: "maang-tikka",
    name: "Maang Tikka",
    placement: "forehead",
    description: "Forehead centerpiece, matha patti, and bridal hair ornaments",
    suggestedAspectRatio: "4:5",
    promptInstructions: `Place the exact maang tikka naturally along the model's hair parting and centered on the forehead.
Preserve:
- central pendant
- chain
- stones
- decorative elements
- metalwork
- proportions
The chain should follow the natural hairline.`
  },
  {
    id: "haath-phool",
    name: "Haath Phool",
    placement: "hand",
    description: "Hand harness connecting wrist bracelet to finger rings via chains",
    suggestedAspectRatio: "1:1",
    promptInstructions: `Place the exact haath phool naturally on the model's hand.
Preserve:
- bracelet portion
- finger ring
- connecting chain
- stones
- metalwork
- proportions
The connecting chain must naturally follow the hand anatomy.`
  },
  {
    id: "mangalsutra",
    name: "Mangalsutra",
    placement: "neck",
    description: "Traditional auspicious black-beaded gold chain necklace with central pendant",
    suggestedAspectRatio: "4:5",
    promptInstructions: `Place the exact mangalsutra naturally around the model's neck and draped over the upper chest.
Preserve the exact:
- black bead pattern and gold chain links
- central pendant design, stones, and motifs
- length, proportions, and draping curve
- metalwork and finish
The mangalsutra chain must rest naturally along the neckline and collarbones.`
  },
  {
    id: "mangalsutra-earrings",
    name: "Mangalsutra with Earrings",
    placement: "neck & ears",
    description: "Matching set with auspicious mangalsutra necklace and coordinating earrings",
    suggestedAspectRatio: "4:5",
    promptInstructions: `This is a coordinated jewelry set consisting of a Mangalsutra and matching Earrings.
1. Place the exact mangalsutra naturally around the model's neck and draped over the upper chest.
   Preserve:
   - black bead pattern and gold chain links
   - central pendant design, stones, and motifs
   - length, proportions, and draping curve
2. Place the matching earrings naturally on the model's ears.
   Preserve:
   - earring shape, stones, hanging latkans, and metalwork
   - apply the matching pair to both ears
Ensure cohesive lighting, contact shadows, and realistic perspective across both the neck and ears.`
  },
  {
    id: "full-bridal-set",
    name: "Full Bridal / All-in-One Set",
    placement: "full body / all",
    description: "Complete multi-piece jewelry suite: Necklace, Earrings, Maang Tikka, Bangles/Haath Phool, & Nath",
    suggestedAspectRatio: "4:5",
    promptInstructions: `This is a Complete Multi-Piece Luxury / Bridal Jewelry Set.
Inspect all jewelry pieces present in the product image and fit them seamlessly across all appropriate anatomical regions on the model:
1. Neck & Chest: Place the necklace, choker, and long haar with exact gemstone clusters, pendants, and layering.
2. Ears: Place the matching earrings or jhumkas naturally on both ears.
3. Forehead & Hairline: Place the maang tikka / matha patti centered along the hair parting.
4. Wrists & Hands: Place matching bangles, kadas, or haath phool if visible in the product image.
5. Nose & Face: Place the bridal nath / nose ring if visible in the product image.
Strictly preserve each piece's exact metalwork, gemstones, motifs, and finish while creating a harmonized, photorealistic bridal ensemble with realistic depth and contact shadows.`
  }
];

export const VALID_CATEGORY_IDS = JEWELRY_CATEGORIES.map((c) => c.id);

export function getCategoryById(id: string): JewelryCategory | undefined {
  return JEWELRY_CATEGORIES.find((c) => c.id.toLowerCase() === id.toLowerCase());
}
