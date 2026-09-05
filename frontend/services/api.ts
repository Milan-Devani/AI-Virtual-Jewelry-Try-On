import {
  TryOnGenerationResult,
  GenerationRecord,
  BackgroundType,
  AspectRatio,
  ImageSizeQuality,
} from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const LOCAL_STORAGE_HISTORY_KEY = "jewelai_history_records";

export interface GenerateTryOnPayload {
  modelFile: File;
  jewelryFile: File;
  category: string;
  customCategoryName?: string;
  customPlacement?: string;
  background: BackgroundType;
  aspectRatio: AspectRatio;
  imageSize: ImageSizeQuality;
  userId?: string;
}

export interface ApiErrorWithDetails extends Error {
  code?: string;
  details?: {
    suggestedCategory?: string;
    detectedModelRegions?: string[];
    detectedJewelryType?: string;
  };
}

export async function generateTryOnApi(
  payload: GenerateTryOnPayload,
  signal?: AbortSignal
): Promise<TryOnGenerationResult> {
  const formData = new FormData();
  formData.append("modelImage", payload.modelFile);
  formData.append("jewelryImage", payload.jewelryFile);
  formData.append("category", payload.category);

  if (payload.customCategoryName) {
    formData.append("customCategoryName", payload.customCategoryName);
  }
  if (payload.customPlacement) {
    formData.append("customPlacement", payload.customPlacement);
  }

  formData.append("background", payload.background);
  formData.append("aspectRatio", payload.aspectRatio);
  formData.append("imageSize", payload.imageSize);

  if (payload.userId) {
    formData.append("userId", payload.userId);
  }

  const response = await fetch(`${API_BASE_URL}/ai-jewelry/generate`, {
    method: "POST",
    body: formData,
    signal,
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    const message = json?.error?.message || "Failed to generate try-on image.";
    const code = json?.error?.code || "AI_PROVIDER_ERROR";
    const error = new Error(message) as ApiErrorWithDetails;
    error.code = code;
    error.details = json?.error?.details;
    throw error;
  }

  // Save to local cache
  saveHistoryLocally(json.data);

  return json.data;
}

export async function fetchHistoryApi(
  userId = "anonymous",
  category?: string
): Promise<GenerationRecord[]> {
  try {
    const url = new URL(`${API_BASE_URL}/ai-jewelry/history`);
    url.searchParams.set("userId", userId);
    if (category && category !== "all") {
      url.searchParams.set("category", category);
    }

    const res = await fetch(url.toString());
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn("Could not fetch remote history, reading from local storage", err);
  }

  return getLocalHistory(category);
}

export async function deleteHistoryApi(id: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/ai-jewelry/${id}`, { method: "DELETE" });
  } catch (err) {
    console.warn("Could not delete from server, removing locally", err);
  }
  removeLocalHistory(id);
}

// Local Storage Sync Helpers
export function getLocalHistory(categoryFilter?: string): GenerationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    if (!raw) return [];
    let records: GenerationRecord[] = JSON.parse(raw);
    if (categoryFilter && categoryFilter !== "all") {
      records = records.filter(
        (r) => r.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    return records;
  } catch {
    return [];
  }
}

export function saveHistoryLocally(result: TryOnGenerationResult): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalHistory();
    const record: GenerationRecord = {
      id: result.id,
      userId: "anonymous",
      category: result.categoryName || result.category,
      background: result.background,
      aspectRatio: result.aspectRatio,
      imageSize: result.imageSize,
      modelImageUrl: result.modelImageUrl,
      jewelryImageUrl: result.jewelryImageUrl,
      generatedImageUrl: result.imageUrl,
      status: "completed",
      durationMs: result.durationMs,
      createdAt: result.createdAt,
      updatedAt: result.createdAt,
    };
    const updated = [record, ...existing.filter((r) => r.id !== record.id)];
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated.slice(0, 50)));
  } catch (err) {
    console.warn("Failed to persist record to localStorage", err);
  }
}

export function removeLocalHistory(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalHistory();
    const updated = existing.filter((r) => r.id !== id);
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Failed to remove record from localStorage", err);
  }
}
