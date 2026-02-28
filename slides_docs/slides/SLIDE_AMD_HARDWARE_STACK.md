---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
  initialExpandLevel: 3
  maxWidth: 230
---

# AMD Hardware Execution Stack — Technical Breakdown

## ONNX Runtime Execution Provider Architecture

### ROCMExecutionProvider (Primary — AMD GPU)

- Built on HIP (Heterogeneous-compute Interface for Portability)
- HIP is AMD's CUDA-compatible GPU programming API
- Automatically maps ONNX operators to GPU kernels
- Tunable Ops enabled: `tunable_op_enable = 1`
  - Runtime auto-tunes kernel parameters for current GPU
  - `tunable_op_tuning_enable = 1` for first-run optimization
- Device: `device_id = 0` (first AMD GPU)

### CPUExecutionProvider (Fallback — AMD CPU)

- AMD ZenDNN library integrated into ORT CPU path
- Optimized for AMD Zen microarchitecture (Ryzen / EPYC)
- BLAS/LAPACK acceleration for matrix multiplication
- AVX2 / AVX-512 SIMD vectorization on supported CPUs

## INT8 Quantization — Technical Detail

### What It Does

- Converts FP32 weights (32-bit) → INT8 (8-bit integers)
- 4x reduction in model size
- 2–4x speedup on AMD hardware (ROCm INT8 kernels)
- Accuracy loss: typically less than 1–2% on NLP tasks

### Quantization Process

- Post-training static quantization (PTQ)
- Calibration dataset: representative review samples
- Per-channel quantization for weight tensors
- Tool: ONNX Runtime quantization API + Vitis AI toolchain

### INT8 on AMD Hardware

- ROCm supports INT8 GEMM (General Matrix Multiply)
- MIOpen provides GPU-optimized INT8 convolution kernels
- AMD Instinct MI series: dedicated INT8 tensor cores

## AMD Software Stack Layers

### Layer 1 — Application

- ReviewDekho Python backend (FastAPI)
- ONNX Runtime Python SDK calls

### Layer 2 — ONNX Runtime

- Graph optimizations (fusion, constant folding)
- Provider dispatch (ROCm vs CPU)
- Memory allocation manager

### Layer 3 — ROCm Platform

- HIP runtime — CUDA-compatible kernel API
- ROCm Math Libraries: rocBLAS, rocRAND, MIOpen
- ROCm System Management Interface (rocm-smi)

### Layer 4 — AMD GPU Hardware

- RDNA / CDNA compute units
- L1 / L2 cache hierarchy + HBM (Instinct) or GDDR (Radeon)
- Shader engines handle parallel tensor operations

## Key Performance Characteristics

- Inference latency: approximately 15ms per review (AMD GPU)
- Throughput: batch-optimized for 10–100 reviews simultaneously
- Memory footprint: INT8 model fits in less than 50MB GPU VRAM
- Cold start: one-time session init, warm for subsequent calls
- Privacy guarantee: all computation in local process memory
