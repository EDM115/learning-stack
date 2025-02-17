import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link
          rel="icon"
          href="/trackfit_cropped.png"
        />
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
