export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
};

export function getRelativeTime(isoString: string | Date): string {
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  // If more than 4 weeks old, return formatted date
  if (seconds > intervals.week * 4) {
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Find the appropriate interval
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval >= 1) {
      const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });
      return rtf.format(-interval, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return "Baru saja";
}

export function formatViews(views: number): string {
  if (views < 1000) {
    return views.toString();
  }

  if (views < 1000000) {
    return (views / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  if (views < 1000000000) {
    return (views / 1000000).toFixed(1).replace(/\.0$/, "") + "Jt";
  }

  return (views / 1000000000).toFixed(1).replace(/\.0$/, "") + "M";
}
