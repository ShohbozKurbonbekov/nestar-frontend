import AdminDashboardFrame from "./_components/layout/AdminDashboardFrame";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminDashboardFrame>{children}</AdminDashboardFrame>;
}
