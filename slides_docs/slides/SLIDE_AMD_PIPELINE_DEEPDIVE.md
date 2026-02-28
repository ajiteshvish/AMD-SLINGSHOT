---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
  initialExpandLevel: 3
  maxWidth: 230
---

# AMD AI Model Pipeline — Deep Dive

## Step 1 — Input: Raw Review Text

- User-submitted or scraped seller review text
- Supports batch processing (N reviews at once)
- Pre-processing: strip HTML, normalize whitespace

## Step 2 — Tokenization (CPU)

- Model: `distilbert-base-uncased` (HuggingFace Transformers)
- Converts text → integer token IDs
- Padding to `max_length = 128` tokens
- Outputs: `input_ids` + `attention_mask` (NumPy int64 tensors)
- Runs on: AMD Ryzen / EPYC CPU

## Step 3 — ONNX Runtime Session Init

- Graph optimization: `ORT_ENABLE_ALL`
  - Constant folding
  - Operator fusion
  - Memory layout optimization
- Provider priority order:
  - `ROCMExecutionProvider` (AMD GPU — checked first)
  - `CPUExecutionProvider` (ZenDNN — automatic fallback)
- Session loaded once → reused for all batches (singleton)

## Step 4 — GPU Inference via ROCm

### Sentiment Model (sentiment_model.onnx)

- INT8 quantized DistilBERT-based classifier
- Input: `[input_ids, attention_mask]`
- Output: logits `[negative_score, positive_score]`
- Post-process: `tanh(pos_logit - neg_logit)` → range -1 to +1

### Fake Review Model (trust_score_model.onnx)

- INT8 quantized binary classifier
- Input: same tokenized tensor
- Output: binary logits `[fake_score, real_score]`
- Post-process: `sigmoid(real_logit)` → range 0 to +1

## Step 5 — Score Combination Engine

- Weighted formula (backend `scoring.py`)
  - Review Authenticity: 35% weight
  - Delivery Reliability: 30% weight
  - Refund Fairness: 20% weight
  - Customer Support: 15% weight
- Final: Unified Trust Score 0–100 (integer)

## Step 6 — Output & Persistence

- Results written to Supabase `trust_scores` table
- Execution metrics returned to frontend
  - Active provider (ROCm or ZenDNN)
  - Total inference time (ms)
  - Speed per review (ms/item)
