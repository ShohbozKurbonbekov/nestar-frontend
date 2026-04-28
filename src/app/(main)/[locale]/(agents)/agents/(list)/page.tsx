"use client";

import { GET_AGENTS } from "@/apollo/user/query";
import { Direction, Message } from "@/libs/enums/common.enum";
import { T } from "@/libs/types/common";
import { Member } from "@/libs/types/member/member";
import { AgentsInquiry } from "@/libs/types/member/member.input";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AgentSearchFilter from "../_components/AgentSearchFilter";
import PublicAgentCard from "@/components/ui/PublicAgentCard";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetMember } from "@/services/Agent.service";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import { Pagination } from "@mui/material";
import Emty from "@/components/ui/Emty";
import PublicAgentCardSkeleton from "@/components/skeletons/PublicAgentCard";

const wrapperClasses =
  "max-w-8xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-10";
// -------------------------------- Component --------------------------
export default function Agents() {
  const router = useRouter();
  const queries = useSearchParams();
  const queriesInput = queries.get("input");

  const [initial, setInitial] = useState<AgentsInquiry>(
    queriesInput
      ? JSON.parse(queriesInput)
      : {
          page: 1,
          limit: 8,
          sort: "createdAt",
          direction: Direction.DESC,
          search: {
            text: "",
            location: "",
          },
        },
  );
  const [agents, setAgents] = useState<Member[]>([]);
  const [totalAgents, setTotalAgents] = useState<number>(0);

  useEffect(() => {
    if (queriesInput) {
      const inputValues = JSON.parse(queriesInput);
      setInitial(inputValues);
    }
  }, [queriesInput]);
  // ****************************** Apollo Request ******************************
  const {
    loading: getAgentsLoading,
    data: getAgentsData,
    error: getAgentsError,
    refetch: getAgentsRefetch,
  } = useQuery(GET_AGENTS, {
    fetchPolicy: "network-only",
    variables: { input: initial },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setAgents(data?.getAgents?.list);
      setTotalAgents(data?.getAgents?.metaCounter?.[0]?.total ?? 0);
    },
  });

  // -------------------------- Handlers ---------------------
  const likeAgentHandler = async (user: CustomJwtPayload, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetMember(id);
      getAgentsRefetch({ input: initial });

      await sweetTopSmallSuccessAlert("succes", 1000);
    } catch (err: any) {
      console.log("ERROR, likeAgentHandler:", err.message);
      await sweetMixinErrorAlert(err.message);
    }
  };

  const handlePaginationChange = async (_: any, value: number) => {
    const newInitial = { ...initial, page: Number(value) };

    setInitial(newInitial);

    router.push(
      `/agents?input=${JSON.stringify(newInitial)}`,

      {
        scroll: false,
      },
    );
  };
  // -------------------------------- Render --------------------------

  return (
    <section className="py-2 bg-white">
      <AgentSearchFilter setFilter={setInitial} filter={initial} />

      {getAgentsLoading && !getAgentsData ? (
        <div className={`${wrapperClasses}`}>
          <PublicAgentCardSkeleton num={4} />
        </div>
      ) : agents.length ? (
        <div className={wrapperClasses}>
          {agents.map((agent) => (
            <PublicAgentCard
              key={agent._id}
              agent={agent}
              likeAgentHandler={likeAgentHandler}
            />
          ))}
        </div>
      ) : (
        <Emty title="No Agents" />
      )}
      <div className="max-w-8xl mx-auto px-4 flex justify-center mb-10">
        {!!agents.length && (
          <Pagination
            count={Math.ceil(totalAgents / initial?.limit)}
            variant="outlined"
            page={initial?.page ?? 1}
            size="large"
            sx={{
              ".MuiPagination-ul": {
                display: "flex",
                flexDirection: "row",
                gap: "10px 5px",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            onChange={(e, value) => handlePaginationChange(e, value)}
          />
        )}
      </div>
    </section>
  );
}
