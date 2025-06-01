"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  active: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserFromCookies = async () => {
        try {
          const response = await fetch(`/api/user-session`);
          const data = await response.json();
          if (response.ok && data.success) {
            setUser(data.user);
          } else {
            console.error("Failed to fetch user data:", data.message);
            setUser(null);
            Cookies.remove("userId");
            Cookies.remove("auth");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          Cookies.remove("userId");
          Cookies.remove("auth");
        }
    };

    loadUserFromCookies();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
