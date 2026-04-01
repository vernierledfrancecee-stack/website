import { requireAdmin } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen flex bg-[#0a0f1e]">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* pt-14 on mobile = top header height, pb-16 = bottom nav height */}
        <div className="flex-1 p-4 pt-[calc(3.5rem+1rem)] pb-[calc(4rem+1rem)] lg:pt-0 lg:pb-0 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
