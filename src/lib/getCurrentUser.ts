import { getServerSession, User } from "next-auth";
import { authOptions } from "./auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!user) return null;
  return user;
}
