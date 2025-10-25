"use client";

import { VideoCard } from "./VideoCard";
import Link from "next/link";

interface VideoCardProps {
  video: {
    id: string;
    snippet: {
      title: string;
      channelTitle: string;
      publishedAt: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
    statistics: {
      viewCount: string;
    };
    contentDetails: {
      duration: string;
    };
  };
}

export function MoreVideosSection({
  videos,
}: {
  videos: VideoCardProps["video"][];
}) {
  return (
    <section className="mx-8">
      <h2 className="text-lg font-semibold my-6">Recommended Videos</h2>
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
