import HomepageSearchCategory from "@/app/(main)/[locale]/(home)/_components/HomepageSearchCategory";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HomeHeader() {
  const t = useTranslations("HomePage");
  return (
    <section className="min-h-screen w-full flex flex-row items-end justify-center">
      <Image
        src="/images/header-images/homepage-header.jpg"
        alt="Hero background"
        fill={true}
        priority
        className="object-cover bg-no-repeat bg-center "
      />
      <HomepageSearchCategory />
    </section>
  );
}
