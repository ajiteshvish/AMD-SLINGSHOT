-- Fix for Profile Creation RLS Issue
-- This adds the missing INSERT policy for the profiles table

-- Drop the policy if it exists (to make this idempotent)
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Add INSERT policy for users to create their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = id);
