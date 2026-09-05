export type AspectRatio = "1:1" | "3:4" | "4:5" | "16:9";
export type ImageSizeQuality = "1K" | "2K" | "4K";
export type BackgroundType = "studio" | "luxury" | "minimal" | "outdoor";
export type GenerationStatus = "pending" | "processing" | "completed" | "failed";

export interface TryOnInput {
  modelImage: Express.Multer.File;
  jewelryImage: Express.Multer.File;
  category: string;
  customCategoryName?: string;
  customPlacement?: string;
  background?: BackgroundType;
  aspectRatio?: AspectRatio;
  imageSize?: ImageSizeQuality;
  userId?: string;
}

export interface GeneratedImageResult {
  id: string;
  category: string;
  categoryName: string;
  imageUrl: string;
  modelImageUrl: string;
  jewelryImageUrl: string;
  background: BackgroundType;
  aspectRatio: AspectRatio;
  imageSize: ImageSizeQuality;
  createdAt: string;
  durationMs?: number;
}

export interface GenerationRecord {
  id: string;
  userId: string;
  category: string;
  background: BackgroundType;
  aspectRatio: AspectRatio;
  imageSize: ImageSizeQuality;
  modelImageUrl: string;
  jewelryImageUrl: string;
  generatedImageUrl?: string;
  status: GenerationStatus;
  errorCode?: string;
  errorMessage?: string;
  durationMs?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ImageValidationResult {
  valid: boolean;
  reason?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  fileSizeBytes?: number;
}

export interface StorageResult {
  key: string;
  url: string;
  provider: "supabase" | "s3" | "local";
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
