import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useFinanceData = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinanceData must be used within a FinanceProvider');
  }
  return context;
};