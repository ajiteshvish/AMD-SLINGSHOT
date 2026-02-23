# 🔥 Trustora — AMD Tools Documentation

This directory contains detailed documentation for every AMD AI tool and technology integrated into the Trustora Trust Intelligence platform.

---

## Tool Index

| #   | Document                                       | AMD Tool          | Role in Trustora                                       |
| --- | ---------------------------------------------- | ----------------- | ------------------------------------------------------ |
| 1   | [ONNX Runtime](./01_ONNX_RUNTIME.md)           | ONNX Runtime      | Primary AI inference engine executing all ML models    |
| 2   | [ROCm](./02_ROCm.md)                           | ROCm              | GPU acceleration for high-throughput batch inference   |
| 3   | [ZenDNN](./03_ZenDNN.md)                       | ZenDNN            | CPU-optimized inference on AMD Zen processors          |
| 4   | [INT8 Quantization](./04_INT8_QUANTIZATION.md) | INT8 Quantization | Model compression for faster, lighter inference        |
| 5   | [Ryzen AI](./05_RYZEN_AI.md)                   | Ryzen AI          | Edge/local AI for privacy-first trust scoring (future) |
| 6   | [Vitis AI](./06_VITIS_AI.md)                   | Vitis AI          | Model optimization and hardware targeting platform     |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     TRUSTORA AI PIPELINE                         │
│                                                                  │
│  Review Text ──▶ Tokenizer ──▶ ONNX Runtime ──▶ Trust Score     │
│                                    │                             │
│                         ┌──────────┼──────────┐                  │
│                         ▼          ▼          ▼                  │
│                      ROCm       ZenDNN    Ryzen AI               │
│                    (AMD GPU)   (AMD CPU)  (AMD NPU)              │
│                         │          │          │                  │
│                         ▼          ▼          ▼                  │
│                   INT8 Quantized Models (65MB each)              │
│                                                                  │
│                  Optimized by Vitis AI Toolchain                 │
└──────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference

### Currently Active (MVP)

| Tool                  | Status    | Where Used                           |
| --------------------- | --------- | ------------------------------------ |
| **ONNX Runtime**      | ✅ Active | `ai/inference/run_inference.py`      |
| **ZenDNN (CPU)**      | ✅ Active | Automatic via CPUExecutionProvider   |
| **INT8 Quantization** | ✅ Ready  | `ai/models/sentiment_quantized.onnx` |

### Configured, Activates on AMD GPU Hardware

| Tool           | Status        | Where Used                        |
| -------------- | ------------- | --------------------------------- |
| **ROCm (GPU)** | 🟡 Configured | Priority EP in `run_inference.py` |

### Planned for Future Phases

| Tool         | Phase     | Purpose                                      |
| ------------ | --------- | -------------------------------------------- |
| **Ryzen AI** | Phase 3   | Local/edge trust scoring on consumer devices |
| **Vitis AI** | Phase 3-4 | NPU compilation and hardware profiling       |

---

## Key Files

| File                                   | Purpose                            |
| -------------------------------------- | ---------------------------------- |
| `ai/inference/run_inference.py`        | Core ONNX Runtime inference engine |
| `ai/models/`                           | ONNX model storage directory       |
| `ai/quantization/`                     | Quantization scripts and configs   |
| `backend/app/services/trust_engine.py` | Score aggregation service          |
| `backend/app/routes/admin.py`          | AI metrics monitoring endpoint     |

---

## AMD Stack Benefits Summary

✅ **Real-time inference** — Sub-millisecond per review  
✅ **GPU acceleration** — ROCm for high-throughput batch processing  
✅ **CPU optimization** — ZenDNN for cost-efficient deployment  
✅ **Model efficiency** — INT8 quantization reduces size by 75%  
✅ **Privacy-first** — Ryzen AI enables fully local AI execution  
✅ **Hardware flexibility** — Same code runs on GPU, CPU, or NPU
