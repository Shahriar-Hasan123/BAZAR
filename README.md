# 🛍️ Bazar - E-Commerce Platform

A modern, full-featured e-commerce platform built with **Next.js 16**, **React 19**, and **TypeScript**. Features a responsive design, dark mode support, product browsing, shopping cart, user authentication, and a complete checkout flow.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3-06b6d4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Development](#development)
- [Building](#building)
- [Key Features Explained](#key-features-explained)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Theme System](#theme-system)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Bazar** is a production-ready e-commerce platform designed with scalability and user experience in mind. It provides customers with an intuitive interface to browse products, manage their shopping cart, and complete purchases with a seamless checkout experience.

The platform integrates with the **Platzi Fake Store API** for demonstration purposes and can be easily adapted to work with any backend API.

---

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog**: Browse 200+ products with detailed information
- **Smart Search**: Real-time search functionality with debouncing
- **Advanced Filtering**: Filter by category and price range
- **Sorting Options**: Sort products by price (low/high) and newest first
- **Pagination**: 12 products per page for smooth browsing
- **Product Details**: High-quality image gallery and comprehensive specifications

### 🛍️ Cart & Checkout
- **Persistent Cart**: Cart data saved to localStorage, survives page refreshes
- **Real-time Updates**: Add, remove, and update quantities instantly
- **Order Summary**: Clear breakdown of items, subtotal, tax, and total
- **Checkout Flow**: Multi-step form with validation and confirmation

### 👤 User Management
- **User Registration**: Email validation and password confirmation
- **User Login**: Secure authentication with JWT tokens
- **Protected Routes**: Checkout and account pages require authentication
- **Session Management**: Tokens stored securely in cookies and localStorage
- **User Profile**: View account information and past orders

### 🎨 User Interface
- **Dark Mode Support**: System preference detection with manual override
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Loading States**: Skeleton screens for better perceived performance
- **Error Handling**: User-friendly error pages and messages
- **Smooth Transitions**: CSS transitions for theme switching

### 📱 Mobile-First
- Touch-optimized buttons and interactive elements
- Mobile-responsive navigation menu
- Optimized image sizes for different screen sizes
- Fast loading times on mobile networks

---

## 🔧 Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Runtime** | Node.js 20+ | JavaScript runtime |
| **Framework** | Next.js 16.2.6 | React meta-framework with SSR/SSG |
| **Frontend** | React 19.2.4 | UI library with hooks |
| **Language** | TypeScript 5.9 | Type-safe JavaScript |
| **Styling** | Tailwind CSS 4.3 | Utility-first CSS framework |
| **Styling** | PostCSS 4 | CSS transformation |
| **State** | Zustand 5.0.13 | Lightweight state management |
| **Forms** | React Hook Form 7.76 | Efficient form handling |
| **Validation** | Zod 4.4.3 | TypeScript-first schema validation |
| **Theme** | next-themes 0.4.6 | Dark mode provider |
| **Utilities** | js-cookie 3.0.7 | Cookie management |
| **Linting** | ESLint 9.39 | Code quality |
| **Development** | TypeScript | Type checking |

---

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** 20.0 or higher ([download](https://nodejs.org/))
- **npm** 10.0 or higher (comes with Node.js)
- **Git** for version control

Verify installation:
```bash
node --version   # v20.x.x
npm --version    # 10.x.x
git --version    # 2.x.x
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bazar.git
cd bazar
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1

# Node Environment
NODE_ENV=development
```

**Note**: All variables use `NEXT_PUBLIC_` prefix, making them safe to expose in the browser.

### 4. Verify Installation

```bash
npm ls
```

You should see all dependencies listed without errors.

---

## ⚙️ Configuration

### Next.js Configuration
- **Image Optimization**: Configured with remote patterns for API images
- **Routes**: Middleware handles protected routes and redirects
- **TypeScript Paths**: `@/` prefix for absolute imports

### Tailwind CSS Configuration
- **Dark Mode**: Class-based strategy for manual theme switching
- **Content Paths**: Scans app/, components/, features/, and providers/ directories
- **CSS Variables**: Custom color system for theme consistency

### TypeScript Configuration
- **Strict Mode**: Enabled for maximum type safety
- **Path Aliases**: `@/*` maps to all source files
- **Target**: ES2020 with module: ESNext

---

## 📁 Project Structure

```
bazar/
├── app/                          # Next.js App Router pages and layouts
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles and CSS variables
│   ├── products/                # Product listing and details
│   ├── categories/              # Category pages
│   ├── search/                  # Search results
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Checkout flow
│   ├── login/ & register/       # Authentication pages
│   └── account/                 # User account page
│
├── components/                   # Reusable UI components
│   ├── layout/                  # Header, Footer
│   ├── ui/                      # Button, Input, Card, Pagination, etc.
│   └── home/                    # Homepage sections
│
├── features/                     # Feature-specific complex components
│   ├── products/                # Product filtering, gallery, add to cart
│   ├── cart/                    # Cart items, checkout form
│   └── search/                  # Search input
│
├── services/                     # API layer (Zustand)
│   ├── auth.ts                  # Authentication endpoints
│   ├── products.ts              # Product endpoints
│   └── categories.ts            # Category endpoints
│
├── store/                        # Zustand state management
│   ├── authStore.ts             # User authentication state
│   └── cartStore.ts             # Shopping cart state
│
├── lib/                          # Utilities and schemas
│   ├── api.ts                   # API base configuration
│   ├── authSchema.ts            # Zod validation schemas
│   └── checkoutSchema.ts        # Form validation schemas
│
├── types/                        # Centralized TypeScript types
│   └── index.ts                 # All type definitions
│
├── utils/                        # Helper functions
│   ├── format.ts                # Number, currency formatting
│   ├── image.ts                 # Image URL construction
│   └── sort.ts                  # Product sorting logic
│
├── hooks/                        # Custom React hooks
│   └── useDebounce.ts           # Debounce hook for search
│
├── providers/                    # Context providers
│   └── ThemeProvider.tsx        # Next-themes provider
│
├── public/                       # Static assets
│
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

---

## 💻 Development

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page auto-refreshes on file changes.

### Available Scripts

```bash
# Development
npm run dev          # Start development server on port 3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues automatically

# Dependency Management
npm ls              # List all dependencies
npm prune           # Remove extraneous packages
```

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**: dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense**: bradlc.vscode-tailwindcss
- **TypeScript Vue Plugin**: Vue.volar
- **Prettier**: esbenp.prettier-vscode

---

## 🏗️ Building

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `.next/` directory.

### Build Output
- **Size**: ~150KB gzipped (optimized Next.js bundle)
- **Performance**: Automatic code splitting and lazy loading
- **Static Optimization**: Pre-rendered pages where possible

### Running Production Build

```bash
npm start
```

Server runs on [http://localhost:3000](http://localhost:3000)

---

## 🎯 Key Features Explained

### 🔍 Search Functionality
- Real-time search with debouncing (300ms)
- Searches product titles and descriptions
- Pagination of results (12 items per page)
- Empty state handling with helpful message

### 💰 Shopping Cart
```typescript
// Add item to cart
addToCart(product: Product, quantity: number)

// Remove item
removeFromCart(productId: number)

// Update quantity
updateQuantity(productId: number, quantity: number)

// Get totals
{ items, total, itemCount }
```

### 🎨 Responsive Image Gallery
- Multiple product images with thumbnail selection
- Smooth transitions between images
- Optimized image loading with Next.js Image component
- Fallback for missing images

### 📄 Pagination
- Configurable items per page (default: 12)
- Previous/Next navigation with disabled states
- Direct page number selection
- Current page indicator

---

## 🔌 API Integration

### Base URL Configuration

```typescript
// lib/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.escuelajs.co/api/v1'
```

### API Endpoints

#### Products
- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `GET /products/?limit=100` - Limit results
- `GET /products/?offset=0&limit=10` - Pagination

#### Categories
- `GET /categories` - List all categories
- `GET /categories/:id` - Get category with products

#### Authentication
- `POST /auth/login` - Login user
- `POST /users` - Register new user
- `GET /auth/profile` - Get user profile (requires token)

### Error Handling

```typescript
interface ApiError {
  message: string
  status: number
  details?: unknown
}
```

All API calls include proper error handling with user-friendly messages.

---

## 🏪 State Management

### Cart Store (Zustand)

```typescript
import { useCartStore } from '@/store/cartStore'

const { items, total, addToCart, removeFromCart, updateQuantity } = useCartStore()
```

**Features**:
- Persistent storage with localStorage
- Automatic serialization/deserialization
- TypeScript type safety

### Auth Store (Zustand)

```typescript
import { useAuthStore } from '@/store/authStore'

const { user, isLoggedIn, login, logout, setAuthState } = useAuthStore()
```

**Features**:
- Token management (access token + refresh token)
- User profile caching
- Automatic token refresh

---

## 🔐 Authentication

### Login Flow

1. User enters credentials
2. API validates and returns `access_token` and `refresh_token`
3. Access token stored in `bazar-token` cookie
4. Refresh token stored in localStorage
5. User profile fetched automatically
6. Redirect to dashboard

### Protected Routes

The following routes require authentication:
- `/checkout` - Payment and order submission
- `/account` - User account page

Unauthenticated users are redirected to `/login`.

### Token Management

Tokens are stored:
- **Access Token**: HTTP-only cookie `bazar-token` (safer against XSS)
- **Refresh Token**: localStorage (survives tab closures)

---

## 🎨 Theme System

### Dark Mode Implementation

Built with **next-themes** and **CSS variables**:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
  --border-color: #d1d5db;
}

.dark {
  --bg-primary: #111827;
  --text-primary: #f3f4f6;
  --border-color: #4b5563;
}
```

### Using Theme Colors

```tsx
// Tailwind classes automatically use CSS variables
<div className="bg-bg-primary text-text-primary border border-border-default">
  Content automatically adapts to dark mode
</div>
```

### Theme Toggle

```tsx
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

Vercel is the official hosting platform for Next.js:

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

#### Netlify
```bash
# Build
npm run build

# Deploy dist folder
netlify deploy --prod --dir=.next
```

#### Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Environment Variables

Set on your hosting platform:
```
NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
NODE_ENV=production
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful commit messages
- Test your changes locally

---

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Zustand](https://github.com/pmndrs/zustand)
- API powered by [Platzi Fake Store](https://fakeapi.platzi.com/)

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

*Last updated: May 2026*
