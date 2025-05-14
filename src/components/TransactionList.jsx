import { useState, useMemo } from 'react';
import { useFinanceData } from '../hooks/useFinanceData';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const TransactionList = () => {
  const { transactions, deleteTransaction, loading, error } = useFinanceData();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Memoized filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter ? t.category === categoryFilter : true;
      const matchesDate = dateFilter ? t.date === dateFilter : true;
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [transactions, search, categoryFilter, dateFilter]);

  // Unique categories for filter
  const categories = useMemo(() => [...new Set(transactions.map((t) => t.category))], [transactions]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white"
        />
      </div>
      <div className="bg-white dark:bg-gray-200 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-white">
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <motion.tr
                key={t.id}
                className="border-t dark:border-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="p-3">{t.description}</td>
                <td className={`p-3 ${t.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${Math.abs(t.amount).toFixed(2)}
                </td>
                <td className="p-3">{t.category}</td>
                <td className="p-3">{t.date}</td>
                <td className="p-3">
                  <motion.button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-red-500 hover:text-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <p className="p-4 text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </motion.section>
  );
};

export default TransactionList;