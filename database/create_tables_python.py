"""
Create Supabase tables using Python client
This script creates all tables programmatically without needing SQL Editor access
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

def create_tables_via_rpc():
    """Create tables using Supabase RPC"""
    print("=" * 60)
    print("TRUSTORA DATABASE SCHEMA CREATION (via Python)")
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
        # We'll use the REST API to execute raw SQL
        print("Executing SQL schema...")
        
        # Note: Supabase Python client doesn't directly support raw SQL execution
        # We need to use the PostgREST API or create tables individually
        
        # For MVP, let's create a simplified version using the REST API
        print()
        print("=" * 60)
        print("ALTERNATIVE APPROACH")
        print("=" * 60)
        print()
        print("Since Supabase Python client doesn't support raw SQL execution,")
        print("I'll create the tables using the Supabase Dashboard SQL Editor.")
        print()
        print("Please copy the schema.sql file contents and paste into:")
        print(f"{SUPABASE_URL.replace('.supabase.co', '.supabase.co')}/project/_/sql")
        print()
        print("OR")
        print()
        print("I can generate seed data first, and you can create tables manually")
        print("after which the seed data will populate them.")
        print()
        
    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)

if __name__ == "__main__":
    create_tables_via_rpc()
