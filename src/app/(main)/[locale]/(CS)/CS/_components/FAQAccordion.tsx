"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";
import { FAQCategory, faqData, FAQItem } from "@/libs/data/faq";
import { useRouter, useSearchParams } from "next/navigation";

export function FAQsAccordion() {
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") as FAQCategory) ?? "GENERAL";

  return (
    <div className="space-y-3 w-full">
      {faqData[category].map((item, i) => (
        <Accordion
          key={i}
          defaultExpanded={i === 0}
          className="rounded-xl border-slate-200 border-2 shadow-sm hover:shadow-md transition"
          sx={{
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <HelpOutlineIcon className="text-slate-400" fontSize="small" />

              <Typography className="font-medium text-slate-800 text-sm sm:text-base">
                {item.q}
              </Typography>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
            <Stack direction="row" spacing={1.5}>
              <CheckIcon className="text-emerald-500 mt-1" fontSize="small" />

              <Typography className="text-slate-600 text-sm leading-relaxed">
                {item.a}
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
