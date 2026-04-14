"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatAgent from "@/components/ChatAgent";

// Routes that bypass the main site shell (no Navbar, Footer, or floating widgets).
// Used for standalone tools meant to be embedded in external platforms (e.g. Monday.com).
const STANDALONE_PREFIXES = ["/simulateur-interne", "/admin"];

export default function ConditionalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_PREFIXES.some((p) =>
    pathname?.startsWith(p)
  );

  if (isStandalone) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ChatAgent />
    </>
  );
}
