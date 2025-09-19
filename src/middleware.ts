import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const url = req.nextUrl;
    if (token && url.pathname.startsWith("/auth/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (
      !token &&
      (url.pathname.startsWith("/dashboard") ||
        url.pathname.startsWith("/spaceform") ||
        url.pathname.startsWith("/space"))
    ) {
      return NextResponse.redirect(new URL("/auth/register", req.url));
    }
  } catch (error) {
    console.log("Middleware error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/auth/register",
    "/dashboard/:path*",
    "/spaceform",
    "/space/:path",
  ],
};
