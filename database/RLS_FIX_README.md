# Fixing Profile Creation RLS Error

## Problem

Users are getting a **401 Unauthorized** error when trying to select their role after registration:

```
Error: new row violates row-level security policy for table "profiles"
```

## Root Cause

The `profiles` table RLS policies were missing an **INSERT** policy. The schema only had:

- SELECT policy (users can view own profile)
- UPDATE policy (users can update own profile)
- Service role policy (full access)

But when a new user registers and tries to create their profile, they need INSERT permission.

## Solution

Added the missing INSERT policy to allow users to create their own profile:

```sql
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = id);
```

## How to Apply the Fix

### Option 1: Run the Quick Fix (Recommended)

1. Open Supabase Dashboard: https://supabase.com/dashboard/project/ffomgdqzpufpsacsclii
2. Go to **SQL Editor**
3. Run this SQL:

```sql
CREATE POLICY IF NOT EXISTS "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = id);
```

### Option 2: Re-run the Full Schema

1. Open Supabase Dashboard SQL Editor
2. Copy the contents of `database/schema_clean.sql`
3. Paste and execute (it's idempotent, safe to re-run)

## Verification

After applying the fix:

1. Register a new user
2. Select a role (User or Admin)
3. Should successfully create profile and redirect to dashboard

## Files Updated

- ✅ `database/schema_clean.sql` - Added INSERT policy
- ✅ `database/fix_profile_rls.sql` - Quick fix SQL file
