// // middleware.js
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextResponse } from "next/server";
// import { getUserRole } from "./lib/auth";

// export async function middleware(request) {
//   if (
//     request.nextUrl.pathname.startsWith("/_next") ||
//     request.nextUrl.pathname.includes("/static/") ||
//     request.nextUrl.pathname.includes(".css")
//   ) {
//     return NextResponse.next();
//   }
//   const { isAuthenticated } = getKindeServerSession();
//   const authenticated = await isAuthenticated();

//   // List of public routes that don't require authentication
//   const publicRoutes = ["/", "/api/auth"];

//   const adminRoutes = ["/admin", "/admin-settings", "/upload"];

//   // Check if the current path is in public routes
//   const isPublicRoute = publicRoutes.some(
//     (route) =>
//       request.nextUrl.pathname === route ||
//       request.nextUrl.pathname.startsWith("/api/auth")
//   );

//   // Allow access to public routes regardless of authentication
//   if (isPublicRoute) {
//     return NextResponse.next();
//   }

//   // If user is not authenticated and trying to access protected route,
//   // redirect to homepage
//   if (!authenticated) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   const isAdminRoute = adminRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

//   if (isAdminRoute) {
//     const role = await getUserRole(); //This needs to be replaced as getUserRole does not work

//     if (!role) {
//       // Redirect non-admin users trying to access admin routes
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }
//   // Allow access to protected routes for authenticated users
//   return NextResponse.next();
// }
// middleware.js
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes("/static/") ||
    request.nextUrl.pathname.includes(".css")
  ) {
    return NextResponse.next();
  }

  const { isAuthenticated, getPermissions } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  // List of public routes that don't require authentication
  const publicRoutes = ["/", "/api/auth"];
  const adminRoutes = ["/admin", "/admin-settings", "/upload"];

  // Check if the current path is in public routes
  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith("/api/auth")
  );

  if (isPublicRoute) {
    // If the user is authenticated and accessing the root `/`, redirect to `/home`
    if (authenticated && request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected route,
  // redirect to homepage
  if (!authenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAdminRoute) {
    // const role = await getUserRole(); //This needs to be replaced as getUserRole does not work
    const permissions = await getPermissions();
    const isAdmin = permissions?.permissions?.includes("admin");

    if (!isAdmin) {
      // Redirect non-admin users trying to access admin routes
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow access to protected routes for authenticated users
  return NextResponse.next();
}
