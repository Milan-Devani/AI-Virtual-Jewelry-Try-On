export const BASE_SYSTEM_PROMPT = `You are creating a premium photorealistic Indian jewelry e-commerce virtual try-on photograph.

REFERENCE IMAGE 1:
The human model.

REFERENCE IMAGE 2:
The exact jewelry product.

The final image must show the SAME MODEL from Reference Image 1 wearing the EXACT JEWELRY PRODUCT from Reference Image 2.

MODEL IDENTITY PRESERVATION IS CRITICAL.

Preserve the model's identity and appearance as closely as possible.

Do not replace the person.

Do not intentionally redesign the face.

Preserve:
- facial structure
- eyes
- eyebrows
- nose
- lips
- jawline
- skin tone
- hairstyle
- hair color
- body proportions
- overall pose where practical

Do not add another person.

Do not create duplicate body parts.

Do not create extra fingers, hands, ears or limbs.

JEWELRY PRODUCT FIDELITY IS CRITICAL.

Reference Image 2 represents the actual product being sold.

Preserve:
- jewelry design
- metal color
- gemstone arrangement
- stones
- pendant shape
- chain structure
- ornaments
- texture
- proportions
- recognizable silhouette

Do not redesign the jewelry.

Do not replace it with a similar product.

Do not invent additional jewelry.

Do not remove important product details.

The jewelry should remain visually faithful to Reference Image 2.

PLACEMENT:

{{CATEGORY_PLACEMENT}}

ENVIRONMENT & BACKGROUND:

{{BACKGROUND_SETTING}}

PHOTOGRAPHY:

Create a premium luxury Indian jewelry campaign photograph.

Use:
- realistic skin texture
- realistic jewelry reflections
- realistic shadows
- natural contact shadows
- physically believable scale
- realistic depth of field
- premium studio lighting
- high-end fashion photography
- photorealistic rendering
- clean commercial composition

The result should look like a real professional photograph.

Do not create a collage.

Do not show the product separately.

Do not create a product-only image.

Return the completed model wearing the jewelry.`;

export const BASE_AI_MODEL_SYSTEM_PROMPT = `You are creating a high-fashion luxury jewelry e-commerce campaign photograph featuring an AI-generated model wearing the provided jewelry product.

REFERENCE IMAGE:
The exact jewelry product being showcased.

JEWELRY PRODUCT FIDELITY IS CRITICAL:
The provided image represents the exact product being sold.
Preserve:
- jewelry design, gemstones, stone cuts, and metal color
- pendant shape, chain weave, latkans, and ornamental details
- exact proportions, craftsmanship, and recognizable silhouette
Do not redesign or alter the jewelry. The jewelry must match the reference image with 100% fidelity.

MODEL PERSONA SPECIFICATIONS:
{{MODEL_PERSONA}}

PLACEMENT & WEARING INSTRUCTIONS:
{{CATEGORY_PLACEMENT}}

ENVIRONMENT & LIGHTING:
{{BACKGROUND_SETTING}}

PHOTOGRAPHY & REALISM:
Create a world-class luxury jewelry editorial photograph:
- natural, lifelike skin pores and subsurface scattering
- realistic jewelry reflections, gemstone refractions, and contact shadows
- physically believable scale and anatomical placement
- clean commercial high-fashion composition

The result must show the photorealistic model wearing the exact jewelry product.
Do not show the jewelry separately.
Do not create a split collage.`;
