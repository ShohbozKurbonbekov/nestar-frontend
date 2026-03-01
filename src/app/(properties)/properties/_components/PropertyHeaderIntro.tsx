"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function PropertyHeaderIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center z-30 text-center"
    >
      <Typography className="text-3xl  sm:text-4xl text-white! lg:text-5xl font-semibold">
        Discover a Place You’ll Love to Call Home
      </Typography>
      <Typography variant="body1" className="text-slate-200">
        Explore verified apartments, modern houses, and luxury villas across top
        locations.
      </Typography>
    </motion.div>
  );
}
