# Vitis AI — Model Development & Deployment

## Overview

Vitis AI is AMD's comprehensive development platform for AI inference on AMD hardware. It provides tools for model optimization, quantization, compilation, and deployment across AMD FPGAs, GPUs, and the Ryzen AI NPU.

In Trustora's architecture, Vitis AI serves as the **bridge between model training and hardware-optimized deployment**, ensuring models are properly quantized and configured for maximum performance on AMD silicon.

---

## Why Vitis AI?

| Advantage               | Trustora Application                                        |
| ----------------------- | ----------------------------------------------------------- |
| **End-to-end pipeline** | From trained model to hardware-optimized deployment         |
| **Quantization tools**  | Built-in INT8/FP16 quantization with calibration support    |
| **Hardware profiling**  | Profile model execution on target AMD hardware              |
| **Cross-platform**      | Same tools for GPU (ROCm), CPU (ZenDNN), and NPU (Ryzen AI) |

---

## Trustora Integration

### Model Optimization Workflow

```
PyTorch Model (FP32)
    │
    ▼
Vitis AI Quantizer
    │  ├── Calibration with representative data
    │  ├── Weight quantization (INT8)
    │  └── Activation range analysis
    ▼
Quantized ONNX Model
    │
    ▼
Vitis AI Compiler (for NPU targets)
    │
    ▼
Deployed Model → ONNX Runtime
```

### Key Vitis AI Tools Used

| Tool                   | Purpose                                  | Trustora Usage                                |
| ---------------------- | ---------------------------------------- | --------------------------------------------- |
| **Vitis AI Quantizer** | Converts FP32 models to INT8             | Quantize sentiment & fake review models       |
| **Vitis AI Profiler**  | Analyze model performance per layer      | Identify bottlenecks in transformer attention |
| **Vitis AI Compiler**  | Compile models for specific AMD hardware | Prepare models for Ryzen AI NPU deployment    |
| **Vitis AI Runtime**   | Execute compiled models via ONNX Runtime | `VitisAIExecutionProvider` in ONNX Runtime    |

---

## Quantization with Vitis AI

```python
from vitis_ai_quantizer import quantize

# Quantize a trained sentiment model
quantize(
    model_path="ai/models/sentiment_fp32.onnx",
    output_path="ai/models/sentiment_quantized.onnx",
    calibration_data=review_samples,      # Representative review texts
    target_device="amd_cpu",               # or "amd_npu", "amd_gpu"
    quantization_type="int8"
)
```

---

## Current Status

| Component                     | Status                                         |
| ----------------------------- | ---------------------------------------------- |
| Model quantization pipeline   | ✅ Implemented (via ONNX Runtime quantization) |
| Vitis AI-specific compilation | 🔮 Planned for Ryzen AI NPU phase              |
| Hardware profiling            | 🔮 Planned for optimization phase              |

---

## References

- [Vitis AI Documentation](https://docs.amd.com/r/en-US/ug1414-vitis-ai)
- [Vitis AI GitHub](https://github.com/Xilinx/Vitis-AI)
- [AMD AI Developer Resources](https://www.amd.com/en/developer.html)
