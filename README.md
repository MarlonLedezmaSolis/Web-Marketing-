# AdsIA CR — Generador de anuncios con IA para Costa Rica

Plataforma SaaS que permite a dueños de locales en Costa Rica generar anuncios persuasivos para Facebook, Instagram y WhatsApp en segundos, usando inteligencia artificial.

## Arquitectura

```
web-marketing-cr/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── (auth)/
│   │   ├── login/page.tsx          # Inicio de sesión
│   │   └── signup/page.tsx         # Registro
│   ├── dashboard/
│   │   ├── layout.tsx              # Layout protegido
│   │   └── page.tsx                # Dashboard principal
│   └── api/
│       ├── generate-ad/route.ts    # Endpoint de generación
│       └── webhooks/stripe/route.ts
├── components/
│   ├── landing/                    # Hero, Problem, HowItWorks, Testimonials, Pricing, CTA
│   ├── dashboard/                  # AdForm, AdResult, AdHistory, DashboardNav
│   └── ui/                        # Button, Input, Textarea, Select
├── lib/
│   ├── supabase/client.ts
│   ├── supabase/server.ts
│   ├── types.ts
│   └── utils.ts
├── supabase/migrations/
│   └── 001_initial_schema.sql     # Esquema completo con RLS
└── middleware.ts                   # Protección de rutas
```

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Auth | Supabase Auth |
| Base de datos | Supabase (PostgreSQL) con Row Level Security |
| IA (primario) | n8n Webhook → OpenAI GPT-4o-mini |
| IA (fallback) | OpenAI API directa |
| Pagos | Stripe |
| Deploy | Vercel |

## Setup rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.local.example .env.local
# Editar .env.local con tus credenciales
```

### 3. Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a **SQL Editor** y ejecutar `supabase/migrations/001_initial_schema.sql`
3. Copiar **Project URL** y **anon key** a `.env.local`

### 4. Configurar n8n (opcional pero recomendado)

Crear un flujo en n8n con:
- **Trigger**: Webhook (POST)
- **Nodo OpenAI**: Con el prompt del sistema
- **Respuesta**: `{ "adText": "{{$node.OpenAI.json.message.content}}" }`

Copiar la URL del webhook a `N8N_WEBHOOK_URL` en `.env.local`.

Si no tenés n8n, configurar `OPENAI_API_KEY` directamente.

### 5. Levantar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Flujo de generación de anuncios

```
Usuario llena formulario
        │
        ▼
POST /api/generate-ad
        │
        ├─ Verifica autenticación (Supabase)
        ├─ Verifica límite de plan (free: 5/mes)
        │
        ▼
¿N8N_WEBHOOK_URL configurada?
   Sí ──► Llama webhook n8n ──► n8n llama OpenAI con prompt AIDA
   No ──► Llama OpenAI directamente con prompt AIDA
        │
        ▼
Guarda resultado en generated_ads (Supabase)
        │
        ▼
Devuelve { adText } al frontend
```

## Prompt de IA (fórmula AIDA)

El prompt instruye al modelo a crear anuncios con:
- **Atención**: Pregunta o frase impactante
- **Interés**: Presentación del producto/servicio
- **Deseo**: Beneficios + oferta + urgencia
- **Acción**: CTA clara (WhatsApp, llamada, visita)

Adaptado al tono y expresiones naturales del español de Costa Rica.

## Deploy en Vercel

```bash
vercel deploy --prod
```

Configurar las mismas variables de entorno en el dashboard de Vercel.
