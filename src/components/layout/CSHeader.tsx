"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CSHeader() {
  return (
    <section className="h-[80vh] relative w-full flex flex-row items-center justify-center px-6">
      <Image
        src="/images/header-images/CS-header.jfif"
        alt="Hero background"
        fill
        priority
        className="object-cover w-full h-full object-center
"
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center z-30 text-center"
      >
        <Typography className="text-3xl  sm:text-4xl text-white lg:text-5xl font-semibold">
          Community Notices & Help Center
        </Typography>
        <Typography variant="body1" className="text-slate-200 mt-3">
          Stay informed with important announcements and find answers to your
          questions.
        </Typography>
      </motion.div>
      <span className="absolute inset-0 bg-linear-to-br from-black/40 to-black/10"></span>
    </section>
  );
}
