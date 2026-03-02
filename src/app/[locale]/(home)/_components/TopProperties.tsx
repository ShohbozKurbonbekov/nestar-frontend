"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import CarouselBullets from "@/components/ui/CarouselBullets";
import PropertyCard from "@/components/ui/PropertyCard";
import PropertiesTags from "./PropertiesTags";
import TopPropertiesFooter from "./TopPropertiesFooter";

// ---------------------------------- Carousel Options ------------------------------
const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
  duration: 40,
};

// ---------------------------------- Component ------------------------------
interface TopPropertiesType {
  initialInput?: number[];
}
const DEFAULT_INPUT = [1, 2, 3, 4, 5, 6];

export default function TopProperties({
  initialInput = DEFAULT_INPUT,
}: TopPropertiesType) {
  const [topProperties, setTopProperties] = useState<number[]>(initialInput);

  const [emblaRef, carouselApi] = useEmblaCarousel(carouselOptions);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [allCarouselNumbers, setAllCarouselNumbers] = useState<number[]>([]);

  // ---------------------------------- Handlers ------------------------------
  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setCarouselIndex(carouselApi.selectedScrollSnap());
  }, []);

  const scrollTo = useCallback(
    (index: number) => carouselApi && carouselApi.scrollTo(index),
    [carouselApi],
  );

  useEffect(() => {
    if (!carouselApi) return;

    setAllCarouselNumbers(() => carouselApi.scrollSnapList());
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, onSelect]);

  // ---------------------------------- Render ------------------------------
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {topProperties.map((number) => (
          <div
            className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] p-2"
            key={number}
          >
            <PropertyCard
              featuredTags={
                <PropertiesTags propertyType={"Barter"} propertyTag="Top" />
              }
              cardFooter={
                <TopPropertiesFooter
                  totalLikes={10}
                  propertyLink="/properties/id:jb"
                  totalViews={20}
                />
              }
            />
          </div>
        ))}
      </div>

      {/* // dots */}
      {
        <CarouselBullets
          totalCarousels={allCarouselNumbers}
          bulletsWrapperClasses={
            "items-center flex justify-center w-full my-8 gap-3"
          }
          onScroll={scrollTo}
          currentCarousel={carouselIndex}
        />
      }
    </div>
  );
}
