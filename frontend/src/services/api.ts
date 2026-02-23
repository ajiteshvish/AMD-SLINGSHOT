/**
 * API Service Layer
 * Central client for all backend API calls with mock data fallback
 */

import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type {
  Seller,
  SellerDetail,
  TrustScore,
  SellerMetrics,
  Review,
  SellerComparison,
  AdminDashboard,
  SellerQueryParams
} from '../types/api';
import {
  mockSellers,
  mockSellerDetails,
  mockAdminDashboard,
  mockTrustHistory,
  mockReviews,
  mockMetrics,
  mockTrustScores
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || false;

class ApiService {
  private client: AxiosInstance;
  private useMockData: boolean = USE_MOCK_DATA;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        // Auto-enable mock data on network errors in production
        if (error.message === 'Network Error' && import.meta.env.PROD) {
          console.warn('Backend unavailable, switching to mock data');
          this.useMockData = true;
        }
        return Promise.reject(error);
      }
    );
  }

  // Sellers
  async getSellers(params?: SellerQueryParams): Promise<Seller[]> {
    if (this.useMockData) {
      return Promise.resolve(mockSellers);
    }
    try {
      const response = await this.client.get<Seller[]>('/sellers', { params });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for sellers');
      this.useMockData = true;
      return mockSellers;
    }
  }

  async searchSellers(query: string): Promise<Seller[]> {
    if (this.useMockData) {
      const filtered = mockSellers.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase())
      );
      return Promise.resolve(filtered);
    }
    try {
      const response = await this.client.get<Seller[]>('/sellers/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for search');
      this.useMockData = true;
      return mockSellers.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  async getSellerDetails(sellerId: string): Promise<SellerDetail> {
    if (this.useMockData) {
      return Promise.resolve(mockSellerDetails[sellerId] || mockSellerDetails['1']);
    }
    try {
      const response = await this.client.get<SellerDetail>(`/sellers/${sellerId}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for seller details');
      this.useMockData = true;
      return mockSellerDetails[sellerId] || mockSellerDetails['1'];
    }
  }

  async getTrustScore(sellerId: string): Promise<TrustScore> {
    if (this.useMockData) {
      return Promise.resolve(mockTrustHistory[0]);
    }
    try {
      const response = await this.client.get<TrustScore>(`/sellers/${sellerId}/trust-score`);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for trust score', error);
      return mockTrustHistory[0];
    }
  }

  async analyzeSeller(sellerId: string): Promise<any> {
      try {
        const response = await this.client.post(`/sellers/${sellerId}/analyze`);
        return response.data;
      } catch (error) {
        console.error('Failed to trigger AI Analysis', error);
        throw error;
      }
  }

  async getTrustHistory(sellerId: string, days: number = 30): Promise<TrustScore[]> {
    if (this.useMockData) {
      return Promise.resolve(mockTrustHistory.slice(0, days));
    }
    try {
      const response = await this.client.get<TrustScore[]>(`/sellers/${sellerId}/trust-history`, {
        params: { days }
      });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for trust history');
      this.useMockData = true;
      return mockTrustHistory.slice(0, days);
    }
  }

  async getSellerMetrics(sellerId: string): Promise<SellerMetrics[]> {
    if (this.useMockData) {
      return Promise.resolve(mockMetrics);
    }
    try {
      const response = await this.client.get<SellerMetrics[]>(`/sellers/${sellerId}/metrics`);
      return response.data;
    } catch (error) {
      console.warn('Using mock data for metrics');
      this.useMockData = true;
      return mockMetrics;
    }
  }

  async getSellerReviews(sellerId: string, page: number = 1): Promise<Review[]> {
    if (this.useMockData) {
      return Promise.resolve(mockReviews);
    }
    try {
      const response = await this.client.get<Review[]>(`/sellers/${sellerId}/reviews`, {
        params: { page, limit: 20 }
      });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for reviews');
      this.useMockData = true;
      return mockReviews;
    }
  }

  async compareSellers(sellerIds: string[]): Promise<SellerComparison> {
    if (this.useMockData) {
      const sellers = sellerIds.map(id => mockSellers.find(s => s.id === id)).filter(Boolean);
      return Promise.resolve({
        sellers: sellers.map(s => ({
          seller: s!,
          trust_score: mockTrustScores[s!.id],
          metrics: mockMetrics[0]
        }))
      });
    }
    try {
      const response = await this.client.post<SellerComparison>('/sellers/compare', {
        seller_ids: sellerIds
      });
      return response.data;
    } catch (error) {
      console.warn('Using mock data for comparison');
      const sellers = sellerIds.map(id => mockSellers.find(s => s.id === id)).filter(Boolean);
      return {
        sellers: sellers.map(s => ({
          seller: s!,
          trust_score: mockTrustScores[s!.id],
          metrics: mockMetrics[0]
        }))
      };
    }
  }

  // Admin
  async getAdminDashboard(): Promise<AdminDashboard> {
    if (this.useMockData) {
      return Promise.resolve(mockAdminDashboard);
    }
    try {
      const response = await this.client.get<AdminDashboard>('/admin/dashboard');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for admin dashboard');
      this.useMockData = true;
      return mockAdminDashboard;
    }
  }

  async getHighRiskSellers(): Promise<Seller[]> {
    if (this.useMockData) {
      return Promise.resolve(mockSellers.filter(s => {
        const score = mockTrustScores[s.id];
        return score && score.overall_score < 60;
      }));
    }
    try {
      const response = await this.client.get<Seller[]>('/admin/high-risk-sellers');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for high risk sellers');
      this.useMockData = true;
      return mockSellers.filter(s => {
        const score = mockTrustScores[s.id];
        return score && score.overall_score < 60;
      });
    }
  }
}

export const api = new ApiService();
export default api;

