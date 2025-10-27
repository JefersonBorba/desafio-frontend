import Image from "next/image";
import type { VideoComments } from "@/types/comments";
import { formatDate } from "@/utils/formatDate";

export function CommentCard({ comment }: { comment: VideoComments }) {
  return (
    <div className="flex items-start space-x-4">
      <a
        href={`https://www.youtube.com/channel/${
          comment.snippet.topLevelComment.snippet.authorChannelId?.value || ""
        }`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-none w-10 h-10"
      >
        <Image
          src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
          alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      </a>

      <div className="flex-1 min-w-0">
        <a
          href={`https://www.youtube.com/channel/${
            comment.snippet.topLevelComment.snippet.authorChannelId?.value || ""
          }`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center flex-wrap gap-x-2"
        >
          <p className="font-medium truncate">
            {comment.snippet.topLevelComment.snippet.authorDisplayName}
          </p>
          <p className="text-sm text-gray-600">
            {formatDate(comment.snippet.topLevelComment.snippet.publishedAt)}
          </p>
        </a>

        <p className="text-gray-800 dark:text-gray-200 wrap-break-words">
          {comment.snippet.topLevelComment.snippet.textDisplay}
        </p>

        <p className="text-sm text-gray-600">
          {comment.snippet.topLevelComment.snippet.likeCount} like
          {comment.snippet.topLevelComment.snippet.likeCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
