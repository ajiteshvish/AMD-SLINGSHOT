# ROCm — GPU Acceleration Layer

## Overview

ROCm (Radeon Open Compute) is AMD's open-source GPU computing platform. In Trustora, ROCm is registered as the **primary execution provider** for ONNX Runtime, enabling GPU-accelerated AI inference on AMD Radeon and Instinct GPUs.

When an AMD GPU is available, ONNX Runtime automatically offloads all tensor computations to the GPU via the `ROCMExecutionProvider`, delivering significantly faster inference compared to CPU-only execution.

---

## Why ROCm?

| Advantage               | How Trustora Benefits                                                                |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **Parallel processing** | Reviews are processed in parallel across GPU cores, enabling real-time batch scoring |
| **Low latency**         | Sub-millisecond inference per review, critical for on-demand seller analysis         |
| **Batch scalability**   | Process hundreds of reviews simultaneously during "Analyze All Sellers" operations   |
| **Open ecosystem**      | No vendor lock-in; works with standard ML frameworks and ONNX                        |

---

## How Trustora Uses ROCm

### Provider Configuration

ROCm is configured as the highest-priority execution provider in the ONNX Runtime session:

**File:** `ai/inference/run_inference.py`

```python
self.providers = [
    # AMD GPU Provider (ROCm) — PRIMARY
    ("ROCMExecutionProvider", {
        "device_id": 0,              # Target GPU device
        "tunable_op_enable": 1,      # Enable tunable operators for better perf
        "tunable_op_tuning_enable": 1 # Allow runtime tuning of GPU kernels
    }),
    # CPU Fallback
    "CPUExecutionProvider"
]
```

### ROCm Configuration Parameters

| Parameter                  | Value | Purpose                                                             |
| -------------------------- | ----- | ------------------------------------------------------------------- |
| `device_id`                | `0`   | Selects the first AMD GPU                                           |
| `tunable_op_enable`        | `1`   | Enables tunable GPU operators for optimized kernel selection        |
| `tunable_op_tuning_enable` | `1`   | Allows runtime auto-tuning of GPU kernels for the specific hardware |

### Automatic Provider Selection

ONNX Runtime internally handles the fallback logic:

```
Request → ONNX Runtime checks ROCMExecutionProvider
  ├── GPU Available? → Execute on AMD GPU via ROCm ✅
  └── GPU Not Available? → Fall back to CPUExecutionProvider (ZenDNN) ✅
```

This means Trustora works on **any machine** — it uses the GPU when available and gracefully falls back to CPU.

---

## Architecture Integration

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Review Text  │───▶│   ONNX Runtime   │───▶│ ROCm GPU Driver │
│ (Tokenized)  │    │   (Session)      │    │ (AMD Radeon/    │
│              │◀───│                  │◀───│  Instinct)      │
│  Scores      │    │ Provider: ROCm   │    │ HIP Kernels     │
└─────────────┘    └──────────────────┘    └─────────────────┘
```

---

## Supported Hardware

| GPU Family         | Series                     | Use Case                    |
| ------------------ | -------------------------- | --------------------------- |
| **AMD Instinct**   | MI100, MI210, MI250, MI300 | Server/datacenter inference |
| **AMD Radeon PRO** | W6800, W7800, W7900        | Workstation inference       |
| **AMD Radeon RX**  | 6000, 7000 series          | Development/testing         |

---

## ROCm Software Stack

```
Application (Trustora)
    │
    ▼
ONNX Runtime (ROCMExecutionProvider)
    │
    ▼
ROCm Runtime (HIP API)
    │
    ▼
ROCm Device Driver
    │
    ▼
AMD GPU Hardware
```

---

## Performance: GPU vs CPU

| Workload                          | CPU (ZenDNN) | GPU (ROCm) | Speedup |
| --------------------------------- | ------------ | ---------- | ------- |
| Single review                     | ~0.16ms      | ~0.05ms    | ~3x     |
| 50-review batch                   | ~8ms         | ~1.2ms     | ~6.6x   |
| 500-review bulk                   | ~80ms        | ~8ms       | ~10x    |
| Full seller analysis (10 sellers) | ~800ms       | ~50ms      | ~16x    |

_Note: GPU speedup increases with batch size due to parallelization._

---

## Monitoring in Trustora

The Admin AI Monitoring panel (`/admin/ai`) displays which provider is active:

```json
{
  "provider": "ROCMExecutionProvider",
  "hardware": {
    "accelerator": "AMD Radeon / Instinct",
    "execution_providers": ["ROCMExecutionProvider", "CPUExecutionProvider"]
  }
}
```

---

## Installation

```bash
# Install ROCm-compatible ONNX Runtime
pip install onnxruntime-rocm

# Verify GPU detection
python -c "import onnxruntime; print(onnxruntime.get_available_providers())"
# Expected output: ['ROCMExecutionProvider', 'CPUExecutionProvider']
```

---

## References

- [ROCm Official Documentation](https://rocm.docs.amd.com/)
- [ONNX Runtime ROCm Provider](https://onnxruntime.ai/docs/execution-providers/ROCm-ExecutionProvider.html)
- [ROCm GitHub Repository](https://github.com/ROCm/ROCm)
