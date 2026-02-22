/**
 * TypeScript interfaces for API responses
 * Matches backend Pydantic models
 */

export interface Seller {
  id: string;
  name: string;
  email?: string;
  marketplace_id?: string;
  marketplace_name: string;
  status: 'active' | 'suspended' | 'under_review';
  created_at: string;
  updated_at: string;
}

export interface TrustScore {
  id: string;
  seller_id: string;
  overall_score: number;
  delivery_reliability: number;
  review_authenticity: number;
  customer_support: number;
  refund_fairness: number;
  behavioral_stability: number;
  calculated_at: string;
  version: number;
}

export interface SellerMetrics {
  id: string;
  seller_id: string;
  total_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  refund_requests: number;
  avg_delivery_days?: number;
  total_reviews: number;
  avg_rating?: number;
  response_time_hours?: number;
  period_start?: string;
  period_end?: string;
}

export interface Review {
  id: string;
  seller_id: string;
  rating: number;
  review_text?: string;
  sentiment_score?: number;
  authenticity_flag: boolean;
  created_at: string;
}

export interface SellerDetail {
  seller: Seller;
  trust_score?: TrustScore;
  latest_metrics?: SellerMetrics;
  recent_reviews: Review[];
}

export interface SellerComparisonItem {
  seller: Seller;
  trust_score?: TrustScore;
  metrics?: SellerMetrics;
}

export interface SellerComparison {
  sellers: SellerComparisonItem[];
}

export interface AdminDashboard {
  total_sellers: number;
  high_risk_sellers: number;
  avg_trust_score: number;
  total_reviews: number;
  score_distribution: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface SellerQueryParams {
  page?: number;
  limit?: number;
  marketplace?: string;
  status?: string;
  min_score?: number;
  max_score?: number;
}
