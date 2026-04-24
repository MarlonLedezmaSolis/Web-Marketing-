import Link from "next/link";
import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Gratis",
    price: "₡0",
    period: "siempre",
    description: "Para probar y convencerte.",
    features: [
      "5 anuncios por mes",
      "Facebook e Instagram",
      "Fórmula AIDA incluida",
      "Copiar al portapapeles",
    ],
    cta: "Empezar gratis",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₡9.900",
    period: "por mes",
    description: "Para dueños que quieren crecer.",
    features: [
      "Anuncios ilimitados",
      "Facebook, Instagram y WhatsApp",
      "Descargar como imagen",
      "Historial de anuncios",
      "Soporte prioritario",
    ],
    cta: "Comenzar Pro",
    href: "/signup?plan=pro",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Precios <span className="text-gradient">simples y claros</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Sin contratos, sin sorpresas. Cancela cuando quieras.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                plan.highlighted
                  ? "gradient-brand text-white shadow-2xl ring-0"
                  : "border border-gray-200 bg-white shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold text-yellow-900 shadow">
                  MÁS POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}
                >
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-black ${plan.highlighted ? "text-white" : "text-gray-900"}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-gray-500"}`}
                  >
                    / {plan.period}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${plan.highlighted ? "text-blue-100" : "text-gray-500"}`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${plan.highlighted ? "text-blue-200" : "text-green-500"}`}
                    />
                    <span className={plan.highlighted ? "text-blue-50" : "text-gray-700"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  variant={plan.highlighted ? "secondary" : "primary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
