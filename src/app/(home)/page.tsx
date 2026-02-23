import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="bg-red-400">
        <Typography variant="h1" component="h1">
          Part one
        </Typography>
      </div>

      <div className="bg-gray-400">
        <Typography variant="h1" component="h1">
          Part two
        </Typography>
      </div>
    </div>
  );
}
