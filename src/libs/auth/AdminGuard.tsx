"use client";
import { authInitializedVar, userVar } from "@/apollo/store";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getJwtToken } from ".";
import { MemberType } from "../enums/member.enum";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const initialized = useReactiveVar(authInitializedVar);

  useEffect(() => {
    if (!initialized) return;
    const token = getJwtToken();

    if (!token) {
      router.push("/");
      return;
    }

    if (!user._id || user.memberType !== MemberType.ADMIN) {
      router.push("/");
      return;
    }
  }, [user]);

  if (!initialized) {
    return null;
  }

  return <>{children}</>;
}
