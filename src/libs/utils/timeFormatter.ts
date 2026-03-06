type TimeUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export function timeFormatter(
  input: Date | string | number,
  locale: string = "en",
): string {
  const date = new Date(input);
  if (isNaN(date.getTime())) return "";
  const diff = date.getTime() - Date.now();

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(diff / 60000);
  const hours = Math.round(diff / 3600000);
  const days = Math.round(diff / 86400000);
  const weeks = Math.round(diff / 604800000);
  const months = Math.round(diff / 2592000000);
  const years = Math.round(diff / 31536000000);

  if (Math.abs(seconds) < 60) return rtf.format(seconds, "second");
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  if (Math.abs(days) < 7) return rtf.format(days, "day");
  if (Math.abs(weeks) < 4) return rtf.format(weeks, "week");
  if (Math.abs(months) < 12) return rtf.format(months, "month");

  return rtf.format(years, "year");
}
