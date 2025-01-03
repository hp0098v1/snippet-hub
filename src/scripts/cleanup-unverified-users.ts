'server-only'
import { db } from "@/db";
import { users } from "@/db/schema";
import { lt, and, eq } from "drizzle-orm";

export async function cleanupUnverifiedUsers() {
  const now = new Date();
  
  // Delete users who haven't verified their email within the deletion timeframe
  await db.delete(users)
    .where(
      and(
        lt(users.deleteAt, now),        // deleteAt is less than current time
        eq(users.emailVerified, false)   // and email is not verified
      )
    );
} 
