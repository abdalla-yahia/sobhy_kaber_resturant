import Footer_Container from "@/Components/Footer/Footer_Container";
import Header_Container from "@/Components/Header/Header_Container";
import { Almarai } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getMessages } from "next-intl/server";
import React from "react";
import { Metadata } from "next";

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};


const baseUrl = "https://sobhy-kaber.vercel.app";

const languages = ["en", "ar", "fr", "sp", "it", "zh"];

export async function generateMetadata({ params }: {params:Promise<{locale:string}>}): Promise<Metadata> {
  const { locale } = await params;

  const translations: Record<
    string,
    {
      title: string;
      description: string;
      keywords: string[];
      ogTitle: string;
      ogDescription: string;
      twitterTitle: string;
      twitterDescription: string;
    }
  > = {
    en: {
      title: "Sobhy Kaber - Authentic Egyptian Cuisine",
      description:
        "Sobhy Kaber is one of Egypt’s most famous restaurants, serving authentic Egyptian dishes including grills, mandi, and tajines.",
      keywords: [
        "Egyptian restaurant",
        "grills in Egypt",
        "authentic mandi",
        "tajines",
        "oriental food",
        "Sobhy Kaber Cairo",
        "traditional Egyptian cuisine",
      ],
      ogTitle: "Sobhy Kaber - Authentic Egyptian Cuisine",
      ogDescription:
        "Discover the authentic taste of Egypt at Sobhy Kaber. Serving grills, mandi, tajines, and oriental dishes with top quality and service.",
      twitterTitle: "Sobhy Kaber - Authentic Egyptian Cuisine",
      twitterDescription:
        "Enjoy authentic Egyptian grills, mandi, and tajines at Sobhy Kaber — one of the most famous restaurants in Egypt.",
    },
    ar: {
      title: "صبحي كابر - المذاق المصري الأصيل",
      description:
        "مطعم صبحي كابر من أشهر مطاعم مصر، يقدم أشهى الأكلات المصرية الأصيلة من مشويات ومندي وطواجن.",
      keywords: [
        "مطعم صبحي كابر",
        "مشويات مصرية",
        "مندي مصري",
        "طواجن مصرية",
        "أكلات شرقية",
        "مطاعم القاهرة",
        "أكل مصري أصيل",
      ],
      ogTitle: "صبحي كابر - المذاق المصري الأصيل",
      ogDescription:
        "اكتشف الطعم المصري الأصيل في صبحي كابر. نقدم المشويات والمندي والطواجن والأكلات الشرقية بجودة عالية وخدمة مميزة.",
      twitterTitle: "صبحي كابر - المذاق المصري الأصيل",
      twitterDescription:
        "استمتع بالمشويات والمندي والطواجن في مطعم صبحي كابر — من أشهر مطاعم مصر.",
    },
    fr: {
      title: "Sobhy Kaber - Cuisine Égyptienne Authentique",
      description:
        "Sobhy Kaber est l’un des restaurants les plus célèbres d’Égypte, servant des plats égyptiens authentiques tels que grillades, mandi et tajines.",
      keywords: [
        "restaurant égyptien",
        "grillades égyptiennes",
        "mandi authentique",
        "tajines orientaux",
        "Sobhy Kaber Le Caire",
      ],
      ogTitle: "Sobhy Kaber - Cuisine Égyptienne Authentique",
      ogDescription:
        "Découvrez le goût authentique de l'Égypte chez Sobhy Kaber. Grillades, mandi, tajines et plats orientaux avec une qualité et un service exceptionnels.",
      twitterTitle: "Sobhy Kaber - Cuisine Égyptienne Authentique",
      twitterDescription:
        "Savourez les grillades, le mandi et les tajines égyptiens authentiques chez Sobhy Kaber — l’un des restaurants les plus célèbres d’Égypte.",
    },
    sp: {
      title: "Sobhy Kaber - Cocina Egipcia Auténtica",
      description:
        "Sobhy Kaber es uno de los restaurantes más famosos de Egipto, que ofrece platos egipcios auténticos como parrilladas, mandi y tajines.",
      keywords: [
        "restaurante egipcio",
        "parrilladas en Egipto",
        "mandi auténtico",
        "tajines tradicionales",
        "Sobhy Kaber El Cairo",
      ],
      ogTitle: "Sobhy Kaber - Cocina Egipcia Auténtica",
      ogDescription:
        "Descubre el auténtico sabor de Egipto en Sobhy Kaber. Parrilladas, mandi, tajines y platos orientales con la mejor calidad y servicio.",
      twitterTitle: "Sobhy Kaber - Cocina Egipcia Auténtica",
      twitterDescription:
        "Disfruta de parrilladas, mandi y tajines egipcios auténticos en Sobhy Kaber — uno de los restaurantes más famosos de Egipto.",
    },
    it: {
      title: "Sobhy Kaber - Cucina Egiziana Autentica",
      description:
        "Sobhy Kaber è uno dei ristoranti più famosi d'Egitto, che serve piatti egiziani autentici come grigliate, mandi e tajine.",
      keywords: [
        "ristorante egiziano",
        "grigliate egiziane",
        "mandi autentico",
        "tajine orientali",
        "Sobhy Kaber Il Cairo",
      ],
      ogTitle: "Sobhy Kaber - Cucina Egiziana Autentica",
      ogDescription:
        "Scopri il gusto autentico dell'Egitto da Sobhy Kaber. Grigliate, mandi, tajine e piatti orientali con qualità e servizio eccellenti.",
      twitterTitle: "Sobhy Kaber - Cucina Egiziana Autentica",
      twitterDescription:
        "Goditi grigliate, mandi e tajine egiziani autentici da Sobhy Kaber — uno dei ristoranti più famosi d'Egitto.",
    },
    zh: {
      title: "Sobhy Kaber - 正宗埃及美食",
      description:
        "Sobhy Kaber 是埃及最著名的餐厅之一，供应正宗的埃及菜，包括烧烤、曼迪和炖菜。",
      keywords: [
        "埃及餐厅",
        "埃及烧烤",
        "正宗曼迪",
        "塔吉锅菜",
        "Sobhy Kaber 开罗",
      ],
      ogTitle: "Sobhy Kaber - 正宗埃及美食",
      ogDescription:
        "在 Sobhy Kaber 探索埃及的正宗风味。提供烧烤、曼迪、炖菜和东方菜肴，品质优良，服务一流。",
      twitterTitle: "Sobhy Kaber - 正宗埃及美食",
      twitterDescription:
        "在 Sobhy Kaber 享用正宗的埃及烧烤、曼迪和炖菜 —— 埃及最著名的餐厅之一。",
    },
  };

  const fallback = translations["en"];
  const t = translations[locale] || fallback;

  // alternates hreflang
  const alternates: Record<string, string> = {};
  languages.forEach((l) => {
    alternates[l] = `${baseUrl}/${l}`;
  });

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: `${baseUrl}/${locale}`,
      siteName: "Sobhy Kaber Restaurant",
      images: [
        {
          url: "/Images/Logo.png",
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      locale: locale === "ar" ? "ar_AR" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.twitterTitle,
      description: t.twitterDescription,
      images: ["/Images/Logo.png"],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternates,
    },
    icons: {
      icon: "/favicon.ico",
    },
    manifest: "/manifest.json",
    themeColor: "#b71c1c",
    applicationName: "Sobhy Kaber Restaurant",
    robots: {
      index: true,
      follow: true,
    },
  };
}
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
 setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale== 'ar' ? 'rtl':'ltr'}>
      <link rel="manifest" href={`/${locale}/manifest.webmanifest`} />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header_Container currentLocale={locale}/>
          <main className={`${almarai.variable} min-h-screen`}>
            {children}
          </main>
          <Footer_Container />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


