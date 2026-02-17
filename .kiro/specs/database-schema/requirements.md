# Requirements Document: Database Schema for Trustora MVP

## Introduction

This document specifies the database schema requirements for the Trustora MVP system. Trustora computes seller trust scores based on reviews, ratings, delivery reliability, and refund behavior. The system uses SQLite as the database engine and requires a well-structured schema to support trust score computation and efficient data retrieval.

## Glossary

- **Database_Schema**: The SQLite database structure including tables, fields, relationships, and constraints
- **Seller**: An entity representing a merchant or vendor on the platform
- **Review**: User-generated feedback about a seller including ratings and comments
- **Transaction**: A record of a purchase or sale between a buyer and seller
- **Trust_Score**: A computed metric representing seller reliability based on multiple factors
- **SQLite**: A lightweight, file-based relational database management system
- **Index**: A database structure that improves query performance
- **Foreign_Key**: A constraint that establishes relationships between tables
- **Primary_Key**: A unique identifier for each record in a table

## Requirements

### Requirement 1: Seller Entity

**User Story:** As a system architect, I want to store seller information, so that the system can track seller identity and compute trust scores.

#### Acceptance Criteria

1. THE Database_Schema SHALL include a Seller table with a unique identifier as the primary key
2. THE Seller table SHALL store seller name, email, registration date, and current trust score
3. THE Seller table SHALL use appropriate SQLite data types for each field
4. THE Seller table SHALL enforce email uniqueness through a unique constraint
5. THE Seller table SHALL include timestamps for record creation and last update

### Requirement 2: Review Entity

**User Story:** As a system architect, I want to store review data, so that the system can analyze seller performance based on customer feedback.

#### Acceptance Criteria

1. THE Database_Schema SHALL include a Review table with a unique identifier as the primary key
2. THE Review table SHALL store reviewer information, rating, comment, and review timestamp
3. THE Review table SHALL include a foreign key reference to the Seller table
4. WHEN a seller is referenced in a review, THE Database_Schema SHALL enforce referential integrity
5. THE Review table SHALL store ratings as numeric values between 1 and 5
6. THE Review table SHALL include a check constraint to validate rating values

### Requirement 3: Transaction Entity

**User Story:** As a system architect, I want to store transaction data, so that the system can track delivery reliability and refund behavior.

#### Acceptance Criteria

1. THE Database_Schema SHALL include a Transaction table with a unique identifier as the primary key
2. THE Transaction table SHALL store transaction amount, date, delivery status, and refund status
3. THE Transaction table SHALL include a foreign key reference to the Seller table
4. WHEN a seller is referenced in a transaction, THE Database_Schema SHALL enforce referential integrity
5. THE Transaction table SHALL store delivery status as an enumerated type (pending, delivered, failed)
6. THE Transaction table SHALL store refund status as a boolean value
7. THE Transaction table SHALL include timestamps for transaction creation and status updates

### Requirement 4: Relationships and Referential Integrity

**User Story:** As a system architect, I want to establish clear relationships between entities, so that data integrity is maintained across the database.

#### Acceptance Criteria

1. WHEN a seller is deleted, THE Database_Schema SHALL define cascade behavior for related reviews and transactions
2. THE Database_Schema SHALL use foreign key constraints to link reviews to sellers
3. THE Database_Schema SHALL use foreign key constraints to link transactions to sellers
4. THE Database_Schema SHALL enforce NOT NULL constraints on all foreign key fields
5. WHERE foreign key constraints are defined, THE Database_Schema SHALL enable SQLite foreign key support

### Requirement 5: Performance Optimization

**User Story:** As a system architect, I want to optimize query performance, so that trust score computations and data retrieval are efficient.

#### Acceptance Criteria

1. THE Database_Schema SHALL include an index on the Seller email field for lookup optimization
2. THE Database_Schema SHALL include an index on the Review seller_id field for aggregation queries
3. THE Database_Schema SHALL include an index on the Transaction seller_id field for aggregation queries
4. THE Database_Schema SHALL include a composite index on Transaction delivery_status and refund_status for filtering
5. THE Database_Schema SHALL include an index on Review rating field for trust score computation

### Requirement 6: Data Type Selection

**User Story:** As a system architect, I want to use appropriate SQLite data types, so that data is stored efficiently and accurately.

#### Acceptance Criteria

1. THE Database_Schema SHALL use INTEGER type for all primary key fields with AUTOINCREMENT
2. THE Database_Schema SHALL use TEXT type for string fields (names, emails, comments)
3. THE Database_Schema SHALL use REAL type for numeric fields (amounts, trust scores)
4. THE Database_Schema SHALL use INTEGER type for boolean fields (0 for false, 1 for true)
5. THE Database_Schema SHALL use TEXT type for timestamp fields in ISO 8601 format
6. THE Database_Schema SHALL use INTEGER type for rating values

### Requirement 7: Data Integrity Constraints

**User Story:** As a system architect, I want to enforce data integrity rules, so that invalid data cannot be stored in the database.

#### Acceptance Criteria

1. THE Database_Schema SHALL enforce NOT NULL constraints on all required fields
2. THE Database_Schema SHALL enforce UNIQUE constraints on fields that must be unique (seller email)
3. THE Database_Schema SHALL enforce CHECK constraints on rating values (between 1 and 5)
4. THE Database_Schema SHALL enforce CHECK constraints on trust score values (between 0 and 100)
5. THE Database_Schema SHALL enforce CHECK constraints on transaction amounts (non-negative)
6. THE Database_Schema SHALL provide default values for timestamp fields (current timestamp)

### Requirement 8: Schema Documentation

**User Story:** As a developer, I want clear documentation of the database schema, so that I can understand the structure and relationships.

#### Acceptance Criteria

1. THE Database_Schema SHALL include comments or documentation for each table
2. THE Database_Schema SHALL include documentation for each field describing its purpose
3. THE Database_Schema SHALL include documentation for all relationships and constraints
4. THE Database_Schema SHALL include documentation for all indexes and their purpose
5. THE Database_Schema SHALL include example queries demonstrating common use cases
