import PropertyHeader from "@/components/layout/PropertyHeader";

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PropertyHeader />
      <main>{children}</main>
    </>
  );
}
