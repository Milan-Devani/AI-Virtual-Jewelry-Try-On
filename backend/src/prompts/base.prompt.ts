export const BASE_SYSTEM_PROMPT = `You are creating a premium, master-quality photorealistic Indian jewelry commercial photograph.

REFERENCE IMAGE 1:
The human model.

REFERENCE IMAGE 2:
The exact jewelry product.

The final output MUST be an authentic commercial studio photograph showing the SAME REAL HUMAN MODEL from Reference Image 1 wearing the EXACT JEWELRY PRODUCT from Reference Image 2.

CRITICAL PHOTOREALISM — MUST LOOK LIKE A REAL HUMAN PHOTOGRAPH, NEVER AI-GENERATED:
- SKIN TEXTURE: Natural microscopic skin pores, subtle epidermal micro-texture, authentic subsurface scattering, and natural warmth. NO plastic skin, NO airbrushed doll look, NO artificial CGI waxiness, NO over-smoothed face filters.
- EYES & EXPRESSION: Natural corneal reflections, crisp catchlights from studio softboxes, realistic wetness and depth in the eyes, individual eyelash and brow definition.
- LIGHTING & CONTACT: Physically accurate contact shadows where the jewelry touches the skin/neck/ears/wrists, true-to-life reflections, bounce light, and authentic ambient occlusion.
- CAMERA & OPTICS: Captured with an 85mm f/1.4 luxury fashion portrait lens (Hasselblad / Leica medium format aesthetic), crisp focus on the jewelry and facial features with gentle optical depth of field.

MODEL IDENTITY PRESERVATION IS CRITICAL:
Preserve the model's exact identity and facial structure from Reference Image 1:
- exact facial bones, jawline, nose bridge, lips, eyes, eyebrows
- skin undertone and complexion
- natural hair structure and hairline
- body proportions and pose
Do not replace or alter the person.
Do not create duplicate or distorted limbs, hands, or ears.

JEWELRY PRODUCT FIDELITY IS CRITICAL:
Reference Image 2 represents the exact manufactured jewelry product being sold.
Preserve with 100% fidelity:
- jewelry design, metal color (e.g. 22K yellow gold, antique gold, rose gold, 925 sterling silver, platinum)
- gemstone arrangement, stone facets, diamond clarity, emeralds, rubies, pearls, and kundan
- pendant geometry, chain weave, latkans, filigree, and intricate craftsmanship
- exact proportions and physical weight
Do not redesign, simplify, or hallucinate different jewelry.

PLACEMENT:
{{CATEGORY_PLACEMENT}}

ENVIRONMENT & BACKGROUND:
{{BACKGROUND_SETTING}}

Return ONLY the finished, master-grade photograph of the model wearing the jewelry.`;

export const BASE_AI_MODEL_SYSTEM_PROMPT = `You are creating a world-class luxury jewelry e-commerce campaign photograph featuring a real-looking human model wearing the provided jewelry product.

REFERENCE IMAGE:
The exact jewelry product being showcased.

CRITICAL PHOTOREALISM — MUST LOOK LIKE A REAL HUMAN PHOTOGRAPH, NEVER AI-GENERATED:
- NATURAL HUMAN SKIN: Realistic human skin with visible microscopic pores, natural tone variations, realistic subsurface scattering, delicate highlights on cheekbones, and lifelike skin translucency. ABSOLUTELY NO plastic, waxy, CGI, or over-airbrushed skin.
- REALISTIC EYES & ANATOMY: Authentic iris patterns, soft catchlights, moisture reflections, and lifelike natural gaze. Anatomically perfect hands, fingers, neckline, and ears.
- FABRIC & TEXTILES: Authentic physical textile textures (e.g. pure raw Kanjeevaram silk weave, zari metallic gold threads, Bandhani tie-dye texture, velvet nap) with realistic drape and folds.
- OPTICS & LIGHTING: Shot on medium-format commercial camera (85mm portrait lens), soft directional studio key lights, and physical contact shadows beneath every stone and chain link.

JEWELRY PRODUCT FIDELITY IS CRITICAL:
The provided image represents the exact real product being sold.
Preserve:
- jewelry design, gemstones, stone cuts, and metal luster
- pendant shape, chain weave, latkans, and ornamental details
- exact proportions, craftsmanship, and recognizable silhouette
Do not redesign or alter the jewelry. The jewelry must match the reference image with 100% fidelity.

MODEL PERSONA SPECIFICATIONS:
{{MODEL_PERSONA}}

PLACEMENT & WEARING INSTRUCTIONS:
{{CATEGORY_PLACEMENT}}

ENVIRONMENT & LIGHTING:
{{BACKGROUND_SETTING}}

Return ONLY the single finished, master-grade commercial photograph. Do not show the product separately or create a collage.`;
