"use client";

export function SkeletonSection({ title }: { title: string }) {
  return (
    <div className="space-y-4 animate-pulse" data-testid="more-videos">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-300/20 dark:bg-gray-700/40 rounded-lg overflow-hidden"
          >
            <div className="w-full h-40 bg-gray-300 dark:bg-gray-700" />
            <div className="p-2 space-y-2">
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
