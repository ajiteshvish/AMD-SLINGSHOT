/**
 * Custom React hooks for API data fetching
 */

import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type {
  Seller,
  SellerDetail,
  TrustScore,
  Review,
  AdminDashboard,
  SellerQueryParams
} from '../types/api';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook to fetch list of sellers
 */
export function useSellers(params?: SellerQueryParams): UseApiResult<Seller[]> {
  const [data, setData] = useState<Seller[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getSellers(params);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to search sellers
 */
export function useSearchSellers(query: string): UseApiResult<Seller[]> {
  const [data, setData] = useState<Seller[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!query || query.length < 2) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await api.searchSellers(query);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [query]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch seller details
 */
export function useSeller(sellerId: string | undefined): UseApiResult<SellerDetail> {
  const [data, setData] = useState<SellerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!sellerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await api.getSellerDetails(sellerId);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sellerId]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch trust score
 */
export function useTrustScore(sellerId: string | undefined): UseApiResult<TrustScore> {
  const [data, setData] = useState<TrustScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!sellerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await api.getTrustScore(sellerId);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sellerId]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch trust score history
 */
export function useTrustHistory(sellerId: string | undefined, days: number = 30): UseApiResult<TrustScore[]> {
  const [data, setData] = useState<TrustScore[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!sellerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await api.getTrustHistory(sellerId, days);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sellerId, days]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch seller reviews
 */
export function useSellerReviews(sellerId: string | undefined, page: number = 1): UseApiResult<Review[]> {
  const [data, setData] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!sellerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await api.getSellerReviews(sellerId, page);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sellerId, page]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch admin dashboard
 */
export function useAdminDashboard(): UseApiResult<AdminDashboard> {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getAdminDashboard();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch high risk sellers
 */
export function useHighRiskSellers(): UseApiResult<Seller[]> {
  const [data, setData] = useState<Seller[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getHighRiskSellers();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
