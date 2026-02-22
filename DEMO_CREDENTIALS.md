# Demo Authentication Credentials

## Overview

The application uses **demo authentication** with hardcoded credentials for testing purposes. No database authentication is required.

## Demo Accounts

### User Account

- **Email:** `demo@trustora.com`
- **Password:** `demo123`
- **Role:** User (Consumer)
- **Access:** User Dashboard, Seller Details, Search

### Admin Account

- **Email:** `admin@trustora.com`
- **Password:** `admin123`
- **Role:** Admin
- **Access:** Admin Dashboard, High-Risk Sellers, Platform Statistics

## How It Works

1. **Login:** Use one of the demo credentials above
2. **Registration:** Any email/password will work for demo signup
3. **Role Selection:** After signup, select User or Admin role
4. **Session:** Stored in localStorage (persists across page refreshes)
5. **Logout:** Clears localStorage and returns to login

## Testing the Flow

### Quick Login Test

1. Go to `/login`
2. Enter: `demo@trustora.com` / `demo123`
3. Click "Sign In"
4. Redirected to User Dashboard

### Registration Test

1. Go to `/register`
2. Enter any email and password (min 6 characters)
3. Click "Sign Up"
4. Select a role (User or Admin)
5. Redirected to appropriate dashboard

## Notes

- ✅ No rate limiting
- ✅ No email verification required
- ✅ No database authentication
- ✅ Works offline
- ⚠️ For demo purposes only - not production-ready
- ⚠️ Session stored in localStorage (not secure)
