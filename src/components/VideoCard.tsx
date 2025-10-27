"use client";

import { useState } from "react";
import Image from "next/image";
import TimeBadge from "./TimeBadge";
import type { VideoCardProps } from "@/types/videos";
import { formatDate } from "@/utils/formatDate";

export function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const publishedTimeAgo = formatDate(video.snippet.publishedAt);
  const viewCount = parseInt(video.statistics.viewCount).toLocaleString();

  return (
    <div
      className="flex flex-col cursor-pointer transition hover:opacity-90"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-zinc-800 rounded-md overflow-hidden">
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
