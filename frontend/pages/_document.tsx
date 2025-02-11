import { Html, Head, Main, NextScript } from "next/document"
// import { ThemeProvider } from "@/components/theme-provider"

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
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Main />
          <NextScript />
        </ThemeProvider> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
