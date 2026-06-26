import axios from 'axios'

const AUTH_TOKEN_STORAGE_KEY = 'arcana.auth.token'

function getStoredToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const saved = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
    if (!saved) {
      return null
    }

    const parsed = JSON.parse(saved) as { token?: string | null }
    return parsed.token ?? null
  } catch {
    return null
  }
}

export function setAuthToken(token: string | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (!token) {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
    return
  }

  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify({ token }))
}

export function clearAuthToken() {
  setAuthToken(null)
}

export function getAuthToken() {
  return getStoredToken()
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000',
  headers: {
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAuthToken()
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.assign('/login')
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
