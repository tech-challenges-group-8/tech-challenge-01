"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid"; // instale com `npm i uuid`

interface User {
  name: string;
  balance: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: Transaction) => void;
}

export type Transaction = {
  id: string;
  type: "DEPOSIT" | "TRANSFER";
  value: number;
  date: string;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  console.log(user);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const addTransaction = (tx: Transaction) => {
    const txWithId = { ...tx, id: uuidv4() }; // adiciona ID único
    setTransactions((prev) => [txWithId, ...prev]);

    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      let newBalance =
        tx.type === "DEPOSIT"
          ? prevUser.balance + tx.value
          : prevUser.balance - tx.value;
      return { ...prevUser, balance: newBalance };
    });
  };

  const deleteTransaction = (id: string) => {
    const txToDelete = transactions.find((t) => t.id === id);
    if (!txToDelete) return;

    // Atualiza saldo
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedBalance =
        txToDelete.type === "DEPOSIT"
          ? prevUser.balance - txToDelete.value
          : prevUser.balance + txToDelete.value;
      return { ...prevUser, balance: updatedBalance };
    });

    // Remove transação
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const editTransaction = (updatedTx: Transaction) => {
    const oldTx = transactions.find((t) => t.id === updatedTx.id);
    if (!oldTx) return;

    // Atualiza saldo
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      let balance = prevUser.balance;

      if (oldTx.type === "DEPOSIT") balance -= oldTx.value;
      if (oldTx.type === "TRANSFER") balance += oldTx.value;

      if (updatedTx.type === "DEPOSIT") balance += updatedTx.value;
      if (updatedTx.type === "TRANSFER") balance -= updatedTx.value;

      return { ...prevUser, balance };
    });

    // Atualiza transação
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
    );
  };

  // TODO: fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const mockUser: User = {
        name: "John Doe",
        balance: 12345.67,
      };
      setUser(mockUser);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
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
