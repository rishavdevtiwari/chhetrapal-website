export type Language = "en" | "ne";

export function getSafeLanguage(cookieValue: string | undefined): Language {
  return cookieValue === "ne" ? "ne" : "en";
}
