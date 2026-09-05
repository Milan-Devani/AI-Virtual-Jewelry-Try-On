import { z } from "zod";
import { VALID_CATEGORY_IDS } from "../constants/categories.js";

export const tryonParamsSchema = z.object({
  category: z.string({ required_error: "Jewelry category is required" }).min(1),
  customCategoryName: z.string().optional(),
  customPlacement: z.string().optional(),
  mode: z.enum(["custom-model", "ai-model"]).default("custom-model"),
  modelConfig: z.union([z.string(), z.record(z.any())]).optional(),
  background: z.enum(["studio", "luxury", "minimal", "outdoor"]).default("studio"),
  aspectRatio: z.enum(["1:1", "3:4", "4:5", "16:9"]).default("4:5"),
  imageSize: z.enum(["1K", "2K", "4K"]).default("2K"),
  userId: z.string().optional().default("anonymous"),
});

export type TryOnParams = z.infer<typeof tryonParamsSchema>;
