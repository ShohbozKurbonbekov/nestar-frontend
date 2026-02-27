import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

// Main Font Family
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ----------------------- Define meta deta ----------------
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
