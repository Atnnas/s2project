import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    // Rutas que requieren autenticación
    const isLoginPath = pathname === "/admin/login" || pathname === "/administracion/login";

    if (pathname.startsWith("/admin") || pathname.startsWith("/administracion")) {
      if (!isAuth && !isLoginPath) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      // Proteger rutas de edición si el rol no es admin/editor
      const needsWriteAccess = pathname.includes("/upload") || pathname.includes("/edit") || pathname.includes("/delete");
      
      if (isAuth && needsWriteAccess && token.role === "user") {
        return NextResponse.redirect(new URL("/admin/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/((?!login).*)",
    "/administracion/((?!login).*)",
  ],
};
