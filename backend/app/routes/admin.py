"""
Admin API endpoints
"""

from fastapi import APIRouter, HTTPException
from app.database import get_supabase
from app.models.schemas import AdminDashboardResponse, SellerResponse
from typing import List

router = APIRouter()
supabase = get_supabase()

@router.get("/dashboard", response_model=AdminDashboardResponse)
def get_admin_dashboard():
    """
    Get admin dashboard overview statistics
    """
    try:
        # Total sellers
        sellers_result = supabase.table("sellers").select("id", count="exact").execute()
        total_sellers = sellers_result.count if hasattr(sellers_result, 'count') else len(sellers_result.data)
        
        # High risk sellers (score < 50)
        high_risk_result = supabase.table("trust_scores")\
            .select("seller_id")\
            .lt("overall_score", 50)\
            .execute()
        high_risk_sellers = len(high_risk_result.data)
        
        # Average trust score
        all_scores_result = supabase.table("trust_scores")\
            .select("overall_score")\
            .execute()
        
        scores = [s["overall_score"] for s in all_scores_result.data]
        avg_trust_score = sum(scores) / len(scores) if scores else 0
        
        # Total reviews
        reviews_result = supabase.table("reviews").select("id", count="exact").execute()
        total_reviews = reviews_result.count if hasattr(reviews_result, 'count') else len(reviews_result.data)
        
        # Score distribution
        high_trust = len([s for s in scores if s >= 80])
        medium_trust = len([s for s in scores if 60 <= s < 80])
        low_trust = len([s for s in scores if s < 60])
        
        return {
            "total_sellers": total_sellers,
            "high_risk_sellers": high_risk_sellers,
            "avg_trust_score": round(avg_trust_score, 1),
            "total_reviews": total_reviews,
            "score_distribution": {
                "high": high_trust,
                "medium": medium_trust,
                "low": low_trust
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching admin dashboard: {str(e)}")


@router.get("/high-risk-sellers", response_model=List[SellerResponse])
def get_high_risk_sellers():
    """
    Get list of high-risk sellers (trust score < 50)
    """
    try:
        # Get seller IDs with low scores
        scores_result = supabase.table("trust_scores")\
            .select("seller_id")\
            .lt("overall_score", 50)\
            .execute()
        
        seller_ids = [s["seller_id"] for s in scores_result.data]
        
        if not seller_ids:
            return []
        
        # Get seller details
        sellers_result = supabase.table("sellers")\
            .select("*")\
            .in_("id", seller_ids)\
            .execute()
        
        return sellers_result.data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching high-risk sellers: {str(e)}")
