import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import CarouselBullets from "@/components/ui/CarouselBullets";
import { Button, Chip, IconButton } from "@mui/material";
import Link from "next/link";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AgentCard from "@/components/ui/AgentCard";

// -------------------------- Carousel Options ----------------------
const carouselOptions: EmblaOptionsType = {
  loop: true,
  duration: 40,
  align: "start",
  slidesToScroll: 1,
};
// -------------------------- Component ----------------------
interface TopAgentsType {
  initialInput?: number[];
}
const DEFAULT_INPUT = [1, 2, 3, 4, 5, 6];

export default function TopAgents({
  initialInput = DEFAULT_INPUT,
}: TopAgentsType) {
  const [topAgents, setTopAgents] = useState<number[]>(initialInput);
  // ------------------------ Carousel Setup ------------------------
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

  const scrollTo = useCallback(
    (index: number) => carouselApi && carouselApi?.scrollTo(index),
    [carouselApi],
  );

  const scrollPrev = () => carouselApi?.scrollPrev();
  const scrollNext = () => carouselApi?.scrollNext();

  return (
    <div className="relative flex flex-col gap-5">
      <div className="overflow-hidden relative" ref={carouselRef}>
        <div className="flex">
          {topAgents.map((number) => (
            <div
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] p-3"
              key={number}
            >
              <AgentCard
                agentLink="/agents/id:ffgj"
                agentFeaturedTag={
                  <div className="absolute top-4 left-4">
                    <Chip
                      label={`Top Agent`}
                      size="small"
                      className="bg-white/90 font-semibold"
                    />
                  </div>
                }
              />
            </div>
          ))}
        </div>

        {/* // dots */}
        <CarouselBullets
          totalCarousels={scrollSnaps}
          bulletsWrapperClasses={
            "items-center flex justify-center w-full my-8 gap-3"
          }
          onScroll={scrollTo}
          currentCarousel={currentIndex}
        />

        {/* Slide Buttons*/}
        <IconButton
          className="absolute left-0 top-[44%] bg-slate-300 text-white w-8 h-8  z-30 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
          onClick={scrollPrev}
        >
          <ArrowLeftIcon fontSize={"large"} />
        </IconButton>
        <IconButton
          className="absolute  right-0 top-[44%] bg-slate-300 text-white w-8 h-8  z-30 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
          onClick={scrollNext}
        >
          <ArrowRightIcon fontSize={"large"} />
        </IconButton>
      </div>

      {/* Browse more */}
      <div className="mx-auto">
        <Button className="capitalize border-blue-600 border rounded-lg px-4 py-2 relative overflow-hidden group">
          <Link href="/agents" className="relative z-10 group-hover:text-white">
            Browse More
          </Link>
          <span className="absolute inset-0 bg-blue-600 -translate-x-full opacity-0 group-hover:translate-x-0 duration-500 rounded-r-lg ease-in-out  transition-transform group-hover:opacity-100"></span>
        </Button>
      </div>
    </div>
  );
}
