"use client";

import { Tabs, Tab, Divider } from "@mui/material";
import { categories } from "@/libs/data/faq";
import { useRouter, useSearchParams } from "next/navigation";

export function FAQsTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") ?? "GENERAL";

  const onCategory = (c: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", c);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <>
      <Tabs
        value={category}
        onChange={(_, v) => onCategory(v)}
        variant="scrollable"
        allowScrollButtonsMobile
      >
        {categories.map((cat) => (
          <Tab
            key={cat}
            label={cat}
            value={cat}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              minHeight: "40px",
            }}
          />
        ))}
      </Tabs>

      <Divider />
    </>
  );
}
