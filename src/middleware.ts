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
        const pathname = req.nextUrl.pathname;
        
        // Check role-based access first (more specific paths)
        if (pathname.startsWith("/dashboard/student")) {
          return !!token && token?.role === "STUDENT";
        }
        if (pathname.startsWith("/dashboard/employer")) {
          return !!token && token?.role === "EMPLOYER";
        }
        if (pathname.startsWith("/dashboard/counselor")) {
          return !!token && token?.role === "COUNSELOR";
        }
        
        // Check if user is trying to access a protected route
        if (pathname.startsWith("/dashboard")) {
          return !!token;
        }

        return true;
      }
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/resume/:path*", "/jobs/:path*", "/profile/:path*", "/messages/:path*"]
};
