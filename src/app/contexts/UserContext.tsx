"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { userApi } from "../lib/userApi";

export interface User {
  account: string;
  name: string;
  email: string;
  balance: number;
  active: boolean;
}

export type NewTransaction = {
  accountId: string;
  type: "DEPOSIT" | "TRANSFER";
  value: number;
};

export type Transaction = {
  id: string;
  accountId: string;
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
    account: u.account[0].id,
    balance: u.transactions
      ? u.transactions.reduce((sum: number, t: any) => sum + Number(t.value), 0)
      : u.balance != null
      ? Number(u.balance)
      : 0,
  });

  useEffect(() => {
    const loadUserFromCookies = async () => {
      try {
        const userData = await userApi.getUserSession();
        const newUser = normalizeUser(userData);
        setUser(newUser);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setUser(null);
        localStorage.removeItem("token")
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
