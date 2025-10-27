export function formatDate(dateString: string) {
  const publishedDate = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - publishedDate.getTime()) / 1000,
  );
  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const interval in intervals) {
    const seconds = intervals[interval];
    if (diffInSeconds >= seconds) {
      const count = Math.floor(diffInSeconds / seconds);
      return `${count} ${interval}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}
