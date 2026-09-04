import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../config/index.js";
import { StorageProvider, StoredFile, UploadOptions } from "./storage.interface.js";
import { logger } from "../utils/logger.js";
import { AppError } from "../utils/errors.js";

export class S3StorageProvider implements StorageProvider {
  public readonly name = "s3" as const;
  private s3: S3Client | null = null;
  private bucket: string;

  constructor() {
    this.bucket = config.storage.s3.bucketName;
    if (
      config.storage.s3.accessKeyId &&
      config.storage.s3.secretAccessKey &&
      config.storage.s3.region
    ) {
      this.s3 = new S3Client({
        region: config.storage.s3.region,
        credentials: {
          accessKeyId: config.storage.s3.accessKeyId,
          secretAccessKey: config.storage.s3.secretAccessKey,
        },
      });
    }
  }

  async init(): Promise<void> {
    if (!this.s3) {
      logger.warn("AWS credentials missing, S3StorageProvider disabled");
    }
  }

  async upload(options: UploadOptions): Promise<StoredFile> {
    if (!this.s3) {
      throw new AppError("STORAGE_ERROR", "AWS S3 client is not configured");
    }

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: options.key,
        Body: options.buffer,
        ContentType: options.mimeType,
      });

      await this.s3.send(command);

      // Generate pre-signed URL or public URL
      const getCommand = new GetObjectCommand({
        Bucket: this.bucket,
        Key: options.key,
      });
      const url = await getSignedUrl(this.s3, getCommand, { expiresIn: 3600 * 24 * 7 });

      return {
        key: options.key,
        url,
        provider: "s3",
        sizeBytes: options.buffer.length,
        mimeType: options.mimeType,
      };
    } catch (err: unknown) {
      logger.error({ err, key: options.key }, "AWS S3 upload failed");
      throw new AppError("STORAGE_ERROR", `Failed to upload to S3: ${(err as Error).message}`);
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.s3) return;
    try {
      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );
    } catch (err) {
      logger.warn({ err, key }, "Failed to delete from S3");
    }
  }

  async getUrl(key: string): Promise<string> {
    if (!this.s3) throw new Error("S3 client not initialized");
    const getCommand = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return await getSignedUrl(this.s3, getCommand, { expiresIn: 3600 * 24 });
  }
}
