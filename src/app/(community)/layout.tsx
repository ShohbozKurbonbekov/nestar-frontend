import CommunityHeader from "@/libs/components/layout/CommunityHeader";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommunityHeader />
      {children}
    </>
  );
}
