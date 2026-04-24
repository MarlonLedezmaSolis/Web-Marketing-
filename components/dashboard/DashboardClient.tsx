"use client";

import { useState } from "react";
import AdForm from "@/components/dashboard/AdForm";
import AdResult from "@/components/dashboard/AdResult";
import AdHistory from "@/components/dashboard/AdHistory";
import { Crown, Zap } from "lucide-react";
import type { AdFormInput, GeneratedAd } from "@/lib/types";
import Link from "next/link";

interface DashboardClientProps {
  initialAds: GeneratedAd[];
  adsThisMonth: number;
  isPro: boolean;
}

export default function DashboardClient({
  initialAds,
  adsThisMonth,
  isPro,
}: DashboardClientProps) {
  const [ads, setAds] = useState<GeneratedAd[]>(initialAds);
  const [currentResult, setCurrentResult] = useState<{
    adText: string;
    input: AdFormInput;
  } | null>(null);

  function handleResult(adText: string, input: AdFormInput) {
    const newAd: GeneratedAd = {
      id: crypto.randomUUID(),
      ad_result: adText,
      prompt_input: input,
      created_at: new Date().toISOString(),
    };
    setCurrentResult({ adText, input });
    setAds((prev) => [newAd, ...prev]);
  }

  const freeRemaining = Math.max(0, 5 - adsThisMonth);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Tu generador de anuncios
          </h1>
          <p className="mt-1 text-gray-500">
            Describe tu negocio y la IA hace el resto.
          </p>
        </div>

        {!isPro && (
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm">
              <span className="font-semibold text-amber-700">
                {freeRemaining} anuncios gratis
              </span>
              <span className="text-amber-600"> restantes</span>
            </div>
            <Link
              href="/#precios"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-bold text-yellow-900 shadow hover:opacity-90 transition-opacity"
            >
              <Crown className="h-4 w-4" />
              Ir Pro
            </Link>
          </div>
        )}

        {isPro && (
          <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-blue-700">Plan Pro activo</span>
          </div>
        )}
      </div>

      {/* Main grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <AdForm onResult={handleResult} />
        </div>

        <div className="space-y-6">
          {currentResult ? (
            <AdResult adText={currentResult.adText} input={currentResult.input} />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
              <div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  Tu anuncio aparecerá aquí
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Completá el formulario y hacé clic en Generar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Anuncios recientes
        </h2>
        <AdHistory ads={ads} />
      </div>
    </div>
  );
}
