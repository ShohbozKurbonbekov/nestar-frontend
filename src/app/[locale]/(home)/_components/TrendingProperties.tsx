"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import CarouselBullets from "@/components/ui/CarouselBullets";
import PropertyCard from "@/components/ui/PropertyCard";
import TrendingPropertiesFooter from "./TrendingPropertiesFooter";
import PropertiesTags from "./PropertiesTags";
import { Property } from "@/libs/types/property/property";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import Emty from "@/components/ui/Emty";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";
import { PropertiesInquiry } from "@/libs/types/property/property.input";
import { Direction } from "@/libs/enums/common.enum";

const initialInput: PropertiesInquiry = {
  page: 1,
  limit: 8,
  sort: "propertyLikes",
  direction: Direction.DESC,
  search: {},
};

// ---------------------------------- Carousel Options ------------------------------
const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
};

// ---------------------------------- Component ------------------------------
export default function TrendingProperties() {
  const [trendingProperties, setTrendingProperties] = useState<Property[]>([]);

  const {
    loading: getPropertiesLoading,
    data: getPropertiesData,
    error: getPropertiesError,
    refetch: getPropertiesRefetch,
  } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        page: 1,
        limit: 8,
        sort: "propertyLikes",
        direction: "DESC",
        search: {},
      },
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setTrendingProperties(data?.getProperties.list);
    },
  });

  // ------------------------ Carousel setup --------------
  const [emblaRef, carouselApi] = useEmblaCarousel(carouselOptions);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [allCarouselNumbers, setAllCarouselNumbers] = useState<number[]>([]);
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

  // ---------------------------------- Handlers ------------------------------

  // ---------------------------------- Render ------------------------------

  if (getPropertiesLoading) return <PropertySkeleton columns={4} />;
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {trendingProperties.length === 0 ? (
          <Emty
            title="No trending Properties
"
          />
        ) : (
          trendingProperties.map((property) => (
            <div
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] overflow-hidden p-2"
              key={property._id}
            >
              <PropertyCard
                property={property}
                featuredTags={
                  <PropertiesTags
                    propertyType={property.propertyBarter ? "Barter" : "Rent"}
                    propertyTag="trending"
                  />
                }
                cardFooter={
                  <TrendingPropertiesFooter
                    totalLikes={property.propertyLikes}
                    propertyLink={`/properties/${property._id}`}
                    totalViews={property.propertyViews}
                  />
                }
              />
            </div>
          ))
        )}
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
