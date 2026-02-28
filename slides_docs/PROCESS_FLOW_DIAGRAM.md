# URTSS - Process Flow & Use-Case Diagram

This document contains visual representations of the **Process Flow** and **Use-Cases** for the Unified Retailer Trust Scoring System (URTSS).

## Process Flow Diagram

The diagram below outlines the main user journey and system interactions from the Landing Page to both Consumer and Administrator perspectives.

```mermaid
flowchart TD
    %% Define styles
    classDef startEnd fill:#f9f,stroke:#333,stroke-width:2px;
    classDef action fill:#bbf,stroke:#333,stroke-width:2px;
    classDef decision fill:#ff9,stroke:#333,stroke-width:2px;
    classDef system fill:#bfb,stroke:#333,stroke-width:2px;

    Start([Landing Page]):::startEnd --> Auth{Login / Register}:::decision

    Auth -->|Authenticate| Role{Select Role}:::decision

    %% User Flow (Consumer Side)
    Role -- "User (Consumer)" --> UserDash[User Dashboard]:::action

    UserDash --> ViewFeature[View Overview Panel:\n- High Trust Sellers\n- Risk Alerts\n- Recent Scans]:::action
    UserDash --> Search[Search Seller Name or Product Link]:::action

    Search --> SystemFetch[System Fetches & Analyzes Data]:::system
    SystemFetch --> SellerDetail[Seller Detail Page]:::action

    SellerDetail --> TrustMetrics[View Trust Metrics\n(0-100 Unified Score)]:::action
    SellerDetail --> Compare[Compare 2-3 Sellers\nSide-by-Side]:::action
    SellerDetail --> Alerts[Configure Follow/Risk Alerts]:::action

    %% Admin Flow (Marketplace Team)
    Role -- "Admin (Marketplace Team)" --> AdminDash[Admin Dashboard]:::action

    AdminDash --> Monitor[Monitor Sellers & Risk Score Distribution]:::action
    AdminDash --> Anomaly[View Fake Review / Anomaly Reports]:::action
    AdminDash --> AICtrl[AI Monitoring Panel:\nInference latency, accuracy stats]:::action
    AdminDash --> AdjustSettings[Adjust Trust Weights & Alert Thresholds]:::action
```

---

## Use-Case Diagram

The following diagram highlights the specific use cases for each actor interacting with URTSS.

```mermaid
usecaseDiagram
    actor "Consumer (User)" as User
    actor "Admin (Marketplace)" as Admin
    actor "Trust Logic AI Engine" as System

    package URTSS {
        usecase "Search for Sellers/Products" as UC1
        usecase "View Unified Trust Score" as UC2
        usecase "Compare Sellers side-by-side" as UC3
        usecase "Set Alerts for Sellers" as UC4

        usecase "Monitor Seller Performance" as UC5
        usecase "View Fake Review Reports" as UC6
        usecase "Adjust Trust Weights" as UC7
        usecase "Monitor AI Inference Latency" as UC8

        usecase "Analyze Sentiments & Fake Reviews" as UC9
        usecase "Calculate Unified Score" as UC10
    }

    %% Consumer interactions
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4

    %% Admin interactions
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8

    %% System Engine interactions
    System --> UC9
    System --> UC10

    %% Dependencies
    UC1 ..> UC10 : <<includes>>
    UC10 ..> UC9 : <<includes>>
    UC5 ..> UC10 : <<includes>>
    UC6 ..> UC9 : <<includes>>
```
