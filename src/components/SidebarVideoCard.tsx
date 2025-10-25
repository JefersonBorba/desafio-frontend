"use client";

import Image from "next/image";

interface SidebarVideoCardProps {
  title: string;
  thumbnail: string;
}

export function SidebarVideoCard({ title, thumbnail }: SidebarVideoCardProps) {
  return (
    <div className="flex gap-2 cursor-pointer hover:opacity-80 transition">
      <div className="relative w-24 aspect-video bg-zinc-800 rounded-md overflow-hidden shrink-0">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-xs font-medium line-clamp-2">{title}</h4>
        <p className="text-[10px] text-zinc-500">2.3K views</p>
      </div>
    </div>
  );
}
