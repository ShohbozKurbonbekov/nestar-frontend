import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { messageLoaders } from "@/libs/data/static-data";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log("ROOT: ");
  const loadedFiles = await messageLoaders[locale as "en" | "ru" | "ko"]?.();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = {
    ...loadedFiles.home,
    ...loadedFiles.navbar,
    ...loadedFiles.properties,
  };
  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navbar />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}
