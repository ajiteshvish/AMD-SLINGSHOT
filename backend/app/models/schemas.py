"""
Pydantic models for API request/response validation
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# Seller Models
class SellerBase(BaseModel):
    name: str
    email: Optional[str] = None
    marketplace_id: Optional[str] = None
    marketplace_name: str = "Amazon"
    status: str = "active"

class SellerCreate(SellerBase):
    pass

class SellerResponse(SellerBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Trust Score Models
class TrustScoreBreakdown(BaseModel):
    delivery_reliability: int = Field(..., ge=0, le=100)
    review_authenticity: int = Field(..., ge=0, le=100)
    customer_support: int = Field(..., ge=0, le=100)
    refund_fairness: int = Field(..., ge=0, le=100)
    behavioral_stability: int = Field(..., ge=0, le=100)

class TrustScoreResponse(BaseModel):
    id: str
    seller_id: str
    overall_score: int = Field(..., ge=0, le=100)
    delivery_reliability: int
    review_authenticity: int
    customer_support: int
    refund_fairness: int
    behavioral_stability: int
    calculated_at: datetime
    version: int

    class Config:
        from_attributes = True

# Seller Metrics Models
class SellerMetricsResponse(BaseModel):
    id: str
    seller_id: str
    total_orders: int
    completed_orders: int
    cancelled_orders: int
    refund_requests: int
    avg_delivery_days: Optional[float]
    total_reviews: int
    avg_rating: Optional[float]
    response_time_hours: Optional[float]
    period_start: Optional[str]
    period_end: Optional[str]

    class Config:
        from_attributes = True

# Review Models
class ReviewResponse(BaseModel):
    id: str
    seller_id: str
    rating: int = Field(..., ge=1, le=5)
    review_text: Optional[str]
    sentiment_score: Optional[float]
    authenticity_flag: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Combined Seller Detail Response
class SellerDetailResponse(BaseModel):
    seller: SellerResponse
    trust_score: Optional[TrustScoreResponse]
    latest_metrics: Optional[SellerMetricsResponse]
    recent_reviews: List[ReviewResponse] = []

# Seller Comparison Models
class SellerComparisonRequest(BaseModel):
    seller_ids: List[str] = Field(..., min_length=2, max_length=3)

class SellerComparisonItem(BaseModel):
    seller: SellerResponse
    trust_score: Optional[TrustScoreResponse]
    metrics: Optional[SellerMetricsResponse]

class SellerComparisonResponse(BaseModel):
    sellers: List[SellerComparisonItem]

# Alert Models
class AlertResponse(BaseModel):
    id: str
    user_id: str
    seller_id: Optional[str]
    alert_type: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Watchlist Models
class WatchlistAddRequest(BaseModel):
    seller_id: str

class WatchlistResponse(BaseModel):
    id: str
    user_id: str
    seller_id: str
    created_at: datetime
    seller: Optional[SellerResponse] = None

    class Config:
        from_attributes = True

# Admin Dashboard Models
class AdminDashboardResponse(BaseModel):
    total_sellers: int
    high_risk_sellers: int
    avg_trust_score: float
    total_reviews: int
    score_distribution: dict

# Pagination
class PaginationParams(BaseModel):
    page: int = Field(default=1, ge=1)
    limit: int = Field(default=20, ge=1, le=100)

# Search
class SearchParams(BaseModel):
    query: str
    marketplace: Optional[str] = None
    min_score: Optional[int] = Field(default=None, ge=0, le=100)
    max_score: Optional[int] = Field(default=None, ge=0, le=100)
