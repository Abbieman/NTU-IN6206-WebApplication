export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

/**
 * Format a LocalDateTime string into a human-friendly time display.
 * @param timestamp Example: "2025-10-26T14:34:06"
 * @returns A formatted time string.
 */
export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, "0");

  // Today
  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  // Yesterday
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const timeStr = `${hour}:${minute}`;

  if (isSameDay) {
    return timeStr; // Today
  } else if (isYesterday) {
    return `Yesterday ${timeStr}`;
  } else {
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${month}/${day} ${timeStr}`;
  }
};
