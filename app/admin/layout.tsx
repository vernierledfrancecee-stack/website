export const metadata = {
  title: {
    default: "Admin — LEDX Énergie",
    template: "%s | Admin LEDX",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
