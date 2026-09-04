/**
 * Inspect magic bytes / signatures to verify true file format
 */
export interface FileTypeInfo {
  ext: "jpg" | "jpeg" | "png" | "webp";
  mime: "image/jpeg" | "image/png" | "image/webp";
}

export function detectImageSignature(buffer: Buffer): FileTypeInfo | null {
  if (!buffer || buffer.length < 12) {
    return null;
  }

  // JPEG magic bytes: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { ext: "jpeg", mime: "image/jpeg" };
  }

  // PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { ext: "png", mime: "image/png" };
  }

  // WebP magic bytes: RIFF .... WEBP
  // 52 49 46 46 (RIFF) at 0..3 and 57 45 42 50 (WEBP) at 8..11
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { ext: "webp", mime: "image/webp" };
  }

  return null;
}
