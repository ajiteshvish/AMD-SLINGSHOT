# Implementation Plan: Seller Alert System

## Overview

This implementation plan breaks down the Seller Alert System into discrete, incremental coding tasks. Each task builds on previous work, with testing integrated throughout to validate functionality early. The plan follows a bottom-up approach: data layer → business logic → API → frontend integration.

## Tasks

- [ ] 1. Set up database schema and migrations
  - Create database migration files for follows, alerts, notification_preferences, and trust_score_snapshots tables
  - Add indexes for performance optimization (consumer_id, seller_id, timestamps)
  - Create database connection configuration in backend
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 2. Implement data models and repository layer
  - [ ] 2.1 Create Pydantic models for FollowRelationship, Alert, NotificationPreferences, and TrustScoreSnapshot
    - Define all fields with proper types and validation
    - Add model configuration for ORM compatibility
    - _Requirements: 1.1, 4.1, 7.1, 3.4_
  
  - [ ] 2.2 Implement FollowRepository with CRUD operations
    - Implement create_follow, delete_follow, get_follows_by_consumer, get_followers_by_seller
    - Implement update_threshold and follow_exists methods
    - _Requirements: 1.1, 1.2, 1.3, 2.3_
  
  - [ ]* 2.3 Write property test for follow relationship creation
    - **Property 1: Follow relationship creation**
    - **Validates: Requirements 1.1, 1.5, 2.4**
  
  - [ ]* 2.4 Write property test for follow relationship idempotence
    - **Property 3: Follow relationship idempotence**
    - **Validates: Requirements 1.4**
  
  - [ ] 2.5 Implement AlertRepository with query and persistence methods
    - Implement create_alert, get_alerts_by_consumer, get_alert_history
    - Implement mark_as_read, get_unread_count, batch_create_alerts
    - _Requirements: 4.1, 5.1, 5.2, 6.1_
  
  - [ ]* 2.6 Write property test for alert record completeness
    - **Property 10: Alert record completeness**
    - **Validates: Requirements 4.1, 9.2**
  
  - [ ] 2.7 Implement PreferenceRepository and SnapshotRepository
    - PreferenceRepository: get_preferences, update_preferences, create_default_preferences
    - SnapshotRepository: get_latest_snapshot, save_snapshot, get_snapshot_history
    - _Requirements: 7.1, 3.4_
  
  - [ ]* 2.8 Write property test for preference update persistence
    - **Property 21: Preference update persistence**
    - **Validates: Requirements 7.1, 9.3**

- [ ] 3. Implement service layer business logic
  - [ ] 3.1 Implement FollowService
    - Implement follow_seller with seller validation and duplicate checking
    - Implement unfollow_seller, get_followed_sellers, update_alert_threshold
    - Add threshold validation (1-100 range)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.3_
  
  - [ ]* 3.2 Write property test for threshold validation
    - **Property 5: Threshold validation**
    - **Validates: Requirements 2.1**
  
  - [ ]* 3.3 Write property test for follow retrieval completeness
    - **Property 4: Follow retrieval completeness**
    - **Validates: Requirements 1.3**
  
  - [ ] 3.4 Implement AlertService
    - Implement get_alerts with pagination
    - Implement get_alert_history with filtering (date range, seller)
    - Implement mark_alert_read and mark_all_read
    - _Requirements: 5.1, 5.2, 6.1, 6.2, 6.3_
  
  - [ ]* 3.5 Write property test for alert chronological ordering
    - **Property 17: Alert chronological ordering**
    - **Validates: Requirements 5.3**
  
  - [ ]* 3.6 Write property test for alert history filtering
    - **Property 18: Alert history date filtering**
    - **Property 19: Alert history seller filtering**
    - **Validates: Requirements 6.2, 6.3**
  
  - [ ] 3.7 Implement PreferenceService
    - Implement get_preferences with default creation
    - Implement update_preferences with validation
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 4. Implement alert evaluation and monitoring logic
  - [ ] 4.1 Implement AlertEvaluationService
    - Implement evaluate_trust_score_update method
    - Calculate score changes from snapshots
    - Query followers and check thresholds
    - Create alerts for threshold breaches
    - Save new snapshots
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ]* 4.2 Write property test for score change calculation
    - **Property 7: Score change calculation**
    - **Validates: Requirements 3.1, 3.2, 3.4**
  
  - [ ]* 4.3 Write property test for alert triggering on threshold breach
    - **Property 8: Alert triggering on threshold breach**
    - **Validates: Requirements 3.3**
  
  - [ ]* 4.4 Write property test for no alerts on score increase
    - **Property 9: No alerts on score increase**
    - **Validates: Requirements 3.5**
  
  - [ ] 4.5 Implement process_alert_batch method
    - Group alerts by consumer
    - Apply 5-minute batching window
    - Prepare alerts for notification dispatch
    - _Requirements: 4.5_
  
  - [ ]* 4.6 Write property test for alert batching
    - **Property 14: Alert batching within time window**
    - **Validates: Requirements 4.5**

- [ ] 5. Checkpoint - Ensure core business logic tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement notification delivery system
  - [ ] 6.1 Implement NotificationService
    - Implement dispatch_alert method with preference checking
    - Implement send_in_app_notification
    - Implement send_email_notification with error handling
    - Implement batch_notifications for multiple alerts
    - _Requirements: 4.2, 4.3, 4.4, 4.5_
  
  - [ ]* 6.2 Write property test for in-app notification delivery
    - **Property 11: In-app notification delivery**
    - **Validates: Requirements 4.2**
  
  - [ ]* 6.3 Write property test for conditional email notification
    - **Property 12: Conditional email notification**
    - **Validates: Requirements 4.3**
  
  - [ ]* 6.4 Write property test for notification content completeness
    - **Property 13: Notification content completeness**
    - **Validates: Requirements 4.4, 5.4**
  
  - [ ] 6.5 Implement email service integration
    - Configure email service (SMTP or third-party API)
    - Create email templates for alerts
    - Add retry logic and error handling
    - _Requirements: 4.3, 10.4_
  
  - [ ]* 6.6 Write property test for email delivery graceful degradation
    - **Property 28: Email delivery graceful degradation**
    - **Validates: Requirements 10.4**

- [ ] 7. Implement FastAPI routes for follow management
  - [ ] 7.1 Create follow management endpoints
    - POST /api/alerts/follow - create follow relationship
    - DELETE /api/alerts/follow/{seller_id} - remove follow
    - GET /api/alerts/following - list followed sellers
    - PUT /api/alerts/threshold/{seller_id} - update threshold
    - Add request/response models
    - Add authentication and authorization middleware
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.9, 8.10_
  
  - [ ]* 7.2 Write unit tests for follow API endpoints
    - Test successful follow/unfollow operations
    - Test authentication and authorization
    - Test error cases (non-existent seller, duplicate follow)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 10.1_
  
  - [ ]* 7.3 Write property test for authentication requirement
    - **Property 23: Authentication requirement**
    - **Validates: Requirements 8.9**
  
  - [ ]* 7.4 Write property test for authorization enforcement
    - **Property 24: Authorization enforcement**
    - **Validates: Requirements 8.10**

- [ ] 8. Implement FastAPI routes for alerts and preferences
  - [ ] 8.1 Create alert endpoints
    - GET /api/alerts - retrieve alerts with pagination
    - GET /api/alerts/history - retrieve alert history with filters
    - PUT /api/alerts/{alert_id}/read - mark alert as read
    - PUT /api/alerts/read-all - mark all alerts as read
    - Add query parameter validation
    - _Requirements: 8.5, 8.6, 8.7_
  
  - [ ] 8.2 Create preference endpoints
    - GET /api/alerts/preferences - get notification preferences
    - PUT /api/alerts/preferences - update preferences
    - _Requirements: 8.8_
  
  - [ ]* 8.3 Write unit tests for alert and preference API endpoints
    - Test alert retrieval with pagination
    - Test filtering by date range and seller
    - Test mark as read functionality
    - Test preference updates
    - _Requirements: 8.5, 8.6, 8.7, 8.8_
  
  - [ ]* 8.4 Write property test for alert read status update
    - **Property 16: Alert read status update**
    - **Validates: Requirements 5.2**

- [ ] 9. Implement trust score update integration
  - [ ] 9.1 Create trust score update handler
    - Implement polling mechanism to check for trust score changes
    - Call AlertEvaluationService when changes detected
    - Add error handling and retry logic
    - _Requirements: 3.1, 10.3_
  
  - [ ] 9.2 Integrate with existing trust score endpoints
    - Modify trust score update logic to trigger alert evaluation
    - Ensure backward compatibility with existing functionality
    - _Requirements: 3.1_
  
  - [ ]* 9.3 Write integration test for end-to-end alert flow
    - Test: trust score update → alert creation → notification delivery
    - _Requirements: 3.1, 3.2, 3.3, 4.1, 4.2_

- [ ] 10. Checkpoint - Ensure backend integration tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement frontend API client
  - [ ] 11.1 Create AlertsAPI service class
    - Implement all API methods (follow, unfollow, getAlerts, etc.)
    - Add error handling and response parsing
    - Configure base URL and authentication headers
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8_
  
  - [ ] 11.2 Create TypeScript types for API models
    - Define interfaces for FollowRelationship, Alert, NotificationPreferences
    - Define request/response types for all endpoints
    - _Requirements: 1.1, 4.1, 7.1_

- [ ] 12. Implement React hooks for state management
  - [ ] 12.1 Create useFollowSeller hook
    - Manage follow state and API calls
    - Implement optimistic updates
    - Handle loading and error states
    - _Requirements: 1.1, 1.2_
  
  - [ ] 12.2 Create useAlerts hook
    - Fetch and manage alert state
    - Implement mark as read functionality
    - Handle pagination
    - _Requirements: 5.1, 5.2, 6.1_
  
  - [ ] 12.3 Create useNotificationPreferences hook
    - Fetch and manage preference state
    - Implement preference updates
    - _Requirements: 7.1_
  
  - [ ] 12.4 Create useRealtimeAlerts hook
    - Establish WebSocket connection (or polling fallback)
    - Listen for new alert events
    - Update alert state in real-time
    - _Requirements: 12.5_

- [ ] 13. Implement core React components
  - [ ] 13.1 Create FollowButton component
    - Display follow/unfollow button on seller profile
    - Handle follow/unfollow actions
    - Show loading state during API calls
    - _Requirements: 12.1_
  
  - [ ] 13.2 Create NotificationBadge component
    - Display notification icon with unread count
    - Position in main navigation
    - Trigger notification panel on click
    - _Requirements: 12.2_
  
  - [ ]* 13.3 Write property test for unread badge count accuracy
    - **Property 30: Unread badge count accuracy**
    - **Validates: Requirements 12.2**
  
  - [ ] 13.4 Create NotificationPanel component
    - Display list of alerts
    - Support mark as read
    - Link to seller profiles
    - Show empty state when no alerts
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 12.3_
  
  - [ ] 13.5 Create NotificationToast component
    - Display real-time toast notification
    - Auto-dismiss after 5 seconds
    - Click to view seller profile
    - _Requirements: 12.5_
  
  - [ ]* 13.6 Write property test for real-time alert display
    - **Property 31: Real-time alert display**
    - **Validates: Requirements 12.5**

- [ ] 14. Implement alert history and preferences pages
  - [ ] 14.1 Create AlertHistoryPage component
    - Full-page view of alert history
    - Support filtering by date range and seller
    - Implement pagination
    - _Requirements: 6.1, 6.2, 6.3, 6.5_
  
  - [ ] 14.2 Create NotificationPreferencesPage component
    - Settings page for notification preferences
    - Toggle switches for in-app and email notifications
    - Threshold management for followed sellers
    - Save/cancel actions
    - _Requirements: 7.1, 7.2, 7.3, 12.4_
  
  - [ ]* 14.3 Write unit tests for preference page
    - Test preference toggle functionality
    - Test threshold updates
    - Test save/cancel behavior
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 15. Integrate components into main application
  - [ ] 15.1 Add NotificationBadge to main navigation
    - Position badge in header/navbar
    - Wire up click handler to open NotificationPanel
    - _Requirements: 12.2, 12.3_
  
  - [ ] 15.2 Add FollowButton to seller profile pages
    - Integrate with existing seller profile component
    - Ensure proper seller ID is passed
    - _Requirements: 12.1_
  
  - [ ] 15.3 Add routes for alert history and preferences pages
    - Create routes in React Router
    - Add navigation links in settings/profile menu
    - _Requirements: 12.4_
  
  - [ ] 15.4 Implement WebSocket connection management
    - Establish connection on user login
    - Subscribe to consumer-specific alert channel
    - Handle reconnection on disconnect
    - Close connection on logout
    - _Requirements: 12.5_

- [ ] 16. Add error handling and edge cases
  - [ ] 16.1 Implement error handling in API client
    - Handle network errors
    - Handle authentication errors (401, 403)
    - Handle validation errors (400)
    - Display user-friendly error messages
    - _Requirements: 8.9, 8.10, 10.1_
  
  - [ ] 16.2 Implement error handling in components
    - Display error states in UI
    - Provide retry mechanisms
    - Handle empty states gracefully
    - _Requirements: 10.1, 10.2_
  
  - [ ]* 16.3 Write unit tests for error scenarios
    - Test non-existent seller follow attempt
    - Test unfollow non-followed seller
    - Test invalid threshold values
    - Test authentication failures
    - _Requirements: 10.1, 10.2, 2.1, 8.9_

- [ ] 17. Implement seller deletion cascade handling
  - [ ] 17.1 Add database cascade delete for follow relationships
    - Configure ON DELETE CASCADE for follows table
    - _Requirements: 10.5_
  
  - [ ] 17.2 Implement notification to affected consumers
    - Detect seller deletion events
    - Query affected consumers
    - Send notifications about removed follows
    - _Requirements: 10.5_
  
  - [ ]* 17.3 Write property test for seller deletion cascade
    - **Property 29: Seller deletion cascade**
    - **Validates: Requirements 10.5**

- [ ] 18. Final checkpoint - End-to-end testing
  - [ ] 18.1 Test complete user workflow
    - Consumer follows seller
    - Trust score drops
    - Alert is created and delivered
    - Consumer views and marks alert as read
    - Consumer updates preferences
    - _Requirements: All_
  
  - [ ] 18.2 Test real-time notification flow
    - Consumer is active in application
    - Trust score drops for followed seller
    - Toast notification appears
    - Notification badge updates
    - _Requirements: 12.5, 12.2_
  
  - [ ] 18.3 Verify all API endpoints are functional
    - Test all endpoints with valid and invalid inputs
    - Verify authentication and authorization
    - Check error responses
    - _Requirements: 8.1-8.10_

- [ ] 19. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties using hypothesis library
- Unit tests validate specific examples and edge cases
- Backend uses Python/FastAPI with hypothesis for property-based testing
- Frontend uses React/TypeScript with standard testing libraries
- Database migrations should be run before starting implementation tasks
- WebSocket implementation can be replaced with polling for simpler MVP
