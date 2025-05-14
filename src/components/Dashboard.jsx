import { useMemo } from 'react';
import { useFinanceData } from '../hooks/useFinanceData';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { totals, transactions, loading, error } = useFinanceData();

  // Prepare data for charts
  const pieData = useMemo(
    () => [
      { name: 'Income', value: totals.income },
      { name: 'Expenses', value: totals.expenses },
    ],
    [totals],
  );

  const lineData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let balance = 0;
    return sorted.map((t) => {
      balance += t.amount;
      return { date: t.date, balance };
    });
  }, [transactions]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <motion.section
      className="mb season-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Income', value: totals.income, color: 'bg-green-500' },
          { label: 'Expenses', value: totals.expenses, color: 'bg-red-500' },
          { label: 'Savings', value: totals.savings, color: 'bg-blue-500' },
        ].map((item) => (
          <motion.div
            key={item.label}
            className={`${item.color} text-white p-4 rounded-lg shadow-md`}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-medium">{item.label}</h3>
            <p className="text-2xl">${item.value.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-100 shadow-lg p-4 rounded-lg ">
          <h3 className="text-lg font-medium mb-2">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-100 shadow-lg p-4 rounded-lg ">
          <h3 className="text-lg font-medium mb-2">Balance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" className='text-red-400'/>
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.section>
  );
};

export default Dashboard;