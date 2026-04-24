const testimonials = [
  {
    name: "María Solano",
    business: "Salón de Belleza Divina, Heredia",
    quote:
      "Antes perdía horas pensando qué publicar. Ahora en 2 minutos tengo el anuncio listo y mis reservas subieron un 35% en el primer mes.",
    avatar: "MS",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Carlos Ureña",
    business: "Restaurante El Sabor Tico, San José",
    quote:
      "Le generé un anuncio para el Día del Padre y se llenó el local. ¡La herramienta es increíble y facilísima de usar!",
    avatar: "CU",
    color: "from-orange-500 to-amber-600",
  },
  {
    name: "Ana Mora",
    business: "Tienda de Ropa Trendy CR, Alajuela",
    quote:
      "Mis clientes me preguntan quién hace mi publicidad. Les digo que es inteligencia artificial y no lo creen. Increíble.",
    avatar: "AM",
    color: "from-blue-500 to-indigo-600",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Dueños de locales que ya{" "}
            <span className="text-gradient">venden más</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
              <p className="mb-6 flex-1 text-gray-700 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-bold text-white`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
