import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    const isLoginPath = pathname === "/admin/login" || pathname === "/administracion/login";
    
    // Rutas protegidas visuales
    const isPortfolioRoute = pathname.startsWith('/portafolio') || 
                             pathname.startsWith('/portfolio') || 
                             pathname.startsWith('/photography') || 
                             pathname.startsWith('/reels') || 
                             pathname.startsWith('/digital-arts');
    
    const isAdminRoute = (pathname.startsWith('/admin') || pathname.startsWith('/administracion')) && !isLoginPath;

    // 1. Si NO está autenticado e intenta entrar a una ruta protegida -> Mandar al Login
    if (!isAuth && (isPortfolioRoute || isAdminRoute)) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAuth) {
      // 2. Si ESTÁ autenticado, pero su cuenta fue INACTIVADA
      if (token.isActive === false && (isAdminRoute || isPortfolioRoute)) {
        return NextResponse.redirect(new URL('/admin/error?error=inactive', req.url));
      }

      // 3. Área de ADMIN (Dashboard/Upload) -> EXCLUSIVO para "Admin"
      if (isAdminRoute && token.role !== 'Admin') {
        return NextResponse.redirect(new URL('/admin/error?error=unauthorized', req.url));
      }

      // 4. Área de PORTAFOLIO -> Solo "Admin", "Editor", "Viewer" u "Observador"
      if (isPortfolioRoute) {
        const allowedRoles = ['Admin', 'Editor', 'Viewer', 'Observador'];
        if (!allowedRoles.includes(token.role)) {
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
