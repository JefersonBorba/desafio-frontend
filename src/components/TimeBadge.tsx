import type { TimeBadgeProps } from "@/types/videos";
import { formatTime } from "@/utils/formatTime";

const TimeBadge = ({ time }: TimeBadgeProps) => {
  const timeFormatted = formatTime(time);

  return (
    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
      {timeFormatted}
    </div>
  );
};

export default TimeBadge;
