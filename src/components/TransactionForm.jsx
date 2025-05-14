import { useState } from 'react';
import { useFinanceData } from '../hooks/useFinanceData';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TransactionForm = () => {
  const { addTransaction } = useFinanceData();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    addTransaction({
      id: data.id || Date.now(),
      description: data.description,
      amount: data.type === 'income' ? Number(data.amount) : -Number(data.amount),
      category: data.category,
      date: data.date,
    });
    reset();
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Transaction
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Add Transaction</h2>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-white block text-sm font-medium">Description</label>
                  <input
                    {...register('description', { required: 'Description is required' })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-white block text-sm font-medium">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('amount', {
                      required: 'Amount is required',
                      min: { value: 0.01, message: 'Amount must be positive' },
                    })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white"
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-sm">{errors.amount.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-white block text-sm font-medium">Type</label>
                  <select
                    {...register('type', { required: 'Type is required' })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="text-white block text-sm font-medium">Category</label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white"
                  >
                    <option value="Food">Food</option>
                    <option value="Bills">Bills</option>
                    <option value="Salary">Salary</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>
                <div>
                  <label className="text-white block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-white"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date.message}</p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TransactionForm;