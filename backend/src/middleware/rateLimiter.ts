import rateLimit from "express-rate-limit";
import { config } from "../config/index.js";
import { RateLimitError } from "../utils/errors.js";

export const generalLimiter = rateLimit({
  windowMs: config.rateLimits.generalWindowMs,
  max: config.rateLimits.generalMax,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(new RateLimitError("Too many general requests. Please wait before making more requests."));
  },
});

export const aiGenerationLimiter = rateLimit({
  windowMs: config.rateLimits.aiWindowMs,
  max: config.rateLimits.aiMax,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // If authenticated user is passed via body/headers, use it along with IP
    const user = req.body?.userId || req.headers["x-user-id"];
    return user ? `${req.ip}_${user}` : req.ip || "unknown-ip";
  },
  handler: (_req, _res, next) => {
    next(
      new RateLimitError(
        "AI Generation rate limit reached. Please wait a few minutes before generating more try-on images."
      )
    );
  },
});
