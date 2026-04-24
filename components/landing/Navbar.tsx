import Link from "next/link";
import Button from "@/components/ui/Button";
import { Megaphone } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Ads<span className="text-gradient">IA</span> CR
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Probar gratis</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
