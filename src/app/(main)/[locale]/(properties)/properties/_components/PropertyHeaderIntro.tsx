"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PropertyHeaderIntro() {
  const t = useTranslations("Properties");
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center z-30 text-center"
    >
      <Typography className="text-3xl  sm:text-4xl text-white! lg:text-5xl font-semibold">
        {t("heroTitle")}
      </Typography>
      <Typography variant="body1" className="text-slate-200">
        {t("heroSubtitle")}
      </Typography>
    </motion.div>
  );
}
