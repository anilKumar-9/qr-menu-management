# Product Requirements Document (PRD)
## SmartMenu – QR-Based Restaurant Menu Management System

---

## 1. Product Overview

### 1.1 Product Name
**SmartMenu**  
QR-Based Digital Restaurant Menu Management System

### 1.2 Product Vision
To replace traditional paper menus with a digital, QR-based menu system that allows restaurant owners to manage menus dynamically and enables customers to view menus instantly without installing any application.

### 1.3 Objective
Build a scalable, secure, and easy-to-use restaurant menu management system using the MERN stack, following clean architecture and industry best practices.

---

## 2. Problem Statement

Many restaurants still use printed menus, leading to:
- High reprinting costs when prices or items change
- Hygiene concerns due to shared physical menus
- Difficulty marking items as unavailable
- Poor scalability for restaurants with multiple branches

SmartMenu solves these problems by providing a real-time, QR-based digital menu platform.

---

## 3. Target Users

### 3.1 Primary Users
**Restaurant Owners / Admins**
- Manage restaurants and menus
- Control item pricing and availability

### 3.2 Secondary Users
**Customers (Public Users)**
- View menus by scanning QR codes
- No login or authentication required

---

## 4. User Roles & Permissions

### 4.1 Owner / Admin
- Secure authentication (email & password)
- Create and manage restaurant profiles
- Create, update, and publish menus
- Add, update, delete menu items
- Toggle item availability
- Generate and manage QR codes
- Access protected admin dashboard

### 4.2 Customer (Public)
- Scan QR code
- View restaurant menu
- Read-only access

---

## 5. User Flow

### 5.1 Owner Flow
1. Owner registers or logs in
2. JWT access and refresh tokens are issued
3. Tokens stored in HTTP-only cookies
4. Owner accesses protected dashboard
5. Owner manages restaurants, menus, and items
6. QR code is generated for customer access

### 5.2 Customer Flow
1. Customer scans QR code
2. Public menu URL opens in browser
3. Backend fetches restaurant menu data
4. Menu is displayed instantly

---

## 6. Functional Requirements

### 6.1 Authentication
- Email and password authentication
- Password hashing using bcrypt
- JWT-based authentication with refresh tokens

### 6.2 Authorization
- Role-based access control (RBAC)
- Admin-only access for create/update/delete operations
- Public read-only access for customers

### 6.3 Restaurant Management
- Create restaurant
- Update restaurant details
- Activate or deactivate restaurant
- Associate restaurant with owner account

### 6.4 Menu Management
- Create menus per restaurant
- Publish or unpublish menus
- Add, update, delete menu items
- Categorize menu items
- Control item availability

### 6.5 QR Code System
- Generate a unique QR code per restaurant
- QR code links to public menu endpoint
- QR contains restaurant identifier

---

## 7. Non-Functional Requirements

- API response time under 300ms
- Secure token handling
- Optimized MongoDB queries with indexing
- Centralized error handling and logging

---

## 8. Technology Stack

### Frontend
- React.js
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database
- MongoDB
- Mongoose ODM

### Tools & Utilities
- QR Code Generator
- dotenv
- ESLint
- Prettier

---

## 9. API Design (High-Level)

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Restaurant
- POST `/api/restaurants`
- GET `/api/restaurants/:restaurantId`
- PUT `/api/restaurants/:restaurantId`

### Menu
- POST `/api/menus`
- GET `/api/menus/:restaurantId`
- PUT `/api/menus/:menuId`
- DELETE `/api/menus/:menuId`

### Menu Items
- POST `/api/menu-items`
- PUT `/api/menu-items/:itemId`
- DELETE `/api/menu-items/:itemId`

---

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

## 11. Constraints & Assumptions

### Assumptions
- One owner can manage multiple restaurants
- Customers have QR-enabled smartphones

### Constraints
- No online ordering or payment support
- No OAuth or third-party authentication

---

## 12. Future Enhancements

- Online ordering and payment integration
- Multi-language menu support
- Analytics dashboard
- Staff role management
- Customer reviews and ratings

---

## 13. Success Metrics

- Menu loads within **2 seconds** after QR scan
- Owner can manage menus without developer assistance
- Secure admin dashboard access
- Clean and maintainable codebase

---

## 14. Conclusion

**SmartMenu** is a scalable and secure **QR-based restaurant menu management system** built using the **MERN stack**, following proper database normalization, role-based access control, and real-world backend architecture principles.
