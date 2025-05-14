import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(() => Number(localStorage.getItem('budget')) || 1000);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch mock transactions from JSONPlaceholder
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        // Transform mock data to resemble transactions
        const mockTransactions = response.data.slice(0, 10).map((post, index) => ({
          id: post.id,
          description: post.title.slice(0, 20),
          amount: (index % 2 === 0 ? 1 : -1) * (50 + Math.random() * 200),
          category: ['Food', 'Bills', 'Salary', 'Entertainment'][index % 4],
          date: new Date(2025, 0, 1 + index).toISOString().split('T')[0],
        }));
        setTransactions(mockTransactions);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Persist theme and budget to local storage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('budget', budget);
  }, [budget]);

  // Calculate totals
  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const savings = income - expenses;
    return { income, expenses, savings };
  }, [transactions]);

  // Add or edit transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => {
      const existing = prev.find((t) => t.id === transaction.id);
      if (existing) {
        return prev.map((t) => (t.id === transaction.id ? transaction : t));
      }
      return [{ ...transaction, id: Date.now() }, ...prev];
    });
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      transactions,
      budget,
      setBudget,
      theme,
      setTheme,
      loading,
      error,
      totals,
      addTransaction,
      deleteTransaction,
    }),
    [transactions, budget, theme, loading, error, totals],
  );

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  );
};