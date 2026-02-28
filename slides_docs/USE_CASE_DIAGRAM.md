---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
---

# 🔍 ReviewDekho — Use-Case / Process Flow

## 👤 Consumer

### 🔐 Authentication

- Register with Email / Google
- Login via Firebase Auth
- View & Edit Profile

### 🔎 Seller Discovery

- Search Seller by Name
- Browse Seller List
  - Filter by Marketplace
  - Filter by Trust Score Range
  - Filter by Status

### 📊 Trust Intelligence

- View Unified Trust Score (0–100)
  - Delivery Reliability Score
  - Review Authenticity Score
  - Customer Support Score
  - Refund & Return Fairness Score
  - Behavioral Stability Score
- View Review Sentiment Analysis
  - Positive / Negative / Neutral breakdown
  - Authenticity Flag per Review

### ⚖️ Seller Comparison

- Select Multiple Sellers
- Side-by-Side Trust Score Comparison
- Identify Safest Seller for a Product

### 🔔 Alerts & Watchlist

- Add Seller to Watchlist
- Receive Risk Alerts
  - 🔴 High Risk Warning
  - ⚠️ Score Drop Alert
  - 🚨 Fraud Warning

### 🤖 Live AI Playground

- Type Custom Review Text
- Run AMD ONNX Real-Time Inference
  - Sentiment Score (-1 to +1)
  - Authenticity Score (0 to 1)
- View Execution Metrics
  - Active Provider (ROCm / ZenDNN)
  - Inference Time (ms/item)

---

## 🛡️ Admin

### 🔐 Authentication

- Login with Admin Role
- Role Verified via Supabase Profiles

### 📋 Seller Management

- View All Sellers
- Update Seller Status
  - Active ✅
  - Suspended 🚫
  - Under Review 🔄

### 🔬 AI Analysis Controls

- Trigger On-Demand Analysis for One Seller
  - Runs AMD ONNX Pipeline
  - Updates Trust Score in Supabase
- Run Batch AI Analysis for All Sellers

### 📈 Analytics & Monitoring

- View System-Wide Trust Score Distribution
- Detect Anomalies & Suspicious Patterns
- View Seller Metrics History
  - Orders, Refunds, Delivery Performance
  - Avg Rating Trends

---

## ⚙️ System (Background)

### AI Pipeline (on Analysis Trigger)

- Fetch Seller Reviews from Supabase
- Tokenize with DistilBERT
- Run Sentiment Model (ONNX)
- Run Fake Review Model (ONNX)
- Combine Weighted Scores (0–100)
- Write Back to `trust_scores` table

### Data Ingestion

- Public Seller Reviews & Ratings
- Synthetic MVP Datasets
- Marketplace Secure APIs (future)
