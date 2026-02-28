import PropertyHeaderIntro from "@/app/(properties)/properties/_components/PropertyHeaderIntro";
import Image from "next/image";

export default function PropertyHeader() {
  return (
    <section className="h-[80vh] relative w-full flex flex-row items-center justify-center px-6">
      <Image
        src="/images/header-images/property-header.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover bg-no-repeat bg-center w-full h-full"
      />
      <PropertyHeaderIntro />
    </section>
  );
}
