import axios from "axios"
import { getAuthToken, setAuthToken, removeAuthToken } from "./cookies"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3030"

axios.defaults.baseURL = BACKEND_URL

axios.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" 
    ? localStorage.getItem("token") 
    : getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export interface AuthResponse {
  user: {
    id: string
    email: string
    name?: string
  }
  token: string
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await axios.post("/auth/login", { email, password })
  const { token } = response.data
  
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
  }
  setAuthToken(token)

  return response.data
}

export async function register(email: string, password: string, name?: string): Promise<AuthResponse> {
  const response = await axios.post("/auth/register", { email, password, name })
  const { token } = response.data

  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
  }
  setAuthToken(token)

  return response.data
}

export async function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
  }

  removeAuthToken()
}

export async function getMe(): Promise<AuthResponse["user"]> {
  const response = await axios.get("/auth/me")

  return response.data.user
}
