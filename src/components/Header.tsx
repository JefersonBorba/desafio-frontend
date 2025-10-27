"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import SignInModal from "./SignInModal";
import UploadVideoModal from "./UploadVideoModal";

export default function Header() {
  const [query, setQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const { user, logout } = useUser();

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");
    if (saved) {
      queueMicrotask(() => {
        setHistory(JSON.parse(saved));
      });
    }
  }, []);

  const saveToHistory = (term: string) => {
    const updated = [term, ...history.filter((t) => t !== term)].slice(0, 8);
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    saveToHistory(trimmed);
    setShowHistory(false);
    window.location.href = `/results?search_query=${encodeURIComponent(trimmed)}`;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b sticky top-0 z-50 bg-white/70 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 backdrop-blur-md transition-all duration-300 text-zinc-900 dark:text-zinc-100">
      <Link
        href="/"
        className="hidden md:flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-500"
      >
        <Image src="/logo.png" alt="YouTube Logo" width={30} height={20} />
        YouTube
      </Link>
      <div
        className="flex items-center gap-2 flex-1 max-w-md mx-4 relative"
        ref={searchRef}
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 text-sm px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-800 hover:opacity-80"
        >
          🔍
        </button>
        {showHistory && history.length > 0 && (
          <div className="absolute top-10 left-0 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-md z-50">
            {history.map(
              (term, i) =>
                i < 9 && (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(term);
                      handleSearch();
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {term}
                  </button>
                ),
            )}
            <button
              onClick={() => {
                localStorage.removeItem("searchHistory");
                setHistory([]);
              }}
              className="w-full text-center text-xs text-zinc-500 py-2 border-t border-zinc-200 dark:border-zinc-700 hover:text-red-500"
            >
              Clear search history
            </button>
          </div>
        )}
      </div>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/" className="hidden md:inline hover:text-red-500">
          Home
        </Link>
        <a
          href="/watch?v=dQw4w9WgXcQ"
          className="hidden md:inline hover:text-red-500"
        >
          Must Watch
        </a>

        {user && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
          >
            ⬆️ Upload
          </button>
        )}
        {user ? (
          <div className="flex items-center gap-2">
            <Image
              src={user.picture}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:text-red-400 font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSignInOpen(true)}
            className=" font-semibold text-blue-600 dark:text-blue-400 hover:opacity-80"
          >
            Sign In
          </button>
        )}
      </nav>
      <UploadVideoModal
        isUploadOpen={isUploadOpen}
        setIsUploadOpen={setIsUploadOpen}
      />
      <SignInModal
        isSignInOpen={isSignInOpen}
        setIsSignInOpen={setIsSignInOpen}
      />
    </header>
  );
}
