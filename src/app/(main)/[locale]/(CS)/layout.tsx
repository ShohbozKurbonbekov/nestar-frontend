import CSHeader from "@/components/layout/CSHeader";

export default function CSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CSHeader></CSHeader>
      <main>{children}</main>
    </>
  );
}
