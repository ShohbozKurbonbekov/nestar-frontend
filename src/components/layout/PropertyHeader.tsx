import PropertyHeaderIntro from "@/app/(main)/[locale]/(properties)/properties/_components/PropertyHeaderIntro";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PropertyHeader() {
  const t = useTranslations("Properties");
  return (
    <section className="h-[80vh] relative w-full flex flex-row items-center justify-center px-6">
      <Image
        src="/images/header-images/property-header.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover w-full h-full"
      />
      <PropertyHeaderIntro />
    </section>
  );
}
