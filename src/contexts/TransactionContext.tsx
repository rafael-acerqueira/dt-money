import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  loadTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        q: query
      }
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data;

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions(state => [response.data, ...state])
  }


  useEffect(() => {
    loadTransactions()
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, loadTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}