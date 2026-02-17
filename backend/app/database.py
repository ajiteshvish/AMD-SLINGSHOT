"""
Database initialization and connection management module for Trustora MVP.

This module provides functions for:
- Creating database connections with proper configuration
- Enabling foreign key support on connections
- Creating database files or using in-memory databases for testing
"""

import sqlite3
from typing import Optional
from pathlib import Path


def enable_foreign_keys(conn: sqlite3.Connection) -> None:
    """
    Enable foreign key support on a SQLite database connection.
    
    This MUST be called on every database connection to ensure
    referential integrity constraints are enforced.
    
    Args:
        conn: SQLite database connection
        
    Raises:
        sqlite3.Error: If foreign key pragma cannot be set
    """
    cursor = conn.cursor()
    cursor.execute("PRAGMA foreign_keys = ON;")
    cursor.close()


def create_connection(db_path: Optional[str] = None, in_memory: bool = False) -> sqlite3.Connection:
    """
    Create a SQLite database connection with foreign key support enabled.
    
    Args:
        db_path: Path to the database file. If None and in_memory is False,
                uses default path './trustora_dev.db'
        in_memory: If True, creates an in-memory database for testing.
                  Overrides db_path parameter.
    
    Returns:
        SQLite connection object with foreign keys enabled
        
    Raises:
        sqlite3.Error: If connection cannot be established
        
    Examples:
        # Create file-based database
        conn = create_connection('trustora.db')
        
        # Create in-memory database for testing
        conn = create_connection(in_memory=True)
        
        # Use default database path
        conn = create_connection()
    """
    if in_memory:
        connection_string = ":memory:"
    elif db_path is None:
        connection_string = "./trustora_dev.db"
    else:
        connection_string = db_path
    
    # Create connection
    conn = sqlite3.connect(connection_string)
    
    # Enable foreign key support
    enable_foreign_keys(conn)
    
    # Enable row factory for dict-like access
    conn.row_factory = sqlite3.Row
    
    return conn


def initialize_database(conn: sqlite3.Connection) -> None:
    """
    Initialize the database schema by creating all tables and indexes.
    
    This function is idempotent - it can be safely called multiple times
    as it uses IF NOT EXISTS clauses.
    
    Args:
        conn: SQLite database connection
        
    Raises:
        sqlite3.Error: If schema creation fails
    """
    cursor = conn.cursor()
    
    # Create Seller table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Seller (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            trust_score REAL DEFAULT 0.0 CHECK(trust_score >= 0 AND trust_score <= 100),
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
    """)
    
    # Create Review table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Review (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            seller_id INTEGER NOT NULL,
            reviewer_name TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
            comment TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (seller_id) REFERENCES Seller(id) ON DELETE CASCADE
        )
    """)
    
    # Create Transaction table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS "Transaction" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            seller_id INTEGER NOT NULL,
            amount REAL NOT NULL CHECK(amount >= 0),
            transaction_date TEXT NOT NULL DEFAULT (datetime('now')),
            delivery_status TEXT NOT NULL DEFAULT 'pending' CHECK(delivery_status IN ('pending', 'delivered', 'failed')),
            refund_status INTEGER NOT NULL DEFAULT 0 CHECK(refund_status IN (0, 1)),
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (seller_id) REFERENCES Seller(id) ON DELETE CASCADE
        )
    """)
    
    # Create indexes for performance optimization
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_seller_email ON Seller(email)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_review_seller_id ON Review(seller_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_review_rating ON Review(rating)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_transaction_seller_id ON \"Transaction\"(seller_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_transaction_delivery_refund ON \"Transaction\"(delivery_status, refund_status)")
    
    conn.commit()
    cursor.close()


def verify_schema(conn: sqlite3.Connection) -> dict:
    """
    Verify that all required tables and indexes exist in the database.
    
    Args:
        conn: SQLite database connection
        
    Returns:
        Dictionary with verification results:
        {
            'tables': list of existing tables,
            'indexes': list of existing indexes,
            'foreign_keys_enabled': bool
        }
    """
    cursor = conn.cursor()
    
    # Check tables
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name IN ('Seller', 'Review', 'Transaction')
        ORDER BY name
    """)
    tables = [row[0] for row in cursor.fetchall()]
    
    # Check indexes
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='index' AND name LIKE 'idx_%'
        ORDER BY name
    """)
    indexes = [row[0] for row in cursor.fetchall()]
    
    # Check foreign key support
    cursor.execute("PRAGMA foreign_keys")
    fk_enabled = cursor.fetchone()[0] == 1
    
    cursor.close()
    
    return {
        'tables': tables,
        'indexes': indexes,
        'foreign_keys_enabled': fk_enabled
    }
