"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Megaphone, LogOut, LayoutDashboard } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DashboardNav({ email }: { email: string }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700">
            <Megaphone className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">
            Ads<span className="text-gradient">IA</span> CR
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <div className="hidden text-sm text-gray-500 sm:block">{email}</div>

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Salir</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
