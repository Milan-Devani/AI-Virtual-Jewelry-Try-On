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

// Strict CORS Configuration
const allowedOrigins = [
  config.clientUrl,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || !config.isProduction) {
        callback(null, true);
      } else {
        callback(new Error(`CORS origin '${origin}' not allowed.`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-request-id", "x-user-id"],
  })
);

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
