import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
  'http://localhost:3000',
];
export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") || '';
  const res = NextResponse.next();
  request.headers.get("origin")

  // if the origin is an allowed one,
  // add it to the 'Access-Control-Allow-Origin' header
  if (allowedOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin);
  }

  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  if (
    pathname.includes("/signin") || pathname.includes("/verify") || pathname.includes("/signup") || !!accessToken
  ) {
    return NextResponse.next();
  }

  if (pathname.includes("/signin") || pathname.includes("/verify") || pathname.includes("/signup") || !!accessToken|| pathname.includes("")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
