"use client";

import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
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

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (tx: Transaction) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const normalizeUser = (u: any): User => ({
    ...u,
    id: String(u.id),
    balance: u.balance != null ? Number(u.balance) : 0,
  });

  const addTransaction = async (tx: Transaction) => {
    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        console.error("Erro ao adicionar transação:", data.message);
        return;
      }

      const savedTx = data.transaction;

      // ✅ Atualiza apenas o saldo (as transações serão recarregadas pelo useEffect)
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        const newBalance =
          savedTx.type === "DEPOSIT"
            ? prevUser.balance + savedTx.value
            : prevUser.balance - savedTx.value;
        return { ...prevUser, balance: newBalance };
      });
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
    }
  };

  const deleteTransaction = async (id: string) => {
    const txToDelete = transactions.find((t) => t.id === id);
    if (!txToDelete) return;

    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Erro ao excluir transação");
        return;
      }

      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedBalance =
          txToDelete.type === "DEPOSIT"
            ? prevUser.balance - txToDelete.value
            : prevUser.balance + txToDelete.value;
        return { ...prevUser, balance: updatedBalance };
      });

      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  function calculateNewBalance(
    user: User,
    oldTx?: Transaction,
    newTx?: Transaction
  ): number {
    let balance = user.balance;

    if (oldTx) {
      balance += oldTx.type === "DEPOSIT" ? -oldTx.value : oldTx.value;
    }

    if (newTx) {
      balance += newTx.type === "DEPOSIT" ? newTx.value : -newTx.value;
    }

    return balance;
  }

  const editTransaction = async (updatedTx: Transaction) => {
    const oldTx = transactions.find((t) => t.id === updatedTx.id);
    if (!oldTx) return;

    try {
      const response = await fetch(`/api/transaction/${updatedTx.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTx),
      });

      if (!response.ok) {
        console.error("Erro ao editar transação");
        return;
      }

      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              balance: calculateNewBalance(prevUser, oldTx, updatedTx),
            }
          : prevUser
      );

      setTransactions((prev) =>
        prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
      );
    } catch (error) {
      console.error("Erro ao editar transação:", error);
    }
  };

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

  useEffect(() => {
    const loadTransactions = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/transaction?userId=${user.id}`);
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.transactions)) {
          setTransactions(data.transactions);
        } else {
          console.error(
            "Erro ao carregar transações:",
            data.message || "Resposta inesperada"
          );
        }
      } catch (error) {
        console.error("Erro de rede ao carregar transações:", error);
      }
    };

    loadTransactions();
  }, [user]);

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
