---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
---

# ReviewDekho — Wireframes & UI Mockups

## 1. Landing Page

### Header / Navbar

- Trustora Logo (left)
- Home | Features | How It Works (nav links)
- Login Button | Register Button (right, CTA)

### Hero Section

- Headline: "An Intelligent Layer of Trust for Online Shopping"
- Sub-headline: "AI-powered seller trust scores, powered by AMD"
- Search Bar → `[ Search Seller or Product Link... ]`
- CTA Button → `[ Analyze Now ]`
- Particle animation background

### Features Strip (3 cards)

- Trust Badges — color-coded trust levels
- Fake Review Detection — AI-powered NLP
- Secure AMD Local AI — privacy-first inference

### Dashboard Preview Section

- Screenshot / animated demo of the seller card
- Trust score badge preview (0-100)

### Testimonials Section

- 3 user review cards

### Footer

- © 2026 Trustora. Built with AMD Technology

---

## 2. Consumer Dashboard (User)

### Header

- Trustora Logo
- Search Bar → `[ Search Seller... ]`
- User Profile Icon + Notifications Bell

### Stats Row (3 panels)

- High Trust Sellers
  - TechStore1: 95/100 — GREEN badge
  - ShoeMart: 91/100 — GREEN badge
- Risk Alerts
  - PhoneCaseInc — Fake Reviews Alert
  - GadgetHub — High Returns Alert
- Recent Scans
  - LaptopWorld: 88/100
  - SneakerCentral: 72/100

### Trend Panel (full width)

- Weekly Trust Score Overview chart (Recharts line graph)
- Time filters: 7D | 30D | 90D

### Watchlist Section

- Followed sellers list
- Quick trust score badge per seller
- Remove from watchlist button

### Sidebar / Quick Actions

- Add Seller to Watchlist
- Compare Sellers
- View Risk Alerts

---

## 3. Seller Detail & Trust Metrics Page

### Header Bar

- Trustora Logo | Search Bar | User Profile

### Seller Info Card (left column)

- Seller Name: TechStore1
- Platform: Amazon
- Status: Active (green dot)
- Last Scan: 2 mins ago

### Trust Badge (right column, large)

- Unified Score: 95 / 100
- Badge: HIGH TRUST (green ring)
- Color scale: RED (0-39) | YELLOW (40-69) | GREEN (70-100)

### Trust Breakdown Panel (left column)

- Delivery Reliability: 98% ████████████
- Review Authenticity: 93% ███████████
- Customer Support: 90% ██████████
- Refund Fairness: 99% ████████████
- Behavioral Stability: 88% ██████████

### Actions Panel (right column)

- `[ Compare with Another Seller ]`
- `[ + Add to Watchlist ]`
- `[ Set Price / Score Alert ]`

### Risk Explanation (full width)

- Summary: "No major risks detected"
- NLP finding: "Reviews show high authenticity pattern"
- Flag indicators: fake spike? | refund anomaly? | support delay?

### Historical Trust Trend Graph

- Line chart: 30-day / 90-day toggle
- X-axis: dates | Y-axis: trust score 0-100

### Recent Reviews Section

- 10 latest reviews listed
- Per review: rating stars | sentiment badge (Positive/Negative) | authenticity flag

---

## 4. Seller Comparison Page

### Header

- `Compare Sellers` — page title
- Search and add sellers to compare (up to 3)

### Comparison Table (columns per seller)

- Seller Name & Platform
- Unified Trust Score badge
- Delivery Reliability score
- Review Authenticity score
- Customer Support score
- Refund Fairness score
- Behavioral Stability score
- Total Reviews count
- Recommendation tag: BEST CHOICE | RISKY | AVERAGE

### Winner Highlight

- Top-scoring seller highlighted in green
- `[ View Full Details ]` button per seller

---

## 5. Live AI Playground (Intelligence Page)

### Header

- "Live AI Playground" — section title
- Sub-label: "Powered by AMD ONNX Runtime"

### Input Panel

- Large text area → "Type or paste any review text here..."
- `[ Run AI Analysis ]` button (red, AMD-branded)
- Batch input option (multiple reviews, one per line)

### Output Panel (appears after analysis)

- Per review result card
  - Review text (truncated)
  - Sentiment Score: -1.0 to +1.0 (colored bar)
    - Negative (red) | Neutral (yellow) | Positive (green)
  - Authenticity Score: 0.0 to 1.0 (colored bar)
    - Likely Fake (red) | Uncertain (yellow) | Authentic (green)

### AMD Execution Metrics Panel

- Active Provider: ROCMExecutionProvider / CPUExecutionProvider (ZenDNN)
- Batch Size: N reviews
- Total Inference Time: X ms
- Speed: X ms per review
- Model: DistilBERT-based INT8 Quantized ONNX

---

## 6. Admin Panel

### Header

- "Trustora Admin Console" title
- Admin Profile | Logout

### Stats Row (4 tiles)

- Total Sellers: 15,420
- High Risk Sellers: 342
- Total Reviews Analyzed: 2.4M
- AMD Inference Latency: ~15ms per review

### Score Distribution Graph (half width)

- Bar chart: distribution of trust scores across all sellers
- Buckets: 0-39 (red) | 40-69 (yellow) | 70-100 (green)

### Manipulation Detection Logs (half width)

- Spike in 5-star ratings for SellerX
- Abnormal refund rate for SellerY
- Timestamp | Seller | Alert Type | Status

### Seller Management Table (full width)

- Columns: Name | Marketplace | Score | Status | Last Analyzed | Actions
- Actions: Trigger Analysis | Suspend | Under Review

### AI Monitoring Panel (full width)

- NLP Model Accuracy: 94%
- Running on: ROCm GPU / ZenDNN CPU
- ONNX Runtime version
- Last batch run timestamp
- `[ Run Batch Analysis for All Sellers ]` button

### Batch Analysis Controls

- Select sellers to analyze
- Schedule recurring analysis
- View batch run history
