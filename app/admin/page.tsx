import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminLayout from "@/components/AdminLayout";
import DashboardContent from "@/components/DashboardContent";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin-login");
  }

  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
