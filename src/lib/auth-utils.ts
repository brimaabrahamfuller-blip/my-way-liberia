import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return session;
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();
  const userRole = (session.user as any)?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    redirect("/unauthorized");
  }

  return session;
}
