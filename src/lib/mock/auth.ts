import { User, getMockUsers } from "./users";

// Mock current user - in a real app this would come from your auth system
export async function getMockCurrentUser(): Promise<User | null> {
  // For testing, let's return user with ID "1" (علی محمدی)
  const users = await getMockUsers({ page: 1, limit: 1 });
  return users.data[0] || null;
}
