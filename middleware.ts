import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import * as jose from "jose" // npm i jose

const publicRoutes = ["/", "/login", "/register", "/about-us", "/contact-us"]
const authRoutes = ["/login", "/register"]

// Role-based private routes
const roleRoutes: Record<string, string[]> = {
  admin: ["/admin/dashboard", "/admin/jobs", "/admin/companies"],
  user: ["/application", "/subscriptions", "/alerts/list"],
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  // If no token and not public → redirect to login
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // If visiting login/register while already logged in → redirect to home
  if (token && authRoutes.some(route => pathname.startsWith(route))) {
  return NextResponse.redirect(new URL("/", req.url))
}

  if (token) {
    try {
      // Verify and decode JWT
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jose.jwtVerify(token, secret)

      const role = payload.role as string

      // Restrict access if role doesn't match allowed routes
      for (const [r, routes] of Object.entries(roleRoutes)) {
        if (routes.some(route => pathname.startsWith(route))) {
          if (role !== r) {
            return NextResponse.redirect(new URL("/", req.url))
          }
        }
      }
  console.log("Token in middleware:", token, "Path:", pathname);
    } catch (err) {
      console.error("JWT verification failed:", err)
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }



  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|images).*)",
  ],
}

