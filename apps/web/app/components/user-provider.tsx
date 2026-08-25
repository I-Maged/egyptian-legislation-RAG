"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { SessionUser } from "@/lib/auth/types";

type UserContextValue = {
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
  isLoading: false,
});

export function UserProvider({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: SessionUser | null;
}) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(initialUser === null);

  useEffect(() => {
    if (initialUser) {
      return;
    }

    let cancelled = false;

    fetch("/api/auth/me")
      .then((response) => (response.ok ? response.json() : null))
      .then((fetchedUser: SessionUser | null) => {
        if (!cancelled) {
          setUser(fetchedUser);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ user, setUser, isLoading }),
    [user, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
