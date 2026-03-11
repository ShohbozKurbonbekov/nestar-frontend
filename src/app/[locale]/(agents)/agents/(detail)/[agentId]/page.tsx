"use client";
import { useParams } from "next/navigation";

export default function AgentDetail() {
  const params = useParams();
  return <div>Detail {params.agentId}</div>;
}
