# URTSS - Technologies Used

This document outlines the core technology stack and frameworks used to build and deploy the Unified Retailer Trust Scoring System (URTSS).

## 1. AMD Integration & Artificial Intelligence

- **ROCm (Radeon Open Compute)**: GPU acceleration layer for robust deep learning model execution.
- **ZenDNN (Zen Deep Neural Network)**: AMD’s optimized libraries for CPU-level model inference without degrading performance.
- **ONNX Runtime (AMD Execution Providers)**: Primary engine executing cross-platform deep learning models dynamically formatted for AMD hardware.
- **INT8 Quantization Flow**: Precision tuning toolkit used to shrink deep learning models, enabling local edge processing.
- **Vitis AI**: Advanced AI inference pipeline development tool used to shape and optimize network parameters for edge deployment.
- **Ryzen AI Software**: Harnesses NPU hardware to ensure continuous background inference operations use minimal power.

## 2. Core Frameworks & Application Stack (Proposed MVP)

- **Frontend (Web/Browser Extension)**
  - **React.js** / **Next.js**: Component-based UI formulation for smooth SPA flow.
  - **Tailwind CSS**: Rapid utility-first styling for the presentation layer and Trust Badges.
  - **Zustand / Redux**: State management for user alert monitoring and local settings caching.
- **Backend / Trust Logic API**
  - **Node.js (Express)** or **Python (FastAPI)**: Lightweight backend routers for data preparation before feeding to ONNX Runtime.
  - **LangChain / Hugging Face Transformers**: Libraries driving the NLP engine for sentiment extraction, combined with AMD endpoints.

## 3. Data Processing & Algorithms

- **Web Scrapers / Data Extractor Pipelines**: Custom headless browser pipelines (e.g., Puppeteer / Playwright) used to ingest raw seller ratings and marketplace reviews.
- **Sentiment Evaluation Engine**: Custom NLP implementation measuring intent and aggressiveness to detect bias in reviews.
- **Mathematical Scoring Combiner**: The weighted sum algorithm consolidating `Delivery`, `Authenticity`, `Support`, and `Refund Fairness` scores into a Unified Trust Score (0-100).

## 4. Modeling & Visualization

- **Mermaid.js**: Utilized to render declarative Architecture, Process Flow, and Use-case schemas dynamically across markdown documentation formats.
