"use client";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { PlayArrow } from "@mui/icons-material";
import { ADVERTISEMENT_VIDEOS } from "@/libs/data/static-data";
import { Typography } from "@mui/material";

export default function Advertisement() {
  const t = useTranslations("HomePage");
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoChange = (index: number) => {
    if (index === activeVideo) return;

    setActiveVideo(index);

    // Smooth reset playback without remount
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <section className="relative w-full h-screen min-h-150 overflow-hidden bg-black shadow-[0_0_6px_8px_rgba(0,0,0,0.3)]">
      {/* MAIN VIDEO */}
      <video
        ref={videoRef}
        src={ADVERTISEMENT_VIDEOS[activeVideo].src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/50 via-black/30 to-black/50" />

      {/* DESKTOP PREVIEW COLUMN */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2  z-40 flex-col justify-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl">
        {ADVERTISEMENT_VIDEOS.map((video, index) => {
          if (index === activeVideo) return null;

          return (
            <div
              key={video.id}
              onClick={() => handleVideoChange(index)}
              className="relative w-48 h-28 cursor-pointer group overflow-hidden rounded-xl border border-white/20 hover:border-white transition-all duration-300"
            >
              <video
                src={video.src}
                muted
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <PlayArrow className="text-white text-4xl opacity-90 group-hover:scale-125 transition-transform duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="lg:hidden absolute bottom-0 left-0 w-full z-40">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/50 to-transparent pointer-events-none " />

        <div className="relative px-4 pb-6 flex justify-center items-center gap-4 flex-wrap">
          {ADVERTISEMENT_VIDEOS.map((video, index) => {
            if (activeVideo === index) return;
            return (
              <button
                key={video.id}
                onClick={() => handleVideoChange(index)}
                className={`relative shrink-0 w-32 h-20 rounded-lg overflow-hidden border-white/20 border hover:border-white transition-all duration-300 group`}
              >
                {/* Thumbnail video */}
                <video
                  src={video.src}
                  muted
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`rounded-full p-1 bg-white text-black`}>
                    <PlayArrow />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
        <Typography variant="h1" className="max-w-xl px-4">
          {t("advertisementTitle")}
        </Typography>

        <Typography
          variant="inherit"
          className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed px-4"
        >
          {t("advertisementSubtitle")}
        </Typography>
      </div>
    </section>
  );
}
