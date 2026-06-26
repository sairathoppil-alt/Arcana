import { apiClient, setAuthToken } from '@/api/axios'

export interface BackendUser {
  id: number
  username: string
  email: string
  profile_picture?: string | null
  bio?: string | null
  created_at?: string
  updated_at?: string
}

export interface AuthUser {
  id: string
  username: string
  email: string
  displayName: string
  avatarUrl?: string
  bio?: string
  createdAt?: string
}

function normalizeUser(user: BackendUser): AuthUser {
  return {
    id: String(user.id),
    username: user.username,
    email: user.email,
    displayName: user.username,
    avatarUrl: user.profile_picture ?? undefined,
    bio: user.bio ?? undefined,
    createdAt: user.created_at ?? undefined,
  }
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = error.response as { status?: number; data?: { detail?: string | string[] } }
    if (response?.status === 401) {
      return 'Invalid email or password.'
    }
    if (response?.status === 403) {
      return 'Your access is not permitted.'
    }
    if (response?.status === 409) {
      return 'This account already exists. Please sign in instead.'
    }
    if (response?.data?.detail) {
      if (Array.isArray(response.data.detail)) {
        return response.data.detail[0] ?? 'Something went wrong.'
      }
      return response.data.detail
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Unable to reach the server. Please try again.'
}

export async function register(username: string, email: string, password: string): Promise<AuthUser> {
  try {
    const { data } = await apiClient.post<BackendUser>('/auth/register', {
      username,
      email,
      password,
    })
    return normalizeUser(data)
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function login(email: string, password: string): Promise<AuthUser> {
  try {
    const { data } = await apiClient.post<{ access_token: string; token_type: string; user: BackendUser }>('/auth/login', {
      email,
      password,
    })

    setAuthToken(data.access_token)
    return normalizeUser(data.user)
  } catch (error) {
    setAuthToken(null)
    throw new Error(getErrorMessage(error))
  }
}

export async function getCurrentUser(): Promise<AuthUser> {
  try {
    const { data } = await apiClient.get<BackendUser>('/auth/me')
    return normalizeUser(data)
  } catch (error) {
    setAuthToken(null)
    throw new Error(getErrorMessage(error))
  }
}

export { getErrorMessage }
