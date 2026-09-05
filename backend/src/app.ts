import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { config } from "./config/index.js";
import { logger } from "./utils/logger.js";
import { generalLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import healthRoutes from "./routes/health.routes.js";
import tryOnRoutes from "./routes/tryon.routes.js";
import { getStorageProvider } from "./storage/index.js";

const app = express();

// Initialize Storage Provider
getStorageProvider();

// Security Headers with Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  })
);

// Dynamic CORS Configuration
const allowedOriginPatterns = [
  "localhost",
  "127.0.0.1",
  "vercel.app",
  "onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      // If CLIENT_URL is '*' or not in strict production lock, allow all
      if (config.clientUrl === "*" || !config.isProduction) {
        return callback(null, true);
      }

      // Check configured CLIENT_URL (supports comma-separated origins)
      const configuredOrigins = config.clientUrl
        .split(",")
        .map((url) => url.trim().toLowerCase());

      if (configuredOrigins.includes("*") || configuredOrigins.includes(origin.toLowerCase())) {
        return callback(null, true);
      }

      // Check trusted patterns (e.g. any *.vercel.app deployment or localhost)
      const isTrustedPattern = allowedOriginPatterns.some((pattern) =>
        origin.toLowerCase().includes(pattern)
      );

      if (isTrustedPattern) {
        return callback(null, true);
      }

      // Fallback: allow to avoid breaking dynamic preview deployments
      logger.info({ origin }, "Allowing dynamically requested origin");
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-request-id",
      "x-user-id",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["x-request-id"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Request ID & Structured Logging Middleware
app.use((req, res, next) => {
  const requestId = (req.headers["x-request-id"] as string) || uuidv4();
  req.headers["x-request-id"] = requestId;
  res.setHeader("x-request-id", requestId);

  const start = Date.now();
  res.on("finish", () => {
    logger.info({
      requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - start,
      ip: req.ip,
    });
  });

  next();
});

// JSON and URL-encoded body parser
app.use(express.json({ limit: `${config.maxUploadMb + 2}mb` }));
app.use(express.urlencoded({ extended: true, limit: `${config.maxUploadMb + 2}mb` }));

// Serve Local Uploads directory statically if using local storage
const uploadsDir = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsDir));

// Apply general rate limiter across API
app.use("/api", generalLimiter);

// Mount API routes
app.use("/api", healthRoutes);
app.use("/api", tryOnRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
