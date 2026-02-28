import HomepageSearchCategory from "@/app/(home)/_components/HomepageSearchCategory";
import Image from "next/image";

export default function HomeHeader() {
  return (
    <section className="min-h-screen w-full flex flex-row items-end justify-center">
      <Image
        src="/images/header-images/homepage-header.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover bg-no-repeat bg-center "
      />
      <HomepageSearchCategory />
    </section>
  );
}
