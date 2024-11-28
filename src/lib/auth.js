import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserRole() {
  const { getPermissions } = getKindeServerSession();
  const permissions = await getPermissions();

  // Check if user has admin permissions
  return permissions?.permissions?.includes("admin");
}
