import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getMe } from "@/utils/auth"
import { nunitoSans } from "@/utils/fonts"
import Navbar from "@/components/navbar"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getMe()
        if (user) {
          router.push("/me/dashboard")
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
      }
    }
    checkUser()
  }, [router])

  if (isLoading) {
    return null
  }

  return (
    <>
      <Head>
        <title>Inscription - TrackFit</title>
        <meta
          name="description"
          content="S'inscrire à TrackFit"
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <SignupForm />
          </div>
        </div>
      </main>
    </>
  )
}
