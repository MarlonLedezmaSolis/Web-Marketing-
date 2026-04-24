import { X, CheckCircle2 } from "lucide-react";

const problems = [
  "Publicar fotos borrosas sin ningún resultado",
  "Pagar agencias caras que no conocen tu negocio",
  "Perder horas escribiendo textos que nadie lee",
  "Copiar anuncios de la competencia sin estrategia",
];

const solutions = [
  "Anuncios con fórmula AIDA que convierten seguidores en clientes",
  "Control total sin depender de nadie — tú decides el mensaje",
  "Listos en segundos, adaptados a Facebook, Instagram o WhatsApp",
  "Tono profesional y cercano para el público costarricense",
];

export default function Problem() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Deja de publicar y empezar a{" "}
            <span className="text-gradient">vender</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Sabemos lo que frena a los dueños de locales como el tuyo.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Problems */}
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8">
            <h3 className="mb-6 text-lg font-bold text-red-700">
              Sin AdsIA CR
            </h3>
            <ul className="space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <span className="text-gray-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="rounded-2xl border border-green-100 bg-green-50 p-8">
            <h3 className="mb-6 text-lg font-bold text-green-700">
              Con AdsIA CR
            </h3>
            <ul className="space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span className="text-gray-700">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
