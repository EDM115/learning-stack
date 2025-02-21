import { GetServerSidePropsContext } from "next"
import { parseCookies, setCookie, destroyCookie } from "nookies"

export function getAuthToken(context?: GetServerSidePropsContext): string | null {
  const cookies = parseCookies(context)
  return cookies.token || null
}

export function setAuthToken(token: string, context?: GetServerSidePropsContext): void {
  setCookie(context, 'token', token, {
    maxAge: 7 * 24 * 60 * 60,  // 7 days
    path: "/",
  })
}

export function removeAuthToken(context?: GetServerSidePropsContext): void {
  destroyCookie(context, "token", { path: "/" })
}
