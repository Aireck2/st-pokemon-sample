export const capitalize = (text?: string) => {
  if (!text) return "";
  const lower = text.toLowerCase();
  return text.charAt(0).toUpperCase() + lower.slice(1);
};

export const zerosPrefix = (
  num: number,
  totalLength: number | undefined = 3
) => {
  return String(num).padStart(totalLength, "0");
};
