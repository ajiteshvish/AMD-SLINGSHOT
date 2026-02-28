---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
---

# 🏗️ ReviewDekho — Architecture Diagram

## 1️⃣ Data Ingestion Layer

- 📦 Public Seller Reviews & Ratings
- 🧪 Synthetic MVP Datasets
- 🌐 Marketplace Secure APIs _(future)_

## 2️⃣ Backend Application

### FastAPI Python Server

- **Entry Point:** `main.py` + Uvicorn ASGI
- **CORS Middleware** → Vercel Frontend + Render API

### API Routes

- `GET /api/sellers` — List, Filter, Paginate
- `GET /api/sellers/{id}` — Detail + Trust Score + Reviews
- `GET /api/sellers/{id}/trust-history` — Score History
- `POST /api/sellers/compare` — Side-by-side Comparison
- `POST /api/sellers/{id}/analyze` — On-Demand AI Trigger
- `POST /api/analyze-text` — Live AI Playground
- `GET /api/admin/*` — Admin Controls
- `GET /api/health` — Health Check

### Services Layer

- `trust_engine.py` — Core Trust Score Orchestrator
- `scoring.py` — Weighted Score Combiner (0–100)
- `review_analysis.py` — Review NLP Preprocessor
- `data_loader.py` — Seller Data Fetcher

### Config & Database

- `config.py` — Pydantic Settings (env vars)
- `database.py` — Supabase Client Init

## 3️⃣ AMD Local Inference Runtime 🔴

### ONNX Runtime

- `ROCMExecutionProvider` (AMD GPU — Primary)
- `CPUExecutionProvider` (ZenDNN — Fallback)
- Graph Optimization: `ORT_ENABLE_ALL`

### INT8 Quantized Models

- `sentiment_model.onnx` → Sentiment Score (-1 to +1)
- `trust_score_model.onnx` → Authenticity Score (0 to 1)

### AMD Hardware Stack

- **ROCm** — GPU Compute Platform
- **ZenDNN** — AMD CPU Neural Net Optimization
- **Ryzen AI / Vitis AI** _(model dev)_
- **INT8 Quantization** — Compressed model inference

### Tokenizer

- HuggingFace `distilbert-base-uncased`
- NumPy tensor inputs (`int64`)
- Max sequence length: 128 tokens

## 4️⃣ Database — Supabase (PostgreSQL)

### Tables

- `profiles` — User accounts (Firebase UID, role)
- `sellers` — Seller master data + marketplace
- `trust_scores` — Score records + history (0–100)
- `seller_metrics` — Orders, refunds, delivery stats
- `reviews` — Raw reviews + sentiment + authenticity flag
- `alerts` — User risk alerts
- `user_watchlist` — Followed sellers per user

### Security

- Row Level Security (RLS) on all tables
- Public read for sellers/scores
- User-scoped access for alerts & watchlist
- Service role for backend writes

## 5️⃣ Authentication Layer

- **Firebase Auth** — Login / Session Management
  - Google OAuth
  - Email / Password
- **Supabase RLS** — Data Authorization
- **ProtectedRoute.tsx** — Frontend Role Guard
  - `user` role — Consumer dashboard
  - `admin` role — Admin panel

## 6️⃣ Frontend — React 19 + Vite

### Pages

- `Home.tsx` — Landing page
- `SellerDetails.tsx` — Full seller trust profile
- `Compare.tsx` — Side-by-side seller comparison
- `Intelligence/` — AI Playground + Dashboard
- `User/` — Dashboard, Watchlist, Alerts, Profile
- `Admin/` — Seller mgmt, Batch Analysis, Analytics
- `Auth/` — Login, Signup

### Key Components

- `TrustBadge.tsx` — Color-coded trust level badge
- `TrustBreakdown.tsx` — Score bar breakdown
- `Navbar.tsx` — Role-aware navigation
- `Recharts` — Score history trend charts
- `Framer Motion` — Animations & transitions
- `tsParticles` — Particle hero background

## 7️⃣ Deployment

- **Frontend** → Vercel (`vercel.json`)
- **Backend API** → Render (`render.yaml`, Python 3.11)
- **Database** → Supabase (managed cloud Postgres)
