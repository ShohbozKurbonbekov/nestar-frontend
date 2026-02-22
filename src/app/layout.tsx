import type { Metadata } from "next";
import "./globals.css";

// ----------------------- Define meta deta ----------------
export const metadata: Metadata = {
  title: "Nestar Real Estate platform",
  description:
    "Buy, sell, and rent properties easily. Explore listings, connect with agents, and manage your property needs all in one platform.",
  keywords: [
    "real estate",
    "real estate platform",
    "nestar",
    "nextjs and nestjs fullstack",
  ],
  authors: [{ name: "Shohboz Kurbonbekov" }],
  openGraph: {
    title: "Nestar Real Estate Platform",
    description: "Buy, sell, and rent properties easily.",
    url: "https://www.nestar.com",
    siteName: "Nestar",
    images: [
      {
        url: "/images/logo/favicon.ico",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// ----------------------- Main layout ----------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
