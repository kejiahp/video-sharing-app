import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(
        new URL("/login?message=Unauthorized User", req.url)
      );
    }
    if (
      req.nextUrl.pathname.startsWith("/users") &&
      req.nextauth.token?.role !== "regular"
    ) {
      return NextResponse.rewrite(
        new URL("/login?message=Unauthorized User", req.url)
      );
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/users/:path*"],
};
