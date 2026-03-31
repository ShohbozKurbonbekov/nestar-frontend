import AgentsHeader from "@/components/layout/AgentsHeader";

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AgentsHeader></AgentsHeader>
      <main>{children}</main>
    </>
  );
}
