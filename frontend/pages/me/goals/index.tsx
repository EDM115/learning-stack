import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
import Navbar from "@/components/navbar"

function Goals() {
  return (
    <>
      <Head>
        <title>Mes objectifs - TrackFit</title>
        <meta
          name="description"
          content="Définissez vos objectifs et suivez vos progrès."
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <h1>Mes objectifs</h1>
      </main>
    </>
  )
}

export default Goals
