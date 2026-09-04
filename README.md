# JEWELAI — Production-Ready AI Jewelry Virtual Try-On Platform

JEWELAI is a full-stack virtual try-on SaaS web application specifically engineered for luxury Indian and global jewelry e-commerce. It uses Gemini image models to synthesize photorealistic images of a target model wearing an uploaded jewelry piece while preserving model identity and strict jewelry product fidelity across 7 distinct categories.

---

## 💎 Features

- **Model Identity Lock**: Strict prompt and vision alignment guarantees that facial structure, eye geometry, lips, skin tone, hair, and posture are preserved without model drift.
- **Jewelry Product Fidelity**: Faithfully preserves metal finish, gemstones, pendant geometry, dangling beads, chains, and craftsmanship.
- **7 Mandatory Categories Supported**:
  1. **Earrings** (Drops, studs, hoops, cuffs)
  2. **Necklaces & Pendants** (Chokers, haar, chains, collar necklaces)
  3. **Bracelets & Wristwear** (Kadas, bangles, charm bracelets)
  4. **Jhumkas** (Traditional bell-shaped dome drops)
  5. **Payal / Anklets** (Anklet chains, ghungroos)
  6. **Maang Tikka** (Forehead centerpieces, matha patti)
  7. **Haath Phool** (Hand harness connecting wrist to rings)
- **4 Editorial Background Environments**: Studio, Luxury, Minimal, Outdoor.
- **Multi-Ratio & Quality Targets**: 4:5, 1:1, 3:4, 16:9 output with 2K Ultra HD export.
- **Dual Drag-and-Drop Upload Zones**: File signature (magic byte) inspection, dimension verification, and image corruption protection.
- **Before / After Comparison Slider**: Interactive split comparison with mobile-responsive view.
- **History & Export Manager**: Local + remote persistent history with sanitized download naming (`jewelai-{category}-{date}.webp`).
- **Security & Rate Limiting**: Helmet, strict CORS, rate limiters, request ID tracking, zero frontend secrets exposure.

---

## 🏗️ Architecture

```text
jewelai/
├── backend/
│   ├── src/
│   │   ├── config/          # Zod environment validation
│   │   ├── constants/       # Centralized 7 jewelry categories
│   │   ├── controllers/     # TryOn generation & validation controllers
│   │   ├── middleware/      # Rate limiting, upload, error handler
│   │   ├── prompts/         # Base prompt, category placements, prompt builder
│   │   ├── routes/          # API endpoints (/generate, /history, /validate)
│   │   ├── services/        # GeminiImageProvider & TryOnService
│   │   ├── storage/         # StorageProvider (Local, Supabase, S3)
│   │   ├── types/           # TypeScript interfaces & types
│   │   ├── utils/           # Structured Pino logger, magic bytes, errors
│   │   ├── app.ts           # Express application setup
│   │   └── server.ts        # Server entry point
│   ├── tests/               # Vitest unit & integration test suite
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/                 # Next.js App Router (layout, page, globals.css)
│   ├── components/
│   │   ├── ai-tryon/        # CategorySelector, GenerationSettings, LiveProgress
│   │   ├── layout/          # Header, Hero, SettingsModal
│   │   ├── result/          # ResultSection, ComparisonSlider, HistoryModal
│   │   ├── ui/              # Button, Card, Badge, Modal dialog
│   │   └── upload/          # ImageUploader drag-and-drop
│   ├── constants/           # Frontend category & option definitions
│   ├── lib/                 # Utility helpers (cn, formatBytes, download naming)
│   ├── services/            # API client with offline resilience
│   ├── types/               # Shared frontend types
│   ├── validators/          # Client-side image dimension & MIME validator
│   ├── Dockerfile
│   ├── package.json
│   └── tailwind.config.ts
├── docker-compose.yml
├── README.md
└── package.json
```

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Gemini API Key

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
NODE_ENV=development
PORT=4000
CLIENT_URL=http://localhost:3000

# Gemini AI Image Configuration
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_IMAGE_MODEL=gemini-2.5-flash

# Storage (local | supabase | s3)
STORAGE_PROVIDER=local

# Rate Limiting
GENERAL_RATE_LIMIT_WINDOW_MS=900000
GENERAL_RATE_LIMIT_MAX=100
AI_RATE_LIMIT_WINDOW_MS=600000
AI_RATE_LIMIT_MAX=20

# Upload constraints
MAX_UPLOAD_MB=8
```

Run tests and start the backend:

```bash
# Run unit & integration tests
npm test

# Build TypeScript
npm run build

# Start dev server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Deployment

To launch the full stack with Docker Compose:

```bash
export GEMINI_API_KEY="your-gemini-key"
docker compose up --build
```

- Frontend available at: `http://localhost:3000`
- Backend API available at: `http://localhost:4000`

---

## 🧪 Testing

Run backend tests:

```bash
cd backend
npm test
```

Suite covers:
- Magic byte validation (JPEG, PNG, WebP vs invalid files).
- Dimension and corrupted image rejection.
- All 7 jewelry category prompt placement instructions.
- API endpoints and error handlers.

---

## 🔒 Security Highlights

1. **Zero Secret Leakage**: The Gemini API key is strictly maintained on the backend. No `NEXT_PUBLIC_` secrets are exposed.
2. **Magic Byte Verification**: File payloads are verified at byte-level before decompression to prevent arbitrary upload exploits.
3. **UUID Naming**: Original client filenames are sanitized and replaced with cryptographically secure UUID keys.
4. **Rate Limiting**: AI generation endpoints are rate-limited to avoid abuse and denial of service.
