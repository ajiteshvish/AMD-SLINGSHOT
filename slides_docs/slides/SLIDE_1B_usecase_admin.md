---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
  initialExpandLevel: 3
  maxWidth: 220
---

# Use-Case — Admin & System

## Admin Login

- Admin role via Supabase profiles
- Protected admin routes

## Seller Management

- View all sellers
- Update status: Active / Suspended / Under Review

## AI Analysis Controls

- Trigger on-demand analysis (1 seller)
- Run batch analysis (all sellers)

## Analytics & Monitoring

- Trust score distribution chart
- Manipulation / anomaly detection logs
- Seller metrics history

## System Background Pipeline

- Fetch reviews from Supabase
- Tokenize with DistilBERT
- Run Sentiment ONNX model
- Run Fake Review ONNX model
- Combine weighted score 0–100
- Write back to trust_scores table
