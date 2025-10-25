"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ReactModal from "react-modal";
import Image from "next/image";

export default function Header() {
  const [query, setQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <header
      className={`flex items-center justify-between px-4 py-3 border-b sticky top-0 z-50 transition-colors duration-300
      ${
        theme === "dark"
          ? "bg-zinc-950 border-zinc-800 text-zinc-100"
          : "bg-white border-zinc-200 text-zinc-900"
      }`}
    >
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={`text-xl sm:text-2xl font-bold ${
            theme === "dark" ? "text-red-500" : "text-red-600"
          }`}
        >
          <Image
            src="/logo.png"
            alt="YouTube Logo"
            width={30}
            height={20}
            className="inline-block mb-1 mr-2"
          />
          YouTube
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`flex-1 text-sm px-3 py-1 rounded border focus:outline-none transition-colors duration-300
            ${
              theme === "dark"
                ? "border-zinc-700 bg-zinc-900 text-zinc-100 placeholder-zinc-400"
                : "border-zinc-300 bg-zinc-100 text-zinc-900 placeholder-zinc-500"
            }`}
        />
        <button
          className={`px-3 py-1 rounded transition-colors duration-300 hover:opacity-80
            ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"}`}
        >
          🔍
        </button>
      </div>
      <nav className="flex items-center gap-4 text-sm">
        <button className="md:hidden text-xl" aria-label="Menu">
          ☰
        </button>

        <div
          className={`hidden md:flex gap-4 transition-colors duration-300
            ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
        >
          <Link href="/" className="hover:text-red-500">
            Home
          </Link>
          <Link href="#" className="hover:text-red-500">
            Videos
          </Link>
          <Link href="#" className="hover:text-red-500">
            Channels
          </Link>
          <a href="/watch?v=dQw4w9WgXcQ" className="hover:text-red-500">
            Must watch
          </a>
        </div>
        <button
          onClick={toggleTheme}
          className="text-lg hover:opacity-80 transition-transform duration-300"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button
          onClick={() => setIsSignInOpen(true)}
          className={`hidden md:inline font-semibold transition-colors duration-300
            ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
        >
          Sign In
        </button>
      </nav>
      <ReactModal
        isOpen={isSignInOpen}
        onRequestClose={() => setIsSignInOpen(false)}
        contentLabel="Sign In Modal"
        className={`max-w-md mx-auto mt-20 p-6 rounded-lg outline-none
          ${theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-900"}`}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
      >
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <p className="mb-4">Sign in functionality is not implemented yet.</p>
        <button
          onClick={() => setIsSignInOpen(false)}
          className={`px-4 py-2 rounded transition-colors duration-300 hover:opacity-80
            ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"}`}
        >
          Close
        </button>
      </ReactModal>
    </header>
  );
}
