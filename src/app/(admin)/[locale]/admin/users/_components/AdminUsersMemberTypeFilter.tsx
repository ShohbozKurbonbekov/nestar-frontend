"use client";
import { MemberType } from "@/libs/enums/member.enum";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminUsersMemberTypeFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberType = searchParams.get("memberType") ?? "ALL";

  const onMemberType = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "ALL") {
      params.delete("memberType");
    } else {
      params.set("memberType", value);
      params.set("page", "1");
    }
    router.replace(`?${params.toString()}`);
  };
  return (
    <Stack spacing={2}>
      <Typography className="text-slate-500 font-medium text-sm">
        Member Type
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={memberType}
        onChange={(_, val) => val && onMemberType(val)}
        className="bg-slate-100 p-2 rounded-2xl w-fit gap-2"
        sx={{
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          "& .MuiToggleButton-root": {
            transition: "all 0.25s ease",
            border: "none",
          },
        }}
      >
        {["ALL", ...Object.keys(MemberType)].map((type) => (
          <ToggleButton
            key={type}
            value={type}
            className="rounded-xl px-6 py-2 font-medium"
            sx={{
              "&.Mui-selected": {
                background: "#475569",
                color: "#fff",
                transform: "scale(1.04)",
              },
            }}
          >
            {type}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
