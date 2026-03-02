import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { messageLoaders } from "@/libs/data/static-data";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const loadedFiles = await messageLoaders[locale]?.();

  const messages = {
    ...loadedFiles.home,
    ...loadedFiles.navbar,
    ...loadedFiles.properties,
  };
  return {
    locale,
    messages: {
      messages,
    },
  };
});
