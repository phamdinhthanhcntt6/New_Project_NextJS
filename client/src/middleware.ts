import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(request.nextUrl.pathname);
  const sessionToken = request.cookies.get("sessionToken")?.value;

  //chưa đăng nhập thì vào trang login/register
  if (privatePaths.some((path) => pathname.startsWith(path) && !sessionToken)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // đã đăng nhập thì không cho vào vào trang login/register
  if (authPaths.some((path) => pathname.startsWith(path) && sessionToken)) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/me", "/login", "/register"],
};
