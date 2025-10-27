"use client";

import { VideoCard } from "./VideoCard";
import Link from "next/link";
import type { VideoCardProps } from "../types/videos";

export function MoreVideosSection({
  videos,
  sectionTitle,
}: {
  videos: VideoCardProps["video"][];
  sectionTitle?: string;
}) {
  return (
    <section className="mx-8" data-testid="more-videos">
      <h2 className="text-lg font-semibold my-6">{sectionTitle}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videos &&
          videos.map((video, idx) => (
            <Link href={`/watch?v=${video.id}`} key={idx}>
              <VideoCard video={video} />
            </Link>
          ))}
      </div>
    </section>
  );
}
