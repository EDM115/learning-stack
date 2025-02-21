# Next.js
A framework for React with server-side rendering, SEO and easier routing in mind.  
We're using the pages router here.

## Directory structure
- `.next/` contains the build files.
- `pages/` contains the routes of the app (all files here are accessible via direct URL !).
- `components/` contains reusable components for the application.
- `public/` contains static assets like images and fonts.
- `styles/` contains global styles for the app.
- `eslint.config.mjs` contains the ESLint configuration.
- [`next.config.ts`](https://nextjs.org/docs/pages/api-reference/config/next-config-js) contains the configuration for Next.js.
- `postcss.config.mjs` contains the configuration for PostCSS.
- `tailwind.config.ts` contains the configuration for Tailwind CSS.
- `tsconfig.json` contains the configuration for TypeScript.

### Pages naming conventions
- [`index.tsx`](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#index-routes) is the home page.
- `name/index.tsx` is a nested route.
- [`[id].tsx`](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes) is a dynamic route.
- [`[...name].tsx`](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments) is a catch-all route.
- [`[[...name]]/index.tsx`](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments) is an optional catch-all route.
- `404.tsx` is the custom error page.
- `500.tsx` is the server error page.
- [`_app.tsx`](https://nextjs.org/docs/pages/building-your-application/routing/custom-app) is the custom app component (like a wrapper for all pages).
- [`_document.tsx`](https://nextjs.org/docs/pages/building-your-application/routing/custom-document) is the custom document component.
- [`_error.tsx`](https://nextjs.org/docs/pages/building-your-application/routing/custom-error#more-advanced-error-page-customizing) is the custom error page.

### API Routes
- `api/[route].ts` is used to create API endpoints.
- `api/[route]/[id].ts` is used for dynamic API routes.

## Routing and navigation
[`Link`](https://nextjs.org/docs/api-reference/next/link) component is used for client-side navigation, `<a>` but without full reload.
```tsx
import Link from "next/link";

<Link href="/about">
  <a>About</a>
</Link>
```

## SSR limitations
Server components cannot :
- Listen to browser events.
- Access browser-specific APIs.
- Maintain state nor use effects.  
  
Instead of sending as-is the components that need to bypass these limitations to the client, it is better to extract the minimum logic needed as a Client component.  
However, the pages router doesn't support Server components, only the app router does. So in this case there's nothing to worry about.

## Fetching data
On the client, we use `useState()` and `useEffect()`, and can use React Query or better, SWR.  
But this comes with the same issues as CSR (larger bundles, resource intensive on the client, bad SEO, less secure because credentials are passed to the client and it creates an unnecessary extra connection to the server).  
To overcome this, we need to export specific functions :
- `getStaticProps()` : This function allows to fetch data at build time.
```tsx
import type { InferGetStaticPropsType, GetStaticProps } from "next"

type Repo = {
  name: string
  stargazers_count: number
}

export const getStaticProps = (async (context) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js")
  const repo = await res.json()
  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: Repo
}>

export default function Page({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return repo.stargazers_count
}
```
- `getSeverSideProps()` : This function allows to fetch data at request time, on the server.
```tsx
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Repo = {
  name: string
  stargazers_count: number
}

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo: Repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: Repo }>

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  )
}
```
- `getStaticPaths()` : If a page has dynamic routes and uses getStaticProps, it need to define a list of pages to be statically generated.
```tsx
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next"

type Repo = {
  name: string
  stargazers_count: number
}

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          name: "next.js",
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js")
  const repo = await res.json()
  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: Repo
}>

export default function Page({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return repo.stargazers_count
}
```

## Styling
### Global styles
Only for truly global styles, like resets or fonts. No custom classes there.  
So how to style in-depth the components ?

### CSS Modules (thx PostCSS)
- Create a CSS file with the same name as the component file (but with `.module.css`). It can be in a styles folder too.
- Import the CSS file in the component file.
- Use the classes in the CSS file in the component file. Advantage : classes names are scoped to the component.
- Since classes are JS objects when imported, we have IntelliSense **but** need to name them in camelCase because no hyphens are allowed in JS objects.
```tsx
// components/Button.tsx
import styles from "./Button.module.css";

export default function Button() {
  return <button className={styles.button}>Click me</button>;
}
```
```css
/* components/Button.module.css */
.button {
  color: red;
}
```
Or better : use Tailwind CSS.

## Sources
- [Fireship - "Next.js in 100 Seconds // Plus Full Beginner's Tutorial"](https://www.youtube.com/watch?v=Sklc_fQBmcs)
- [Programming with Mosh - "Next js Tutorial for Beginners | Nextjs 13 (App Router) with TypeScript"](https://www.youtube.com/watch?v=ZVnjOPwW4ZA)
- [ByteGrad - "NextJS Tutorial - All 12 Concepts You Need to Know"](https://www.youtube.com/watch?v=vwSlYG7hFk0)
