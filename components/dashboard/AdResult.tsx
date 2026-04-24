"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Copy, Download, CheckCheck, Facebook, Instagram, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import type { AdFormInput } from "@/lib/types";

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === "Facebook") return <Facebook className="h-4 w-4" />;
  if (platform === "Instagram") return <Instagram className="h-4 w-4" />;
  return <MessageCircle className="h-4 w-4" />;
};

const platformColors: Record<string, string> = {
  Facebook: "from-blue-600 to-blue-700",
  Instagram: "from-pink-500 to-rose-600",
  WhatsApp: "from-green-500 to-emerald-600",
};

interface AdResultProps {
  adText: string;
  input: AdFormInput;
}

export default function AdResult({ adText, input }: AdResultProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(adText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  async function handleDownload() {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `anuncio-${input.platform.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // silent
    } finally {
      setDownloading(false);
    }
  }

  const gradient = platformColors[input.platform] ?? "from-blue-600 to-indigo-700";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Tu anuncio listo</h2>
        <div
          className={`flex items-center gap-1.5 rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-semibold text-white`}
        >
          <PlatformIcon platform={input.platform} />
          {input.platform}
        </div>
      </div>

      {/* Downloadable card */}
      <div
        ref={cardRef}
        className={`rounded-xl bg-gradient-to-br ${gradient} p-6 text-white`}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-70">
          Anuncio generado con IA
        </p>
        <p className="whitespace-pre-wrap text-base leading-relaxed">{adText}</p>
        <div className="mt-4 flex items-center gap-2 opacity-60">
          <PlatformIcon platform={input.platform} />
          <span className="text-xs">{input.platform} · AdsIA CR</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="primary"
          onClick={handleCopy}
          className="flex-1"
        >
          {copied ? (
            <>
              <CheckCheck className="h-4 w-4" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copiar texto
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          onClick={handleDownload}
          loading={downloading}
          className="flex-1"
        >
          <Download className="h-4 w-4" />
          Descargar como imagen
        </Button>
      </div>
    </div>
  );
}
