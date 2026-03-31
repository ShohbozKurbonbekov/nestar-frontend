import { Typography } from "@mui/material";

export default function SidebarLogo() {
  return (
    <div className="p-6 flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold">
        RSh
      </div>

      <div>
        <Typography fontWeight={700}>RealShoh</Typography>
        <Typography variant="caption">Real Estate</Typography>
      </div>
    </div>
  );
}
