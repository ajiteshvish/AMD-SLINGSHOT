---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
  initialExpandLevel: 3
  maxWidth: 220
---

# Wireframes — Compare, AI Playground & Admin

## Seller Comparison Page

### Header

- "Compare Sellers" title
- Search + Add seller (up to 3)

### Comparison Table (per seller column)

- Seller name + platform
- Unified Trust Score badge
- 5 sub-scores (delivery, reviews, support, refund, stability)
- Total reviews count

### Winner Row

- Best choice seller highlighted in green
- View Full Details button per seller

## Live AI Playground

### Header

- "Live AI Playground" — AMD ONNX Runtime

### Input Panel

- Text area → type any review text
- Run AI Analysis button (AMD red)
- Batch mode (multiple reviews)

### Output Per Review

- Sentiment Score -1.0 to +1.0
  - Red (negative) | Yellow (neutral) | Green (positive)
- Authenticity Score 0.0 to 1.0
  - Red (fake) | Yellow (uncertain) | Green (authentic)

### AMD Execution Metrics

- Active Provider (ROCm or ZenDNN)
- Inference time total (ms)
- Speed per review (ms/item)

## Admin Panel

### Header

- Admin Console title + Admin Profile

### Stats Tiles (4 cards)

- Total Sellers count
- High Risk Sellers count
- Total Reviews Analyzed
- AMD Inference Latency (ms)

### Charts Row

- Score distribution bar chart
- Manipulation detection logs

### Seller Table

- Name | Score | Status | Last Analyzed | Actions
- Actions: Trigger Analysis | Suspend | Flag

### AI Monitoring Panel

- NLP accuracy % | Provider | Runtime version
- Run Batch Analysis button
