/**
 * Truncate a string to a specified length and add an ellipsis if it exceeds the limit.
 * @param text The string to truncate.
 * @param maxLength The maximum length of the string.
 * @returns The truncated string with an ellipsis.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
