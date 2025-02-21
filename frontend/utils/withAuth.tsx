import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getMe } from "@/utils/auth"

import { Skeleton } from "@/components/ui/skeleton"

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await getMe()
          setIsLoading(false)
        } catch (error) {
          router.replace("/login")
        }
      }

      checkAuth()
    }, [router])

    if (isLoading) {
      return <>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Chargement...</h1>
          <Skeleton className="w-96 h-96 mt-4" />
        </div>
      </>
    }

    return <Component {...props} />
  }
}
