import Link from "next/link";
import { Megaphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700">
              <Megaphone className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">
              Ads<span className="text-gradient">IA</span> CR
            </span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <Link href="#demo" className="hover:text-gray-900 transition-colors">
              Cómo funciona
            </Link>
            <Link href="#precios" className="hover:text-gray-900 transition-colors">
              Precios
            </Link>
            <Link href="/login" className="hover:text-gray-900 transition-colors">
              Iniciar sesión
            </Link>
            <Link href="/signup" className="hover:text-gray-900 transition-colors">
              Registrarse
            </Link>
          </nav>

          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AdsIA CR. Hecho en Costa Rica.
          </p>
        </div>
      </div>
    </footer>
  );
}
