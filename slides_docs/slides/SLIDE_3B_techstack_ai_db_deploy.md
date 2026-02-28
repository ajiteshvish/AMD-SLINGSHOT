---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
  initialExpandLevel: 3
  maxWidth: 220
---

# Tech Stack — AI, Database & Deployment

## AMD AI Engine

### AMD Hardware

- ROCm — GPU compute platform
- ZenDNN — CPU neural net optimization
- INT8 Quantization — compressed models
- Ryzen AI / Vitis AI — model development

### Inference Runtime

- ONNX Runtime
  - ROCMExecutionProvider (GPU primary)
  - CPUExecutionProvider (ZenDNN fallback)
  - Graph Optimization: ORT_ENABLE_ALL

### NLP Models

- HuggingFace Transformers
- DistilBERT-base-uncased (tokenizer)
- NumPy (tensor inputs, int64)
- SentencePiece (tokenization)

## Database & Auth

- Supabase — managed PostgreSQL
- Row Level Security (RLS) on all tables
- Firebase Auth — Google OAuth + Email
- Role system: user / admin

## Deployment & Tooling

### Hosting

- Vercel — Frontend (CDN, auto-deploy)
- Render — Backend API (Python 3.11)
- Supabase Cloud — managed Postgres

### Dev Tools

- Git (version control)
- ESLint (TypeScript/React linting)
- PostCSS + Autoprefixer
- Python venv (backend environment)
