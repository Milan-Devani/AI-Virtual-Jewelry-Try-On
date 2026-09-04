import { describe, it, expect } from "vitest";
import { detectImageSignature } from "../src/utils/fileSignatures.js";
import { validateUploadedImage } from "../src/validators/imageValidator.js";
import sharp from "sharp";

describe("Image Validation & Security", () => {
  it("should accurately detect valid JPEG magic bytes", () => {
    const jpegBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
    const detected = detectImageSignature(jpegBuffer);
    expect(detected).not.toBeNull();
    expect(detected?.mime).toBe("image/jpeg");
  });

  it("should accurately detect valid PNG magic bytes", () => {
    const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d]);
    const detected = detectImageSignature(pngBuffer);
    expect(detected).not.toBeNull();
    expect(detected?.mime).toBe("image/png");
  });

  it("should reject invalid/arbitrary signatures (PDF, Executables, Text)", () => {
    const pdfBuffer = Buffer.from("%PDF-1.4 header dummy content for testing", "utf-8");
    const detected = detectImageSignature(pdfBuffer);
    expect(detected).toBeNull();
  });

  it("should validate real image buffer dimensions and MIME", async () => {
    // Generate valid 512x512 PNG using sharp
    const pngBuffer = await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .png()
      .toBuffer();

    const mockMulterFile: Express.Multer.File = {
      fieldname: "modelImage",
      originalname: "model.png",
      encoding: "7bit",
      mimetype: "image/png",
      size: pngBuffer.length,
      buffer: pngBuffer,
      destination: "",
      filename: "",
      path: "",
      stream: null as any,
    };

    const res = await validateUploadedImage(mockMulterFile, "model");
    expect(res.valid).toBe(true);
    expect(res.width).toBe(512);
    expect(res.height).toBe(512);
    expect(res.mimeType).toBe("image/png");
  });

  it("should reject undersized images", async () => {
    const tinyBuffer = await sharp({
      create: {
        width: 64,
        height: 64,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      },
    })
      .png()
      .toBuffer();

    const mockFile: Express.Multer.File = {
      fieldname: "jewelryImage",
      originalname: "small.png",
      encoding: "7bit",
      mimetype: "image/png",
      size: tinyBuffer.length,
      buffer: tinyBuffer,
      destination: "",
      filename: "",
      path: "",
      stream: null as any,
    };

    await expect(validateUploadedImage(mockFile, "jewelry")).rejects.toThrow("too small");
  });
});
