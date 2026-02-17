# Design Document: Database Schema for Trustora MVP

## Overview

This design document specifies the SQLite database schema for the Trustora MVP system. The schema consists of three core tables (Seller, Review, Transaction) with well-defined relationships, constraints, and indexes to support trust score computation and efficient data retrieval.

The design prioritizes:
- Data integrity through foreign key constraints and check constraints
- Query performance through strategic indexing
- Referential integrity with cascade behaviors
- Type safety using appropriate SQLite data types

## Architecture

### Database Engine
- **SQLite 3.x**: Lightweight, file-based RDBMS
- **Foreign Key Support**: Enabled via `PRAGMA foreign_keys = ON;`
- **Storage**: Single file database for MVP simplicity

### Entity-Relationship Model

```
┌─────────────┐
│   Seller    │
│─────────────│
│ id (PK)     │
│ name        │
│ email (UQ)  │
│ trust_score │
│ created_at  │
│ updated_at  │
└──────┬──────┘
       │
       │ 1:N
       ├──────────────┐
       │              │
       ▼              ▼
┌─────────────┐  ┌──────────────┐
│   Review    │  │ Transaction  │
│─────────────│  │──────────────│
│ id (PK)     │  │ id (PK)      │
│ seller_id(FK)│  │ seller_id(FK)│
│ reviewer    │  │ amount       │
│ rating      │  │ date         │
│ comment     │  │ delivery_st. │
│ created_at  │  │ refund_st.   │
└─────────────┘  │ created_at   │
                 │ updated_at   │
                 └──────────────┘
```

## Components and Interfaces

### Table: Seller

Stores merchant/vendor information and computed trust scores.

**Schema:**
```sql
CREATE TABLE Seller (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    trust_score REAL DEFAULT 0.0 CHECK(trust_score >= 0 AND trust_score <= 100),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

**Field Definitions:**
- `id`: Unique identifier for each seller (auto-incrementing integer)
- `name`: Seller's display name (required text field)
- `email`: Seller's email address (required, unique, used for authentication/contact)
- `trust_score`: Computed trust metric from 0-100 (default 0.0, validated by CHECK constraint)
- `created_at`: ISO 8601 timestamp of record creation (auto-populated)
- `updated_at`: ISO 8601 timestamp of last modification (auto-populated)

**Indexes:**
```sql
CREATE INDEX idx_seller_email ON Seller(email);
```

**Purpose**: Fast lookup by email for authentication and seller identification.

### Table: Review

Stores customer feedback including ratings and comments.

**Schema:**
```sql
CREATE TABLE Review (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL,
    reviewer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (seller_id) REFERENCES Seller(id) ON DELETE CASCADE
);
```

**Field Definitions:**
- `id`: Unique identifier for each review (auto-incrementing integer)
- `seller_id`: Foreign key reference to Seller table (required, cascades on delete)
- `reviewer_name`: Name of the person leaving the review (required)
- `rating`: Numeric rating from 1-5 stars (required, validated by CHECK constraint)
- `comment`: Optional text feedback from reviewer
- `created_at`: ISO 8601 timestamp of review submission (auto-populated)

**Indexes:**
```sql
CREATE INDEX idx_review_seller_id ON Review(seller_id);
CREATE INDEX idx_review_rating ON Review(rating);
```

**Purpose**: 
- `idx_review_seller_id`: Fast aggregation of reviews per seller for trust score computation
- `idx_review_rating`: Efficient filtering and sorting by rating values

### Table: Transaction

Stores purchase/sale records with delivery and refund tracking.

**Schema:**
```sql
CREATE TABLE Transaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    transaction_date TEXT NOT NULL DEFAULT (datetime('now')),
    delivery_status TEXT NOT NULL DEFAULT 'pending' CHECK(delivery_status IN ('pending', 'delivered', 'failed')),
    refund_status INTEGER NOT NULL DEFAULT 0 CHECK(refund_status IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (seller_id) REFERENCES Seller(id) ON DELETE CASCADE
);
```

**Field Definitions:**
- `id`: Unique identifier for each transaction (auto-incrementing integer)
- `seller_id`: Foreign key reference to Seller table (required, cascades on delete)
- `amount`: Transaction value in currency units (required, non-negative)
- `transaction_date`: ISO 8601 timestamp of transaction occurrence (auto-populated)
- `delivery_status`: Enumerated status ('pending', 'delivered', 'failed') with default 'pending'
- `refund_status`: Boolean flag (0=no refund, 1=refunded) with default 0
- `created_at`: ISO 8601 timestamp of record creation (auto-populated)
- `updated_at`: ISO 8601 timestamp of last status change (auto-populated)

**Indexes:**
```sql
CREATE INDEX idx_transaction_seller_id ON Transaction(seller_id);
CREATE INDEX idx_transaction_delivery_refund ON Transaction(delivery_status, refund_status);
```

**Purpose**:
- `idx_transaction_seller_id`: Fast aggregation of transactions per seller
- `idx_transaction_delivery_refund`: Efficient filtering for trust score computation (e.g., failed deliveries, refunds)

## Data Models

### SQLite Data Type Mapping

| Logical Type | SQLite Type | Usage |
|-------------|-------------|-------|
| Primary Key | INTEGER | All `id` fields with AUTOINCREMENT |
| String | TEXT | Names, emails, comments, timestamps (ISO 8601) |
| Decimal | REAL | Amounts, trust scores |
| Boolean | INTEGER | Refund status (0/1) |
| Enum | TEXT | Delivery status with CHECK constraint |
| Rating | INTEGER | Numeric rating (1-5) with CHECK constraint |

### Timestamp Format

All timestamp fields use ISO 8601 format: `YYYY-MM-DD HH:MM:SS`
- Generated via SQLite's `datetime('now')` function
- Stored as TEXT for portability and readability

### Referential Integrity

**Foreign Key Configuration:**
```sql
PRAGMA foreign_keys = ON;
```

**Cascade Behavior:**
- When a Seller is deleted, all associated Reviews are deleted (CASCADE)
- When a Seller is deleted, all associated Transactions are deleted (CASCADE)

This ensures no orphaned records remain in the database.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Email Uniqueness Enforcement
*For any* two seller records, if they have the same email address, the database SHALL reject the insertion of the second record with a constraint violation.
**Validates: Requirements 1.4**

### Property 2: Referential Integrity Enforcement
*For any* review or transaction record, if the seller_id references a non-existent seller, the database SHALL reject the insertion with a foreign key constraint violation.
**Validates: Requirements 2.4, 3.4**

### Property 3: Rating Value Validation
*For any* review record, if the rating value is less than 1 or greater than 5, the database SHALL reject the insertion with a CHECK constraint violation.
**Validates: Requirements 2.6**

### Property 4: Cascade Deletion Behavior
*For any* seller with associated reviews and transactions, when the seller is deleted, all associated reviews and transactions SHALL be automatically deleted from the database.
**Validates: Requirements 4.1**

### Property 5: Required Field Validation
*For any* record insertion in any table, if a NOT NULL field is provided with a NULL value, the database SHALL reject the insertion with a constraint violation.
**Validates: Requirements 7.1**

### Property 6: Trust Score Range Validation
*For any* seller record, if the trust_score value is less than 0 or greater than 100, the database SHALL reject the insertion or update with a CHECK constraint violation.
**Validates: Requirements 7.4**

### Property 7: Non-Negative Amount Validation
*For any* transaction record, if the amount value is negative, the database SHALL reject the insertion with a CHECK constraint violation.
**Validates: Requirements 7.5**

### Property 8: Automatic Timestamp Population
*For any* record insertion where timestamp fields are not explicitly provided, the database SHALL automatically populate those fields with the current timestamp in ISO 8601 format.
**Validates: Requirements 7.6**

## Error Handling

### Constraint Violations

**Unique Constraint Violations:**
- Error: `UNIQUE constraint failed: Seller.email`
- Cause: Attempting to insert a seller with an email that already exists
- Resolution: Check for existing email before insertion or handle the error gracefully

**Foreign Key Violations:**
- Error: `FOREIGN KEY constraint failed`
- Cause: Attempting to insert a review/transaction with invalid seller_id
- Resolution: Verify seller exists before creating related records

**Check Constraint Violations:**
- Error: `CHECK constraint failed: <constraint_name>`
- Cause: Attempting to insert values outside valid ranges (ratings, trust scores, amounts)
- Resolution: Validate input data before database insertion

**NOT NULL Violations:**
- Error: `NOT NULL constraint failed: <table>.<column>`
- Cause: Attempting to insert NULL into required field
- Resolution: Ensure all required fields have values before insertion

### Foreign Key Configuration

**Critical Setup:**
```sql
PRAGMA foreign_keys = ON;
```

This MUST be executed at the start of every database connection. Without this pragma, SQLite will NOT enforce foreign key constraints, leading to referential integrity violations.

### Transaction Handling

For operations that modify multiple tables (e.g., updating seller trust scores based on reviews), use transactions:

```sql
BEGIN TRANSACTION;
-- Multiple operations
COMMIT;
-- or ROLLBACK on error
```

## Testing Strategy

### Dual Testing Approach

The database schema will be validated using both unit tests and property-based tests:

**Unit Tests** focus on:
- Schema structure verification (table existence, column definitions, data types)
- Index existence and configuration
- Foreign key relationship verification
- Specific constraint examples (e.g., inserting a rating of 3 succeeds)
- Edge cases (e.g., empty strings, boundary values)

**Property-Based Tests** focus on:
- Constraint enforcement across all possible inputs
- Referential integrity with randomly generated data
- Cascade behavior with various data configurations
- Default value population across multiple insertions
- Comprehensive validation of CHECK constraints

### Property-Based Testing Configuration

**Testing Library:** For Python implementations, use `hypothesis` library. For other languages, use equivalent PBT libraries (e.g., `fast-check` for JavaScript, `QuickCheck` for Haskell).

**Test Configuration:**
- Minimum 100 iterations per property test
- Each property test must reference its design document property
- Tag format: **Feature: database-schema, Property {number}: {property_text}**

**Example Test Structure:**
```python
# Feature: database-schema, Property 1: Email Uniqueness Enforcement
@given(seller1=seller_strategy(), seller2=seller_strategy())
def test_email_uniqueness(seller1, seller2):
    # Ensure both sellers have the same email
    seller2['email'] = seller1['email']
    
    # Insert first seller (should succeed)
    insert_seller(seller1)
    
    # Insert second seller with duplicate email (should fail)
    with pytest.raises(sqlite3.IntegrityError, match="UNIQUE constraint failed"):
        insert_seller(seller2)
```

### Schema Validation Tests

Unit tests should verify:
1. All three tables exist (Seller, Review, Transaction)
2. All columns exist with correct data types
3. All primary keys are defined with AUTOINCREMENT
4. All foreign keys are defined with CASCADE behavior
5. All indexes exist as specified
6. All CHECK constraints are defined
7. All UNIQUE constraints are defined
8. All NOT NULL constraints are defined

### Common Query Examples

**Trust Score Computation Query:**
```sql
-- Calculate average rating for a seller
SELECT 
    s.id,
    s.name,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as review_count
FROM Seller s
LEFT JOIN Review r ON s.id = r.seller_id
WHERE s.id = ?
GROUP BY s.id;
```

**Delivery Reliability Query:**
```sql
-- Calculate delivery success rate for a seller
SELECT 
    s.id,
    s.name,
    COUNT(CASE WHEN t.delivery_status = 'delivered' THEN 1 END) * 100.0 / COUNT(t.id) as delivery_rate
FROM Seller s
LEFT JOIN Transaction t ON s.id = t.seller_id
WHERE s.id = ?
GROUP BY s.id;
```

**Refund Rate Query:**
```sql
-- Calculate refund rate for a seller
SELECT 
    s.id,
    s.name,
    SUM(t.refund_status) * 100.0 / COUNT(t.id) as refund_rate
FROM Seller s
LEFT JOIN Transaction t ON s.id = t.seller_id
WHERE s.id = ?
GROUP BY s.id;
```

## Complete Schema Definition

### Initialization Script

```sql
-- Enable foreign key support (CRITICAL - must be run on every connection)
PRAGMA foreign_keys = ON;

-- Create Seller table
CREATE TABLE IF NOT EXISTS Seller (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    trust_score REAL DEFAULT 0.0 CHECK(trust_score >= 0 AND trust_score <= 100),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create Review table
CREATE TABLE IF NOT EXISTS Review (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL,
    reviewer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (seller_id) REFERENCES Seller(id) ON DELETE CASCADE
);

-- Create Transaction table
CREATE TABLE IF NOT EXISTS Transaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    transaction_date TEXT NOT NULL DEFAULT (datetime('now')),
    delivery_status TEXT NOT NULL DEFAULT 'pending' CHECK(delivery_status IN ('pending', 'delivered', 'failed')),
    refund_status INTEGER NOT NULL DEFAULT 0 CHECK(refund_status IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (seller_id) REFERENCES Seller(id) ON DELETE CASCADE
);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_seller_email ON Seller(email);
CREATE INDEX IF NOT EXISTS idx_review_seller_id ON Review(seller_id);
CREATE INDEX IF NOT EXISTS idx_review_rating ON Review(rating);
CREATE INDEX IF NOT EXISTS idx_transaction_seller_id ON Transaction(seller_id);
CREATE INDEX IF NOT EXISTS idx_transaction_delivery_refund ON Transaction(delivery_status, refund_status);
```

### Verification Queries

```sql
-- Verify tables exist
SELECT name FROM sqlite_master WHERE type='table' AND name IN ('Seller', 'Review', 'Transaction');

-- Verify indexes exist
SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_%';

-- Verify foreign key support is enabled
PRAGMA foreign_keys;  -- Should return 1

-- View table schema
PRAGMA table_info(Seller);
PRAGMA table_info(Review);
PRAGMA table_info(Transaction);

-- View foreign key definitions
PRAGMA foreign_key_list(Review);
PRAGMA foreign_key_list(Transaction);
```

## Implementation Notes

### Database File Location
- Development: `./trustora_dev.db`
- Testing: In-memory database (`:memory:`) for fast test execution
- Production: Configurable path via environment variable

### Migration Strategy
For future schema changes:
1. Create migration scripts with version numbers
2. Track applied migrations in a `schema_version` table
3. Use ALTER TABLE for non-breaking changes
4. Use CREATE TABLE + data migration for breaking changes

### Performance Considerations
- The composite index on `(delivery_status, refund_status)` optimizes trust score queries
- Indexes on foreign keys improve JOIN performance
- For large datasets (>100K records), consider adding indexes on timestamp fields for time-based queries

### Security Considerations
- Use parameterized queries to prevent SQL injection
- Validate all input data before database operations
- Implement application-level access controls (database schema does not enforce user permissions)
- Consider encrypting sensitive fields (email) at the application layer if required
