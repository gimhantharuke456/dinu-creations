import { authOptions } from "@/data/auth.options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin-login");
  }

  return <div>{children}</div>;
}
