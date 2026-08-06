# System Architecture

## Overview

The QR Menu Management System is a full-stack web application built on the MERN stack (MongoDB, Express.js, React, Node.js). The architecture separates administrative operations from public-facing menu access through a clear API boundary, ensuring security and scalability.

## High-Level Architecture

```text
+-------------------+       +---------------------+       +-------------------+
|                   |       |                     |       |                   |
|  Owner Dashboard  |------>|  Backend API        |------>|  MongoDB          |
|  (React Frontend) |       |  (Express.js)       |       |  (Atlas)          |
|                   |       |                     |       |                   |
+-------------------+       +---------------------+       +-------------------+
         |                            |
         |                            |
         v                            v
+-------------------+       +---------------------+
|                   |       |                     |
|  Customer         |------>|  Public API         |
|  (QR Scan)        |       |  (Read-Only)        |
|                   |       |                     |
+-------------------+       +---------------------+
```

## Frontend Architecture

### Technology Stack

- **React 19** with Vite build tool
- **Tailwind CSS 4** for styling with dark mode support
- **React Router 7** for client-side routing
- **Axios** for API communication
- **Framer Motion** for animations
- **React Hook Form** for form validation
- **jsPDF** for QR code PDF generation

### Directory Structure

```text
frontend/src/
├── api/                    # API service layer
│   ├── auth.api.js        # Authentication endpoints
│   ├── menu.api.js        # Menu endpoints
│   ├── menuitem.api.js    # Menu item endpoints
│   ├── public.api.js      # Public menu endpoints
│   └── restaurant.api.js  # Restaurant endpoints
│
├── components/             # Reusable UI components
│   ├── layout/            # Layout components
│   │   └── AdminLayout.jsx
│   ├── ui/                # Design system components
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Input.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ThemeToggle.jsx
│   └── RestaurantCard.jsx
│
├── context/                # React context providers
│   └── ThemeContext.jsx   # Dark/light theme management
│
├── hooks/                  # Custom React hooks
│   └── useTheme.js        # Theme hook
│
├── pages/                  # Page components
│   ├── AddMenuItem.jsx
│   ├── CreateMenu.jsx
│   ├── CreateRestaurant.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ManageMenuItems.jsx
│   ├── ManageMenus.jsx
│   ├── NotFound.jsx
│   ├── Owner.jsx
│   ├── PublicMenu.jsx
│   └── ShowMenus.jsx
│
├── routes/                 # Route definitions
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
│   └── RestaurantRedirect.jsx
│
└── utils/                  # Utility functions
    └── axios.js           # Axios instance configuration
```

### Routing Architecture

```text
Public Routes:
  /                           -> Home
  /menu/:restaurantId         -> PublicMenu (QR scan destination)
  /register                   -> Owner registration
  /login                      -> Owner login

Protected Routes (JWT required):
  /dashboard                  -> Dashboard
  /create-restaurant          -> Create restaurant
  /manage/restaurant/:id/menus -> Manage menus
  /manage/restaurant/:id/menu/create -> Create menu
  /menu/:menuId/items         -> Manage menu items
  /menu/:menuId/items/add     -> Add menu item

Redirect:
  /restaurant/:restaurantId   -> Redirect to manage menus
```

### Theme System

The application implements a unified black and white theme with dark/light mode support:

- **ThemeContext** manages the current theme state
- Theme preference is persisted in localStorage
- System color scheme preference is detected on first visit
- Inline script in index.html prevents theme flash on page load
- All components use Tailwind CSS dark mode variants
- Theme toggle is available on all pages

## Backend Architecture

### Technology Stack

- **Node.js** runtime
- **Express.js** REST API framework
- **MongoDB** with Mongoose ODM
- **JWT** for stateless authentication
- **bcrypt** for password hashing
- **Express Validator** for request validation
- **QRCode** for QR code generation
- **Nodemailer** for email services
- **Winston** for logging

### Layered Architecture

```text
Routes -> Controllers -> Services -> Models -> Database
```

| Layer | Responsibility |
|-------|---------------|
| Routes | API endpoint definitions and URL mapping |
| Controllers | Request handling, input extraction, response formatting |
| Services | Core business logic and validation |
| Models | Database schemas and Mongoose queries |

### Directory Structure

```text
backend/src/
├── config/                 # Configuration
│   ├── env.js             # Environment variables
│   └── db/                # Database connection
│
├── controllers/            # Request handlers
│   ├── auth.controller.js
│   ├── healthcheck.controller.js
│   ├── menu-items.controller.js
│   ├── menu.controller.js
│   ├── public.controller.js
│   └── restaurant.controller.js
│
├── middlewares/            # Express middleware
│   ├── auth.middleware.js # JWT verification
│   ├── error.middleware.js # Error handling
│   └── validate.middleware.js # Request validation
│
├── models/                 # Mongoose schemas
│   ├── menu-item.model.js
│   ├── menu.model.js
│   ├── owner.model.js
│   └── restaurant.model.js
│
├── routers/                # API route definitions
│   ├── auth.route.js
│   ├── healthcheck.route.js
│   ├── menu-items.route.js
│   ├── menu.route.js
│   ├── public.route.js
│   ├── qr.route.js
│   └── restaurant.route.js
│
├── utils/                  # Helper utilities
│   ├── api-error.js
│   ├── api-response.js
│   ├── async-handler.js
│   ├── cookie-options.js
│   ├── logger.js
│   ├── mail.js
│   └── qr.js
│
└── validators/             # Request validation rules
    ├── menu-items.validator.js
    ├── menu.validate.js
    ├── restaurant.validate.js
    └── user.validate.js
```

## Database Design

### Entity Relationships

```text
Owner (User)
   | 1-to-many
   v
Restaurant
   | 1-to-many
   v
Menu
   | 1-to-many
   v
MenuItem
```

### Data Models

#### Owner

| Field | Type | Description |
|-------|------|-------------|
| ownername | String | Owner name |
| email | String | Unique email address |
| password | String | Hashed password |
| role | String | owner or admin |
| isEmailVerified | Boolean | Email verification status |
| refreshToken | String | Stored refresh token |

#### Restaurant

| Field | Type | Description |
|-------|------|-------------|
| ownerId | ObjectId (ref Owner) | Restaurant owner |
| name | String | Restaurant name |
| address | String | Physical address |
| contactNumber | String | Contact phone |
| qrCodeUrl | String | Generated QR code URL |
| isActive | Boolean | Active status |

#### Menu

| Field | Type | Description |
|-------|------|-------------|
| restaurantId | ObjectId (ref Restaurant) | Parent restaurant |
| title | String | Menu title |
| isPublished | Boolean | Public visibility |

#### MenuItem

| Field | Type | Description |
|-------|------|-------------|
| menuId | ObjectId (ref Menu) | Parent menu |
| name | String | Item name |
| description | String | Item description |
| price | Number | Item price |
| category | String | Item category |
| isAvailable | Boolean | Availability status |

## API Architecture

### Public vs Private API Separation

| API Type | Access | Purpose |
|----------|--------|---------|
| Private APIs | JWT Required | Owner operations (CRUD) |
| Public APIs | No Auth | QR-based menu access |

### Authentication Flow

1. Owner registers with email and password
2. Password is hashed with bcrypt
3. JWT access token and refresh token are generated
4. Tokens are stored in HTTP-only cookies
5. Protected routes verify JWT on each request
6. Ownership is verified for all resource operations

### QR Code Flow

1. Owner creates a restaurant
2. Backend generates a QR code containing the frontend URL
3. QR code is stored in the restaurant document
4. Customer scans the QR code
5. Frontend extracts restaurantId from the URL
6. Frontend calls the public API
7. Backend returns filtered menu data (published menus, available items only)

## Security Architecture

| Feature | Implementation |
|---------|---------------|
| Authentication | Stateless JWT tokens |
| Token Storage | HTTP-only cookies (XSS protection) |
| Authorization | Role-based access control (RBAC) |
| Ownership | Middleware verifies resource ownership |
| Public Safety | Read-only APIs with sensitive field filtering |
| Password Security | bcrypt hashing |
| Data Integrity | Soft deletes with boolean flags |

## Deployment Architecture

### Frontend (Vercel)

- Static site hosting with SPA rewrites
- Environment variable: `VITE_API_URL`
- Automatic builds on git push

### Backend (Render)

- Node.js web service
- Environment variables from `.env.example`
- MongoDB Atlas connection
- Free tier cold start: up to 50 seconds

### Database (MongoDB Atlas)

- Managed MongoDB cluster
- Indexed foreign keys for query performance
- Automatic backups

## Performance Considerations

- Indexed foreign keys (ownerId, restaurantId, menuId)
- Public API filtering at the database level
- Client-side caching with React state
- Lazy loading of QR codes
- Optimized bundle with Vite

## Future Roadmap

1. **Phase 1 (Current):** Digital menu browsing and QR management
2. **Phase 2:** Real-time cart system and order-to-table functionality
3. **Phase 3:** Payment integration (Stripe or Razorpay)
4. **Phase 4:** Analytics dashboard (most-viewed items, peak scan times)
5. **Phase 5:** Multi-language menu support
