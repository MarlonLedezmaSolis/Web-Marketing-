"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import type { AdFormInput, Platform } from "@/lib/types";

const PLATFORM_OPTIONS = [
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "WhatsApp", label: "WhatsApp Business" },
];

interface AdFormProps {
  onResult: (adText: string, input: AdFormInput) => void;
}

export default function AdForm({ onResult }: AdFormProps) {
  const [product, setProduct] = useState("");
  const [offer, setOffer] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, offer, platform }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error al generar el anuncio.");
      }

      const data = await res.json();
      onResult(data.adText, { product, offer, platform });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Generar anuncio</h2>
        <p className="mt-1 text-sm text-gray-500">
          Completá los datos y la IA escribirá el anuncio por vos.
        </p>
      </div>

      <div className="space-y-5">
        <Textarea
          id="product"
          label="¿Qué servicio o producto ofrecés?"
          placeholder='Ej: "Masajes relajantes" o "Comida típica para llevar"'
          rows={3}
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
          maxLength={300}
        />

        <Textarea
          id="offer"
          label="¿Cuál es tu oferta o promoción?"
          placeholder='Ej: "20% de descuento en tu primera cita" o "2x1 los viernes"'
          rows={3}
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          required
          maxLength={300}
        />

        <Select
          id="platform"
          label="Plataforma"
          options={PLATFORM_OPTIONS}
          value={platform}
          onChange={(e) => setPlatform(e.target.value as Platform)}
        />
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="mt-6 w-full"
        size="lg"
        loading={loading}
      >
        <Sparkles className="h-5 w-5" />
        {loading ? "Generando anuncio..." : "Generar anuncio con IA"}
      </Button>
    </form>
  );
}
