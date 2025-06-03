"use client";

import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  active: boolean;
}

export type Transaction = {
  id: string;
  type: "DEPOSIT" | "TRANSFER";
  value: number;
  date: string;
};

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const normalizeUser = (u: any): User => ({
    ...u,
    id: String(u.id),
    balance: u.balance != null ? Number(u.balance) : 0,
  });




  useEffect(() => {
    const loadUserFromCookies = async () => {
      try {
        const response = await fetch(`/api/user-session`);
        const data = await response.json();

        if (response.ok && data.success && data.user) {
          setUser(normalizeUser(data.user));
        } else {
          console.error("Falha ao buscar usuário:", data.message);
          setUser(null);
          Cookies.remove("userId");
          Cookies.remove("auth");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setUser(null);
        Cookies.remove("userId");
        Cookies.remove("auth");
      }
    };

    loadUserFromCookies();
  }, []);


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
