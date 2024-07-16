import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import AdminLayout from "@/components/AdminLayout";
import DashboardContent from "@/components/DashboardContent";
import { authOptions } from "@/data/auth.options";

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
