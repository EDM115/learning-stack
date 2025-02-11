import Head from "next/head"
import Image from "next/image"
import { comfortaa } from "@/utils/fonts"

import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <>
      <Head>
        <title>TrackFit</title>
        <meta
          name="description"
          content="TrackFit"
        />
        <link
          rel="icon"
          href="/trackfit_cropped.png"
        />
      </Head>
      <Navbar />
      <main
        className={`${comfortaa.variable} font-[family-name:var(--font-comfortaa)] flex flex-col items-center justify-center`}
      >
        <Image
          src="/trackfit_upscaled.png"
          alt="TrackFit logo"
          width={180}
          height={180}
          className="rounded-lg"
          priority
        />
        <h1 className="text-4xl font-bold">TrackFit</h1>
        <p className="text-lg">
          TrackFit est un tracker de fitness qui vous aide à suivre vos séances
          d&apos;entraînement et vos progrès.
        </p>
      </main>
    </>
  )
}
