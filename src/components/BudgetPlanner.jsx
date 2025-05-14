import { useState } from "react";
import { useFinanceData } from "../hooks/useFinanceData";
import { motion } from "framer-motion";

const BudgetPlanner = () => {
  const { budget, setBudget, totals } = useFinanceData();
  const [inputValue, setInputValue] = useState(budget);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudget = Number(inputValue);
    if (newBudget > 0) {
      setBudget(newBudget);
    }
  };

  const progress = Math.min((totals.expenses / budget) * 100, 100);

  return (
    <motion.section
      className="mb-8 mt-8 p-4 bg-white dark:bg-gray-100 rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Budget Planner</h2>

      <label htmlFor="budget" className="text-sm font-medium">
        Set your budget:
      </label>
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex space-x-2 items-center"
      >
        <p className="font-bold text-lg">$</p>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white font-semibold w-32"
          placeholder="Set budget"
          min="0"
        />
        <motion.button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Set Budget
        </motion.button>
      </form>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-4 overflow-hidden">
        <motion.div
          className="bg-green-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="mt-2">
        Budget: ${budget.toFixed(2)} | Spent: ${totals.expenses.toFixed(2)} (
        {progress.toFixed(1)}%)
      </p>
    </motion.section>
  );
};

export default BudgetPlanner;
