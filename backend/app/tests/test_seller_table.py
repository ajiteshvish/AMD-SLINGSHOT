"""
Unit tests for Seller table structure.

Tests verify:
- Table existence
- Column definitions and data types
- Primary key configuration
- Unique constraints
- CHECK constraints
- Index definitions

Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.1
"""

import sqlite3
import pytest
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from database import create_connection, initialize_database


@pytest.fixture
def db_conn():
    """Create an in-memory database connection for testing."""
    conn = create_connection(in_memory=True)
    initialize_database(conn)
    yield conn
    conn.close()


def test_seller_table_exists(db_conn):
    """Test that Seller table exists in the database."""
    cursor = db_conn.cursor()
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='Seller'
    """)
    result = cursor.fetchone()
    cursor.close()
    
    assert result is not None, "Seller table should exist"
    assert result[0] == 'Seller'


def test_seller_columns_exist(db_conn):
    """Test that all required columns exist in Seller table with correct data types."""
    cursor = db_conn.cursor()
    cursor.execute("PRAGMA table_info(Seller)")
    columns = cursor.fetchall()
    cursor.close()
    
    # Convert to dict for easier testing
    column_dict = {col[1]: {'type': col[2], 'notnull': col[3], 'dflt_value': col[4], 'pk': col[5]} 
                   for col in columns}
    
    # Test id column
    assert 'id' in column_dict, "id column should exist"
    assert column_dict['id']['type'] == 'INTEGER', "id should be INTEGER type"
    assert column_dict['id']['pk'] == 1, "id should be primary key"
    
    # Test name column
    assert 'name' in column_dict, "name column should exist"
    assert column_dict['name']['type'] == 'TEXT', "name should be TEXT type"
    assert column_dict['name']['notnull'] == 1, "name should be NOT NULL"
    
    # Test email column
    assert 'email' in column_dict, "email column should exist"
    assert column_dict['email']['type'] == 'TEXT', "email should be TEXT type"
    assert column_dict['email']['notnull'] == 1, "email should be NOT NULL"
    
    # Test trust_score column
    assert 'trust_score' in column_dict, "trust_score column should exist"
    assert column_dict['trust_score']['type'] == 'REAL', "trust_score should be REAL type"
    
    # Test created_at column
    assert 'created_at' in column_dict, "created_at column should exist"
    assert column_dict['created_at']['type'] == 'TEXT', "created_at should be TEXT type"
    assert column_dict['created_at']['notnull'] == 1, "created_at should be NOT NULL"
    
    # Test updated_at column
    assert 'updated_at' in column_dict, "updated_at column should exist"
    assert column_dict['updated_at']['type'] == 'TEXT', "updated_at should be TEXT type"
    assert column_dict['updated_at']['notnull'] == 1, "updated_at should be NOT NULL"


def test_seller_primary_key_autoincrement(db_conn):
    """Test that primary key is defined with AUTOINCREMENT."""
    cursor = db_conn.cursor()
    
    # Get table creation SQL
    cursor.execute("""
        SELECT sql FROM sqlite_master 
        WHERE type='table' AND name='Seller'
    """)
    create_sql = cursor.fetchone()[0]
    cursor.close()
    
    # Verify AUTOINCREMENT is in the CREATE statement
    assert 'AUTOINCREMENT' in create_sql.upper(), "Primary key should use AUTOINCREMENT"
    assert 'PRIMARY KEY' in create_sql.upper(), "PRIMARY KEY constraint should be defined"


def test_seller_email_unique_constraint(db_conn):
    """Test that UNIQUE constraint exists on email field."""
    cursor = db_conn.cursor()
    
    # Get table creation SQL
    cursor.execute("""
        SELECT sql FROM sqlite_master 
        WHERE type='table' AND name='Seller'
    """)
    create_sql = cursor.fetchone()[0]
    cursor.close()
    
    # Verify UNIQUE constraint on email
    assert 'email' in create_sql.lower(), "email field should be in CREATE statement"
    assert 'UNIQUE' in create_sql.upper(), "UNIQUE constraint should exist"
    
    # Verify constraint works by attempting to insert duplicate emails
    cursor = db_conn.cursor()
    cursor.execute("""
        INSERT INTO Seller (name, email) VALUES ('Test Seller 1', 'test@example.com')
    """)
    
    # Attempt to insert duplicate email should fail
    with pytest.raises(sqlite3.IntegrityError, match="UNIQUE constraint failed"):
        cursor.execute("""
            INSERT INTO Seller (name, email) VALUES ('Test Seller 2', 'test@example.com')
        """)
    
    cursor.close()


def test_seller_trust_score_check_constraint(db_conn):
    """Test that CHECK constraint exists on trust_score field (0-100 range)."""
    cursor = db_conn.cursor()
    
    # Get table creation SQL
    cursor.execute("""
        SELECT sql FROM sqlite_master 
        WHERE type='table' AND name='Seller'
    """)
    create_sql = cursor.fetchone()[0]
    cursor.close()
    
    # Verify CHECK constraint exists
    assert 'CHECK' in create_sql.upper(), "CHECK constraint should exist"
    assert 'trust_score' in create_sql.lower(), "trust_score should be in CHECK constraint"
    
    # Test valid trust_score values
    cursor = db_conn.cursor()
    cursor.execute("""
        INSERT INTO Seller (name, email, trust_score) 
        VALUES ('Valid Seller 1', 'valid1@example.com', 0.0)
    """)
    cursor.execute("""
        INSERT INTO Seller (name, email, trust_score) 
        VALUES ('Valid Seller 2', 'valid2@example.com', 50.0)
    """)
    cursor.execute("""
        INSERT INTO Seller (name, email, trust_score) 
        VALUES ('Valid Seller 3', 'valid3@example.com', 100.0)
    """)
    
    # Test invalid trust_score values (below 0)
    with pytest.raises(sqlite3.IntegrityError, match="CHECK constraint failed"):
        cursor.execute("""
            INSERT INTO Seller (name, email, trust_score) 
            VALUES ('Invalid Seller 1', 'invalid1@example.com', -1.0)
        """)
    
    # Test invalid trust_score values (above 100)
    with pytest.raises(sqlite3.IntegrityError, match="CHECK constraint failed"):
        cursor.execute("""
            INSERT INTO Seller (name, email, trust_score) 
            VALUES ('Invalid Seller 2', 'invalid2@example.com', 101.0)
        """)
    
    cursor.close()


def test_seller_email_index_exists(db_conn):
    """Test that index on email field exists."""
    cursor = db_conn.cursor()
    
    # Check for idx_seller_email index
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='index' AND name='idx_seller_email'
    """)
    result = cursor.fetchone()
    
    assert result is not None, "idx_seller_email index should exist"
    assert result[0] == 'idx_seller_email'
    
    # Verify index is on Seller table
    cursor.execute("""
        SELECT tbl_name FROM sqlite_master 
        WHERE type='index' AND name='idx_seller_email'
    """)
    table_name = cursor.fetchone()[0]
    assert table_name == 'Seller', "Index should be on Seller table"
    
    cursor.close()


def test_seller_default_values(db_conn):
    """Test that default values are properly set for trust_score and timestamps."""
    cursor = db_conn.cursor()
    
    # Insert seller without specifying trust_score or timestamps
    cursor.execute("""
        INSERT INTO Seller (name, email) 
        VALUES ('Default Test', 'default@example.com')
    """)
    
    # Retrieve the inserted record
    cursor.execute("""
        SELECT trust_score, created_at, updated_at 
        FROM Seller WHERE email='default@example.com'
    """)
    result = cursor.fetchone()
    
    # Verify default trust_score is 0.0
    assert result[0] == 0.0, "Default trust_score should be 0.0"
    
    # Verify timestamps are populated
    assert result[1] is not None, "created_at should have default value"
    assert result[2] is not None, "updated_at should have default value"
    
    # Verify timestamp format (ISO 8601)
    assert len(result[1]) > 0, "created_at should not be empty"
    assert len(result[2]) > 0, "updated_at should not be empty"
    
    cursor.close()


def test_seller_not_null_constraints(db_conn):
    """Test that NOT NULL constraints are enforced on required fields."""
    cursor = db_conn.cursor()
    
    # Test missing name
    with pytest.raises(sqlite3.IntegrityError, match="NOT NULL constraint failed"):
        cursor.execute("""
            INSERT INTO Seller (email) VALUES ('test1@example.com')
        """)
    
    # Test missing email
    with pytest.raises(sqlite3.IntegrityError, match="NOT NULL constraint failed"):
        cursor.execute("""
            INSERT INTO Seller (name) VALUES ('Test Seller')
        """)
    
    cursor.close()


# Property-Based Tests
# Feature: database-schema, Property 1: Email Uniqueness Enforcement

from hypothesis import given, strategies as st


def seller_strategy():
    """Strategy for generating seller data."""
    return st.fixed_dictionaries({
        'name': st.text(min_size=1, max_size=100).filter(lambda x: x.strip()),
        'email': st.emails(),
        'trust_score': st.floats(min_value=0.0, max_value=100.0, allow_nan=False, allow_infinity=False)
    })


@given(seller1=seller_strategy(), seller2=seller_strategy())
def test_property_email_uniqueness_enforcement(seller1, seller2):
    """
    Property 1: Email Uniqueness Enforcement
    
    For any two seller records, if they have the same email address, 
    the database SHALL reject the insertion of the second record with 
    a constraint violation.
    
    **Validates: Requirements 1.4**
    """
    # Create fresh in-memory database for each test iteration
    conn = create_connection(in_memory=True)
    initialize_database(conn)
    cursor = conn.cursor()
    
    try:
        # Force both sellers to have the same email
        seller2['email'] = seller1['email']
        
        # Insert first seller (should succeed)
        cursor.execute("""
            INSERT INTO Seller (name, email, trust_score) 
            VALUES (?, ?, ?)
        """, (seller1['name'], seller1['email'], seller1['trust_score']))
        conn.commit()
        
        # Insert second seller with duplicate email (should fail)
        with pytest.raises(sqlite3.IntegrityError, match="UNIQUE constraint failed"):
            cursor.execute("""
                INSERT INTO Seller (name, email, trust_score) 
                VALUES (?, ?, ?)
            """, (seller2['name'], seller2['email'], seller2['trust_score']))
            conn.commit()
    
    finally:
        cursor.close()
        conn.close()
