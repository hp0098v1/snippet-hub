import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const { isAuth, userId } = await verifySession();
  return NextResponse.json({ isAuth, userId });
} 
