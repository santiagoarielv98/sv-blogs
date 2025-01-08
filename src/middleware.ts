import { auth } from "@/lib/auth";

const authRoutes = ["/new", "/dashboard"];

export default auth((req) => {
  const isLogginIn = !!req.auth;

  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
  const isEditRoute = /\/[^/]+\/[^/]+\/edit/.test(req.nextUrl.pathname);

  if (!isLogginIn && (isAuthRoute || isEditRoute)) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
