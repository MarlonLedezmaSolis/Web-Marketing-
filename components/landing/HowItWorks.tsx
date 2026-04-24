import { ClipboardList, Cpu, Copy } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Describe tu negocio",
    description:
      'Escribe qué vendes y cuál es tu oferta del momento. Ej: "Masajes relajantes" con "20% de descuento en primera cita".',
  },
  {
    icon: Cpu,
    number: "02",
    title: "La IA crea tu anuncio",
    description:
      "Nuestro motor de IA aplica la fórmula AIDA y genera un texto persuasivo adaptado al público costarricense en segundos.",
  },
  {
    icon: Copy,
    number: "03",
    title: "Copia y publica",
    description:
      "Copia el texto o descárgalo como imagen. Pégalo directamente en Facebook, Instagram o WhatsApp Business.",
  },
];

export default function HowItWorks() {
  return (
    <section id="demo" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Tan simple como{" "}
            <span className="text-gradient">1, 2, 3</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Sin necesitar saber de marketing ni de diseño.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-black text-gray-100">
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
