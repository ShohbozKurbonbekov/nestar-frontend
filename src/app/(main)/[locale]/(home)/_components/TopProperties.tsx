"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import CarouselBullets from "@/components/ui/CarouselBullets";
import PropertyCard from "@/components/ui/PropertyCard";
import PropertiesTags from "./PropertiesTags";
import TopPropertiesFooter from "./TopPropertiesFooter";
import { Property } from "@/libs/types/property/property";
import { PropertiesInquiry } from "@/libs/types/property/property.input";
import { Direction, Message } from "@/libs/enums/common.enum";
import Emty from "@/components/ui/Emty";
import { GET_PROPERTIES } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import { T } from "@/libs/types/common";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetProperty } from "@/services/Property.service";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";

const initialInput: PropertiesInquiry = {
  page: 1,
  limit: 8,
  sort: "propertyRank",
  direction: Direction.DESC,
  search: {},
};
// ---------------------------------- Carousel Options ------------------------------
const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
  duration: 40,
};

// ---------------------------------- Component ------------------------------

export default function TopProperties() {
  const [topProperties, setTopProperties] = useState<Property[]>([]);
  const {
    loading: getPropertiesLoading,
    data: getPropertiesData,
    error: getPropertiesError,
    refetch: getPropertiesRefetch,
  } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: initialInput,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setTopProperties(data?.getProperties.list);
    },
  });

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

  const likePropertyHandler = async (user: CustomJwtPayload, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetProperty(id);

      await sweetTopSmallSuccessAlert("succes", 1000);
    } catch (err: any) {
      console.log("ERROR, likePropertyHandler:", err.message);
      await sweetMixinErrorAlert(err.message);
    }
  };
  // ---------------------------------- Render ------------------------------

  if (getPropertiesLoading && !getPropertiesData)
    return <PropertySkeleton columns={4} />;
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {topProperties.length === 0 ? (
          <Emty
            title="No Top Properties
"
          />
        ) : (
          topProperties.map((property) => (
            <div
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] overflow-hidden p-2"
              key={property._id}
            >
              <PropertyCard
                likePropertyHandler={likePropertyHandler}
                property={property}
                featuredTags={
                  <PropertiesTags
                    propertyType={property.propertyBarter ? "Barter" : "Rent"}
                    propertyTag="Top"
                  />
                }
                cardFooter={
                  <TopPropertiesFooter
                    propertyLink={`/properties/${property._id}`}
                    totalViews={property.propertyViews}
                    totalLikes={property.propertyLikes}
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
