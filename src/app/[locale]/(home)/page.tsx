"use client";
import HomepageSectionBlock from "./_components/HomepageSectionBlock";
import TrendingProperties from "./_components/TrendingProperties";
import PopularProperties from "./_components/PopularProperties";
import Advertisement from "./_components/Advertisement";
import TopProperties from "./_components/TopProperties";
import TopAgents from "./_components/TopAgents";
import { Suspense } from "react";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";
import { useTranslations } from "next-intl";
import HomepageArticles from "./_components/HomepageArticles";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      {/*--------------Trend Properties-----------*/}
      <HomepageSectionBlock
        title={t("trendingTitle")}
        subtitle={t("trendingSubtitle")}
      >
        <TrendingProperties />
      </HomepageSectionBlock>

      {/*--------------Popular Properties-----------*/}

      <HomepageSectionBlock
        className="pt-0"
        title={t("popularTitle")}
        subtitle={t("popularSubtitle")}
      >
        <PopularProperties />
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
        <TopAgents />
      </HomepageSectionBlock>
      <HomepageSectionBlock
        className="pt-0 pb-20"
        title={t("articleTitle")}
        subtitle={t("articleSubtitle")}
      >
        <HomepageArticles />
      </HomepageSectionBlock>
    </>
  );
}
