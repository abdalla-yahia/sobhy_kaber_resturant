import Footer_Container from "@/Components/Footer/Footer_Container";
import Header_Container from "@/Components/Header/Header_Container";
import { Almarai } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getMessages } from "next-intl/server";
import React from "react";

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
 setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale== 'ar' ? 'rtl':'ltr'}>
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
