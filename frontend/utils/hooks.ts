import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getMe, logout } from "./auth"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMe()
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    await logout()
    setIsAuthenticated(false)
    router.push("/")
  }

  return {
    isAuthenticated,
    isLoading,
    logout: handleLogout
  }
}