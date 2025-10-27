export interface VideoComments {
  id: string;
  snippet: {
    topLevelComment: {
      id: string;
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        authorChannelId: { value: string };
        textDisplay: string;
        publishedAt: string;
        likeCount: number;
      };
    };
  };
}
