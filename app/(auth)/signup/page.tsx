"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UserPlus, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (authError) {
      setError(authError.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
          <h2 className="text-2xl font-extrabold text-gray-900">
            ¡Revisa tu correo!
          </h2>
          <p className="mt-2 text-gray-600">
            Te enviamos un enlace de confirmación a{" "}
            <strong>{email}</strong>. Haz clic en él para activar tu cuenta.
          </p>
          <Link href="/login">
            <Button variant="secondary" className="mt-6">
              Ir a iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Crear cuenta gratis
          </h1>
          <p className="mt-1 text-gray-500">
            Tus primeros 5 anuncios son completamente gratis
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
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
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Input
            id="confirm-password"
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            Crear mi cuenta gratis
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Al registrarte aceptás nuestros Términos de Uso y Política de Privacidad.
        </p>

        <p className="mt-5 text-center text-sm text-gray-500">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
