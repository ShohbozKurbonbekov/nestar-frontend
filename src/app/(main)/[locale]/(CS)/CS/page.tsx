"use client";
import { Paper, Stack } from "@mui/material";
import Tab from "./_components/Tab";
import { useSearchParams } from "next/navigation";
import { PageTabs } from "@/libs/enums/notice.enum";
import TabNotice from "./_components/TabNotice";
import TabFAQs from "./_components/TabFAQs";

export default function CSPage() {
  const searParams = useSearchParams();
  const tab = searParams.get("tab") ?? PageTabs.NOTICES;
  return (
    <section className="px-4">
      <div className="max-w-8xl mx-auto">
        <Tab />
        <Stack className="my-10">
          {tab === PageTabs.NOTICES ? <TabNotice /> : <TabFAQs />}
        </Stack>
      </div>
    </section>
  );
}
