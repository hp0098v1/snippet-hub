import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { config as appConfig } from "@/lib/config";
import { decrypt } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check authentication for dashboard routes
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (path.startsWith("/dashboard") && !session?.userId) {
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(appConfig.routes.auth.login(callbackUrl), request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
