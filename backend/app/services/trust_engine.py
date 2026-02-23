import logging
from datetime import datetime
from app.database import get_supabase
import sys
import os

# Add AI folder to path to import the engine
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from ai.inference.run_inference import engine as ai_engine

logger = logging.getLogger("Trustora_TrustEngine")

class TrustEngine:
    def __init__(self):
        self.supabase = get_supabase()
        
    def analyze_seller(self, seller_id: str) -> dict:
        logger.info(f"Starting Trust Analysis for Seller: {seller_id}")
        
        # 1. Fetch Seller Data
        # Ensure we look up by the correct ID field based on format
        if seller_id.startswith("MKT-"):
            seller_response = self.supabase.table("sellers").select("*").eq("marketplace_id", seller_id).execute()
        else:
            seller_response = self.supabase.table("sellers").select("*").eq("id", seller_id).execute()
            
        if not seller_response.data:
            raise ValueError(f"Seller not found: {seller_id}")
            
        seller = seller_response.data[0]
        
        internal_uuid = seller["id"]
        
        # 2. Fetch Latest Metrics
        metrics_response = self.supabase.table("seller_metrics") \
            .select("*") \
            .eq("seller_id", internal_uuid) \
            .order("period_end", desc=True) \
            .limit(1) \
            .execute()
            
        latest_metrics = metrics_response.data[0] if metrics_response.data else None
        
        # 3. Fetch Recent Reviews
        reviews_response = self.supabase.table("reviews") \
            .select("review_text, rating, created_at") \
            .eq("seller_id", internal_uuid) \
            .order("created_at", desc=True) \
            .limit(50) \
            .execute()
            
        reviews = reviews_response.data
        
        # 4. Run AMD ONNX AI Inference on text reviews
        ai_scores = {"sentiment_avg": 0, "authenticity_avg": 0, "execution_metrics": None}
        if reviews:
            review_texts = [r["review_text"] for r in reviews if r.get("review_text")]
            
            if review_texts:
                logger.info(f"Running ONNX Inference on {len(review_texts)} reviews")
                ai_output = ai_engine.analyze_review_batch(review_texts)
                
                # Aggregate AI Results
                results = ai_output["results"]
                avg_sentiment = sum(r["sentiment_score"] for r in results) / len(results)
                avg_authenticity = sum(r["authenticity_score"] for r in results) / len(results)
                
                ai_scores["sentiment_avg"] = avg_sentiment
                ai_scores["authenticity_avg"] = avg_authenticity
                ai_scores["execution_metrics"] = ai_output["execution_metrics"]
        
        # 5. Calculate New Unified Trust Score 
        scores = self._calculate_scores(latest_metrics, ai_scores["sentiment_avg"], ai_scores["authenticity_avg"])
        
        # 6. Save or Update Trust Score in DB
        trust_score_data = {
            "seller_id": internal_uuid,
            "overall_score": scores["overall"],
            "delivery_reliability": scores["delivery"],
            "review_authenticity": scores["authenticity_scaled"],
            "customer_support": scores["support"],
            "refund_fairness": scores["refund"],
            "behavioral_stability": scores["stability"],
            "version": 2 # Flagging V2 as AMD ONNX Processed
        }
        
        # Upsert logic
        existing = self.supabase.table("trust_scores").select("id").eq("seller_id", internal_uuid).execute()
        
        if existing.data:
            self.supabase.table("trust_scores").update(trust_score_data).eq("seller_id", internal_uuid).execute()
        else:
            self.supabase.table("trust_scores").insert(trust_score_data).execute()
            
        logger.info(f"Analysis complete for {seller_id} ({internal_uuid}). Score: {scores['overall']}")
        
        return {
            "seller": seller,
            "trust_score": trust_score_data,
            "ai_insights": ai_scores
        }
        
    def _calculate_scores(self, metrics, avg_sentiment, avg_authenticity):
        """Weights metrics and AI inferences into final 0-100 scores"""
        if not metrics:
            return {"overall": 50, "delivery": 50, "authenticity_scaled": 50, "support": 50, "refund": 50, "stability": 50}
            
        # 1. Delivery (0-100)
        completion_rate = metrics["completed_orders"] / max(metrics["total_orders"], 1)
        delivery = int((completion_rate * 0.7 + (1 - min(metrics["avg_delivery_days"] / 10, 1)) * 0.3) * 100)
        
        # 2. Authenticity (Powered by AI ONNX Model + Rating) 0-100
        # Combine the user rating (mapped 0-1) with the AI authenticity score (0-1) and Sentiment (-1 to 1)
        rating_norm = metrics["avg_rating"] / 5.0
        sentiment_norm = (avg_sentiment + 1) / 2 # Scale -1,1 to 0,1
        
        # If authenticity is low, it heavily penalizes the raw rating
        auth_scaled = int(((rating_norm * 0.4) + (avg_authenticity * 0.4) + (sentiment_norm * 0.2)) * 100)
        
        # 3. Support (0-100)
        support = int((1 - min(metrics["response_time_hours"] / 48, 1)) * 100)
        
        # 4. Refund Fairness (0-100)
        refund_rate = metrics["refund_requests"] / max(metrics["total_orders"], 1)
        refund = int((1 - min(refund_rate * 5, 1)) * 100)
        
        # 5. Stability
        stability = 85 # Placeholder for time-series variance models
        
        # Overall
        overall = int(
            delivery * 0.25 +
            auth_scaled * 0.30 + # AI Authenticity takes higher priority
            support * 0.15 +
            refund * 0.20 +
            stability * 0.10
        )
        
        return {
            "overall": overall,
            "delivery": delivery,
            "authenticity_scaled": auth_scaled,
            "support": support,
            "refund": refund,
            "stability": stability
        }
        
trust_engine = TrustEngine()
