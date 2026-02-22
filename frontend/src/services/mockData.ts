/**
 * Mock Data Service
 * Provides sample data when backend API is unavailable
 */

import type {
  Seller,
  SellerDetail,
  TrustScore,
  SellerMetrics,
  Review,
  AdminDashboard
} from '../types/api';

// Mock Sellers Data
export const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'TechGear Pro',
    marketplace_name: 'Amazon',
    status: 'active',
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Global Electronics',
    marketplace_name: 'eBay',
    status: 'active',
    created_at: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'QuickShip Deals',
    marketplace_name: 'Amazon',
    status: 'active',
    created_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Budget Bargains',
    marketplace_name: 'Etsy',
    status: 'under_review',
    created_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Premium Goods Co',
    marketplace_name: 'Amazon',
    status: 'active',
    created_at: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockTrustScores: Record<string, TrustScore> = {
  '1': {
    id: 'ts1',
    seller_id: '1',
    overall_score: 92,
    delivery_reliability: 95,
    review_authenticity: 90,
    customer_support: 88,
    refund_fairness: 94,
    behavioral_stability: 91,
    calculated_at: new Date().toISOString(),
    version: 1
  },
  '2': {
    id: 'ts2',
    seller_id: '2',
    overall_score: 85,
    delivery_reliability: 87,
    review_authenticity: 83,
    customer_support: 85,
    refund_fairness: 86,
    behavioral_stability: 84,
    calculated_at: new Date().toISOString(),
    version: 1
  },
  '3': {
    id: 'ts3',
    seller_id: '3',
    overall_score: 67,
    delivery_reliability: 70,
    review_authenticity: 65,
    customer_support: 68,
    refund_fairness: 66,
    behavioral_stability: 66,
    calculated_at: new Date().toISOString(),
    version: 1
  },
  '4': {
    id: 'ts4',
    seller_id: '4',
    overall_score: 45,
    delivery_reliability: 50,
    review_authenticity: 40,
    customer_support: 45,
    refund_fairness: 42,
    behavioral_stability: 48,
    calculated_at: new Date().toISOString(),
    version: 1
  },
  '5': {
    id: 'ts5',
    seller_id: '5',
    overall_score: 88,
    delivery_reliability: 90,
    review_authenticity: 86,
    customer_support: 87,
    refund_fairness: 89,
    behavioral_stability: 88,
    calculated_at: new Date().toISOString(),
    version: 1
  }
};

export const mockMetrics: SellerMetrics[] = [
  {
    id: 'sm1',
    seller_id: '1',
    total_orders: 1547,
    completed_orders: 1432,
    cancelled_orders: 45,
    refund_requests: 70,
    avg_delivery_days: 2.3,
    total_reviews: 1547,
    avg_rating: 4.8,
    response_time_hours: 12
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    seller_id: '1',
    rating: 5,
    review_text: 'Excellent service and fast shipping!',
    sentiment_score: 0.95,
    authenticity_flag: true,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'r2',
    seller_id: '1',
    rating: 4,
    review_text: 'Good product, slightly delayed delivery.',
    sentiment_score: 0.75,
    authenticity_flag: true,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockSellerDetails: Record<string, SellerDetail> = {
  '1': {
    seller: mockSellers[0],
    trust_score: mockTrustScores['1'],
    latest_metrics: mockMetrics[0],
    recent_reviews: mockReviews
  }
};

export const mockAdminDashboard: AdminDashboard = {
  total_sellers: 1247,
  high_risk_sellers: 89,
  avg_trust_score: 76.5,
  total_reviews: 45892,
  score_distribution: {
    high: 623,
    medium: 535,
    low: 89
  }
};

export const mockTrustHistory: TrustScore[] = Array.from({ length: 30 }, (_, i) => ({
  id: `th${i}`,
  seller_id: '1',
  overall_score: 85 + Math.random() * 10,
  delivery_reliability: 85 + Math.random() * 10,
  review_authenticity: 80 + Math.random() * 15,
  customer_support: 82 + Math.random() * 12,
  refund_fairness: 88 + Math.random() * 10,
  behavioral_stability: 86 + Math.random() * 10,
  calculated_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  version: 1
}));
