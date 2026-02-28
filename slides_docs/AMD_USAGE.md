# URTSS - Usage of AMD Products/Solutions

This document details how the Unified Retailer Trust Scoring System (URTSS) leverages AMD’s robust hardware and software ecosystem to deliver secure, extremely fast, and privacy-first local AI inference for analyzing seller trustworthiness.

## 1. AMD Hardware Utilization

**Ryzen AI (NPU/APU)**

- **Usage**: Used for efficient background monitoring and continuous trust score calculations for casual marketplace browsing.
- **Benefit**: Ensures low power consumption and offloads the primary CPU/GPU, enabling smooth local inference on consumer-grade laptops.

**ROCm (Radeon Open Compute) & AMD GPUs**

- **Usage**: Provides heavy-lifting acceleration for high-volume NLP (Natural Language Processing) sentiment analysis when analyzing thousands of reviews simultaneously.
- **Benefit**: Delivers desktop-class parallel processing power to drastically reduce the latency of parsing fake and biased reviews locally.

**ZenDNN (Zen Deep Neural Network Library)**

- **Usage**: Optimizes model execution directly on AMD EPYC and Ryzen CPUs when a dedicated GPU is unavailable.
- **Benefit**: Uses AVX instructions specific to the Zen architecture to guarantee high throughput and low-latency trust score inference.

---

## 2. AMD Software & Developer Tools

**ONNX Runtime (with AMD Execution Providers)**

- **Usage**: Acts as the primary AI inference engine.
- **Implementation**: The NLP and behavioral analysis models are converted to ONNX format and executed using the ROCm or Vitis AI execution providers plugged into ONNX Runtime.
- **Benefit**: Write-once, deploy-anywhere architecture optimized dynamically by AMD providers.

**Vitis AI**

- **Usage**: Employed during the model development and quantization phase.
- **Implementation**: To ensure models fit locally on a user's machine without the need for cloud offloading, neural networks are heavily quantized and compressed using Vitis AI tools.
- **Benefit**: Reduces memory footprint while retaining accuracy for review authenticity checks.

**INT8 Quantization (via AMD AI Tools)**

- **Usage**: Models are optimized from FP32 to INT8 precision.
- **Benefit**: Significantly boosts inference speeds (up to 4x) on Ryzen AI and ROCm platforms, minimizing the storage and compute requirements for the browser extension or local app.

---

## 3. Why AMD? The Strategic Advantage

1. **Privacy-First Operations**: AMD’s local inference capabilities mean that sensitive user shopping habits and API queries do not need to be sent to a central server. All fake-review detection and score generation happen safely on the user's AMD-powered device.
2. **Real-Time Responsiveness**: Analyzing a product page with 500+ reviews usually takes seconds on a cloud call round-trip. Using **ROCm** and **ZenDNN** locally, URTSS brings this down to milliseconds.
3. **Scalability**: For marketplace administrators running URTSS network-wide, AMD **EPYC** servers combined with ROCm allow for the simultaneous processing of millions of seller behavior signals instantly.
