// components/sections/SectionBlock.tsx

import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface HomepageSectionBlockType {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}

export default function HomepageSectionBlock({
  title,
  subtitle,
  children,
  className = "",
}: HomepageSectionBlockType) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-8xl w-full mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <Typography variant="h2" className="text-gray-800 capitalize">
            {title}
          </Typography>

          <Typography variant="body1" className="mt-4 text-slate-500">
            {subtitle}
          </Typography>
        </div>

        {/* Wrapper */}
        <div>{children}</div>
      </div>
    </section>
  );
}
