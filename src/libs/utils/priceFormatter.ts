type PriceOptions = {
  locale?: string;
  currency?: string;
  compact?: boolean;
};

export function priceFormatter(
  value: number,
  options: PriceOptions = {},
): string {
  const { locale = "en-US", currency = "USD", compact = true } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 0,
  }).format(value);
}
