import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-50 opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-indigo-50 opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            Powered by Inteligencia Artificial
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Atrae más clientes a tu local en{" "}
            <span className="text-gradient">Costa Rica</span> sin contratar
            una agencia
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
            Genera anuncios irresistibles para{" "}
            <strong className="text-gray-800">Instagram y Facebook</strong> en
            segundos. Solo escribe qué vendes y tu oferta,{" "}
            <span className="font-semibold text-blue-600">nosotros hacemos el resto.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Comenzar gratis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Ver cómo funciona
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Sin tarjeta de crédito · Primeros 5 anuncios gratis
          </p>
        </div>

        {/* Mock preview card */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Spa Natura CR</p>
                <p className="text-xs text-gray-500">Publicidad patrocinada</p>
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-80">
                Anuncio generado por IA ✨
              </p>
              <p className="text-lg font-bold leading-snug">
                ¿Cargado del estrés? Tu cuerpo merece un descanso real.
              </p>
              <p className="mt-2 text-sm opacity-90">
                Este mes, disfruta un masaje relajante con{" "}
                <strong>20% de descuento</strong> en tu primera cita. Más de
                500 clientes ya transformaron su bienestar con nosotros.
              </p>
              <p className="mt-4 text-sm font-bold">
                📲 Escríbenos al WhatsApp y reserva hoy mismo →
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <span>Generado en 3 segundos</span>
              <div className="flex gap-1">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700 font-medium">Facebook</span>
                <span className="rounded-full bg-pink-100 px-2 py-0.5 text-pink-700 font-medium">Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
