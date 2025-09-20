// app/[locale]/manifest/route.ts
import { NextResponse } from "next/server";

type Prop={
    name:string
     short_name:string
    description:string
    lang:string
    start_url:string
}
const manifests: Record<string,Prop > = {
  en: {
    name: "Sobhy Kaber",
    short_name: "SobhyKaber",
    description:
      "Authentic Egyptian Taste from Cairo to the World — Sobhy Kaber restaurant.",
    lang: "en",
    start_url: "/en",
  },
  ar: {
    name: "صبحي كابر",
    short_name: "صبحي",
    description:
      "المذاق المصري الأصيل من القاهرة إلى العالم — مطعم صبحي كابر.",
    lang: "ar",
    start_url: "/ar",
  },
  fr: {
    name: "Sobhy Kaber",
    short_name: "Sobhy",
    description:
      "Saveur égyptienne authentique — Restaurant Sobhy Kaber au Caire et dans le monde.",
    lang: "fr",
    start_url: "/fr",
  },
  sp: {
    name: "Sobhy Kaber",
    short_name: "Sobhy",
    description:
      "Sabor egipcio auténtico — Restaurante Sobhy Kaber desde El Cairo al mundo.",
    lang: "es",
    start_url: "/es",
  },
  it: {
    name: "Sobhy Kaber",
    short_name: "Sobhy",
    description:
      "Gusto egiziano autentico — Ristorante Sobhy Kaber dal Cairo al mondo.",
    lang: "it",
    start_url: "/it",
  },
  zh: {
    name: "索比·卡贝尔",
    short_name: "Sobhy",
    description: "正宗埃及风味 — Sobhy Kaber 餐厅，从开罗到世界。",
    lang: "zh",
    start_url: "/zh",
  },
};

export async function GET(req: Request,{ params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const manifest = manifests[locale] || manifests["en"];

  return NextResponse.json(
    {
      ...manifest,
      scope: "/",
      display: "standalone",
      orientation: "portrait",
      background_color: "#ffffff",
      theme_color: "#b71c1c",
      categories: ["restaurant", "food", "hospitality"],
      icons: [
        {
          src: "/favicon/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/favicon/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/favicon/maskable-icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      related_applications: [],
      prefer_related_applications: false,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/manifest+json",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    }
  );
}
