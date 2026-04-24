"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Correo o contraseña incorrectos. Intenta de nuevo.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Bienvenido de vuelta
          </h1>
          <p className="mt-1 text-gray-500">
            Ingresa a tu cuenta de AdsIA CR
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            Iniciar sesión
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿No tenés cuenta?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
