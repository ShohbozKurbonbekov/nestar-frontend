import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Inter } from "next/font/google";
import ApolloWrapper from "@/apollo/ApolloWrapper";
import AppInitializer from "@/libs/auth/AppInitializer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.variable}>
      <body>
        <ApolloWrapper>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppInitializer>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppInitializer>
          </AppRouterCacheProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
