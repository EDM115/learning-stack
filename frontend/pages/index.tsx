import Image from "next/image"
import Head from "next/head"
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
        <link
          rel="icon"
          href="/trackfit_cropped.png"
        />
      </Head>
      <main
        className={`${comfortaa.variable} font-[family-name:var(--font-comfortaa)]`}
      >
        <Image
          src="/trackfit_upscaled.png"
          alt="TrackFit logo"
          width={180}
          height={180}
          priority
        />
        <h1 className="text-4xl font-bold">TrackFit</h1>
        <p className="text-lg">
          TrackFit is a fitness tracker that helps you keep track of your
          workouts and progress.
        </p>
      </main>
    </>
  )
}
