import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.some((route) =>
    request.nextUrl.pathname.includes(route)
  );

  if (request.nextUrl.pathname === "/") {
    if (token) {
      const redirectURL = "/dashboard";
      return NextResponse.redirect(new URL(redirectURL, request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
