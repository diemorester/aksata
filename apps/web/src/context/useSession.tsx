"use client";

import { UserSlice } from "@/types/userTypes";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SessionContextProps {
  isAuth: boolean;
  user: UserSlice | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: UserSlice | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<UserSlice | null>(null);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Login First");
        return;
      }
      const res = await fetch(`${base_url}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setUser(result.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ isAuth, user, setIsAuth, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};