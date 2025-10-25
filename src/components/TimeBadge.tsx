import React from "react";

interface TimeBadgeProps {
  time: string;
}
export function TimeBadge({ time }: TimeBadgeProps) {
  //treat time in ISO 8601 duration format and convert to hh:mm:ss
  function formatTime(isoDuration: string): string {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return isoDuration;

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    const parts = [];
    if (hours > 0) parts.push(hours.toString().padStart(2, "0"));
    parts.push(minutes.toString().padStart(2, "0"));
    parts.push(seconds.toString().padStart(2, "0"));

    return parts.join(":");
  }
  const timeFormatted = formatTime(time);
  return (
    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
      {timeFormatted}
    </div>
  );
}
