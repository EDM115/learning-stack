import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
import Navbar from "@/components/navbar"

function Nutrition() {
  return (
    <>
      <Head>
        <title>Ma nutrition - TrackFit</title>
        <meta
          name="description"
          content="Gérez votre alimentation pour atteindre vos objectifs."
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <h1>Ma nutrition</h1>
      </main>
    </>
  )
}

export default Nutrition
