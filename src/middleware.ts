import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  const token = await getToken({ req: request });
  const authRoutes = ["/login"];
  const isAuthPage = authRoutes.some((route) =>
    request.nextUrl.pathname.includes(route)
  );

  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard", "/train", "/model/:id", "/pricing"],
};
