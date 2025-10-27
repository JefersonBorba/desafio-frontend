export function HorizontalVideoSkeleton() {
  return (
    <div className="flex items-start space-x-4 animate-pulse">
      <div className="w-40 h-24 bg-gray-300/40 rounded-md flex-none" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300/40 rounded w-3/4" />
        <div className="h-3 bg-gray-300/40 rounded w-1/2" />
        <div className="h-3 bg-gray-300/40 rounded w-2/3" />
      </div>
    </div>
  );
}
