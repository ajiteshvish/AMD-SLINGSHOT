# Implementation Plan: Database Schema for Trustora MVP

## Overview

This implementation plan creates the SQLite database schema for Trustora MVP with three core tables (Seller, Review, Transaction), complete with constraints, indexes, and comprehensive validation. The implementation uses Python with SQLite3 and includes both unit tests and property-based tests using Hypothesis to verify all correctness properties.

## Tasks

- [ ] 1. Create database initialization module
  - Create Python module `backend/app/database.py` for database initialization and connection management
  - Implement `get_db_connection()` function that enables foreign key support via `PRAGMA foreign_keys = ON`
  - Implement `init_db()` function to initialize database file or use in-memory database for testing
  - Add configuration for database file path (development vs testing)
  - _Requirements: 4.5, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 2. Implement Seller table schema
  - [ ] 2.1 Write CREATE TABLE statement for Seller
    - Include all fields: id, name, email, trust_score, created_at, updated_at
    - Add PRIMARY KEY constraint with AUTOINCREMENT on id
    - Add UNIQUE constraint on email field
    - Add CHECK constraint on trust_score (range 0-100)
    - Add NOT NULL constraints on name, email, created_at, updated_at
    - Add DEFAULT value 0.0 for trust_score
    - Add DEFAULT value `datetime('now')` for created_at and updated_at
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.1, 6.2, 6.3, 6.5, 7.1, 7.2, 7.4, 7.6_
  
  - [ ] 2.2 Create index on Seller email field
    - Write CREATE INDEX statement for `idx_seller_email` on Seller(email)
    - Use IF NOT EXISTS clause for idempotency
    - _Requirements: 5.1_
  
  - [ ]* 2.3 Write unit tests for Seller table structure
    - Test table exists in database
    - Test all columns exist with correct SQLite data types
    - Test primary key constraint is defined
    - Test unique constraint on email exists
    - Test CHECK constraint on trust_score exists
    - Test index `idx_seller_email` exists
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.1_
  
  - [ ]* 2.4 Write property test for email uniqueness enforcement
    - **Property 1: Email Uniqueness Enforcement**
    - **Validates: Requirements 1.4**
    - Generate random seller records with duplicate emails
    - Verify database rejects second insertion with UNIQUE constraint violation
    - Run minimum 100 iterations
  
  - [ ]* 2.5 Write property test for trust score range validation
    - **Property 6: Trust Score Range Validation**
    - **Validates: Requirements 7.4**
    - Generate random trust_score values outside valid range (< 0 or > 100)
    - Verify database rejects insertion with CHECK constraint violation
    - Run minimum 100 iterations

- [ ] 3. Implement Review table schema
  - [ ] 3.1 Write CREATE TABLE statement for Review
    - Include all fields: id, seller_id, reviewer_name, rating, comment, created_at
    - Add PRIMARY KEY constraint with AUTOINCREMENT on id
    - Add FOREIGN KEY constraint on seller_id referencing Seller(id) with ON DELETE CASCADE
    - Add CHECK constraint on rating (range 1-5)
    - Add NOT NULL constraints on seller_id, reviewer_name, rating, created_at
    - Add DEFAULT value `datetime('now')` for created_at
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 4.2, 4.4, 6.1, 6.2, 6.5, 6.6, 7.1, 7.3, 7.6_
  
  - [ ] 3.2 Create indexes on Review table
    - Write CREATE INDEX statement for `idx_review_seller_id` on Review(seller_id)
    - Write CREATE INDEX statement for `idx_review_rating` on Review(rating)
    - Use IF NOT EXISTS clauses for idempotency
    - _Requirements: 5.2, 5.5_
  
  - [ ]* 3.3 Write unit tests for Review table structure
    - Test table exists in database
    - Test all columns exist with correct SQLite data types
    - Test primary key constraint is defined
    - Test foreign key to Seller(id) exists with CASCADE behavior
    - Test CHECK constraint on rating exists
    - Test indexes `idx_review_seller_id` and `idx_review_rating` exist
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 4.2, 5.2, 5.5_
  
  - [ ]* 3.4 Write property test for rating value validation
    - **Property 3: Rating Value Validation**
    - **Validates: Requirements 2.6**
    - Generate random rating values outside valid range (< 1 or > 5)
    - Verify database rejects insertion with CHECK constraint violation
    - Run minimum 100 iterations

- [ ] 4. Implement Transaction table schema
  - [ ] 4.1 Write CREATE TABLE statement for Transaction
    - Include all fields: id, seller_id, amount, transaction_date, delivery_status, refund_status, created_at, updated_at
    - Add PRIMARY KEY constraint with AUTOINCREMENT on id
    - Add FOREIGN KEY constraint on seller_id referencing Seller(id) with ON DELETE CASCADE
    - Add CHECK constraint on amount (>= 0)
    - Add CHECK constraint on delivery_status (IN 'pending', 'delivered', 'failed')
    - Add CHECK constraint on refund_status (IN 0, 1)
    - Add NOT NULL constraints on seller_id, amount, transaction_date, delivery_status, refund_status, created_at, updated_at
    - Add DEFAULT value `datetime('now')` for transaction_date, created_at, updated_at
    - Add DEFAULT value 'pending' for delivery_status
    - Add DEFAULT value 0 for refund_status
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.3, 4.4, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.5, 7.6_
  
  - [ ] 4.2 Create indexes on Transaction table
    - Write CREATE INDEX statement for `idx_transaction_seller_id` on Transaction(seller_id)
    - Write CREATE INDEX statement for `idx_transaction_delivery_refund` on Transaction(delivery_status, refund_status)
    - Use IF NOT EXISTS clauses for idempotency
    - _Requirements: 5.3, 5.4_
  
  - [ ]* 4.3 Write unit tests for Transaction table structure
    - Test table exists in database
    - Test all columns exist with correct SQLite data types
    - Test primary key constraint is defined
    - Test foreign key to Seller(id) exists with CASCADE behavior
    - Test CHECK constraints exist (amount, delivery_status, refund_status)
    - Test indexes `idx_transaction_seller_id` and `idx_transaction_delivery_refund` exist
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.3, 5.3, 5.4_
  
  - [ ]* 4.4 Write property test for non-negative amount validation
    - **Property 7: Non-Negative Amount Validation**
    - **Validates: Requirements 7.5**
    - Generate random negative amount values
    - Verify database rejects insertion with CHECK constraint violation
    - Run minimum 100 iterations

- [ ] 5. Checkpoint - Ensure schema creation is complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement referential integrity and constraint tests
  - [ ]* 6.1 Write property test for referential integrity enforcement
    - **Property 2: Referential Integrity Enforcement**
    - **Validates: Requirements 2.4, 3.4**
    - Generate random review and transaction records with non-existent seller_id values
    - Verify database rejects insertion with FOREIGN KEY constraint violation
    - Test both Review and Transaction tables
    - Run minimum 100 iterations
  
  - [ ]* 6.2 Write property test for cascade deletion behavior
    - **Property 4: Cascade Deletion Behavior**
    - **Validates: Requirements 4.1**
    - Generate random seller with associated reviews and transactions
    - Delete the seller record
    - Verify all associated reviews and transactions are automatically deleted
    - Run minimum 100 iterations
  
  - [ ]* 6.3 Write property test for NOT NULL constraint enforcement
    - **Property 5: Required Field Validation**
    - **Validates: Requirements 7.1**
    - Generate records with NULL values in required fields
    - Verify database rejects insertion with NOT NULL constraint violation
    - Test across all three tables
    - Run minimum 100 iterations
  
  - [ ]* 6.4 Write property test for automatic timestamp population
    - **Property 8: Automatic Timestamp Population**
    - **Validates: Requirements 7.6**
    - Insert records without explicitly providing timestamp values
    - Verify timestamps are automatically populated with current time in ISO 8601 format
    - Test across all tables with timestamp fields
    - Run minimum 100 iterations

- [ ] 7. Create complete schema initialization script
  - [ ] 7.1 Implement `create_schema()` function
    - Add `PRAGMA foreign_keys = ON` at the beginning
    - Include all CREATE TABLE statements in correct order (Seller, Review, Transaction)
    - Include all CREATE INDEX statements
    - Use IF NOT EXISTS clauses for idempotency
    - Return success/failure status
    - _Requirements: 1.1, 2.1, 3.1, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ] 7.2 Implement schema verification functions
    - Create `verify_tables_exist()` to check all three tables exist
    - Create `verify_indexes_exist()` to check all five indexes exist
    - Create `verify_foreign_keys_enabled()` to check PRAGMA foreign_keys returns 1
    - Create `get_table_info()` to retrieve schema information for debugging
    - _Requirements: 1.1, 2.1, 3.1, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ]* 7.3 Write integration test for complete schema initialization
    - Test full schema initialization from scratch on empty database
    - Test schema verification functions return correct results
    - Test idempotency (running initialization twice produces same result)
    - Test in-memory database initialization for testing
    - _Requirements: 1.1, 2.1, 3.1, 4.5_

- [ ] 8. Implement example query functions for trust score computation
  - [ ] 8.1 Create `calculate_average_rating()` function
    - Implement SQL query to calculate average rating for a seller
    - Include review count in results
    - Handle case where seller has no reviews (return None or 0)
    - Use LEFT JOIN to include sellers with no reviews
    - _Requirements: 2.2, 5.2, 5.5, 8.5_
  
  - [ ] 8.2 Create `calculate_delivery_rate()` function
    - Implement SQL query to calculate delivery success rate percentage
    - Count transactions with delivery_status = 'delivered'
    - Handle case where seller has no transactions
    - _Requirements: 3.2, 5.3, 5.4, 8.5_
  
  - [ ] 8.3 Create `calculate_refund_rate()` function
    - Implement SQL query to calculate refund rate percentage
    - Sum refund_status values (0 or 1) and divide by total transactions
    - Handle case where seller has no transactions
    - _Requirements: 3.2, 5.3, 5.4, 8.5_
  
  - [ ]* 8.4 Write unit tests for query functions
    - Test average rating calculation with sample data (multiple reviews)
    - Test delivery rate calculation with sample data (mixed delivery statuses)
    - Test refund rate calculation with sample data (mixed refund statuses)
    - Test edge cases: no reviews, no transactions, single review/transaction
    - Test that indexes are being used (verify query plans if needed)
    - _Requirements: 2.2, 3.2, 5.2, 5.3, 5.4, 5.5, 8.5_

- [ ] 9. Create database documentation and helper utilities
  - [ ] 9.1 Add docstrings to all database functions
    - Document parameters, return values, and exceptions
    - Include example usage in docstrings
    - Document SQL queries with inline comments
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [ ] 9.2 Create database utility functions
    - Implement `reset_database()` for testing (drop all tables and recreate)
    - Implement `seed_sample_data()` for development/testing
    - Implement `export_schema_sql()` to generate schema as SQL file
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 10. Final checkpoint - Ensure all tests pass
  - Run all unit tests and property tests
  - Verify all correctness properties are validated
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- All property tests must run minimum 100 iterations
- All property tests must be tagged with: **Feature: database-schema, Property {number}: {property_text}**
- Use in-memory database (`:memory:`) for fast test execution in test suite
- Foreign key support MUST be enabled on every database connection via `PRAGMA foreign_keys = ON`
- The schema initialization script must be idempotent (safe to run multiple times)
- Use parameterized queries to prevent SQL injection in all query functions
- Hypothesis library is already installed in backend/requirements.txt for property-based testing
