export interface StoredFile {
  key: string;
  url: string;
  provider: "supabase" | "s3" | "local";
  sizeBytes?: number;
  mimeType?: string;
}

export interface UploadOptions {
  key: string;
  buffer: Buffer;
  mimeType: string;
  isPublic?: boolean;
}

export interface StorageProvider {
  name: "supabase" | "s3" | "local";
  upload(options: UploadOptions): Promise<StoredFile>;
  delete(key: string): Promise<void>;
  getUrl(key: string): Promise<string>;
  init?(): Promise<void>;
}
