# Product Requirements Document (PRD)
## SmartMenu – QR-Based Restaurant Menu Management System

---

## 1. Product Overview

### 1.1 Product Name
**SmartMenu**  
(QR-Based Digital Restaurant Menu Management System)

### 1.2 Product Vision
To digitize restaurant menus using QR codes, enabling restaurant owners to manage menus dynamically while allowing customers to access menus instantly without installing any application.

### 1.3 Objective
Replace traditional paper menus with a scalable, secure, and user-friendly digital menu system built using the MERN stack.

---

## 2. Problem Statement

In India, many small and medium restaurants still rely on printed menus, which lead to:

- High reprinting costs when menu items or prices change
- Poor hygiene due to shared physical menus
- Difficulty in marking items as unavailable
- Limited scalability for restaurants with multiple branches

There is a strong need for a **simple, cost-effective, and scalable digital menu solution** that works without customer authentication.

---

## 3. Target Users

### 3.1 Primary Users
- **Restaurant Owners (Admins)**  
  Manage restaurant profile and menu items.

### 3.2 Secondary Users
- **Restaurant Customers**  
  View menus by scanning a QR code (no login required).

---

## 4. User Roles & Permissions

### 4.1 Restaurant Owner (Admin)
**Permissions**
- Register and authenticate securely
- Create and manage restaurant profile
- Add, update, delete menu items
- Mark items as available/unavailable
- Generate and manage QR codes
- Access protected admin dashboard

### 4.2 Customer (Public User)
**Permissions**
- Scan QR code
- View restaurant menu
- Filter menu items by category
- View price, description, and availability

> Customers have **read-only access** and do not require authentication.

---

## 5. User Journey & Flow

### 5.1 Admin Flow
1. Owner registers or logs in
2. Server generates JWT token
3. Token is stored securely in HTTP-only cookies
4. Owner accesses protected dashboard
5. Owner manages restaurant and menu
6. QR code is generated for customer access

### 5.2 Customer Flow
1. Customer scans QR code
2. Menu URL opens in browser
3. Backend fetches restaurant menu
4. Menu is displayed instantly

---

## 6. Functional Requirements

### 6.1 Authentication
- Email and password-based authentication
- Password hashing using bcrypt
- JWT-based session management
- Secure cookie storage

### 6.2 Authorization
- Role-based access control (RBAC)
- Admin-only access for menu modifications
- Public read-only access for customers

### 6.3 Restaurant Management
- Create restaurant profile
- Update restaurant details
- Associate restaurant with owner account

### 6.4 Menu Management
- Add menu items
- Update menu items
- Delete menu items
- Enable or disable availability
- Categorize menu items (Veg, Non-Veg, Drinks, etc.)

### 6.5 QR Code System
- Generate unique QR code per restaurant
- QR links to public menu page
- QR contains restaurant identifier

### 6.6 Health Check System
- Expose a public health check endpoint
- Used for monitoring server availability
- Returns standardized API response

---

## 7. Non-Functional Requirements

### 7.1 Performance
- API response time < 300ms
- Optimized MongoDB queries
- Proper indexing strategy

### 7.2 Security
- Password hashing
- JWT verification middleware
- Protected routes
- Input validation and sanitization

### 7.3 Scalability
- Support multiple restaurants
- Modular backend architecture
- Easy extension for future features

### 7.4 Reliability
- Centralized error handling
- Standardized API responses
- Graceful failure handling

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

### Utilities & Tools
- QR Code Generator
- dotenv
- ESLint
- Prettier

---

## 9. API Design (High-Level)

### System
- GET `/api/health` – Health check endpoint

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Restaurant
- POST `/api/restaurants`
- GET `/api/restaurants/:id`

### Menu
- POST `/api/menu`
- GET `/api/menu/:restaurantId`
- PUT `/api/menu/:menuId`
- DELETE `/api/menu/:menuId`

---

## 10. Database Design

### User
- _id
- name
- email
- password (hashed)
- role

### Restaurant
- _id
- name
- ownerId
- address
- qrCodeUrl

### MenuItem
- _id
- restaurantId
- name
- price
- category
- image
- isAvailable

---

## 11. Constraints & Assumptions

### Assumptions
- Each restaurant has one owner
- Customers have smartphones capable of scanning QR codes

### Constraints
- No online ordering or payment processing
- No third-party authentication (OAuth)

---

## 12. Future Enhancements (Out of Scope)
- Online ordering system
- Payment gateway integration
- Multi-language menu support
- Analytics dashboard
- Customer reviews and ratings

---

## 13. Success Metrics
- Admin can manage menu without developer support
- Menu loads within 2 seconds after QR scan
- Secure access to admin dashboard
- Clean and maintainable codebase

---

## 14. Conclusion

SmartMenu delivers a real-world, scalable, and secure digital menu solution using the MERN stack while following industry best practices suitable for entry-level full-stack developer roles.
