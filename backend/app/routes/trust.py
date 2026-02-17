from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

@router.get("/sellers")
def get_sellers():
    return {
        "sellers": [
            {"id": "1", "name": "Seller A", "trust_score": 85},
            {"id": "2", "name": "Seller B", "trust_score": 72}
        ]
    }

@router.get("/sellers/{seller_id}/trust-score")
def get_trust_score(seller_id: str):
    return {
        "seller_id": seller_id,
        "trust_score": 85,
        "breakdown": {
            "delivery_reliability": 90,
            "review_authenticity": 85,
            "customer_support": 80,
            "refund_fairness": 85
        }
    }
