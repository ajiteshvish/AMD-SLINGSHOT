---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
  initialExpandLevel: 3
  maxWidth: 220
---

# Architecture — Data, Backend & AMD AI

## 1. Data Ingestion Layer

- Public Seller Reviews & Ratings
- Synthetic MVP Datasets
- Marketplace Secure APIs (future)

## 2. Backend — FastAPI Python

### API Routes

- GET /sellers — List, Filter, Search
- GET /sellers/id — Detail + Reviews
- POST /sellers/compare — Comparison
- POST /sellers/id/analyze — AI Trigger
- POST /analyze-text — AI Playground
- GET /admin — Admin Controls

### Services

- trust_engine.py — Orchestrator
- scoring.py — Weighted 0–100
- review_analysis.py — NLP Preprocessor

## 3. AMD Local Inference Runtime

### Execution Providers

- ROCMExecutionProvider — AMD GPU (primary)
- CPUExecutionProvider — ZenDNN (fallback)

### ONNX Models (INT8 Quantized)

- sentiment_model.onnx → Score -1 to +1
- trust_score_model.onnx → Authenticity 0 to 1

### Tokenizer

- DistilBERT-base-uncased (HuggingFace)
- Max sequence length: 128 tokens
