import { config } from "../config/index.js";
import { StorageProvider } from "./storage.interface.js";
import { LocalStorageProvider } from "./local.storage.js";
import { SupabaseStorageProvider } from "./supabase.storage.js";
import { S3StorageProvider } from "./s3.storage.js";
import { logger } from "../utils/logger.js";

let storageInstance: StorageProvider | null = null;

export function getStorageProvider(): StorageProvider {
  if (storageInstance) return storageInstance;

  const providerType = config.storage.provider;

  if (providerType === "supabase" && config.storage.supabase.url && config.storage.supabase.serviceKey) {
    logger.info("Initializing Supabase Storage Provider");
    storageInstance = new SupabaseStorageProvider();
  } else if (
    providerType === "s3" &&
    config.storage.s3.accessKeyId &&
    config.storage.s3.secretAccessKey
  ) {
    logger.info("Initializing S3 Storage Provider");
    storageInstance = new S3StorageProvider();
  } else {
    logger.info("Initializing Local Storage Provider (fallback/default)");
    storageInstance = new LocalStorageProvider();
  }

  if (storageInstance.init) {
    storageInstance.init().catch((err) => {
      logger.error({ err }, "Storage provider initialization error");
    });
  }

  return storageInstance;
}

export * from "./storage.interface.js";
