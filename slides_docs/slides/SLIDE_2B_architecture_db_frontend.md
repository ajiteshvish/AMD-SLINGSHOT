---
title: markmap
markmap:
  colorFreezeLevel: 2
  background: "#595959"
  initialExpandLevel: 3
  maxWidth: 220
---

# Architecture — DB, Auth, Frontend & Deploy

## 4. Database — Supabase PostgreSQL

### Tables

- profiles — Firebase UID, role
- sellers — master data, marketplace
- trust_scores — 0–100 + 5 sub-scores
- seller_metrics — orders, refunds, delivery
- reviews — text, sentiment, authenticity
- alerts — score_drop, fraud, high_risk
- user_watchlist — followed sellers

### Security

- Row Level Security (RLS) on all tables
- Public read: sellers, scores
- User-scoped: alerts, watchlist

## 5. Authentication

- Firebase Auth — Google OAuth + Email
- Supabase RLS — data authorization
- Role guard: user / admin

## 6. Frontend — React 19 + Vite

- Home, Seller Details, Compare
- Intelligence (AI Playground)
- User Dashboard, Admin Panel
- TrustBadge, TrustBreakdown components
- Recharts — score history graphs

## 7. Deployment

- Vercel — Frontend CDN
- Render — Backend API (Python 3.11)
- Supabase Cloud — Managed PostgreSQL
