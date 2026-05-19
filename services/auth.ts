import { fetcher } from '@/lib/api'
import type { User, AuthTokens, LoginCredentials, RegisterData } from '@/types'

// Login
export async function login(credentials: LoginCredentials): Promise<AuthTokens> {
  return fetcher<AuthTokens>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

// Get current user profile
export async function getProfile(token: string): Promise<User> {
  return fetcher<User>('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Register new user — trailing slash required by API
export async function register(data: RegisterData): Promise<User> {
  return fetcher<User>('/users/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Check email availability
export async function checkEmailAvailable(
  email: string
): Promise<{ isAvailable: boolean }> {
  return fetcher<{ isAvailable: boolean }>('/users/is-available', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

// Refresh token
export async function refreshToken(
  token: string
): Promise<AuthTokens> {
  return fetcher<AuthTokens>('/auth/refresh-token', {
    method: 'POST',
    body: JSON.stringify({ refreshToken: token }),
  })
}

// Update user profile
export async function updateUser(
  id: number,
  data: { name?: string; email?: string; avatar?: string },
  token: string
): Promise<User> {
  return fetcher<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}