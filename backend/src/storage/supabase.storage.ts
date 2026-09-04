import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "../config/index.js";
import { StorageProvider, StoredFile, UploadOptions } from "./storage.interface.js";
import { logger } from "../utils/logger.js";
import { AppError } from "../utils/errors.js";

export class SupabaseStorageProvider implements StorageProvider {
  public readonly name = "supabase" as const;
  private supabase: SupabaseClient | null = null;
  private bucket: string;

  constructor() {
    this.bucket = config.storage.supabase.bucket;
    if (config.storage.supabase.url && config.storage.supabase.serviceKey) {
      this.supabase = createClient(
        config.storage.supabase.url,
        config.storage.supabase.serviceKey,
        {
          auth: { persistSession: false },
        }
      );
    }
  }

  async init(): Promise<void> {
    if (!this.supabase) {
      logger.warn("Supabase credentials missing, SupabaseStorageProvider disabled");
      return;
    }
    try {
      const { data: buckets } = await this.supabase.storage.listBuckets();
      const exists = buckets?.some((b) => b.name === this.bucket);
      if (!exists) {
        await this.supabase.storage.createBucket(this.bucket, {
          public: true,
          fileSizeLimit: config.maxUploadBytes,
        });
        logger.info({ bucket: this.bucket }, "Created Supabase storage bucket");
      }
    } catch (err) {
      logger.warn({ err }, "Could not verify/create Supabase bucket (may already exist)");
    }
  }

  async upload(options: UploadOptions): Promise<StoredFile> {
    if (!this.supabase) {
      throw new AppError("STORAGE_ERROR", "Supabase storage client is not configured");
    }

    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .upload(options.key, options.buffer, {
        contentType: options.mimeType,
        upsert: true,
      });

    if (error) {
      logger.error({ error, key: options.key }, "Supabase upload failed");
      throw new AppError("STORAGE_ERROR", `Failed to upload to Supabase: ${error.message}`);
    }

    const { data: urlData } = this.supabase.storage.from(this.bucket).getPublicUrl(data.path);

    return {
      key: options.key,
      url: urlData.publicUrl,
      provider: "supabase",
      sizeBytes: options.buffer.length,
      mimeType: options.mimeType,
    };
  }

  async delete(key: string): Promise<void> {
    if (!this.supabase) return;
    const { error } = await this.supabase.storage.from(this.bucket).remove([key]);
    if (error) {
      logger.warn({ error, key }, "Failed to delete file from Supabase");
    }
  }

  async getUrl(key: string): Promise<string> {
    if (!this.supabase) throw new Error("Supabase client not initialized");
    const { data } = this.supabase.storage.from(this.bucket).getPublicUrl(key);
    return data.publicUrl;
  }
}
