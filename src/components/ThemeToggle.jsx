import { useFinanceData } from '../hooks/useFinanceData';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react'; // Install lucide-react: npm install lucide-react

const ThemeToggle = () => {
  const { theme, setTheme } = useFinanceData();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;