"""
Verify Supabase data
Query and display sample data from all tables
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def verify_data():
    """Verify data in all tables"""
    print("=" * 80)
    print("TRUSTORA DATABASE VERIFICATION")
    print("=" * 80)
    print()
    
    # 1. Check Sellers
    print("📊 SELLERS TABLE")
    print("-" * 80)
    sellers = supabase.table("sellers").select("*").limit(5).execute()
    print(f"Total sellers: {len(supabase.table('sellers').select('id').execute().data)}")
    print("\nSample sellers:")
    for seller in sellers.data[:3]:
        print(f"  • {seller['name']} ({seller['marketplace_name']}) - Status: {seller['status']}")
    print()
    
    # 2. Check Trust Scores
    print("🎯 TRUST SCORES TABLE")
    print("-" * 80)
    scores = supabase.table("trust_scores").select("*, sellers(name)").order("overall_score", desc=True).limit(5).execute()
    print(f"Total trust scores: {len(supabase.table('trust_scores').select('id').execute().data)}")
    print("\nTop 5 sellers by trust score:")
    for i, score in enumerate(scores.data, 1):
        seller_name = score['sellers']['name'] if score.get('sellers') else 'Unknown'
        print(f"  {i}. {seller_name}")
        print(f"     Overall: {score['overall_score']} | Delivery: {score['delivery_reliability']} | "
              f"Reviews: {score['review_authenticity']} | Support: {score['customer_support']}")
    print()
    
    # 3. Check Seller Metrics
    print("📈 SELLER METRICS TABLE")
    print("-" * 80)
    metrics = supabase.table("seller_metrics").select("*").limit(3).execute()
    print(f"Total metric records: {len(supabase.table('seller_metrics').select('id').execute().data)}")
    if metrics.data:
        sample = metrics.data[0]
        print(f"\nSample metric record:")
        print(f"  Orders: {sample['total_orders']} (Completed: {sample['completed_orders']})")
        print(f"  Avg Delivery: {sample['avg_delivery_days']} days")
        print(f"  Avg Rating: {sample['avg_rating']}/5.0")
        print(f"  Response Time: {sample['response_time_hours']} hours")
    print()
    
    # 4. Check Reviews
    print("⭐ REVIEWS TABLE")
    print("-" * 80)
    reviews = supabase.table("reviews").select("*, sellers(name)").limit(5).execute()
    print(f"Total reviews: {len(supabase.table('reviews').select('id').execute().data)}")
    print("\nSample reviews:")
    for review in reviews.data[:3]:
        seller_name = review['sellers']['name'] if review.get('sellers') else 'Unknown'
        stars = "⭐" * review['rating']
        print(f"  {stars} ({review['rating']}/5) - {seller_name}")
        print(f"     \"{review['review_text'][:60]}...\"")
        print(f"     Sentiment: {review['sentiment_score']:.2f} | Authentic: {review['authenticity_flag']}")
    print()
    
    # 5. Check Profiles
    print("👤 PROFILES TABLE")
    print("-" * 80)
    profiles = supabase.table("profiles").select("*").execute()
    print(f"Total profiles: {len(profiles.data)}")
    for profile in profiles.data:
        print(f"  • {profile['email']} - Role: {profile['role']}")
    print()
    
    # 6. Check Alerts
    print("🔔 ALERTS TABLE")
    print("-" * 80)
    alerts = supabase.table("alerts").select("*").execute()
    print(f"Total alerts: {len(alerts.data)}")
    print()
    
    # 7. Check Watchlist
    print("⭐ USER WATCHLIST TABLE")
    print("-" * 80)
    watchlist = supabase.table("user_watchlist").select("*").execute()
    print(f"Total watchlist entries: {len(watchlist.data)}")
    print()
    
    # Summary
    print("=" * 80)
    print("✅ DATABASE VERIFICATION COMPLETE")
    print("=" * 80)
    print("\nSummary:")
    print(f"  ✓ Sellers: {len(supabase.table('sellers').select('id').execute().data)}")
    print(f"  ✓ Trust Scores: {len(supabase.table('trust_scores').select('id').execute().data)}")
    print(f"  ✓ Metrics: {len(supabase.table('seller_metrics').select('id').execute().data)}")
    print(f"  ✓ Reviews: {len(supabase.table('reviews').select('id').execute().data)}")
    print(f"  ✓ Profiles: {len(profiles.data)}")
    print(f"  ✓ Alerts: {len(alerts.data)}")
    print(f"  ✓ Watchlist: {len(watchlist.data)}")
    print()
    
    # Trust Score Distribution
    print("📊 TRUST SCORE DISTRIBUTION")
    print("-" * 80)
    all_scores = supabase.table("trust_scores").select("overall_score").execute()
    scores_list = [s['overall_score'] for s in all_scores.data]
    
    high = len([s for s in scores_list if s >= 80])
    medium = len([s for s in scores_list if 60 <= s < 80])
    low = len([s for s in scores_list if s < 60])
    
    print(f"  High Trust (80-100): {high} sellers")
    print(f"  Medium Trust (60-79): {medium} sellers")
    print(f"  Low Trust (0-59): {low} sellers")
    print()
    
    if scores_list:
        avg_score = sum(scores_list) / len(scores_list)
        print(f"  Average Trust Score: {avg_score:.1f}/100")
    print()

if __name__ == "__main__":
    try:
        verify_data()
    except Exception as e:
        print(f"❌ Error during verification: {e}")
        import traceback
        traceback.print_exc()
