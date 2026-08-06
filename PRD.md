
# QR-Based Restaurant Menu Management System  
## Product Requirements Document (PRD)

---

## 1. Introduction

The **QR-Based Restaurant Menu Management System** is a full-stack web application designed to digitize restaurant menus using QR codes. It enables restaurant owners to manage restaurants, menus, and menu items through authenticated dashboards, while customers can view live menus instantly by scanning a QR code without any authentication.

The system follows real-world backend design principles such as **role-based access control**, **public vs private API separation**, **soft deletes**, and **scalable REST architecture**, implemented using the **MERN stack**.

---

## 2. Business Problem

Traditional printed menus introduce multiple operational issues:

- Frequent reprinting due to price or item changes
- High recurring costs
- Poor hygiene
- Lack of flexibility
- Inconsistent menu availability across tables

Restaurants need a **contactless**, **real-time**, and **easy-to-manage** digital solution that allows menu updates without operational friction.

---

## 3. Product Goals

- Replace printed menus with QR-based digital menus
- Allow owners to update menus instantly
- Ensure zero authentication friction for customers
- Maintain strong security for owner operations
- Support future scalability (ordering, payments, analytics)

---

## 4. Target Users

### 4.1 Restaurant Owners (Primary Users)
Owners manage restaurants, menus, and menu items through authenticated APIs.

### 4.2 Restaurant Customers (Secondary Users)
Customers only consume menu data via QR scan without login or signup.

---

## 5. User Roles & Permissions

### 5.1 Owner (Authenticated Role)

Owners authenticate using JWT tokens and have full control over their own data only.

Permissions:
- Register and log in
- Verify email and reset password
- Create and manage restaurants
- Generate and download QR codes
- Create, activate, deactivate menus
- Publish and unpublish menus
- Add, update, activate, deactivate menu items
- Soft delete restaurants, menus, and items

### 5.2 Customer (Public Role)

Customers access the system only via QR scan.

Permissions:
- View restaurant details
- View published menus
- View available menu items
- No write access
- No authentication

---

## 6. Functional Requirements

### 6.1 Authentication & Authorization

- Email-based registration
- Email verification workflow
- JWT-based login
- Secure logout
- Password reset using email tokens
- HTTP-only cookies for token storage
- Role-based access enforcement

---

### 6.2 Restaurant Management

- Create restaurant
- Fetch owner-specific restaurants
- Fetch restaurant by ID
- Update restaurant details
- Activate or deactivate restaurant
- Soft delete restaurant
- Generate and retrieve restaurant QR code

Each restaurant belongs to **one owner**, enforced at the database level.

---

### 6.3 Menu Management

- Create menus under a restaurant
- Fetch menus by restaurant
- Activate or deactivate menus
- Publish or unpublish menus

Only **active and published menus** are visible publicly.

---

### 6.4 Menu Item Management

- Add menu items to menus
- Update menu item details
- Toggle item availability
- Soft delete items instead of permanent deletion

Only **available items** appear in public views.

---

### 6.5 Public Menu Access (QR Flow)

- QR scan redirects to frontend route `/menu/:restaurantId`
- Frontend calls public backend API
- Backend returns:
  - Restaurant details
  - Published menus only
  - Available menu items only
- No sensitive fields exposed

---

## 7. High-Level System Design

This section describes the overall architecture, backend layering, API access separation, and QR-based data flow of the system.

---

### 7.1 Architecture Overview

The system utilizes a modern web architecture that separates administrative actions (Owner) from consumer actions (Customer) through a central API Gateway.



* **Owner Dashboard (Authenticated):** Managed via an Express.js API Gateway, feeding into the Business Logic Layer and MongoDB.
* **Customer (QR Scan):** Accesses a specific frontend route (`/menu/:restaurantId`) which interacts with a specialized Public API Layer.

---

### 7.2 Backend Layered Architecture

To ensure maintainability and scalability, the backend follows a strict separation of concerns:

**Data Flow:**
`Routes` → `Controllers` → `Services (Business Logic)` → `Models (Mongoose)` → `Database`

| Layer | Responsibility |
| :--- | :--- |
| **Routes** | API entry points and URL definition. |
| **Controllers** | Request handling, input extraction, and response formatting. |
| **Services** | Core business logic, complex validations, and system rules. |
| **Models** | Database schemas and direct Mongoose query operations. |

---

### 7.3 Public vs Private API Separation

Security is maintained by strictly isolating administrative functions from public-facing menu data.

| API Type | Access | Purpose |
| :--- | :--- | :--- |
| **Private APIs** | JWT Required | Owner operations (Editing menus, settings, analytics). |
| **Public APIs** | No Auth | QR-based menu access for customers. |

> **Note:** Private APIs are protected using authentication and ownership checks, while Public APIs are read-only and strictly filtered to prevent data leakage.

---

### 7.4 QR Code System Design

The system uses a persistent QR code strategy to link physical tables to the digital menu.

* **Single Source:** Each restaurant has a single, unique QR code.
* **Static Generation:** QR is generated once upon restaurant creation.
* **Frontend-Centric:** The QR contains the **Frontend URL** only; Backend URLs are never exposed to the end-user.
* **Data Integrity:** Public APIs return only "Published" menus and available items.

#### QR Flow
1.  **Creation:** Owner creates a restaurant profile.
2.  **Generation:** Backend generates a QR code containing the unique Frontend URL.
3.  **Storage:** The QR code (or its link) is stored in the restaurant document.
4.  **Discovery:** Customer scans the QR code.
5.  **Retrieval:** Frontend extracts the `restaurantId` from the URL.
6.  **Display:** Frontend calls the public API; Backend returns the filtered menu data.

## 8. System Architecture

### 8.1 High-Level Architecture

```text
Owner Dashboard (Authenticated)
        |
        v
Backend (Protected APIs)
        |
        v
MongoDB database
        |
        v
Customer (QR Scan)
        |
        v
Frontend (/menu/:restaurantId)
        |
        v
Backend (Public APIs)

```



## 8.2 Technology Stack

### Frontend
- **React.js** – Component-based UI development
- **Axios** – HTTP client for API communication
- **React Router DOM** – Client-side routing for public and protected routes

### Backend
- **Node.js** – JavaScript runtime environment
- **Express.js** – REST API framework
- **MongoDB** – NoSQL database for scalable data storage
- **Mongoose** – Object Data Modeling (ODM) for MongoDB
- **JWT Authentication** – Secure stateless authentication
- **bcrypt** – Password hashing and security
- **Express Validator** – Request validation and sanitization
- **QRCode** – QR code generation for restaurants
- **Nodemailer** – Email verification and password reset

### Database
- **MongoDB** – NoSQL database for flexible and scalable data storage
- **Mongoose ODM** – Schema-based data modeling and validation layer for MongoDB

### Tools & Utilities
- **QR Code Generator** – Generates QR codes containing frontend URLs for restaurants
- **dotenv** – Environment variable management
- **ESLint** – Static code analysis for maintaining code quality
- **Prettier** – Automated code formatting for consistency


---

## 9. API Design (High-Level)

### Authentication
## Authentication APIs

```text
POST   /api/v1/users/register
POST   /api/v1/users/login
POST   /api/v1/users/logout
GET    /api/v1/users/me
GET    /api/v1/users/verify-email/:token
POST   /api/v1/users/resend-verification
POST   /api/v1/users/forgot-password
POST   /api/v1/users/reset-password/:token
POST   /api/v1/users/refresh-token
PATCH  /api/v1/users/change-password
```

### Restaurant
```text
POST   /api/v1/restaurants
GET    /api/v1/restaurants
GET    /api/v1/restaurants/:restaurantId
PATCH  /api/v1/restaurants/:restaurantId
PATCH  /api/v1/restaurants/:restaurantId/activate
PATCH  /api/v1/restaurants/:restaurantId/delete
GET    /api/v1/restaurants/:restaurantId/qr
```

### Menu
```text
POST   /api/v1/menus/:restaurantId
GET    /api/v1/menus/:restaurantId
PATCH  /api/v1/menus/:menuId/activate
PATCH  /api/v1/menus/:menuId/deactivate
PATCH  /api/v1/menus/:menuId/publish
PATCH  /api/v1/menus/:menuId/unpublish
```
### Menu Items
```text
POST   /api/v1/menu-items/menu/:menuId
GET    /api/v1/menu-items/menu/:menuId
PATCH  /api/v1/menu-items/:itemId
PATCH  /api/v1/menu-items/:itemId/toggle

```
### public Api
```text
 GET    /api/v1/public/menu/:restaurantId
```
### health-check Api
```text
GET    /api/v1/health
```

## 10. Database Design & Relationships

The database is designed using **MongoDB** with proper normalization and clear one-to-many relationships to ensure scalability and maintainability.

---

### 10.1 User (Owner / Admin)

Represents restaurant owners or administrators who manage restaurants and menus.

#### User Schema

| Field Name                     | Type      | Description |
|--------------------------------|-----------|-------------|
| `_id`                          | ObjectId  | Unique user identifier |
| `ownername`                    | String    | Owner/Admin name |
| `email`                        | String    | Unique email address |
| `password`                     | String    | Hashed password |
| `role`                         | String    | `owner` or `admin` |
| `isEmailVerified`              | Boolean   | Email verification status |
| `refreshToken`                 | String    | Stored refresh token |
| `emailVerificationToken`       | String    | Token for email verification |
| `emailVerificationExpiry`      | Date      | Verification token expiry |
| `forgotPasswordToken`          | String    | Password reset token |
| `forgotPasswordExpiry`         | Date      | Password reset expiry |
| `createdAt`                    | Date      | Account creation timestamp |
| `updatedAt`                    | Date      | Last update timestamp |

---

### 10.2 Restaurant

Each restaurant is owned by a single user, and a user can manage multiple restaurants.

#### Restaurant Schema

| Field Name       | Type / Reference        | Description |
|------------------|-------------------------|-------------|
| `_id`            | ObjectId                | Unique restaurant identifier |
| `ownerId`        | ObjectId (ref User)     | Owner of the restaurant |
| `name`           | String                  | Restaurant name |
| `address`        | String                  | Physical address |
| `contactNumber`  | String                  | Contact phone number |
| `qrCodeUrl`      | String                  | Generated QR code URL |
| `isActive`       | Boolean                 | Active/inactive status |
| `createdAt`      | Date                    | Created timestamp |
| `updatedAt`      | Date                    | Updated timestamp |

---

### 10.3 Menu

Each restaurant can have multiple menus (e.g., Breakfast, Lunch, Dinner).

#### Menu Schema

| Field Name        | Type / Reference            | Description |
|------------------|-----------------------------|-------------|
| `_id`            | ObjectId                    | Unique menu identifier |
| `restaurantId`   | ObjectId (ref Restaurant)   | Associated restaurant |
| `title`          | String                      | Menu title |
| `isPublished`    | Boolean                     | Public visibility status |
| `createdAt`      | Date                        | Created timestamp |
| `updatedAt`      | Date                        | Updated timestamp |

---

### 10.4 MenuItem

Menu items belong to a specific menu and represent individual food items.

#### MenuItem Schema

| Field Name     | Type / Reference       | Description |
|---------------|------------------------|-------------|
| `_id`         | ObjectId               | Unique item identifier |
| `menuId`      | ObjectId (ref Menu)    | Parent menu |
| `name`        | String                 | Item name |
| `description` | String                 | Item description |
| `price`       | Number                 | Item price |
| `category`    | String                 | Category (Starters, Main Course, etc.) |
| `image`       | String                 | Item image URL |
| `isAvailable` | Boolean                | Availability status |
| `createdAt`   | Date                   | Created timestamp |
| `updatedAt`   | Date                   | Updated timestamp |

---

### 10.5 Entity Relationships

```text
User (Owner/Admin)
   │ 1-to-many
   ▼
Restaurant
   │ 1-to-many
   ▼
Menu
   │ 1-to-many
   ▼
MenuItem

---
```

---

## 12. Key Design Decisions

The system architecture is built on a "strict-hierarchy" model to ensure data integrity and ease of management.



* **Hierarchical Scaling:**
    * **One owner → many restaurants:** Allows business groups to manage multiple locations from one account.
    * **One restaurant → many menus:** Supports time-based menus (e.g., "Breakfast Menu", "Happy Hour").
    * **One menu → many items:** Granular control over specific food entries.
* **Data Persistence Strategy:** * **Soft Deletes:** Instead of `REMOVING` data, we use boolean flags (`isDeleted: true`). This prevents broken links if a customer scans an old QR code and allows for data recovery.
* **Performance Optimization:** * **Indexed Foreign Keys:** MongoDB indexes are applied to `ownerId`, `restaurantId`, and `menuId` to ensure sub-second query speeds even as the database grows.

---

## 13. Security Design

A "Security-First" approach is applied to separate administrative power from public access.



| Feature | Implementation |
| :--- | :--- |
| **Authentication** | Stateless **JWT (JSON Web Tokens)** for session management. |
| **Storage** | **HTTP-Only Cookies** to prevent Cross-Site Scripting (XSS) attacks. |
| **Authorization** | **Role-Based Access Control (RBAC)** ensures only owners can edit their specific restaurants. |
| **Query Validation** | Middleware enforces that `req.user.id` matches the `ownerId` of the resource being accessed. |
| **Public Safety** | Public APIs are **Read-Only** and strictly filtered to exclude sensitive fields (e.g., owner emails, internal IDs). |

---

## 14. Extendability & Future Roadmap

The system is designed with a "Plug-and-Play" architecture, allowing for seamless integration of future modules:

1.  **Phase 1 (Current):** Digital menu browsing and QR management.
2.  **Phase 2 (Ordering):** Real-time cart system and "Order to Table" functionality.
3.  **Phase 3 (Payments):** Integration with **Stripe** or **Razorpay** for contactless checkout.
4.  **Phase 4 (Insights):** Analytics dashboard showing most-viewed items and peak scan times.
5.  **Phase 5 (Localization):** Multi-language menu support for international tourists.

---

## 15. Summary

The **SmartMenu** system represents a production-grade backend architecture. By balancing **security** (JWT/Ownership checks) with **user experience** (Public Read-Only APIs/QR Flow), the platform provides a scalable solution for the modern hospitality industry. It demonstrates a deep understanding of RESTful principles, database normalization, and robust error handling.

---
