import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
import Navbar from "@/components/navbar"
import { LoginForm } from "@/components/login-form"

function Login() {
  return (
    <>
      <Head>
        <title>Connexion - TrackFit</title>
        <meta
          name="description"
          content="Se connecter à TrackFit"
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  )
}

export default Login
