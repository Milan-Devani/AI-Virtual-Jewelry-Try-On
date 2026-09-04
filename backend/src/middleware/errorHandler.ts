import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";
import { config } from "../config/index.js";
import { ApiErrorResponse } from "../types/index.js";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction
): void {
  const requestId = (req.headers["x-request-id"] as string) || "req-unknown";

  if (err instanceof AppError) {
    logger.warn(
      {
        requestId,
        code: err.code,
        statusCode: err.statusCode,
        message: err.message,
        details: err.details,
      },
      `Operational Error: ${err.message}`
    );

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(config.isProduction ? {} : { details: err.details }),
      },
    });
    return;
  }

  // Unhandled / system errors
  logger.error(
    {
      requestId,
      err: err.message,
      stack: err.stack,
    },
    "Unhandled Internal Server Error"
  );

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred while processing your request. Please try again.",
    },
  });
}
