"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LogIn, Mail, CheckCircle2 } from "lucide-react";

type Mode = "password" | "magic-link";

const AUTH_ERRORS: Record<string, string> = {
  "Invalid login credentials": "Correo o contraseña incorrectos.",
  "Email not confirmed": "Confirmá tu correo antes de ingresar. Revisá tu bandeja de entrada.",
  "Too many requests": "Demasiados intentos. Esperá unos minutos.",
};

function friendlyError(raw: string): string {
  return AUTH_ERRORS[raw] ?? raw;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(urlError ?? "");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(friendlyError(authError.message));
    } else {
      router.push("/dashboard");
      router.refresh();
    }

    setLoading(false);
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(friendlyError(authError.message));
    } else {
      setInfo(`Te enviamos un enlace mágico a ${email}. Revisá tu bandeja de entrada.`);
    }

    setLoading(false);
  }

  if (info) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-blue-600" />
          <h2 className="text-2xl font-extrabold text-gray-900">¡Revisá tu correo!</h2>
          <p className="mt-2 text-gray-600">{info}</p>
          <p className="mt-4 text-sm text-gray-400">
            El enlace expira en 1 hora. Si no lo ves, revisá la carpeta de spam.
          </p>
          <button
            onClick={() => setInfo("")}
            className="mt-5 text-sm font-semibold text-blue-600 hover:underline"
          >
            Usar otro método
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Bienvenido de vuelta</h1>
          <p className="mt-1 text-gray-500">Ingresá a tu cuenta de AdsIA CR</p>
        </div>

        {/* Mode tabs */}
        <div className="mb-6 flex rounded-lg border border-gray-200 p-1">
          <button
            type="button"
            onClick={() => { setMode("password"); setError(""); }}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "password"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Contraseña
          </button>
          <button
            type="button"
            onClick={() => { setMode("magic-link"); setError(""); }}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "magic-link"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            Enlace mágico
          </button>
        </div>

        {mode === "password" ? (
          <form onSubmit={handlePasswordLogin} className="space-y-5">
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
            <div className="space-y-1.5">
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
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              Iniciar sesión
            </Button>
          </form>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-5">
            <Input
              id="email-magic"
              label="Correo electrónico"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <p className="text-xs text-gray-500">
              Te enviamos un enlace al correo. Hacés clic y entrás directo — sin contraseña.
            </p>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              <Mail className="h-4 w-4" />
              Enviar enlace mágico
            </Button>
          </form>
        )}

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
