import sharp from "sharp";
import { config } from "../config/index.js";
import { detectImageSignature } from "../utils/fileSignatures.js";
import { ValidationError } from "../utils/errors.js";
import { ImageValidationResult } from "../types/index.js";

const MIN_DIMENSION = 256;
const RECOMMENDED_MIN_DIMENSION = 512;
const MAX_DIMENSION = 8192;

export async function validateUploadedImage(
  file: Express.Multer.File | undefined,
  fieldLabel: "model" | "jewelry" = "model"
): Promise<ImageValidationResult> {
  const label = fieldLabel === "model" ? "Model image" : "Jewelry image";

  if (!file || !file.buffer) {
    throw new ValidationError(`Please upload a valid ${fieldLabel} image.`, "INVALID_IMAGE");
  }

  // 1. File size check
  if (file.size > config.maxUploadBytes) {
    throw new ValidationError(
      `Maximum image size is ${config.maxUploadMb} MB.`,
      "IMAGE_TOO_LARGE"
    );
  }

  // 2. Magic byte inspection
  const sig = detectImageSignature(file.buffer);
  if (!sig) {
    throw new ValidationError(
      "Unsupported image format. Please upload JPG, PNG, or WebP.",
      "UNSUPPORTED_IMAGE_TYPE"
    );
  }

  // 3. Image decodability & dimension verification via sharp
  try {
    const metadata = await sharp(file.buffer).metadata();

    if (!metadata.width || !metadata.height) {
      throw new ValidationError(
        `${label} is corrupted or unreadable.`,
        fieldLabel === "model" ? "MODEL_IMAGE_INVALID" : "JEWELRY_IMAGE_INVALID"
      );
    }

    if (metadata.width < MIN_DIMENSION || metadata.height < MIN_DIMENSION) {
      throw new ValidationError(
        `${label} is too small. Minimum resolution is ${RECOMMENDED_MIN_DIMENSION}x${RECOMMENDED_MIN_DIMENSION}px.`,
        fieldLabel === "model" ? "MODEL_IMAGE_INVALID" : "JEWELRY_IMAGE_INVALID"
      );
    }

    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      throw new ValidationError(
        `${label} exceeds maximum allowed dimensions (${MAX_DIMENSION}x${MAX_DIMENSION}px).`,
        "IMAGE_TOO_LARGE"
      );
    }

    return {
      valid: true,
      width: metadata.width,
      height: metadata.height,
      mimeType: sig.mime,
      fileSizeBytes: file.size,
    };
  } catch (err: unknown) {
    if (err instanceof ValidationError) throw err;
    throw new ValidationError(
      `Failed to process ${label}. The file may be damaged or invalid.`,
      "INVALID_IMAGE",
      err
    );
  }
}
