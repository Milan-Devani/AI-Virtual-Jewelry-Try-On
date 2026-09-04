import pino from "pino";
import { config } from "../config/index.js";

export const logger = pino({
  level: config.isProduction ? "info" : "debug",
  transport: !config.isProduction
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers['x-api-key']",
      "apiKey",
      "geminiApiKey",
      "awsSecretKey",
      "supabaseKey",
      "password",
      "token",
      "body.base64",
    ],
    remove: true,
  },
});
