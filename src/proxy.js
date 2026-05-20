import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    const isLoginPath = pathname === "/admin/login" || pathname === "/administracion/login";
    
    // Protected routes
    const isPortfolioRoute = pathname.startsWith('/portafolio') || 
                             pathname.startsWith('/portfolio') || 
                             pathname.startsWith('/photography') || 
                             pathname.startsWith('/reels') || 
                             pathname.startsWith('/digital-arts');
    
    const isAdminRoute = (pathname.startsWith('/admin') || pathname.startsWith('/administracion')) && !isLoginPath;

    // 1. If NOT authenticated and trying to access a protected route -> Redirect to Login
    if (!isAuth && (isPortfolioRoute || isAdminRoute)) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAuth) {
      let isActive = token.isActive;
      let dbRole = token.role;

      // Real-time query to MongoDB status API
      try {
        const statusRes = await fetch(`${req.nextUrl.origin}/api/auth/status?email=${encodeURIComponent(token.email)}`);
        if (statusRes.ok) {
          const statusData = await statusRes.json();
          if (statusData.success) {
            isActive = statusData.isActive;
            dbRole = statusData.role;
          }
        }
      } catch (err) {
        console.error("Error checking user status in middleware:", err);
      }

      // 2. If authenticated, but account is INACTIVE or DELETED
      if (!isActive && (isAdminRoute || isPortfolioRoute)) {
        return NextResponse.redirect(new URL('/admin/error?error=inactive', req.url));
      }

      // 3. ADMIN area (Dashboard/Upload) -> EXCLUSIVE to "Admin"
      if (isAdminRoute && dbRole !== 'Admin') {
        return NextResponse.redirect(new URL('/admin/error?error=unauthorized', req.url));
      }

      // 4. PORTFOLIO area -> Only "Admin", "Editor", "Viewer", or "Observador"
      if (isPortfolioRoute) {
        const allowedRoles = ['Admin', 'Editor', 'Viewer', 'Observador'];
        if (!allowedRoles.includes(dbRole)) {
          return NextResponse.redirect(new URL('/admin/error?error=unauthorized', req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
    pages: {
      signIn: '/admin/login',
      error: '/admin/error',
    }
  }
);

export const config = {
  matcher: [
    "/admin/((?!login).*)",
    "/administracion/((?!login).*)",
    "/portafolio/:path*",
    "/portfolio/:path*",
    "/photography/:path*",
    "/reels/:path*",
    "/digital-arts/:path*",
  ],
};
