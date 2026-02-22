-- Trustora Database Schema (Idempotent Version)
-- Safe to run multiple times - uses IF NOT EXISTS and DROP POLICY IF EXISTS

-- Drop existing policies first (to allow re-running)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Service role has full access to profiles" ON profiles;
DROP POLICY IF EXISTS "Anyone can view sellers" ON sellers;
DROP POLICY IF EXISTS "Service role can manage sellers" ON sellers;
DROP POLICY IF EXISTS "Anyone can view trust scores" ON trust_scores;
DROP POLICY IF EXISTS "Service role can manage trust scores" ON trust_scores;
DROP POLICY IF EXISTS "Anyone can view seller metrics" ON seller_metrics;
DROP POLICY IF EXISTS "Service role can manage seller metrics" ON seller_metrics;
DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
DROP POLICY IF EXISTS "Service role can manage reviews" ON reviews;
DROP POLICY IF EXISTS "Users can view own alerts" ON alerts;
DROP POLICY IF EXISTS "Users can update own alerts" ON alerts;
DROP POLICY IF EXISTS "Service role can manage alerts" ON alerts;
DROP POLICY IF EXISTS "Users can view own watchlist" ON user_watchlist;
DROP POLICY IF EXISTS "Users can manage own watchlist" ON user_watchlist;
DROP POLICY IF EXISTS "Service role can manage watchlist" ON user_watchlist;

-- 1. Profiles Table (User roles and info)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 2. Sellers Table
CREATE TABLE IF NOT EXISTS sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  marketplace_id TEXT,
  marketplace_name TEXT DEFAULT 'Amazon',
  status TEXT CHECK (status IN ('active', 'suspended', 'under_review')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sellers_status ON sellers(status);
CREATE INDEX IF NOT EXISTS idx_sellers_marketplace ON sellers(marketplace_id);

-- 3. Trust Scores Table
CREATE TABLE IF NOT EXISTS trust_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  delivery_reliability INTEGER CHECK (delivery_reliability >= 0 AND delivery_reliability <= 100),
  review_authenticity INTEGER CHECK (review_authenticity >= 0 AND review_authenticity <= 100),
  customer_support INTEGER CHECK (customer_support >= 0 AND customer_support <= 100),
  refund_fairness INTEGER CHECK (refund_fairness >= 0 AND refund_fairness <= 100),
  behavioral_stability INTEGER CHECK (behavioral_stability >= 0 AND behavioral_stability <= 100),
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  version INTEGER DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_trust_scores_seller ON trust_scores(seller_id);
CREATE INDEX IF NOT EXISTS idx_trust_scores_calculated ON trust_scores(calculated_at DESC);
CREATE INDEX IF NOT EXISTS idx_trust_scores_overall ON trust_scores(overall_score DESC);

-- 4. Seller Metrics Table
CREATE TABLE IF NOT EXISTS seller_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  total_orders INTEGER DEFAULT 0,
  completed_orders INTEGER DEFAULT 0,
  cancelled_orders INTEGER DEFAULT 0,
  refund_requests INTEGER DEFAULT 0,
  avg_delivery_days DECIMAL(5,2),
  total_reviews INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2),
  response_time_hours DECIMAL(6,2),
  period_start DATE,
  period_end DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_seller_metrics_seller ON seller_metrics(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_metrics_period ON seller_metrics(period_end DESC);

-- 5. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  sentiment_score DECIMAL(3,2) CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  authenticity_flag BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_seller ON reviews(seller_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- 6. Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('score_drop', 'fraud_warning', 'high_risk')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_alerts_user ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_read ON alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_alerts_created ON alerts(created_at DESC);

-- 7. User Watchlist Table
CREATE TABLE IF NOT EXISTS user_watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, seller_id)
);

CREATE INDEX IF NOT EXISTS idx_watchlist_user ON user_watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_seller ON user_watchlist(seller_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_watchlist ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid()::text = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Service role has full access to profiles"
  ON profiles FOR ALL
  USING (auth.role() = 'service_role');

-- Sellers
CREATE POLICY "Anyone can view sellers"
  ON sellers FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage sellers"
  ON sellers FOR ALL
  USING (auth.role() = 'service_role');

-- Trust Scores
CREATE POLICY "Anyone can view trust scores"
  ON trust_scores FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage trust scores"
  ON trust_scores FOR ALL
  USING (auth.role() = 'service_role');

-- Seller Metrics
CREATE POLICY "Anyone can view seller metrics"
  ON seller_metrics FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage seller metrics"
  ON seller_metrics FOR ALL
  USING (auth.role() = 'service_role');

-- Reviews
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage reviews"
  ON reviews FOR ALL
  USING (auth.role() = 'service_role');

-- Alerts
CREATE POLICY "Users can view own alerts"
  ON alerts FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update own alerts"
  ON alerts FOR UPDATE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Service role can manage alerts"
  ON alerts FOR ALL
  USING (auth.role() = 'service_role');

-- Watchlist
CREATE POLICY "Users can view own watchlist"
  ON user_watchlist FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can manage own watchlist"
  ON user_watchlist FOR ALL
  USING (auth.uid()::text = user_id);

CREATE POLICY "Service role can manage watchlist"
  ON user_watchlist FOR ALL
  USING (auth.role() = 'service_role');
