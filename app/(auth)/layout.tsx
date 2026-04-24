import Link from "next/link";
import { Megaphone } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-center py-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Ads<span className="text-gradient">IA</span> CR
          </span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        {children}
      </main>

      <footer className="py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} AdsIA CR
      </footer>
    </div>
  );
}
