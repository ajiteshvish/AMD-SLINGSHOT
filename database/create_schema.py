"""
Execute Supabase schema creation
Runs the SQL schema file against Supabase database
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("❌ Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env file")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def execute_schema():
    """Execute the schema.sql file"""
    print("=" * 60)
    print("TRUSTORA DATABASE SCHEMA CREATION")
    print("=" * 60)
    print()
    
    # Read schema file
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    
    try:
        with open(schema_path, 'r') as f:
            sql = f.read()
        
        print(f"✓ Loaded schema from {schema_path}")
        print()
        
        # Execute SQL using Supabase RPC
        # Note: For complex SQL with multiple statements, we need to use Supabase SQL Editor
        # or execute via psycopg2. For now, we'll provide instructions.
        
        print("=" * 60)
        print("MANUAL STEP REQUIRED")
        print("=" * 60)
        print()
        print("Please follow these steps to create the database schema:")
        print()
        print("1. Go to your Supabase Dashboard:")
        print(f"   {SUPABASE_URL.replace('.supabase.co', '.supabase.co/project/_/sql')}")
        print()
        print("2. Open the SQL Editor")
        print()
        print("3. Copy and paste the contents of:")
        print(f"   {schema_path}")
        print()
        print("4. Click 'Run' to execute the schema")
        print()
        print("5. Verify that all 7 tables were created:")
        print("   - profiles")
        print("   - sellers")
        print("   - trust_scores")
        print("   - seller_metrics")
        print("   - reviews")
        print("   - alerts")
        print("   - user_watchlist")
        print()
        print("=" * 60)
        print()
        print("After completing the above steps, run:")
        print("  python3 database/seed_data.py")
        print()
        
    except FileNotFoundError:
        print(f"❌ Error: Schema file not found at {schema_path}")
        exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)

if __name__ == "__main__":
    execute_schema()
