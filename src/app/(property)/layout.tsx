import PropertyHeader from "@/libs/components/layout/PropertyHeader";

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PropertyHeader />
      {children}
    </>
  );
}
