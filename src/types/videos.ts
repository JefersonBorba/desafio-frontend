export interface VideoCardProps {
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

export interface HorizontalVideoCardProps {
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

export interface VideoInfo {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    categoryId?: string;
    tags?: string[];
    channelId: string;
  };
  statistics: {
    viewCount: string;
  };
}

export interface ChannelInfo {
  id: string;
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
  statistics: {
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  };
}

export interface RecommendedVideo {
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

export interface TimeBadgeProps {
  time: string;
}

export interface SearchVideo {
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
