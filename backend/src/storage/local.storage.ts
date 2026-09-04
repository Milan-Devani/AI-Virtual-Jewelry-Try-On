import fs from "fs/promises";
import path from "path";
import { config } from "../config/index.js";
import { StorageProvider, StoredFile, UploadOptions } from "./storage.interface.js";
import { logger } from "../utils/logger.js";

export class LocalStorageProvider implements StorageProvider {
  public readonly name = "local" as const;
  private uploadDir: string;

  constructor(uploadDir?: string) {
    this.uploadDir = uploadDir || path.join(process.cwd(), "uploads");
  }

  async init(): Promise<void> {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (err) {
      logger.error({ err }, "Failed to create local uploads directory");
    }
  }

  async upload(options: UploadOptions): Promise<StoredFile> {
    const filePath = path.join(this.uploadDir, options.key);
    const dir = path.dirname(filePath);

    // Prevent path traversal
    if (!filePath.startsWith(this.uploadDir)) {
      throw new Error("Invalid path traversal detected");
    }

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, options.buffer);

    const baseUrl = `http://localhost:${config.port}/uploads`;
    const normalizedKey = options.key.replace(/\\/g, "/");
    const url = `${baseUrl}/${normalizedKey}`;

    return {
      key: options.key,
      url,
      provider: "local",
      sizeBytes: options.buffer.length,
      mimeType: options.mimeType,
    };
  }

  async delete(key: string): Promise<void> {
    const filePath = path.join(this.uploadDir, key);
    if (!filePath.startsWith(this.uploadDir)) {
      throw new Error("Invalid path traversal detected");
    }
    try {
      await fs.unlink(filePath);
    } catch (err) {
      logger.warn({ key, err }, "Could not delete local file");
    }
  }

  async getUrl(key: string): Promise<string> {
    const normalizedKey = key.replace(/\\/g, "/");
    return `http://localhost:${config.port}/uploads/${normalizedKey}`;
  }
}
