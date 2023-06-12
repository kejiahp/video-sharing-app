import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/?message=Unauthorized user only admins allowed", req.url)
      );
    }
    if (
      req.nextUrl.pathname.startsWith("/users") &&
      req.nextauth.token?.role !== "regular"
    ) {
      return NextResponse.redirect(
        new URL("/?message=Unauthorized user only regulars allowed", req.url)
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
