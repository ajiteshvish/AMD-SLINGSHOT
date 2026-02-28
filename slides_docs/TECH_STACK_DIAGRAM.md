---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
---

# ⚡ ReviewDekho — Technology Stack

## 🎨 Frontend

### Core Framework

- **React 19** — UI Library
- **TypeScript** — Type-safe JavaScript
- **Vite 7** — Build tool (SWC plugin)

### Routing & State

- **React Router DOM v7** — Client-side routing
- **React Context API** — Global state management

### Styling & UI

- **Tailwind CSS v3** — Utility-first CSS
- **Vanilla CSS** — Custom styling
- **Lucide React** — Icon library
- **Radix UI** — Headless accessible components

### Animation & Visual

- **Framer Motion v12** — Animations & transitions
- **tsParticles** — Particle effects (hero section)
- **react-countup** — Animated number counters

### Data & Charts

- **Recharts v3** — Trust score trend charts
- **Axios** — HTTP client for API calls

### Auth & Database (Client)

- **Firebase SDK** — Authentication (Google / Email)
- **Supabase JS v2** — Direct database queries

---

## ⚙️ Backend

### Framework & Server

- **FastAPI** — Modern Python REST API framework
- **Uvicorn** — ASGI server (async)
- **Python 3.11** — Runtime

### Validation & Config

- **Pydantic** — Request/response models
- **Pydantic Settings** — `.env` config management
- **python-dotenv** — Environment variable loading

### Database & API

- **Supabase Python SDK** — Database client
- **PostgREST** — Auto-generated REST from Postgres

---

## 🔴 AI / ML Engine (AMD-Powered)

### AMD Hardware Acceleration

- **ROCm** — AMD GPU compute platform
- **ZenDNN** — AMD CPU neural net optimization
- **INT8 Quantization** — Compressed model format
- **Ryzen AI Software** — Model development
- **Vitis AI** — AMD model tooling

### Inference Runtime

- **ONNX Runtime** — Cross-platform AI inference
  - Priority: `ROCMExecutionProvider` (GPU)
  - Fallback: `CPUExecutionProvider` (ZenDNN)
  - Graph Optimization: `ORT_ENABLE_ALL`

### Models & NLP

- **HuggingFace Transformers** — Tokenizer library
- **DistilBERT-base-uncased** — Base NLP model
- **SentencePiece** — Tokenization support
- **NumPy** — Tensor manipulation

### AI Models

- `sentiment_model.onnx` — Review sentiment (-1 to +1)
- `trust_score_model.onnx` — Fake review detection (0 to 1)

---

## 🗄️ Database & Auth

### Database

- **Supabase** — Managed PostgreSQL cloud
- **PostgreSQL** — Relational database
- **Row Level Security (RLS)** — Data access policies

### Authentication

- **Firebase Auth** — Login & session management
  - Google OAuth 2.0
  - Email / Password
- **Firebase Firestore** — (configured, minimal use)

---

## 🌐 Deployment & DevOps

### Hosting

- **Vercel** — Frontend deployment (CDN, auto-deploy)
- **Render** — Backend API hosting (Python web service)

### Tooling

- **Git** — Version control
- **ESLint** — TypeScript/React linting
- **PostCSS + Autoprefixer** — CSS processing
- **Python venv** — Backend virtual environment

### Config Files

- `vite.config.ts` — Frontend build config
- `render.yaml` — Backend deploy config
- `vercel.json` — Frontend deploy config
- `tailwind.config.js` — Design system tokens
- `tsconfig.json` — TypeScript compiler config
- `requirements.txt` — Python dependencies

---

## 🔐 Security

- Supabase RLS policies on all 7 tables
- Firebase UID as cross-system user identifier
- CORS middleware with Vercel domain allowlist
- Role-based access (`user` / `admin`)
- No raw user data sent to cloud during AI inference
