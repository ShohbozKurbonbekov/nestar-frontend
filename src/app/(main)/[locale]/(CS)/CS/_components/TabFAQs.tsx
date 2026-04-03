"use client";

import { Box, Typography } from "@mui/material";
import { FAQsTabs } from "./FAQsTabs";
import { FAQsAccordion } from "./FAQAccordion";

export default function TabFAQs() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-start">
      {/* HEADER */}
      <div className="mb-10 w-full text-center">
        <Typography className="text-3xl sm:text-4xl font-semibold text-slate-900">
          FAQs
        </Typography>
        <Typography className="text-slate-500 text-sm mt-2">
          Clear answers to common questions
        </Typography>
      </div>

      {/* TABS */}
      <div className="mb-8  w-full sm:w-auto overflow-x-auto">
        <FAQsTabs />
      </div>

      {/* CONTENT */}
      <FAQsAccordion />
    </div>
  );
}
