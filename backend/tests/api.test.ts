import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("API Endpoints & Health Check", () => {
  it("GET /api/health returns 200 OK with server status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("JEWELAI API");
  });

  it("POST /api/ai-jewelry/generate fails with 400 when images are missing", async () => {
    const res = await request(app)
      .post("/api/ai-jewelry/generate")
      .field("category", "earrings");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("MODEL_IMAGE_INVALID");
  });

  it("POST /api/ai-jewelry/generate in ai-model mode requires jewelryImage but not modelImage", async () => {
    const res = await request(app)
      .post("/api/ai-jewelry/generate")
      .field("category", "earrings")
      .field("mode", "ai-model");

    // Fails with JEWELRY_IMAGE_INVALID, NOT MODEL_IMAGE_INVALID
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("JEWELRY_IMAGE_INVALID");
  });

  it("GET /api/ai-jewelry/history returns list", async () => {
    const res = await request(app).get("/api/ai-jewelry/history");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
