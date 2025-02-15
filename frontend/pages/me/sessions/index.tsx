import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
import Navbar from "@/components/navbar"

function Sessions() {
  return (
    <>
      <Head>
        <title>Mes séances - TrackFit</title>
        <meta
          name="description"
          content="Consultez vos séances d'entraînement."
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <h1>Mes séances</h1>
      </main>
    </>
  )
}

export default Sessions
