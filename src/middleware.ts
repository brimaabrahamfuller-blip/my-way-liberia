import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export const middleware = withAuth(
  function middleware(req: NextRequest) {
    // Add any custom middleware logic here
    return undefined;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is trying to access a protected route
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }

        // Check role-based access
        if (req.nextUrl.pathname.startsWith("/dashboard/student")) {
          return token?.role === "STUDENT";
        }
        if (req.nextUrl.pathname.startsWith("/dashboard/employer")) {
          return token?.role === "EMPLOYER";
        }
        if (req.nextUrl.pathname.startsWith("/dashboard/counselor")) {
          return token?.role === "COUNSELOR";
        }

        return true;
      }
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/resume/:path*", "/jobs/:path*", "/profile/:path*", "/messages/:path*"]
};
