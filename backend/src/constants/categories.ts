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
  }
];

export const VALID_CATEGORY_IDS = JEWELRY_CATEGORIES.map((c) => c.id);

export function getCategoryById(id: string): JewelryCategory | undefined {
  return JEWELRY_CATEGORIES.find((c) => c.id.toLowerCase() === id.toLowerCase());
}
