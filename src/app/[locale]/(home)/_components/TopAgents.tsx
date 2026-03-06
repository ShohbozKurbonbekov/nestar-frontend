import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import CarouselBullets from "@/components/ui/CarouselBullets";
import { Button, Chip, IconButton } from "@mui/material";
import { Link } from "@/i18n/navigation";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AgentCard from "@/components/ui/AgentCard";
import { useTranslations } from "next-intl";
import { AgentsInquiry } from "@/libs/types/member/member.input";
import { Direction, Message } from "@/libs/enums/common.enum";
import { Member } from "@/libs/types/member/member";
import { useQuery } from "@apollo/client";
import { GET_AGENTS } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import AgentSkeleton from "@/components/skeletons/AgentSkeleton";
import Emty from "@/components/ui/Emty";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetAgent } from "@/services/Agent.service";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";

const initialInput: AgentsInquiry = {
  page: 1,
  limit: 8,
  sort: "memberRank",
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

export default function TopAgents() {
  const t = useTranslations("HomePage");
  const [topAgents, setTopAgents] = useState<Member[]>([]);

  const {
    loading: getAgentsLoading,
    data: getAgentsData,
    error: getAgentsError,
    refetch: getAgentsRefetch,
  } = useQuery(GET_AGENTS, {
    fetchPolicy: "cache-and-network",
    variables: { input: initialInput },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setTopAgents(data?.getAgents?.list);
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

  // -------------------------- Handlers ---------------------
  const likeAgentHandler = async (user: CustomJwtPayload, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetAgent(id);

      await sweetTopSmallSuccessAlert("succes", 1000);
    } catch (err: any) {
      console.log("ERROR, likeAgentHandler:", err.message);
      await sweetMixinErrorAlert(err.message);
    }
  };

  // ----------------------------- Render ---------------------
  if (getAgentsLoading) return <AgentSkeleton columns={4} />;
  return (
    <div className="relative flex flex-col gap-5">
      <div className="overflow-hidden relative" ref={carouselRef}>
        <div className="flex">
          {topAgents.length === 0 ? (
            <Emty
              title="No Top Agents
          "
            />
          ) : (
            topAgents.map((agent) => (
              <div
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] overflow-hidden p-2"
                key={agent._id}
              >
                <AgentCard
                  likeAgentHandler={likeAgentHandler}
                  agentLink={`/agents/${agent._id}`}
                  agentFeaturedTag={
                    <div className="absolute top-4 left-4">
                      <Chip
                        label={`Top Agent`}
                        size="small"
                        className="bg-white/90 font-semibold"
                      />
                    </div>
                  }
                  agent={agent}
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
            {t("browseMore")}
          </Link>
          <span className="absolute inset-0 bg-blue-600 -translate-x-full opacity-0 group-hover:translate-x-0 duration-500 rounded-r-lg ease-in-out  transition-transform group-hover:opacity-100"></span>
        </Button>
      </div>
    </div>
  );
}
