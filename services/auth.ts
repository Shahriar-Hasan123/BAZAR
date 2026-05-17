import { fetcher } from "@/lib/api";
import type { User, AuthTokens, LoginCredentials, RegisterData } from "@/types";

// Login — returns access and refresh tokens
export async function login(
  credentials: LoginCredentials,
): Promise<AuthTokens> {
  return fetcher<AuthTokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// Get current user profile (requires token)
export async function getProfile(token: string): Promise<User> {
  return fetcher<User>("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Register new user
export async function register(data: RegisterData): Promise<User> {
  return fetcher<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Check if email is already taken
export async function checkEmailAvailable(
  email: string,
): Promise<{ isAvailable: boolean }> {
  return fetcher<{ isAvailable: boolean }>("/users/is-available", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// Refresh access token
export async function refreshToken(token: string): Promise<AuthTokens> {
  return fetcher<AuthTokens>("/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify({ refreshToken: token }),
  });
}
