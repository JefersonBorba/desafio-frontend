"use client";

import { useState } from "react";
import Image from "next/image";
import { TimeBadge } from "./TimeBadge";

interface VideoCardProps {
  video: {
    id: string;
    snippet: {
      title: string;
      publishedAt: string;
      channelTitle: string;
      thumbnails: { medium: { url: string } };
    };
    statistics: { viewCount: string };
    contentDetails: { duration: string };
  };
}

export function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
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
  };

  const publishedTimeAgo = formatDate(video.snippet.publishedAt);
  const viewCount = parseInt(video.statistics.viewCount).toLocaleString();

  return (
    <div
      className="flex flex-col cursor-pointer transition hover:opacity-90"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail / Video preview */}
      <div className="relative aspect-video bg-zinc-800 rounded-md overflow-hidden">
        {/* Thumbnail */}
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 25vw"
          className={`object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Autoplay preview iframe */}
        {isHovered && (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&playsinline=1`}
            title={video.snippet.title}
            allow="autoplay; encrypted-media"
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          />
        )}

        <TimeBadge time={video.contentDetails.duration} />
      </div>

      {/* Info */}
      <h3 className="mt-2 text-sm font-semibold line-clamp-2">
        {video.snippet.title}
      </h3>
      <p className="text-xs text-zinc-500">{video.snippet.channelTitle}</p>
      <p className="text-xs text-zinc-500">
        {viewCount} views • {publishedTimeAgo}
      </p>
    </div>
  );
}
