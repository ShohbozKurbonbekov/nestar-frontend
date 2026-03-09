"use client";
import { serverApi } from "@/libs/config";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
// ---------------------------------- Carousel Options ------------------------------
const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
  dragFree: true,
};

// ---------------------------------- Component ------------------------------
interface PropertyGalleryType {
  images?: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryType) {
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const slides = images?.map((src) => ({ src: `${serverApi}/${src}` }));

  // ---------------------------------- Carousel Setup ------------------------------
  const [carouselRef, carouselApi] = useEmblaCarousel(carouselOptions);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setScrollSnaps(() => carouselApi.scrollSnapList());
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [onSelect, carouselApi]);

  const scrollPrev = () => carouselApi?.scrollPrev();
  const scrollNext = () => carouselApi?.scrollNext();

  // ---------------------------------- Render ------------------------------
  return (
    <div className="max-w-8xl mx-auto px-4 mt-5 relative">
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-120 rounded-2xl overflow-hidden relative">
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        >
          <Image
            src={images?.[0] ? `${serverApi}/${images?.[0]}` : ""}
            alt="Main-image"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {images?.slice(1, 4).map((img, i) => (
          <div
            key={i}
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => {
              setIndex(i + 1);
              setOpen(true);
            }}
          >
            <Image
              src={img ? `${serverApi}/${img}` : ""}
              alt="small-image"
              fill
              className="w-full h-ful object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        ))}

        <div className="absolute bottom-4 left-8 bg-black/60 text-white text-sm px-3 py-1 rounded-lg">
          {images?.length} Photos
        </div>
        <div className="relative flex items-center justify-center">
          <Image
            src={images?.[0] ? `${serverApi}/${images?.[0]}` : ""}
            alt="Main-image"
            fill
            className="object-cover absolute inset-0"
          />

          <Button
            onClick={() => {
              setIndex(0);
              setOpen(true);
            }}
            className="bg-linear-to-t from-black/70 via-black/50 to-black/30 text-slate-300 hover:text-white duration-300 transition-colors ease-in-out capitalize text-sm   shadow font-medium  z-10 absolute inset-0 "
          >
            Show all photos
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div
        className="md:hidden w-full overflow-hidden relative"
        ref={carouselRef}
      >
        <div className="flex">
          {images?.map((img, i) => (
            <div className="flex-[0_0_100%] relative h-65">
              <Image
                fill
                alt={`image-${i + 1}`}
                src={img ? `${serverApi}/${img}` : ""}
                className="object-cover rounded-xl h-full w-full p-1"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray">
            {currentIndex + 1} / {scrollSnaps.length}
          </span>
          <Button
            className="text-xs capitalize bg-black/30 text-white rounded-lg border px-5 py-2  ml-auto"
            onClick={() => {
              setIndex(0);
              setOpen(true);
            }}
          >
            Show All
          </Button>
        </div>

        <div className="flex flex-row  gap-2 items-center justify-center">
          <IconButton
            className="bg-slate-200 p-1"
            color="default"
            onClick={() => {
              scrollPrev();
            }}
          >
            <ArrowLeft className="text-xl" />
          </IconButton>

          <IconButton
            className="bg-slate-200 p-1"
            color="default"
            onClick={() => {
              scrollNext();
            }}
          >
            <ArrowRight className="text-xl" />
          </IconButton>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Zoom, Thumbnails]}
      />
    </div>
  );
}
