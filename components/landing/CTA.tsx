import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="gradient-brand py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Tu competencia ya está publicando.
          <br />
          ¿Y vos?
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          Únete a cientos de emprendedores costarricenses que ya usan IA para
          atraer más clientes sin gastar una fortuna.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/signup">
            <Button
              variant="secondary"
              size="lg"
              className="w-full border-white text-blue-700 hover:bg-white sm:w-auto"
            >
              Generar mi primer anuncio gratis
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-blue-200">
          Sin tarjeta de crédito · Sin compromiso
        </p>
      </div>
    </section>
  );
}
