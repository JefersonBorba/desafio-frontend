"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type { User, UserContextType } from "@/types/user";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const loginWithYouTube = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
      const redirectUri = window.location.origin;

      const scope = [
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.force-ssl",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
      ].join(" ");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${encodeURIComponent(
        scope,
      )}&include_granted_scopes=true`;

      window.location.href = authUrl;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    const handleLogin = async () => {
      if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.replace("#", "?"));
        const token = params.get("access_token");
        if (!token) return;

        try {
          const res = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const data = await res.json();

          const newUser: User = {
            name: data.name,
            email: data.email,
            picture: data.picture,
            token,
          };

          Promise.resolve().then(() => setUser(newUser));
          localStorage.setItem("yt_user", JSON.stringify(newUser));

          window.history.replaceState(null, "", window.location.pathname);
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      } else {
        const stored = localStorage.getItem("yt_user");
        if (stored) {
          Promise.resolve().then(() => setUser(JSON.parse(stored)));
        }
      }
    };

    handleLogin();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("yt_user");
  };

  return (
    <UserContext.Provider value={{ user, loginWithYouTube, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
