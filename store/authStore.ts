import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import type { User } from '@/types'

interface AuthStore {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken) => {
        // =========================================
        // Save token to cookie so middleware can read it
        // expires: 20 days (matches API token lifetime)
        // =========================================
        Cookies.set('bazar-token', accessToken, {
          expires: 20,
          sameSite: 'lax',
        })

        set({ user, accessToken, refreshToken, isAuthenticated: true })
      },

      logout: () => {
        // Remove cookie on logout
        Cookies.remove('bazar-token')
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
    }),
    { name: 'bazar-auth' }
  )
)