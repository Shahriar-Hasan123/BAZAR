// CATEGORY
// Matches: GET /api/v1/categories
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

// PRODUCT
// Matches: GET /api/v1/products
export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

// USER
// Matches: GET /api/v1/users

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin"; // only two possible values
  avatar: string;
}

// AUTH
// Matches: POST /api/v1/auth/login response
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  avatar?: string; // ← ? means optional
}

// CART (our own type, not from API)
export interface CartItem {
  product: Product;
  quantity: number;
}

// LOCATION
// Matches: GET /api/v1/locations
export interface Location {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

// API QUERY PARAMS
// These match the filter params from the API docs
export interface ProductsParams {
  offset?: number;
  limit?: number;
  title?: string;
  price?: number;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  categorySlug?: string;
}
