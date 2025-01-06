import { NextResponse } from "next/server";

import { verifySession } from "@/lib/session";

export async function GET() {
  const { isAuth, userId } = await verifySession();
  return NextResponse.json({ isAuth, userId });
}
