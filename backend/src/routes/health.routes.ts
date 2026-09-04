import { Router } from "express";
import { config } from "../config/index.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "JEWELAI API",
    timestamp: new Date().toISOString(),
    env: config.env,
    storage: config.storage.provider,
    model: config.gemini.imageModel,
  });
});

export default router;
