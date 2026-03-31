import AdminGuard from "@/libs/auth/AdminGuard";
import AdminDashboardFrame from "./_components/layout/AdminDashboardFrame";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <AdminDashboardFrame>{children}</AdminDashboardFrame>
    </AdminGuard>
  );
}
