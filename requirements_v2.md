# 🧾 Blendora – Execution Blueprint (Automated Model)

---

# 📌 1. Overview

**Product Name:** Blendora
**Type:** Hyperlocal Custom Food Processing Platform
**Architecture:** Fully Automated (Minimal Manual Dependency)

---

# 🎯 2. Business Model

Blendora operates on a **controlled supply chain model**:

* Platform owns:

  * Inventory (grains)
  * Processing (dedicated chakkis)
  * Delivery orchestration

* Vendors (chakkis) act as:

  * Processing units only (not decision makers)

---

# 🧠 3. Core Principle

> Minimize human interaction → Maximize system automation

| Role     | Responsibility       |
| -------- | -------------------- |
| Customer | Order creation       |
| Admin    | Monitoring & control |
| Chakki   | Processing only      |
| Rider    | Pickup & delivery    |

---

# 📱 4. Application Ecosystem

## 4.1 Customer App (React Native)

* Create custom blends
* Place orders
* Track delivery
* Manage subscriptions

---

## 4.2 Admin Web Panel

* Inventory management
* Chakki onboarding
* Order monitoring
* Delivery orchestration
* Exception handling

---

## 4.3 Chakki App (Lightweight)

* View assigned orders
* Start processing
* Mark completion
* Optional image upload

👉 Must be:

* Very simple UI
* Max 3–4 actions only

---

## 4.4 Rider App

* Accept delivery task
* Navigate to pickup
* Pickup confirmation
* Deliver to customer
* OTP-based delivery completion

---

# 🏗️ 5. Inventory Model

## Centralized Control

### Storage Types:

* Central warehouse (bulk)
* Chakki-level stock

---

## Flow:

1. Bulk stock stored in warehouse
2. Periodic transfer to chakkis
3. Orders consume chakki stock

---

## Tables:

* warehouse_stock
* chakki_stock
* stock_transfer

---

# 🔄 6. Order Flow (End-to-End Automation)

---

## Step 1: Order Creation

* Customer selects mix
* Defines quantity per ingredient
* Total weight calculated

---

## Step 2: Validation

* Check:

  * Max allowed weight
  * Stock availability at chakki

---

## Step 3: Chakki Assignment

Auto-assigned based on:

* Distance
* Available stock
* Capacity

---

## Step 4: Processing Job Creation

Job includes:

* Order ID
* Mix composition
* Total weight
* Assigned chakki

---

## Step 5: Chakki Processing

Chakki performs:

* Accept (auto or manual)
* Start grinding
* Complete
* Upload image (optional)

---

## Step 6: Delivery Assignment

Triggered after completion

---

## Step 7: Delivery Execution

* Rider picks up order
* Delivers to customer
* OTP confirmation

---

# 🚴 7. Delivery Logic (CRITICAL)

## Weight-Based Assignment Rules

### Case 1: Weight < 10kg

* Assigned to:

  * 🛵 Bike

---

### Case 2: Weight 10kg – 20kg

* Assigned to:

  * 🛵 EV Scooter

---

### Case 3: Weight > 20kg

## Rule: Batch-Based Delivery (Max 20kg per trip)

### Flow:

1. Split order into batches of 20kg
2. First delivery:

   * EV Scooter (20kg max)
3. Remaining weight:

   * Automatically scheduled for next delivery
   * Vehicle assigned based on batch weight

---

### Example:

Order = 35kg

Split:

* Batch 1 → 20kg → EV Scooter
* Batch 2 → 15kg → EV Scooter

---

# 📦 8. Packaging Strategy

* Use multiple small bags:

  * 5kg / 10kg packs
* Avoid single heavy packaging

---

# ⚙️ 9. Automation Engine

---

## 9.1 Vendor (Chakki) Assignment

* Based on:

  * Distance
  * Load
  * Stock availability

---

## 9.2 Capacity Management

* Each chakki:

  * Max orders per hour
  * Queue tracking

---

## 9.3 Delivery Assignment

* Based on:

  * Weight
  * Distance
  * Rider availability

---

## 9.4 Batch Split Engine

* Automatically splits orders >20kg
* Creates multiple delivery jobs

---

## 9.5 Auto Escalation

* If no action:

  * Reassign chakki
  * Alert admin

---

# 📊 10. Data Model (Key Entities)

## Orders

* id
* user_id
* total_weight
* status

---

## Order_Items

* mix_id
* composition details

---

## Delivery_Jobs

* id
* order_id
* batch_weight
* assigned_rider
* vehicle_type

---

## Chakki_Stock

* ingredient_id
* available_qty

---

## Processing_Jobs

* order_id
* chakki_id
* status

---

# 🔐 11. Authentication

| Role     | Method               |
| -------- | -------------------- |
| Customer | OTP + JWT            |
| Admin    | Secure login         |
| Rider    | Login + token        |
| Chakki   | Simple login / token |

---

# 📡 12. APIs (High-Level)

## Order APIs

* POST /order/create
* GET /order/status

---

## Mix APIs

* POST /mix/create
* GET /mix/user

---

## Delivery APIs

* POST /delivery/assign
* PUT /delivery/status

---

## Chakki APIs

* GET /chakki/orders
* PUT /chakki/status

---

# ⚠️ 13. Constraints

* Max batch size: 20kg
* Delivery split mandatory above 20kg
* Inventory must be available at chakki before order

---

# 🚀 14. MVP Scope

## Include:

* Atta category only
* 1–2 chakkis per area
* Automated assignment
* Delivery batching

---

## Exclude:

* Wholesaler app
* Complex vendor dashboards

---

# 🎯 15. Success Criteria

* Order completion time < 6 hours
* Delivery success rate > 95%
* Minimal manual intervention
* Vendor compliance with minimal effort

---

# ✅ End of Document
