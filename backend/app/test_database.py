"""
Tests for database initialization module.
"""

import sqlite3
from database import create_connection, enable_foreign_keys, initialize_database, verify_schema


def test_create_in_memory_connection():
    """Test creating an in-memory database connection."""
    conn = create_connection(in_memory=True)
    assert conn is not None
    assert isinstance(conn, sqlite3.Connection)
    
    # Verify foreign keys are enabled
    cursor = conn.cursor()
    cursor.execute("PRAGMA foreign_keys")
    result = cursor.fetchone()[0]
    assert result == 1, "Foreign keys should be enabled"
    
    cursor.close()
    conn.close()


def test_enable_foreign_keys():
    """Test enabling foreign key support on a connection."""
    conn = sqlite3.connect(":memory:")
    
    # Initially foreign keys might be disabled
    enable_foreign_keys(conn)
    
    # Verify they are now enabled
    cursor = conn.cursor()
    cursor.execute("PRAGMA foreign_keys")
    result = cursor.fetchone()[0]
    assert result == 1, "Foreign keys should be enabled after calling enable_foreign_keys"
    
    cursor.close()
    conn.close()


def test_initialize_database():
    """Test database schema initialization."""
    conn = create_connection(in_memory=True)
    initialize_database(conn)
    
    # Verify schema
    verification = verify_schema(conn)
    
    # Check all tables exist
    assert 'Seller' in verification['tables']
    assert 'Review' in verification['tables']
    assert 'Transaction' in verification['tables']
    assert len(verification['tables']) == 3
    
    # Check all indexes exist
    expected_indexes = [
        'idx_seller_email',
        'idx_review_seller_id',
        'idx_review_rating',
        'idx_transaction_seller_id',
        'idx_transaction_delivery_refund'
    ]
    for idx in expected_indexes:
        assert idx in verification['indexes'], f"Index {idx} should exist"
    
    # Check foreign keys are enabled
    assert verification['foreign_keys_enabled'] is True
    
    conn.close()


def test_initialize_database_idempotency():
    """Test that initialize_database can be called multiple times safely."""
    conn = create_connection(in_memory=True)
    
    # Initialize twice
    initialize_database(conn)
    initialize_database(conn)
    
    # Should still have correct schema
    verification = verify_schema(conn)
    assert len(verification['tables']) == 3
    assert len(verification['indexes']) >= 5
    
    conn.close()


def test_verify_schema():
    """Test schema verification function."""
    conn = create_connection(in_memory=True)
    initialize_database(conn)
    
    verification = verify_schema(conn)
    
    # Check structure
    assert 'tables' in verification
    assert 'indexes' in verification
    assert 'foreign_keys_enabled' in verification
    
    # Check types
    assert isinstance(verification['tables'], list)
    assert isinstance(verification['indexes'], list)
    assert isinstance(verification['foreign_keys_enabled'], bool)
    
    conn.close()


if __name__ == "__main__":
    # Run basic tests
    test_create_in_memory_connection()
    test_enable_foreign_keys()
    test_initialize_database()
    test_initialize_database_idempotency()
    test_verify_schema()
    print("All tests passed!")
