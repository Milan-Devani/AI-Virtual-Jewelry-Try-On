import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("4000").transform((val) => parseInt(val, 10)),
  CLIENT_URL: z.string().default("http://localhost:3000"),

  // Gemini AI Image Configuration
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  GEMINI_IMAGE_MODEL: z.string().default("gemini-2.5-flash-image"),

  // Storage
  STORAGE_PROVIDER: z.enum(["local", "supabase", "s3"]).default("local"),

  // Supabase
  SUPABASE_URL: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
  SUPABASE_BUCKET: z.string().default("ai-jewelry"),

  // AWS S3
  AWS_REGION: z.string().default("eu-north-1"),
  AWS_ACCESS_KEY_ID: z.string().optional().default(""),
  AWS_SECRET_ACCESS_KEY: z.string().optional().default(""),
  AWS_BUCKET_NAME: z.string().default("ai-jewelry-bucket"),

  // Rate Limiting
  GENERAL_RATE_LIMIT_WINDOW_MS: z.string().default("900000").transform((v) => parseInt(v, 10)),
  GENERAL_RATE_LIMIT_MAX: z.string().default("100").transform((v) => parseInt(v, 10)),
  AI_RATE_LIMIT_WINDOW_MS: z.string().default("600000").transform((v) => parseInt(v, 10)),
  AI_RATE_LIMIT_MAX: z.string().default("20").transform((v) => parseInt(v, 10)),

  // Upload limits
  MAX_UPLOAD_MB: z.string().default("8").transform((v) => parseInt(v, 10)),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  if (process.env.NODE_ENV === "production") {
    console.error("❌ Invalid environment variables:", JSON.stringify(parsed.error.format(), null, 2));
  }
}

export const config = {
  env: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  port: parseInt(process.env.PORT || "4000", 10),
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  gemini: {
    apiKey: process.env.GEMINI_KEY || process.env.GEMINI_API_KEY || "",
    imageModel: process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image",
  },
  storage: {
    provider: (process.env.STORAGE_PROVIDER as "local" | "supabase" | "s3") || "local",
    supabase: {
      url: process.env.SUPABASE_URL || "",
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || "",
      bucket: process.env.SUPABASE_BUCKET || "ai-jewelry",
    },
    s3: {
      region: process.env.AWS_REGION || "eu-north-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      bucketName: process.env.AWS_BUCKET_NAME || "ai-jewelry-bucket",
    },
  },
  rateLimits: {
    generalWindowMs: parseInt(process.env.GENERAL_RATE_LIMIT_WINDOW_MS || "900000", 10),
    generalMax: parseInt(process.env.GENERAL_RATE_LIMIT_MAX || "100", 10),
    aiWindowMs: parseInt(process.env.AI_RATE_LIMIT_WINDOW_MS || "600000", 10),
    aiMax: parseInt(process.env.AI_RATE_LIMIT_MAX || "20", 10),
  },
  maxUploadMb: parseInt(process.env.MAX_UPLOAD_MB || "8", 10),
  maxUploadBytes: parseInt(process.env.MAX_UPLOAD_MB || "8", 10) * 1024 * 1024,
};
