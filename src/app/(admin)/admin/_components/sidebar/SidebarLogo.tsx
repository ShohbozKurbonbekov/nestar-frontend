import { Typography } from "@mui/material";

export default function SidebarLogo() {
  return (
    <div className="p-6 flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl g-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold">
        L
      </div>

      <div>
        <Typography fontWeight={700}>Lahomes</Typography>
        <Typography variant="caption">Real Estate</Typography>
      </div>
    </div>
  );
}
