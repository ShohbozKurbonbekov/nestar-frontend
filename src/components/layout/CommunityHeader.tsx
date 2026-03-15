"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CommunityHeader() {
  return (
    <section className="h-[85vh] relative w-full flex flex-row items-center justify-center px-6">
      <Image
        src="/images/header-images/pix.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover w-full h-full  bg-top
"
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center z-30 text-center"
      >
        <Typography className="text-3xl  sm:text-4xl text-white! lg:text-5xl font-semibold">
          Explore Articles
        </Typography>
        <Typography variant="body1" className="text-slate-200 mt-3">
          Discover insights, browse articles by category, or share your own
          knowledge with the community.
        </Typography>
      </motion.div>
    </section>
  );
}
