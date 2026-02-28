---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
  initialExpandLevel: 3
  maxWidth: 230
---

# Future AMD Integrations & Technical Roadmap

## Phase 2 — Browser Extension + Edge Inference

### AMD Ryzen AI NPU Integration

- Target: AMD Ryzen 7040 / 8040 series (built-in NPU)
- Run ONNX models directly on-device Neural Processing Unit
- Zero GPU / CPU load — dedicated AI silicon
- Ultra-low power: suitable for always-on trust badge overlay
- Tool: AMD Ryzen AI Software SDK + ONNX Runtime EP

### Browser Extension Architecture

- Content script injects trust badge on seller pages
- Background worker runs local ONNX inference via WebAssembly
- ONNX Runtime Web (WASM backend) for browser execution
- Fallback to native app via local HTTP on AMD Ryzen AI

## Phase 3 — Product Image Authenticity (MIVisionX)

### AMD MIVisionX Toolkit

- AMD's computer vision acceleration framework
- Built on OpenVX + HIP for GPU-accelerated vision pipelines
- Detect manipulated or stock product images
- Identify counterfeit listings via image fingerprinting
- Pipeline: Image → MIVisionX preprocessing → Vision ONNX model → Authenticity flag

### Capabilities to Add

- Perceptual hash comparison (detect duplicate listings)
- CNN-based counterfeit product classifier (INT8 + ROCm)
- Real-time image analysis at seller page load

## Phase 4 — MIGraphX Graph Inference Engine

### What is MIGraphX

- AMD's native graph inference engine (alternative to ONNX Runtime)
- Directly compiles ONNX graphs to optimized AMD GPU kernels
- Lower overhead than ORT for production-scale inference
- Supports: ONNX, TensorFlow, PyTorch (via torch.compile)

### Migration Plan

- Export models to ONNX (already done)
- Compile via `migraphx.parse_onnx()`
- GPU kernel auto-tuning via `migraphx.quantize_int8()`
- Expected: 20–30% latency improvement over ONNX Runtime CPU path

## Phase 5 — Enterprise Scale (AMD EPYC + Instinct)

### AMD EPYC Server Deployment

- Horizontal scaling: multiple EPYC cores for parallel batch inference
- NUMA-aware threading for ZenDNN batch processing
- AMD EPYC 9004 (Genoa): 96 cores, 384MB L3 cache
- Suited for processing millions of reviews per hour

### AMD Instinct MI300X Cluster

- AMD's flagship AI accelerator (192GB HBM3 unified memory)
- Run larger NLP models (BERT-Large, RoBERTa) for higher accuracy
- Multi-GPU distributed inference via ROCm collective communications
- ROCm Docker + Kubernetes orchestration for cloud-native AMD AI

### AMD ROCm Software Ecosystem (Full Stack)

- PyTorch ROCm — model training and fine-tuning
- Vitis AI — model quantization and optimization
- MIOpen — DNN primitives (conv, GEMM, pooling)
- rocBLAS — GPU BLAS for transformer matrix ops
- MIGraphX — compiled inference engine
- rocm-smi — GPU monitoring and diagnostics
- AMD Enterprise AI Suite — production management

## Phase 6 — Federated Trust Learning

### Privacy-Preserving Model Updates

- Federated Learning on AMD hardware
- Local model fine-tuning on user device (Ryzen AI NPU)
- Only model gradients (not raw data) sent to server
- AMD ROCm supports distributed training via RCCL library
- Enables: continuously improving AI without compromising privacy
