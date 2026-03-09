"use client";
import { CircularProgress } from "@mui/material";

interface DetailPageLoadingType {
  title?: string;
  subtitle?: string;
}
export default function DetailPageLoading({
  subtitle = "Fetching detail...",
  title = "Loading on progress",
}: DetailPageLoadingType) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* BLUR BACKGROUND */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      {/* CENTER CARD */}
      <div className="relative flex flex-col items-center gap-6  bg-white/90 backdrop-blur-lg  px-12 py-10 rounded-3xl shadow-2xl">
        {/* SPINNER WITH SOFT GLOW */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full bg-blue-500/40 blur-xl "></div>
          <CircularProgress size={42} thickness={4} />
        </div>

        {/* TEXT */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-semibold tracking-wide text-gray-800">
            {title}
          </p>

          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
