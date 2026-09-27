import type { Lang } from "../data/strings";

export function formatPrice(price: number, listingType: string, lang: Lang): string {
  const isRent = listingType === "rent";
  if (isRent) {
    const val = price >= 1000 ? `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}k` : `₹${price}`;
    return lang === "hi" ? `${val}/माह` : `${val}/month`;
  }
  if (price >= 10000000) {
    const cr = (price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 2);
    return lang === "hi" ? `₹${cr} करोड़` : `₹${cr} Cr`;
  }
  if (price >= 100000) {
    const lac = (price / 100000).toFixed(price % 100000 === 0 ? 0 : 1);
    return lang === "hi" ? `₹${lac} लाख` : `₹${lac} Lac`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatDate(dateStr: string, lang: Lang): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" });
}
