"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { ChannelInfo } from "@/types/videos";
import { useUser } from "@/context/UserContext";

const ChannelInfo = ({ channel }: { channel: ChannelInfo }) => {
  const { user } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user?.token || !channel?.id) return;
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/subscriptions?part=id&forChannelId=${channel.id}&mine=true&key=${apiKey}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          },
        );

        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setIsSubscribed(true);
          setSubscriptionId(data.items[0].id);
        } else {
          setIsSubscribed(false);
          setSubscriptionId(null);
        }
      } catch (err) {
        console.error("Error checking subscription:", err);
      }
    };

    checkSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel?.id, user?.token]);

  const toggleSubscription = async () => {
    if (!user?.token || !channel?.id) {
      alert("You must be logged in to subscribe.");
      return;
    }

    setSubscribing(true);

    try {
      if (isSubscribed && subscriptionId) {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/subscriptions?id=${subscriptionId}&key=${apiKey}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          },
        );

        if (res.ok) {
          setIsSubscribed(false);
          setSubscriptionId(null);
        } else {
          console.error("Failed to unsubscribe");
        }
      } else {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&key=${apiKey}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              snippet: {
                resourceId: {
                  kind: "youtube#channel",
                  channelId: channel.id,
                },
              },
            }),
          },
        );

        const data = await res.json();
        if (data.id) {
          setIsSubscribed(true);
          setSubscriptionId(data.id);
        } else {
          console.error("Failed to subscribe:", data);
        }
      }
    } catch (err) {
      console.error("Error toggling subscription:", err);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <a
        href={`https://www.youtube.com/channel/${channel.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center">
          <Image
            src={channel.snippet.thumbnails.medium.url}
            alt={channel.snippet.title}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="font-medium">{channel.snippet.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {parseInt(channel.statistics.subscriberCount).toLocaleString()}{" "}
              subscribers
            </p>
          </div>
        </div>
      </a>

      {user && (
        <button
          onClick={toggleSubscription}
          disabled={subscribing}
          className={`px-4 py-2 rounded text-sm font-semibold transition-all
            ${
              isSubscribed
                ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
        >
          {subscribing
            ? "Processing..."
            : isSubscribed
              ? "Subscribed"
              : "Subscribe"}
        </button>
      )}
    </div>
  );
};

export default ChannelInfo;
