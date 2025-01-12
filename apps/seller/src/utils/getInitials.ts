/**
 * Generates initials from a full name.
 * @param name - The full name of the user.
 * @returns The initials (e.g., "John Doe" -> "JD").
 */
export const getInitials = (name: string): string => {
  if (!name) return '';
  const words = name.split(' ');
  const initials = words.map(word => word.charAt(0).toUpperCase()).slice(0, 2);
  return initials.join('');
};
