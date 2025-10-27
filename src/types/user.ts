export interface User {
  name: string;
  email: string;
  picture: string;
  token: string;
}

export interface UserContextType {
  user: User | null;
  loginWithYouTube: () => Promise<void>;
  logout: () => void;
}
