import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <motion.header
      className="bg-blue-600 text-white shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <h1 className="text-xl font-bold">Personal Finance Dashboard</h1>
        </div>
        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;