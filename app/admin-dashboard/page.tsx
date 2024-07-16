import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin-login");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user?.name}</p>
    </div>
  );
}
