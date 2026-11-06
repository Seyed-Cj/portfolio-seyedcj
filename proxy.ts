import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = handleI18n(request);

  // Upgrade root "/" temporary redirect (307) to permanent redirect (308) to preserve SEO authority
  if (
    request.nextUrl.pathname === "/" &&
    response.status === 307 &&
    response.headers.get("location")
  ) {
    const location = response.headers.get("location")!;
    return NextResponse.redirect(new URL(location, request.url), 308);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
