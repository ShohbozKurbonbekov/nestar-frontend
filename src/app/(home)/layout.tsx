import HomeHeader from "@/components/layout/HomeHeader";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeHeader />
      <main>{children}</main>
    </>
  );
}
