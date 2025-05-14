import { useMemo } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import BudgetPlanner from './components/BudgetPlanner';
import { motion } from 'framer-motion';

function App() {
  // Memoize container variants for animation
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, staggerChildren: 0.2 },
      },
    }),
    [],
  );

  return (
    <FinanceProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <motion.main
          className="container mx-auto p-4 sm:p-6 flex-grow"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Dashboard />
          <BudgetPlanner />
          <TransactionList />
          <TransactionForm />
        </motion.main>
        <footer className="bg-gray-800 text-gray-100 text-center py-4">
          <p>&copy; 2025 Personal Finance Dashboard. Built with React.</p>
        </footer>
      </div>
    </FinanceProvider>
  );
}

export default App;