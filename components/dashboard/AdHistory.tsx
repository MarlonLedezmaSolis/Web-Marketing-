"use client";

import { useState } from "react";
import { Copy, CheckCheck, Clock } from "lucide-react";
import type { GeneratedAd } from "@/lib/types";

const platformColors: Record<string, string> = {
  Facebook: "bg-blue-100 text-blue-700",
  Instagram: "bg-pink-100 text-pink-700",
  WhatsApp: "bg-green-100 text-green-700",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours} h`;
  return `Hace ${Math.floor(hours / 24)} d`;
}

export default function AdHistory({ ads }: { ads: GeneratedAd[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleCopy(ad: GeneratedAd) {
    await navigator.clipboard.writeText(ad.ad_result);
    setCopiedId(ad.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (ads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
        <Clock className="mx-auto mb-3 h-8 w-8 text-gray-300" />
        <p className="text-sm text-gray-400">
          Tus anuncios generados aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ads.map((ad) => {
        const colorClass =
          platformColors[ad.prompt_input.platform] ?? "bg-gray-100 text-gray-700";
        return (
          <div
            key={ad.id}
            className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}>
                  {ad.prompt_input.platform}
                </span>
                <span className="text-xs text-gray-400">{timeAgo(ad.created_at)}</span>
              </div>
              <p className="text-xs font-medium text-gray-500">
                {ad.prompt_input.product}
                {ad.prompt_input.offer ? ` · ${ad.prompt_input.offer}` : ""}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                {ad.ad_result}
              </p>
            </div>

            <button
              onClick={() => handleCopy(ad)}
              className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              title="Copiar anuncio"
            >
              {copiedId === ad.id ? (
                <CheckCheck className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
