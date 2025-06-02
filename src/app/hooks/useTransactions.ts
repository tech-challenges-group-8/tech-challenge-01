import { useState, useEffect } from "react";

import { Transaction, User, useUser } from "../contexts/UserContext";

export const useTransactions = () => {
  const { user, setUser } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Function to calculate new balance
  const calculateNewBalance = (
    currentUser: User,
    oldTx?: Transaction,
    newTx?: Transaction
  ): number => {
    let balance = currentUser.balance;

    if (oldTx) {
      balance += oldTx.type === "DEPOSIT" ? -oldTx.value : oldTx.value;
    }

    if (newTx) {
      balance += newTx.type === "DEPOSIT" ? newTx.value : -newTx.value;
    }

    return balance;
  };

  // useEffect to load transactions
  useEffect(() => {
    const loadTransactions = async () => {
      if (!user?.id) {
        setTransactions([]);
        return;
      }

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
          setTransactions([]);
        }
      } catch (error) {
        console.error("Erro de rede ao carregar transações:", error);
        setTransactions([]);
      }
    };

    loadTransactions();
  }, [user, setUser]);

  // Add Transaction
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

      setTransactions((prev) => [...prev, savedTx]);
      if (user) {
        const newBalance =
          savedTx.type === "DEPOSIT"
            ? user.balance + savedTx.value
            : user.balance - savedTx.value;
        setUser({ ...user, balance: newBalance });
      }
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
    }
  };

  // Delete Transaction
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

      setTransactions((prev) => prev.filter((t) => t.id !== id));
      if (user) {
        const updatedBalance =
          txToDelete.type === "DEPOSIT"
            ? user.balance - txToDelete.value
            : user.balance + txToDelete.value;
        setUser({ ...user, balance: updatedBalance });
      }
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  // Edit Transaction
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

      setTransactions((prev) =>
        prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
      );
      if (user) {
        setUser({
          ...user,
          balance: calculateNewBalance(user, oldTx, updatedTx),
        });
      }
    } catch (error) {
      console.error("Erro ao editar transação:", error);
    }
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
  };
};
