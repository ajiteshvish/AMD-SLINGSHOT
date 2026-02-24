/**
 * API Service Layer
 * Central client for all backend API calls
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiService {
  private client: AxiosInstance;

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
        return Promise.reject(error);
      }
    );
  }

  // Sellers
  async getSellers(params?: SellerQueryParams): Promise<Seller[]> {
    const response = await this.client.get<Seller[]>('/sellers', { params });
    return response.data;
  }

  async searchSellers(query: string): Promise<Seller[]> {
    const response = await this.client.get<Seller[]>('/sellers/search', {
      params: { q: query }
    });
    return response.data;
  }

  async getSellerDetails(sellerId: string): Promise<SellerDetail> {
    const response = await this.client.get<SellerDetail>(`/sellers/${sellerId}`);
    return response.data;
  }

  async getTrustScore(sellerId: string): Promise<TrustScore> {
    const response = await this.client.get<TrustScore>(`/sellers/${sellerId}/trust-score`);
    return response.data;
  }

  async analyzeSeller(sellerId: string): Promise<any> {
    const response = await this.client.post(`/sellers/${sellerId}/analyze`);
    return response.data;
  }

  async analyzeCustomText(reviews: string[]): Promise<any> {
    const response = await this.client.post('/analyze-text', { reviews });
    return response.data;
  }

  async getTrustHistory(sellerId: string, days: number = 30): Promise<TrustScore[]> {
    const response = await this.client.get<TrustScore[]>(`/sellers/${sellerId}/trust-history`, {
      params: { days }
    });
    return response.data;
  }

  async getSellerMetrics(sellerId: string): Promise<SellerMetrics[]> {
    const response = await this.client.get<SellerMetrics[]>(`/sellers/${sellerId}/metrics`);
    return response.data;
  }

  async getSellerReviews(sellerId: string, page: number = 1): Promise<Review[]> {
      const response = await this.client.get<Review[]>(`/sellers/${sellerId}/reviews`, {
        params: { page, limit: 20 }
      });
      return response.data;
  }

  async compareSellers(sellerIds: string[]): Promise<SellerComparison> {
      const response = await this.client.post<SellerComparison>('/sellers/compare', {
        seller_ids: sellerIds
      });
      return response.data;
  }

  // Admin
  async getAdminDashboard(): Promise<AdminDashboard> {
      const response = await this.client.get<AdminDashboard>('/admin/dashboard');
      return response.data;
  }

  async getHighRiskSellers(): Promise<Seller[]> {
      const response = await this.client.get<Seller[]>('/admin/high-risk-sellers');
      return response.data;
  }
}

export const api = new ApiService();
export default api;

