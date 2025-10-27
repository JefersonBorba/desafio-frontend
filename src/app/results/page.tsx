"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HorizontalVideoCard } from "@/components/HorizontalVideoCard";
import { HorizontalVideoSkeleton } from "@/components/HorizontalVideoSkeleton";
import type { SearchVideo } from "@/types/videos";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search_query") || "";
  const [videos, setVideos] = useState<SearchVideo[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) return;
      setLoading(true);

      try {
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
            query,
          )}&key=${apiKey}`,
        );
        const searchData = await searchRes.json();
        if (!searchData.items?.length) {
          setVideos([]);
          setLoading(false);
          return;
        }

        const videoIds = searchData.items
          .map((v: SearchVideo) => v.id.videoId)
          .join(",");

        const detailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`,
        );
        const detailsData = await detailsRes.json();

        const normalized = detailsData.items.map((v: SearchVideo) => ({
          ...v,
          id: { videoId: v.id },
        }));
        setVideos(normalized);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="min-h-screen px-4 py-6 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Search results for{" "}
        <span className="text-red-600">&quot;{query}&quot;</span>
      </h1>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <HorizontalVideoSkeleton key={i} />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="space-y-4">
          {videos.map((video, i) => (
            <HorizontalVideoCard key={i} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
}
