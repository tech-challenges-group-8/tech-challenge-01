import { Transaction } from "../contexts/UserContext";

export const transactionApi = {
  getTransactions: async (userId: string) => {
    const response = await fetch(`/api/transaction?userId=${userId}`);
    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to load transactions");
    }
    
    return data.transactions;
  },

  createTransaction: async (transaction: Transaction) => {
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create transaction");
    }
    
    return data.transaction;
  },

  deleteTransaction: async (id: string) => {
    const response = await fetch(`/api/transaction/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }
  },

  updateTransaction: async (transaction: Transaction) => {
    const response = await fetch(`/api/transaction/${transaction.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error("Failed to update transaction");
    }
    
    return transaction;
  },
};
