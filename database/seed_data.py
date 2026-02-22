"""
Seed data generator for Trustora database
Generates realistic sellers, metrics, reviews, and trust scores
"""

import os
import random
from datetime import datetime, timedelta
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Sample data
SELLER_NAMES = [
    "TechGear Pro", "HomeEssentials Plus", "FashionHub Elite", "GadgetWorld",
    "BeautyBox Premium", "SportsZone Direct", "BookNook Sellers", "PetCare Central",
    "KitchenMasters", "AutoParts Express", "GardenGuru", "ToyTown Traders",
    "HealthVitality", "OfficeSupply Hub", "CraftCorner", "MusicMania Store",
    "FitnessFirst Gear", "BabyBliss Boutique", "ElectronicEdge", "OutdoorAdventure",
    "JewelryJunction", "ArtSupply Co", "GamingGalaxy", "WellnessWorld",
    "FurnitureFusion", "LightingLuxe", "ToolTime Traders", "PartyPerfect",
    "TravelGear Hub", "SmartHome Solutions"
]

REVIEW_TEMPLATES = {
    5: [
        "Excellent service! Product arrived on time and exactly as described.",
        "Outstanding quality and fast shipping. Highly recommend!",
        "Best seller I've dealt with. Will definitely buy again!",
        "Perfect transaction. Great communication and quick delivery.",
        "Amazing product quality. Exceeded my expectations!"
    ],
    4: [
        "Good product, slight delay in shipping but worth the wait.",
        "Happy with my purchase. Minor packaging issue but product is fine.",
        "Solid seller. Product is good, delivery was a bit slow.",
        "Nice quality, would have been 5 stars with faster shipping."
    ],
    3: [
        "Product is okay, not exactly as pictured but usable.",
        "Average experience. Product works but took longer to arrive.",
        "Decent quality, but customer service could be better."
    ],
    2: [
        "Product quality below expectations. Slow to respond to queries.",
        "Not happy with the purchase. Item had minor defects.",
        "Shipping took too long and product was not as described."
    ],
    1: [
        "Very disappointed. Product arrived damaged and seller unresponsive.",
        "Terrible experience. Wrong item sent and no refund offered.",
        "Avoid this seller. Poor quality and awful customer service."
    ]
}

def generate_sellers(count=30):
    """Generate seller records"""
    print(f"Generating {count} sellers...")
    sellers = []
    
    for i, name in enumerate(SELLER_NAMES[:count]):
        seller = {
            "name": name,
            "email": f"{name.lower().replace(' ', '')}@marketplace.com",
            "marketplace_id": f"MKT-{1000 + i}",
            "marketplace_name": random.choice(["Amazon", "eBay", "Etsy", "Walmart"]),
            "status": random.choices(
                ["active", "under_review", "suspended"],
                weights=[85, 10, 5]
            )[0]
        }
        sellers.append(seller)
    
    # Insert sellers
    result = supabase.table("sellers").insert(sellers).execute()
    print(f"✓ Created {len(result.data)} sellers")
    return result.data

def generate_metrics(sellers):
    """Generate seller metrics"""
    print(f"Generating metrics for {len(sellers)} sellers...")
    metrics = []
    
    for seller in sellers:
        # Generate metrics for last 3 months
        for months_ago in range(3):
            period_end = datetime.now() - timedelta(days=30 * months_ago)
            period_start = period_end - timedelta(days=30)
            
            total_orders = random.randint(50, 500)
            completed = int(total_orders * random.uniform(0.85, 0.98))
            cancelled = total_orders - completed - random.randint(0, 10)
            
            metric = {
                "seller_id": seller["id"],
                "total_orders": total_orders,
                "completed_orders": completed,
                "cancelled_orders": max(0, cancelled),
                "refund_requests": random.randint(0, int(total_orders * 0.1)),
                "avg_delivery_days": round(random.uniform(2.0, 7.0), 2),
                "total_reviews": random.randint(20, 150),
                "avg_rating": round(random.uniform(3.0, 5.0), 2),
                "response_time_hours": round(random.uniform(1.0, 48.0), 2),
                "period_start": period_start.date().isoformat(),
                "period_end": period_end.date().isoformat()
            }
            metrics.append(metric)
    
    # Insert in batches
    batch_size = 50
    for i in range(0, len(metrics), batch_size):
        batch = metrics[i:i + batch_size]
        supabase.table("seller_metrics").insert(batch).execute()
    
    print(f"✓ Created {len(metrics)} metric records")
    return metrics

def generate_reviews(sellers):
    """Generate reviews for sellers"""
    print(f"Generating reviews for {len(sellers)} sellers...")
    reviews = []
    
    for seller in sellers:
        # Generate 10-50 reviews per seller
        num_reviews = random.randint(10, 50)
        
        for _ in range(num_reviews):
            rating = random.choices([1, 2, 3, 4, 5], weights=[5, 10, 15, 30, 40])[0]
            review_text = random.choice(REVIEW_TEMPLATES[rating])
            
            # Sentiment score correlates with rating
            sentiment_base = (rating - 3) / 2  # Maps 1-5 to -1 to 1
            sentiment_score = round(sentiment_base + random.uniform(-0.2, 0.2), 2)
            sentiment_score = max(-1.0, min(1.0, sentiment_score))
            
            # Authenticity flag (95% authentic)
            authenticity = random.random() > 0.05
            
            # Random date in last 6 months
            days_ago = random.randint(0, 180)
            created_at = datetime.now() - timedelta(days=days_ago)
            
            review = {
                "seller_id": seller["id"],
                "rating": rating,
                "review_text": review_text,
                "sentiment_score": sentiment_score,
                "authenticity_flag": authenticity,
                "created_at": created_at.isoformat()
            }
            reviews.append(review)
    
    # Insert in batches
    batch_size = 100
    for i in range(0, len(reviews), batch_size):
        batch = reviews[i:i + batch_size]
        supabase.table("reviews").insert(batch).execute()
    
    print(f"✓ Created {len(reviews)} reviews")
    return reviews

def calculate_trust_score(seller_id, metrics_list):
    """Calculate trust score based on metrics"""
    # Get latest metrics for this seller
    seller_metrics = [m for m in metrics_list if m["seller_id"] == seller_id]
    if not seller_metrics:
        return None
    
    latest = seller_metrics[0]  # Assuming first is latest
    
    # Calculate component scores
    # Delivery Reliability (based on completion rate and delivery time)
    completion_rate = latest["completed_orders"] / max(latest["total_orders"], 1)
    delivery_score = int((completion_rate * 0.7 + (1 - min(latest["avg_delivery_days"] / 10, 1)) * 0.3) * 100)
    
    # Review Authenticity (based on average rating)
    review_score = int((latest["avg_rating"] / 5.0) * 100)
    
    # Customer Support (based on response time)
    support_score = int((1 - min(latest["response_time_hours"] / 48, 1)) * 100)
    
    # Refund Fairness (based on refund rate)
    refund_rate = latest["refund_requests"] / max(latest["total_orders"], 1)
    refund_score = int((1 - min(refund_rate * 5, 1)) * 100)
    
    # Behavioral Stability (random for now, would be variance-based in real system)
    stability_score = random.randint(70, 95)
    
    # Overall score (weighted average)
    overall = int(
        delivery_score * 0.25 +
        review_score * 0.25 +
        support_score * 0.20 +
        refund_score * 0.20 +
        stability_score * 0.10
    )
    
    return {
        "seller_id": seller_id,
        "overall_score": overall,
        "delivery_reliability": delivery_score,
        "review_authenticity": review_score,
        "customer_support": support_score,
        "refund_fairness": refund_score,
        "behavioral_stability": stability_score,
        "version": 1
    }

def generate_trust_scores(sellers, metrics):
    """Generate trust scores for all sellers"""
    print(f"Calculating trust scores for {len(sellers)} sellers...")
    trust_scores = []
    
    for seller in sellers:
        score = calculate_trust_score(seller["id"], metrics)
        if score:
            trust_scores.append(score)
    
    # Insert trust scores
    result = supabase.table("trust_scores").insert(trust_scores).execute()
    print(f"✓ Created {len(result.data)} trust score records")
    return result.data

def create_admin_profiles():
    """Create admin test accounts"""
    print("Creating admin profiles...")
    
    # Note: These Firebase UIDs should be replaced with actual Firebase user UIDs
    # For now, using placeholder IDs
    admins = [
        {
            "id": "admin-test-001",
            "email": "admin@trustora.com",
            "role": "admin"
        },
        {
            "id": "admin-test-002",
            "email": "moderator@trustora.com",
            "role": "admin"
        }
    ]
    
    try:
        result = supabase.table("profiles").insert(admins).execute()
        print(f"✓ Created {len(result.data)} admin profiles")
        print("⚠️  Note: Replace placeholder IDs with actual Firebase UIDs after user creation")
    except Exception as e:
        print(f"⚠️  Admin profiles may already exist or error occurred: {e}")

def main():
    """Main seed data generation function"""
    print("=" * 60)
    print("TRUSTORA DATABASE SEED DATA GENERATOR")
    print("=" * 60)
    print()
    
    try:
        # 1. Create admin profiles
        create_admin_profiles()
        print()
        
        # 2. Generate sellers
        sellers = generate_sellers(30)
        print()
        
        # 3. Generate metrics
        metrics = generate_metrics(sellers)
        print()
        
        # 4. Generate reviews
        reviews = generate_reviews(sellers)
        print()
        
        # 5. Generate trust scores
        trust_scores = generate_trust_scores(sellers, metrics)
        print()
        
        print("=" * 60)
        print("✓ SEED DATA GENERATION COMPLETE!")
        print("=" * 60)
        print(f"Sellers: {len(sellers)}")
        print(f"Metrics: {len(metrics)}")
        print(f"Reviews: {len(reviews)}")
        print(f"Trust Scores: {len(trust_scores)}")
        print()
        
    except Exception as e:
        print(f"❌ Error during seed data generation: {e}")
        raise

if __name__ == "__main__":
    main()
