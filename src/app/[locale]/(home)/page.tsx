"use client";
import HomepageSectionBlock from "./_components/HomepageSectionBlock";
import TrendingProperties from "./_components/TrendingProperties";
import PopularProperties from "./_components/PopularProperties";
import Advertisement from "./_components/Advertisement";
import TopProperties from "./_components/TopProperties";
import TopAgents from "./_components/TopAgents";
import { Suspense } from "react";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";
import AgentSkeleton from "@/components/skeletons/AgentSkeleton";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      {/*--------------Trend Properties-----------*/}
      <HomepageSectionBlock
        title={t("trendingTitle")}
        subtitle={t("trendingSubtitle")}
      >
        <Suspense fallback={<PropertySkeleton />}>
          <TrendingProperties />
        </Suspense>
      </HomepageSectionBlock>

      {/*--------------Popular Properties-----------*/}

      <HomepageSectionBlock
        className="pt-0"
        title={t("popularTitle")}
        subtitle={t("popularSubtitle")}
      >
        <Suspense fallback={<PropertySkeleton />}>
          <PopularProperties />
        </Suspense>
      </HomepageSectionBlock>

      {/*--------------Advertisement-----------*/}
      <Advertisement />

      {/*-------------- Top Properties-----------*/}

      <HomepageSectionBlock title={t("topTitle")} subtitle={t("topSubtitle")}>
        <TopProperties />
      </HomepageSectionBlock>
      {/*--------------Top Agents-----------*/}
      <HomepageSectionBlock
        title={t("agentTitle")}
        subtitle={t("agentSubtitle")}
        className="pt-0"
      >
        <Suspense fallback={<PropertySkeleton />}>
          <Suspense fallback={<AgentSkeleton></AgentSkeleton>}>
            <TopAgents />
          </Suspense>
        </Suspense>
      </HomepageSectionBlock>
    </>
  );
}
