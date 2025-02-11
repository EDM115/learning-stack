import Head from "next/head"
import Image from "next/image"

import Navbar from "@/components/navbar"
import { comfortaa } from "@/utils/fonts"

export default function Home() {
  return (
    <>
      <Head>
        <title>TrackFit</title>
        <meta
          name="description"
          content="TrackFit"
        />
      </Head>
      <Navbar />
      <main
        className={`${comfortaa.variable} font-[family-name:var(--font-comfortaa)] flex flex-col items-center justify-center`}
      >
        <Image
          src="/trackfit_upscaled.png"
          alt="TrackFit logo"
          width={300}
          height={300}
          className="rounded-lg py-8"
          priority
        />
        <h1 className="text-4xl font-bold py-8">TrackFit</h1>
        <p className="text-lg text-center">
          TrackFit est un tracker de fitness qui vous aide à suivre vos séances
          d&apos;entraînement et vos progrès.
          <br />
          &copy; EDM115 - 2025
        </p>
      </main>
    </>
  )
}
