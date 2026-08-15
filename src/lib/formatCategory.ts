export const categoryLabels: Record<string, string> = {
  WOMEN: "Women Focused",
  COUPLE: "Couples",
  FIFTY_PLUS: "Drivers 50+",
  STANDARD: "Main",
  SPANISH: "Spanish",
};

export const formatCategory = (category: string | null | undefined): string => {
  if (!category) return "—";
  return categoryLabels[category] || category;
};
