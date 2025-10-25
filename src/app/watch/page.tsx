"use client";
import { useState, useEffect } from "react";
import { HorizontalVideoCard } from "@/components/HorizontalVideoCard";
import { ToastContainer, toast } from "react-toastify";
import confetti from "canvas-confetti";
import Image from "next/image";

interface VideoInfo {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    categoryId?: string;
    tags?: string[];
  };
  statistics: {
    viewCount: string;
  };
}

interface RecommendedVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: { medium: { url: string } };
  };
  statistics: { viewCount: string };
  contentDetails: { duration: string };
}

export default function WatchPage() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<
    RecommendedVideo[]
  >([]);
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const getVideoInfoFromApi = async (id: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${apiKey}`,
      );
      const data = await response.json();
      const video = data.items?.[0];
      if (video) setVideoInfo(video);
      return video;
    } catch (error) {
      console.error("Error fetching video info:", error);
    }
  };

  const getRecommendedVideos = async (video: VideoInfo) => {
    try {
      const categoryId = video.snippet.categoryId;
      const tags = video.snippet.tags ?? [];
      const query =
        tags.length > 0
          ? tags.slice(0, 3).join(" ")
          : video.snippet.title.split(" ").slice(0, 3).join(" ");

      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
          query,
        )}&maxResults=8&videoCategoryId=${categoryId}&key=${apiKey}`,
      );
      const searchData = await searchRes.json();
      if (!searchData.items?.length) return;

      const relatedIds = searchData.items
        .map((item: RecommendedVideo) => item.id.videoId)
        .join(",");

      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${relatedIds}&key=${apiKey}`,
      );
      const statsData = await statsRes.json();
      setRecommendedVideos(statsData.items || []);
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
    }
  };

  const getVideoIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("v");

    if (id === "dQw4w9WgXcQ") {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
      });
      toast(
        <div className="flex items-center gap-3">
          <Image src="/savage-joy.png" alt="Rick" width={32} height={32} />
          <span className="font-medium">You’ve been Rickrolled! 🎶</span>
        </div>,
        {
          position: "bottom-center",
          autoClose: 5000,
          theme: "dark",
        },
      );
    }

    return id;
  };

  useEffect(() => {
    (async () => {
      const id = getVideoIdFromUrl();
      if (!id) return;
      setVideoId(id);

      const video = await getVideoInfoFromApi(id);
      if (video) await getRecommendedVideos(video);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="aspect-video flex flex-row md:flex-col lg:flex-row">
        <div className="flex flex-col min-w-3/5 m-4">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

          {videoInfo && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {videoInfo.snippet.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                By {videoInfo.snippet.channelTitle}
              </p>
              <p className="text-sm text-gray-600">
                {videoInfo.statistics.viewCount} views
              </p>
            </div>
          )}
        </div>

        {recommendedVideos.length > 0 && (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Recommended Videos</h3>
            <div className="space-y-4">
              {recommendedVideos.map((video, k) => (
                <HorizontalVideoCard key={k} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
