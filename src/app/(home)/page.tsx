"use client";
import HomepageSectionBlock from "./_components/HomepageSectionBlock";
import TrendingProperties from "./_components/TrendingProperties";
import PopularProperties from "./_components/PopularProperties";
import Advertisement from "./_components/Advertisement";
import TopProperties from "./_components/TopProperties";
import TopAgents from "./TopAgents";
import { Suspense } from "react";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";
import AgentSkeleton from "@/components/skeletons/AgentSkeleton";
export default function Home() {
  return (
    <>
      {/*--------------Trend Properties-----------*/}
      <HomepageSectionBlock
        title="Trend Properties"
        subtitle="The most liked and highly engaged listings on our platform"
      >
        <Suspense fallback={<PropertySkeleton />}>
          <TrendingProperties />
        </Suspense>
      </HomepageSectionBlock>

      {/*--------------Popular Properties-----------*/}

      <HomepageSectionBlock
        className="pt-0"
        title="Discover the Most Popular Properties Right Now"
        subtitle="Famous listings based on  user views"
      >
        <Suspense fallback={<PropertySkeleton />}>
          <PopularProperties />
        </Suspense>
      </HomepageSectionBlock>

      {/*--------------Advertisement-----------*/}
      <Advertisement />

      {/*-------------- Top Properties-----------*/}

      <HomepageSectionBlock
        title="Top Properties"
        subtitle=" The highest ranked listings based on engagement, demand, and market activity"
      >
        <TopProperties />
      </HomepageSectionBlock>
      {/*--------------Top Agents-----------*/}
      <HomepageSectionBlock
        title="Top Rated Real Estate Agents"
        subtitle=" The highest ranked agents by users"
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
