"use client";

import { useState, useEffect } from "react";
import { MoreVideosSection } from "@/components/MoreVIdeosSection";
import { SkeletonSection } from "@/components/SkeletonSection";
import type { RecommendedVideo } from "@/types/videos";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [elixirVideos, setElixirVideos] = useState([]);
  const [battlefieldVideos, setBattlefieldVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    (async () => {
      try {
        const [popularRes, elixirRes, battlefieldRes] = await Promise.all([
          fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=8&regionCode=US&key=${apiKey}`,
          ),
          fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=elixir%20programming&key=${apiKey}`,
          ),
          fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=battlefield%206&key=${apiKey}`,
          ),
        ]);

        const [popularData, elixirData, battlefieldData] = await Promise.all([
          popularRes.json(),
          elixirRes.json(),
          battlefieldRes.json(),
        ]);

        const elixirIds = elixirData.items
          .map((v: RecommendedVideo) => v.id.videoId)
          .join(",");
        const battlefieldIds = battlefieldData.items
          .map((v: RecommendedVideo) => v.id.videoId)
          .join(",");

        const [elixirStatsRes, battlefieldStatsRes] = await Promise.all([
          fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${elixirIds}&key=${apiKey}`,
          ),
          fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${battlefieldIds}&key=${apiKey}`,
          ),
        ]);

        const [elixirStats, battlefieldStats] = await Promise.all([
          elixirStatsRes.json(),
          battlefieldStatsRes.json(),
        ]);

        setElixirVideos(elixirStats.items || []);
        setBattlefieldVideos(battlefieldStats.items || []);
        setVideos(popularData.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiKey]);

  return (
    <div className="space-y-10 mb-8" data-testid="home-page">
      {loading ? (
        <>
          <SkeletonSection title="Trending Now" />
          <SkeletonSection title="Elixir Programming" />
          <SkeletonSection title="Best of Battlefield 6" />
        </>
      ) : (
        <>
          <MoreVideosSection videos={videos} sectionTitle="Trending Now" />
          <MoreVideosSection
            videos={elixirVideos}
            sectionTitle="Elixir Programming"
          />
          <MoreVideosSection
            videos={battlefieldVideos}
            sectionTitle="Best of Battlefield 6"
          />
        </>
      )}
    </div>
  );
}
