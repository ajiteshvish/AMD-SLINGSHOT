# Ryzen AI — Edge / Local AI Inference

## Overview

Ryzen AI is AMD's on-device AI acceleration technology built into modern AMD Ryzen processors. It includes a dedicated Neural Processing Unit (NPU) that can execute AI models locally on consumer laptops and desktops — without requiring a discrete GPU or cloud connectivity.

For Trustora, Ryzen AI represents the **privacy-first vision**: enabling consumers to run trust scoring directly on their own devices, keeping sensitive marketplace data completely local.

---

## Why Ryzen AI?

| Advantage              | Trustora Application                                                           |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Privacy-first**      | Review analysis happens entirely on-device — no data leaves the user's machine |
| **Offline capability** | Trust scores can be generated without internet connectivity                    |
| **Low latency**        | NPU delivers faster inference than CPU for supported models                    |
| **Power efficient**    | NPU consumes fraction of power vs CPU/GPU for AI workloads                     |
| **Zero cloud cost**    | No inference API costs; computation is free on-device                          |

---

## Architecture Vision

### Current (Server-side)

```
User Browser → FastAPI Server → ONNX Runtime (Server CPU/GPU) → Trust Score
```

### Future (Ryzen AI / Client-side)

```
User Browser → WebNN API → Ryzen AI NPU (Local) → Trust Score
                                    ↑
                            ONNX Runtime Web
```

---

## How Trustora Plans to Use Ryzen AI

### Phase 1: Local Trust Preview (Planned)

- User installs a lightweight Trustora desktop app or browser extension
- ONNX models are downloaded once and cached locally
- When viewing a seller, reviews are scored locally via Ryzen AI NPU
- Provides instant "preview" trust scores before server-verified analysis

### Phase 2: Hybrid Architecture (Future)

```
┌───────────────────────────────────────┐
│            User Device                │
│  ┌─────────────┐  ┌───────────────┐  │
│  │ ONNX Runtime │  │  Ryzen AI NPU │  │
│  │    Web       │──│  (Local)      │  │
│  └─────────────┘  └───────────────┘  │
│         │                             │
│    [Quick Local Score]                │
└─────────│─────────────────────────────┘
          │
          ▼  (Verification)
┌───────────────────────────────────────┐
│         Trustora Server               │
│  [Full Analysis + DB Aggregation]     │
└───────────────────────────────────────┘
```

---

## Supported Hardware

| Processor                      | NPU    | TOPS    | Support            |
| ------------------------------ | ------ | ------- | ------------------ |
| **Ryzen 7040** (Phoenix)       | XDNA   | 10 TOPS | ✅                 |
| **Ryzen 8040** (Hawk Point)    | XDNA   | 16 TOPS | ✅                 |
| **Ryzen AI 300** (Strix Point) | XDNA 2 | 50 TOPS | ✅                 |
| **Ryzen 9000** (Granite Ridge) | N/A    | —       | ❌ Desktop, no NPU |

---

## Technical Integration Path

### ONNX Runtime + Ryzen AI NPU

```python
import onnxruntime as ort

# Ryzen AI uses the Vitis AI Execution Provider
providers = [
    "VitisAIExecutionProvider",   # Ryzen AI NPU
    "CPUExecutionProvider"         # Fallback
]

session = ort.InferenceSession(
    "sentiment_quantized.onnx",
    providers=providers
)
```

### Browser-based (WebNN)

```javascript
// Future: Web Neural Network API
const session = await ort.InferenceSession.create(
  "sentiment_quantized.onnx",
  { executionProviders: ["webnn"] }, // Uses Ryzen AI NPU via browser
);
```

---

## Model Requirements for Ryzen AI

| Requirement        | Status in Trustora                   |
| ------------------ | ------------------------------------ |
| ONNX format        | ✅ All models exported as `.onnx`    |
| INT8 quantization  | ✅ Models are INT8 quantized         |
| Model size < 100MB | ✅ Quantized models are ~65MB        |
| Standard operators | ✅ DistilBERT uses standard ONNX ops |

---

## Privacy Benefit

| Aspect               | Server Model                  | Ryzen AI (Local)             |
| -------------------- | ----------------------------- | ---------------------------- |
| Review data location | Sent to server                | **Stays on device**          |
| Network dependency   | Required                      | **None**                     |
| Latency              | Network + compute             | **Compute only**             |
| Data breach risk     | Server attack surface         | **Zero network exposure**    |
| GDPR compliance      | Requires data handling policy | **Data never leaves device** |

---

## Current Status in Trustora

| Phase                    | Status               |
| ------------------------ | -------------------- |
| Server-side ONNX Runtime | ✅ Implemented       |
| INT8 quantized models    | ✅ Ready             |
| Ryzen AI NPU integration | 🔮 Planned (Phase 3) |
| Browser WebNN support    | 🔮 Planned (Phase 4) |

---

## References

- [AMD Ryzen AI Developer Hub](https://www.amd.com/en/products/processors/consumer/ryzen-ai.html)
- [Ryzen AI Software Documentation](https://ryzenai.docs.amd.com/)
- [WebNN API Specification](https://www.w3.org/TR/webnn/)
- [ONNX Runtime Web](https://onnxruntime.ai/docs/tutorials/web/)
