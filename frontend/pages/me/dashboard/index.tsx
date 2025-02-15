import Head from "next/head"
import { nunitoSans } from "@/utils/fonts"
import Navbar from "@/components/navbar"

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - TrackFit</title>
        <meta
          name="description"
          content="Accédez à votre tableau de bord pour visualiser vos progrès."
        />
      </Head>
      <Navbar />
      <main
        className={`${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)] flex flex-col items-center justify-center`}
      >
        <h1>Dashboard</h1>
      </main>
    </>
  )
}

export default Dashboard
