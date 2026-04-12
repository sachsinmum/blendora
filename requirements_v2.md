# 🧾 Blendora – Refined Product Requirements Document (v2.0)

## 📌 1. Overview

**Product Name:** Blendora
**Type:** Hyperlocal Custom Grain Processing & Logistics Platform
**Model:** Zero-Inventory (Godown-less)
**Core Value Prop:** "Your choice of grain, processed your way, delivered fresh with 100% transparency."

---

## 🎯 2. The Business Model (Zero-Godown)

Blendora operates as a pure marketplace and logistics orchestrator. 
1. **Aggregator**: We aggregate local Wholesalers (Grain Sources) and Chakkis (Processors).
2. **Logistics**: We manage two-stage delivery without holding stock.
3. **Trust**: We solve the "purity gap" in flour processing through video evidence.

---

## 👥 3. Advanced User Roles

### 3.1 Customer
* **Mix Builder**: Customize ratios (e.g., 70% Sharbati Wheat, 20% Chana, 10% Bajra).
* **Source Selection**: Choose where the grain comes from (Local Wholesaler vs. Premium Brand like Tata).
* **Vendor Selection**: Choose a nearby Chakki based on ratings and proximity.
* **Trust Dashboard**: View live/recorded video of their specific order being ground.

### 3.2 Wholesaler / Brand Partner
* **Inventory Management**: Update stock of raw grains.
* **Order Preparation**: Receive "Pickup" requests and keep grains ready for Delivery Partner.
* **Digital Invoicing**: Integrated billing with the platform.

### 3.3 Chakki (The Processor)
* **Grinding Queue**: Manage incoming raw grain batches.
* **Verification**: Verify receipt of grains from Delivery Partner (Stage 1).
* **Proof of Work**: Capture a 15-second mobile video of the grinding process + Pre/Post images.
* **Payment**: Earn processing fees per kg.

### 3.4 Delivery Partner (The Ground Force)
* **Leg 1 (The Transfer)**: Source ➡️ Chakki.
* **Leg 2 (The Delivery)**: Chakki ➡️ Customer.
* **Earnings**: Per-leg commission based on distance and weight.

---

## 🏗️ 4. Refined Operational Workflow

| Phase | Actor | Action | Status In App |
| :--- | :--- | :--- | :--- |
| **1. Ordering** | User | Configures mix, selects Wholesaler & Chakki. Pays. | `Order Placed` |
| **2. Leg 1 Assigned** | Delivery 1 | Picks up raw grains from Wholesaler. | `Grains Picked Up` |
| **3. Processing Entry** | Delivery 1 | Drops at Chakki. Chakki verifies with OTP. | `At Chakki` |
| **4. Grinding** | Chakki | Records 15s video. Grinds grain. | `Grinding...` |
| **5. Ready** | Chakki | Packs flour. Uploads video/images. | `Ready for Delivery` |
| **6. Leg 2 Assigned** | Delivery 2 | Picks up fresh flour from Chakki. | `Out for Delivery` |
| **7. Completion** | Delivery 2 | Delivers to User. User verifies with OTP. | `Delivered` |

---

## 🧩 5. Core Features & Technology Stack

### 5.1 Trust Lock™ Engine (New)
* **Video Metadata**: Every video must be geotagged and timestamped to ensure it belongs to the current order.
* **Storage**: AWS S3 with CloudFront for fast playback.
* **Compression**: Server-side compression to handle low-bandwidth chakki uploads.

### 5.2 Micro-Logistics Scheduler
* Manages the "Double-Leg" assignment. 
* Prevents "Leg 2" from being assigned before "Leg 1" is completed.

### 5.3 Tech Stack (Production Ready)
* **Backend**: Spring Boot (Java 17/21) / PostgreSQL / Redis.
* **Mobile**: React Native (Cross-platform for Android/iOS).
* **Infrastructure**: AWS/GCP (Docker/Kubernetes ready).
* **Payments**: Razorpay/Stripe (Escrow model).

---

## 📈 6. Monetization & Growth

1. **Transaction Margin**: Small markup on raw grain prices.
2. **Processing Fee**: Service charge for managing the Chakki-User bridge.
3. **Delivery Fee**: Tiered based on weight and distance.
4. **Subscription**: "Monthly Fresh Atta" plans for recurring revenue.

---

## 🚀 7. Roadmap to Production

### Phase 1: MVP (Alpha) - Single Hub
* Focus on 1 Area, 2 Wholesalers, 2 Chakkis.
* Manual logistics assignment.
* Basic video upload.

### Phase 2: Beta - Scaling Trust
* Automated logistics (Leg 1 / Leg 2).
* Subscription engine.
* Real-time tracking with Maps.

### Phase 3: Launch - Ecosystem
* Masala & Oil category expansion.
* AI-based nutrition suggestions based on user mix.
