"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type SessionContextType = {
  isAuth: boolean;
  userId: string | null;
  isLoading: boolean;
  setIsAuth: (value: boolean) => void;
};

const SessionContext = createContext<SessionContextType>({
  isAuth: false,
  userId: null,
  isLoading: false,
  setIsAuth: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const pathname = usePathname();

  async function checkAuth() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setIsAuth(data.isAuth);
      setUserId(data.userId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [pathname]); // Re-check auth status after navigation

  return (
    <SessionContext.Provider value={{ isAuth, userId, setIsAuth, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
