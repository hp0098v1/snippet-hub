"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type SessionContextType = {
  isAuth: boolean;
  userId: string | null;
  setIsAuth: (value: boolean) => void;
};

const SessionContext = createContext<SessionContextType>({
  isAuth: false,
  userId: null,
  setIsAuth: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const pathname = usePathname();

  async function checkAuth() {
    const res = await fetch("/api/auth/session");
    const data = await res.json();
    setIsAuth(data.isAuth);
    setUserId(data.userId);
  }

  useEffect(() => {
    checkAuth();
  }, [pathname]); // Re-check auth status after navigation

  return (
    <SessionContext.Provider value={{ isAuth, userId, setIsAuth }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
