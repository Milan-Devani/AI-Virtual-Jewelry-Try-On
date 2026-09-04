import { Router } from "express";
import { tryOnController } from "../controllers/tryon.controller.js";
import { tryOnUpload, singleImageUpload } from "../middleware/upload.js";
import { aiGenerationLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Primary Try-On Generation
router.post(
  "/ai-jewelry/generate",
  aiGenerationLimiter,
  tryOnUpload,
  tryOnController.generate.bind(tryOnController)
);

// Standalone Pre-Validation Endpoints
router.post(
  "/ai-jewelry/validate-model",
  singleImageUpload,
  tryOnController.validateModel.bind(tryOnController)
);

router.post(
  "/ai-jewelry/validate-product",
  singleImageUpload,
  tryOnController.validateProduct.bind(tryOnController)
);

// History & Lifecycle Endpoints
router.get("/ai-jewelry/history", tryOnController.getHistory.bind(tryOnController));
router.get("/ai-jewelry/:id", tryOnController.getById.bind(tryOnController));
router.delete("/ai-jewelry/:id", tryOnController.deleteById.bind(tryOnController));

export default router;
