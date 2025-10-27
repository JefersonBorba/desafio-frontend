"use client";
import { useState, useEffect } from "react";
import { HorizontalVideoCard } from "@/components/HorizontalVideoCard";
import { CommentCard } from "@/components/CommentCard";
import { CommentSkeleton } from "@/components/CommentSkeleton";
import { HorizontalVideoSkeleton } from "@/components/HorizontalVideoSkeleton";
import { ToastContainer, toast } from "react-toastify";
import ChannelInfo from "@/components/ChannelInfo";
import confetti from "canvas-confetti";
import Image from "next/image";
import type { VideoInfo, RecommendedVideo } from "@/types/videos";
import type { VideoComments } from "@/types/comments";

export default function WatchPage() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<
    RecommendedVideo[]
  >([]);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [videoComments, setVideoComments] = useState<VideoComments[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const getVideoComments = async (videoId: string) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`,
    );
    const data = await res.json();
    setVideoComments(data.items || []);
  };

  const getChannelInfo = async (channelId: string) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`,
    );
    const data = await res.json();
    const channel = data.items?.[0];
    if (channel) setChannelInfo(channel);
  };

  const getVideoInfoFromApi = async (id: string) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${apiKey}`,
    );
    const data = await res.json();
    const video = data.items?.[0];
    if (video) setVideoInfo(video);
    return video;
  };

  const getRecommendedVideos = async (video: VideoInfo) => {
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
    const normalized = statsData.items.map((v: RecommendedVideo) => ({
      ...v,
      id: { videoId: v.id },
    }));

    setRecommendedVideos(normalized || []);
  };

  const getVideoIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("v");

    if (id === "dQw4w9WgXcQ") {
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
      toast(
        <div className="flex items-center gap-3">
          <Image src="/savage-joy.png" alt="Rick" width={32} height={32} />
          <span className="font-medium">You’ve been Rickrolled! 🎶</span>
        </div>,
        { position: "bottom-center", autoClose: 5000, theme: "dark" },
      );
    }

    return id;
  };

  useEffect(() => {
    (async () => {
      try {
        const id = getVideoIdFromUrl();
        if (!id) return;
        setVideoId(id);

        const video = await getVideoInfoFromApi(id);
        if (video)
          await Promise.all([
            getRecommendedVideos(video),
            getChannelInfo(video.snippet.channelId),
            getVideoComments(id),
          ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="aspect-video flex flex-row md:flex-col lg:flex-row w-full md:w-10/12 max-w-[1200px] min-h-[200px]">
        <div className="flex flex-col md:m-4">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg m-4 min-h-3/5">
            {videoId && (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            )}
          </div>

          {videoInfo && !loading && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">
                {videoInfo.snippet.title}
              </h2>
              <p className="text-sm text-gray-600">
                {parseInt(videoInfo.statistics.viewCount).toLocaleString()}{" "}
                views
              </p>
              {channelInfo && <ChannelInfo channel={channelInfo} />}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <CommentSkeleton key={i} />
                ))
              ) : videoComments.length > 0 ? (
                videoComments.map((comment, i) => (
                  <CommentCard key={i} comment={comment} />
                ))
              ) : (
                <p className="text-gray-600">No comments available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 hidden md:block">
          <h3 className="text-lg font-semibold mb-4">Recommended Videos</h3>
          <div className="space-y-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <HorizontalVideoSkeleton key={i} />
                ))
              : recommendedVideos.map((video, i) => (
                  <HorizontalVideoCard key={i} video={video} />
                ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
