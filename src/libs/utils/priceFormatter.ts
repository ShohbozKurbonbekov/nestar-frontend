type PriceOptions = {
  locale?: string;
  currency?: string;
  compact?: boolean;
};

export function formatPrice(value: number, options: PriceOptions = {}): string {
  const { locale = "en-US", currency = "USD", compact = false } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 0,
  }).format(value);
}
