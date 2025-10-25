"use client";
import { useState, useEffect } from "react";
import { MoreVideosSection } from "@/components/MoreVIdeosSection";

export default function Home() {
  const [videos, setVideos] = useState([]);
  //get api key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=8&regionCode=US&key=${apiKey}`,
        );
        const data = await response.json();
        setVideos(data.items);
        console.log(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-10">
      <MoreVideosSection videos={videos} />
    </div>
  );
}
