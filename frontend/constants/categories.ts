import { JewelryCategory } from "../types";

export const JEWELRY_CATEGORIES: JewelryCategory[] = [
  {
    id: "earrings",
    name: "Earrings",
    placement: "ears",
    description: "Classic drops, studs, chandeliers, hoops, & ear cuffs",
    suggestedAspectRatio: "4:5",
  },
  {
    id: "necklaces-pendants",
    name: "Necklaces & Pendants",
    placement: "neck",
    description: "Chokers, collar necklaces, layered strings, pendants, & haar",
    suggestedAspectRatio: "4:5",
  },
  {
    id: "bracelets-wristwear",
    name: "Bracelets & Wristwear",
    placement: "wrist",
    description: "Kadas, bangles, charm bracelets, tennis bracelets, & cuffs",
    suggestedAspectRatio: "1:1",
  },
  {
    id: "jhumkas",
    name: "Jhumkas",
    placement: "ears",
    description: "Traditional bell-shaped earrings with dome drops & latkans",
    suggestedAspectRatio: "4:5",
  },
  {
    id: "payal-anklets",
    name: "Payal / Anklets",
    placement: "ankles",
    description: "Traditional payal, silver/gold anklets, & ghungroo chains",
    suggestedAspectRatio: "3:4",
  },
  {
    id: "maang-tikka",
    name: "Maang Tikka",
    placement: "forehead",
    description: "Forehead centerpiece, matha patti, & bridal hair ornaments",
    suggestedAspectRatio: "4:5",
  },
  {
    id: "haath-phool",
    name: "Haath Phool",
    placement: "hand",
    description: "Hand harness connecting wrist bracelet to finger rings via chains",
    suggestedAspectRatio: "1:1",
  },
  {
    id: "mangalsutra",
    name: "Mangalsutra",
    placement: "neck",
    description: "Traditional sacred black-beaded gold chain necklace with central pendant",
    suggestedAspectRatio: "4:5",
  },
  {
    id: "mangalsutra-earrings",
    name: "Mangalsutra with Earrings",
    placement: "neck & ears",
    description: "Matching set with auspicious mangalsutra necklace and coordinating earrings",
    suggestedAspectRatio: "4:5",
  },
  {
    id: "full-bridal-set",
    name: "Full Bridal / All-in-One Set",
    placement: "full body / all",
    description: "Complete set: Necklace, Earrings, Maang Tikka, Bangles & Nath worn together",
    suggestedAspectRatio: "4:5",
  },
];

export const BACKGROUND_OPTIONS = [
  { id: "studio", name: "Studio", description: "Clean luxury studio lighting" },
  { id: "luxury", name: "Luxury", description: "Warm Indian ambient campaign" },
  { id: "minimal", name: "Minimal", description: "Neutral soft editorial shadow" },
  { id: "outdoor", name: "Outdoor", description: "Golden hour diffused bokeh" },
] as const;

export const RATIO_OPTIONS = [
  { id: "4:5", label: "4:5 (E-commerce / Editorial)" },
  { id: "1:1", label: "1:1 (Square / Feed)" },
  { id: "3:4", label: "3:4 (Portrait Standard)" },
  { id: "16:9", label: "16:9 (Landscape Banner)" },
] as const;

export const QUALITY_OPTIONS = [
  { id: "2K", label: "2K Ultra HD (Recommended)" },
  { id: "1K", label: "1K Standard (Fast)" },
  { id: "4K", label: "4K Master (Editorial)" },
] as const;
