import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import PropertyCard from "@/components/ui/PropertyCard";
import PopularPropertiesFooter from "./PopularPropertiesFooter";
import CarouselBullets from "@/components/ui/CarouselBullets";
import PropertiesTags from "./PropertiesTags";
import { IconButton } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { PropertiesInquiry } from "@/libs/types/property/property.input";
import { Direction, Message } from "@/libs/enums/common.enum";
import { Property } from "@/libs/types/property/property";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";
import Emty from "@/components/ui/Emty";
import BlueHoveredBtn from "@/components/ui/Blue-hovered-btn";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetProperty } from "@/services/Property.service";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";

const initialInput: PropertiesInquiry = {
  page: 1,
  limit: 8,
  sort: "propertyViews",
  direction: Direction.DESC,
  search: {},
};
// -------------------------- Carousel Options ----------------------
const carouselOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
  slidesToScroll: 1,
};
// -------------------------- Component ----------------------
export default function PropularProperties() {
  const [popularProperties, setPopularProperties] = useState<Property[]>([]);

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
      setPopularProperties(data?.getProperties.list);
    },
  });
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

  // ------------------------ Handlers ------------------------
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
  // ------------------------ Render ------------------------
  if (getPropertiesLoading && !getPropertiesData)
    return <PropertySkeleton columns={4} />;
  return (
    <div className="relative flex flex-col gap-5">
      <div className="overflow-hidden relative" ref={carouselRef}>
        <div className="flex">
          {popularProperties.length === 0 ? (
            <Emty
              title="No Popular Properties
"
            />
          ) : (
            popularProperties.map((property) => (
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
                      propertyTag="Popular"
                    />
                  }
                  cardFooter={
                    <PopularPropertiesFooter
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
          className="absolute left-0 top-[45%] bg-slate-300 text-white w-8 h-8  z-30 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
          onClick={scrollPrev}
        >
          <ArrowLeftIcon fontSize={"large"} />
        </IconButton>
        <IconButton
          className="absolute  right-0 top-[45%] bg-slate-300 text-white w-8 h-8  z-30 hover:bg-slate-400 transition-colors duration-300 ease-in-out"
          onClick={scrollNext}
        >
          <ArrowRightIcon fontSize={"large"} />
        </IconButton>
      </div>

      {/* Browse more */}
      <div className="mx-auto">
        <BlueHoveredBtn
          pathname="/properties"
          btnText="browseMore"
          translationTargetText="HomePage"
        />
      </div>
    </div>
  );
}
