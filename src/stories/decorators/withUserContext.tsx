import React from 'react';

import { UserContext, UserContextType, Transaction } from '../../app/contexts/UserContext';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  balance: 1234.56,
  active: true,
};

const mockTransactions: Transaction[] = [
  { id: '1', type: 'DEPOSIT', value: 100, date: new Date().toISOString() },
  { id: '2', type: 'TRANSFER', value: 50, date: new Date().toISOString() },
  { id: '3', type: 'DEPOSIT', value: 200, date: new Date(Date.now() - 86400000 * 30).toISOString() }, // A month ago
  { id: '4', type: 'TRANSFER', value: 75, date: new Date(Date.now() - 86400000 * 60).toISOString() }, // Two months ago
];

const mockUserContext: UserContextType = {
  user: mockUser,
  transactions: mockTransactions,
  setUser: () => {}, // Mock setUser
  addTransaction: async (transaction: Transaction) => {
    console.log('Mock addTransaction:', transaction);
    // In a real scenario, you might update mockTransactions state here
  },
  deleteTransaction: async (id: string) => {
    console.log('Mock deleteTransaction:', id);
    // In a real scenario, you might update mockTransactions state here
  },
  editTransaction: async (transaction: Transaction) => {
    console.log('Mock editTransaction:', transaction);
    // In a real scenario, you might update mockTransactions state here
  },
};

export const withUserContext = (Story: React.ComponentType) => (
  <UserContext.Provider value={mockUserContext}>
    <Story />
  </UserContext.Provider>
);
