import { requireAdmin } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: {
    default: "Admin — LEDX Énergie",
    template: "%s | Admin LEDX",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen flex bg-[#0a0f1e]">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex-1 p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
