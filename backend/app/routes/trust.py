"""
Trust and Seller API endpoints
Real implementation with Supabase
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.database import get_supabase
from app.models.schemas import (
    SellerResponse,
    SellerDetailResponse,
    TrustScoreResponse,
    SellerMetricsResponse,
    ReviewResponse,
    SellerComparisonRequest,
    SellerComparisonResponse,
    SellerComparisonItem,
    TrustScoreBreakdown
)
from app.services.trust_engine import trust_engine

router = APIRouter()
supabase = get_supabase()

@router.get("/sellers", response_model=List[SellerResponse])
def get_sellers(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    marketplace: Optional[str] = None,
    status: Optional[str] = None,
    min_score: Optional[int] = Query(None, ge=0, le=100),
    max_score: Optional[int] = Query(None, ge=0, le=100)
):
    """
    Get list of sellers with optional filtering and pagination
    """
    try:
        # Build query
        query = supabase.table("sellers").select("*")
        
        # Apply filters
        if marketplace:
            query = query.eq("marketplace_name", marketplace)
        if status:
            query = query.eq("status", status)
        
        # Calculate offset
        offset = (page - 1) * limit
        
        # Execute query with pagination
        result = query.range(offset, offset + limit - 1).execute()
        
        # If score filtering is needed, join with trust_scores
        if min_score is not None or max_score is not None:
            # Get seller IDs with scores in range
            score_query = supabase.table("trust_scores").select("seller_id, overall_score")
            if min_score is not None:
                score_query = score_query.gte("overall_score", min_score)
            if max_score is not None:
                score_query = score_query.lte("overall_score", max_score)
            
            score_result = score_query.execute()
            valid_seller_ids = [s["seller_id"] for s in score_result.data]
            
            # Filter sellers by valid IDs
            result.data = [s for s in result.data if s["id"] in valid_seller_ids]
        
        return result.data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching sellers: {str(e)}")


@router.get("/sellers/search", response_model=List[SellerResponse])
def search_sellers(q: str = Query(..., min_length=1)):
    """
    Search sellers by name
    """
    try:
        result = supabase.table("sellers")\
            .select("*")\
            .ilike("name", f"%{q}%")\
            .limit(20)\
            .execute()
        
        return result.data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching sellers: {str(e)}")


@router.get("/sellers/{seller_id}", response_model=SellerDetailResponse)
def get_seller_details(seller_id: str):
    """
    Get detailed information about a specific seller
    """
    try:
        # Get seller
        seller_result = supabase.table("sellers")\
            .select("*")\
            .eq("id", seller_id)\
            .single()\
            .execute()
        
        if not seller_result.data:
            raise HTTPException(status_code=404, detail="Seller not found")
        
        # Get trust score
        trust_score_result = supabase.table("trust_scores")\
            .select("*")\
            .eq("seller_id", seller_id)\
            .order("calculated_at", desc=True)\
            .limit(1)\
            .execute()
        
        trust_score = trust_score_result.data[0] if trust_score_result.data else None
        
        # Get latest metrics
        metrics_result = supabase.table("seller_metrics")\
            .select("*")\
            .eq("seller_id", seller_id)\
            .order("period_end", desc=True)\
            .limit(1)\
            .execute()
        
        latest_metrics = metrics_result.data[0] if metrics_result.data else None
        
        # Get recent reviews
        reviews_result = supabase.table("reviews")\
            .select("*")\
            .eq("seller_id", seller_id)\
            .order("created_at", desc=True)\
            .limit(10)\
            .execute()
        
        return {
            "seller": seller_result.data,
            "trust_score": trust_score,
            "latest_metrics": latest_metrics,
            "recent_reviews": reviews_result.data
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching seller details: {str(e)}")


@router.get("/sellers/{seller_id}/trust-score", response_model=TrustScoreResponse)
def get_trust_score(seller_id: str):
    """
    Get current trust score for a seller
    """
    try:
        result = supabase.table("trust_scores")\
            .select("*")\
            .eq("seller_id", seller_id)\
            .order("calculated_at", desc=True)\
            .limit(1)\
            .single()\
            .execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Trust score not found for this seller")
        
        return result.data
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trust score: {str(e)}")


@router.get("/sellers/{seller_id}/trust-history", response_model=List[TrustScoreResponse])
def get_trust_history(seller_id: str, days: int = Query(30, ge=1, le=365)):
    """
    Get trust score history for a seller
    """
    try:
        result = supabase.table("trust_scores")\
            .select("*")\
            .eq("seller_id", seller_id)\
            .order("calculated_at", desc=True)\
            .limit(30)\
            .execute()
        
        return result.data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trust history: {str(e)}")


@router.get("/sellers/{seller_id}/metrics", response_model=List[SellerMetricsResponse])
def get_seller_metrics(seller_id: str):
    """
    Get performance metrics for a seller
    """
    try:
        result = supabase.table("seller_metrics")\
            .select("*")\
            .eq("seller_id", seller_id)\
            .order("period_end", desc=True)\
            .limit(12)\
            .execute()
        
        return result.data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching metrics: {str(e)}")


@router.get("/sellers/{seller_id}/reviews", response_model=List[ReviewResponse])
def get_seller_reviews(
    seller_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get reviews for a seller with pagination
    """
    try:
        offset = (page - 1) * limit
        
        result = supabase.table("reviews")\
            .select("*")\
            .eq("seller_id", seller_id)\
            .order("created_at", desc=True)\
            .range(offset, offset + limit - 1)\
            .execute()
        
        return result.data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching reviews: {str(e)}")


@router.post("/sellers/compare", response_model=SellerComparisonResponse)
def compare_sellers(request: SellerComparisonRequest):
    """
    Compare multiple sellers side-by-side
    """
    try:
        comparison_items = []
        
        for seller_id in request.seller_ids:
            # Get seller
            seller_result = supabase.table("sellers")\
                .select("*")\
                .eq("id", seller_id)\
                .single()\
                .execute()
            
            if not seller_result.data:
                continue
            
            # Get trust score
            trust_score_result = supabase.table("trust_scores")\
                .select("*")\
                .eq("seller_id", seller_id)\
                .order("calculated_at", desc=True)\
                .limit(1)\
                .execute()
            
            # Get latest metrics
            metrics_result = supabase.table("seller_metrics")\
                .select("*")\
                .eq("seller_id", seller_id)\
                .order("period_end", desc=True)\
                .limit(1)\
                .execute()
            
            comparison_items.append({
                "seller": seller_result.data,
                "trust_score": trust_score_result.data[0] if trust_score_result.data else None,
                "metrics": metrics_result.data[0] if metrics_result.data else None
            })
        
        return {"sellers": comparison_items}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error comparing sellers: {str(e)}")

from pydantic import BaseModel

class AnalyzeTextRequest(BaseModel):
    reviews: List[str]

@router.post("/sellers/{seller_id}/analyze", response_model=dict)
def analyze_seller_trust(seller_id: str):
    """
    On-Demand triggers the AMD ONNX Runtime AI Pipeline to recalculate a seller's trust score.
    """
    try:
        results = trust_engine.analyze_seller(seller_id)
        return results
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI engine execution failed: {str(e)}")

@router.post("/analyze-text")
def analyze_custom_text(request: AnalyzeTextRequest):
    """
    Live AI Playground Endpoint for AMD Hackathon Demo.
    Accepts arbitrary text and returns ONNX inference speeds and sentiment/authenticity.
    """
    try:
        # Import the singleton instance directly from the AI module
        import sys
        import os
        sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
        from ai.inference.run_inference import engine as ai_engine
        
        output = ai_engine.analyze_review_batch(request.reviews)
        return output
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text analysis failed: {str(e)}")


@router.post("/sellers/analyze-all")
def analyze_all_sellers():
    """
    Batch-triggers AMD ONNX AI analysis for ALL sellers in the database.
    """
    try:
        # Fetch all seller IDs
        all_sellers = supabase.table("sellers").select("id, name").execute()
        
        if not all_sellers.data:
            return {"message": "No sellers found", "processed": 0, "failed": 0}
        
        processed = 0
        failed = 0
        results = []
        
        for seller in all_sellers.data:
            try:
                result = trust_engine.analyze_seller(seller["id"])
                processed += 1
                results.append({
                    "seller_id": seller["id"],
                    "name": seller["name"],
                    "score": result["trust_score"]["overall_score"],
                    "status": "success"
                })
            except Exception as e:
                failed += 1
                results.append({
                    "seller_id": seller["id"],
                    "name": seller["name"],
                    "error": str(e),
                    "status": "failed"
                })
        
        return {
            "message": f"Batch analysis complete. {processed} sellers processed, {failed} failed.",
            "processed": processed,
            "failed": failed,
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch analysis failed: {str(e)}")
