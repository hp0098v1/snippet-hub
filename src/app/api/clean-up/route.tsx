import { cleanupUnverifiedUsers } from "@/scripts/cleanup-unverified-users";

export async function GET() {
  try {
    await cleanupUnverifiedUsers();
    return new Response('Cleanup completed', { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Cleanup failed', message: (error as Error).message }), { status: 500 });
  }
}
