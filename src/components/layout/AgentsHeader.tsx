"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
export default function AgentsHeader() {
  return (
    <section className="h-[80vh] relative w-full flex flex-row items-center justify-center px-6">
      <Image
        src="/images/header-images/agents-header.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover w-full h-full  bg-bottom
"
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center z-30 text-center"
      >
        <Typography className="text-3xl  sm:text-4xl text-white! lg:text-5xl font-semibold">
          Find the Right Real Estate Agent
        </Typography>
        <Typography variant="body1" className="text-slate-200 mt-3">
          Search experienced agents, explore their listings, and connect with
          professionals who can help you buy, sell, or rent with confidence.
        </Typography>
      </motion.div>
    </section>
  );
}
