import Image from "next/image";
import { TimeBadge } from "./TimeBadge";

interface HorizontalVideoCardProps {
  video: {
    id: { videoId: string };
    snippet: {
      title: string;
      channelTitle: string;
      publishedAt: string;
      thumbnails: { medium: { url: string } };
    };
    statistics: { viewCount: string };
    contentDetails: { duration: string };
  };
}

export function HorizontalVideoCard({ video }: HorizontalVideoCardProps) {
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
    <a href={`/watch?v=${video.id.videoId}`} className="block group">
      <div className="flex items-start gap-3 cursor-pointer hover:opacity-90 transition shrink-0">
        {/* Thumbnail */}
        <div className="relative w-40 h-[90px] shrink-0 overflow-hidden rounded-md">
          <Image
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            fill
            className="object-cover"
            sizes="160px"
            priority={false}
          />
          <TimeBadge time={video.contentDetails.duration} />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-start min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2 text-zinc-900 dark:text-zinc-100">
            {video.snippet.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {video.snippet.channelTitle}
          </p>
          <p className="text-xs text-zinc-500">
            {viewCount} views • {publishedTimeAgo}
          </p>
        </div>
      </div>
    </a>
  );
}
