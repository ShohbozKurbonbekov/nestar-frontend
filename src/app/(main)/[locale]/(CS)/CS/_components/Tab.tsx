"use client";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { PageTabs } from "@/libs/enums/notice.enum";
import { useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { label: "Notices", value: PageTabs.NOTICES },
  { label: "FAQs", value: PageTabs.FAQ },
];

export default function Tab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") ?? PageTabs.NOTICES;

  const onTab = (tab: string) => {
    if (!tab) return;

    const params = new URLSearchParams();
    params.set("tab", tab);
    router.replace(`?${params.toString()}`);
  };
  return (
    <Stack my={5} direction={"row"} justifyContent={"center"}>
      <ToggleButtonGroup
        exclusive
        value={currentTab}
        onChange={(_, val) => val && onTab(val)}
        className="bg-slate-100 p-1.5 rounded-2xl w-fit gap-2"
        sx={{
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          "& .MuiToggleButton-root": {
            transition: "all 0.25s ease",
            border: "none",
          },
        }}
      >
        {tabs.map(({ label, value }) => (
          <ToggleButton
            key={value}
            value={value}
            className="rounded-xl px-6 py-2 font-medium"
            sx={{
              "&.Mui-selected": {
                background: "#6366F1",
                color: "#fff",
                transform: "scale(1.04)",
              },
            }}
          >
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
