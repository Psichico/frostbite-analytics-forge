
import { useState, useEffect } from 'react';
import { Transaction, Position, PortfolioSummary, DividendPayment } from '@/types/portfolio';

const STORAGE_KEYS = {
  TRANSACTIONS: 'snowball_transactions',
  POSITIONS: 'snowball_positions',
  DIVIDENDS: 'snowball_dividends'
};

export const usePortfolio = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [dividends, setDividends] = useState<DividendPayment[]>([]);
  const [summary, setSummary] = useState<PortfolioSummary>({
    totalValue: 0,
    totalCost: 0,
    totalGain: 0,
    totalGainPercent: 0,
    realizedGain: 0,
    unrealizedGain: 0,
    dividendIncome: 0,
    cash: 0
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    const storedPositions = localStorage.getItem(STORAGE_KEYS.POSITIONS);
    const storedDividends = localStorage.getItem(STORAGE_KEYS.DIVIDENDS);

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
    if (storedPositions) {
      setPositions(JSON.parse(storedPositions));
    }
    if (storedDividends) {
      setDividends(JSON.parse(storedDividends));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DIVIDENDS, JSON.stringify(dividends));
  }, [dividends]);

  // Calculate portfolio summary
  useEffect(() => {
    const totalValue = positions.reduce((sum, pos) => sum + pos.marketValue, 0);
    const totalCost = positions.reduce((sum, pos) => sum + pos.totalCost, 0);
    const unrealizedGain = totalValue - totalCost;
    const dividendIncome = dividends.reduce((sum, div) => sum + div.amount, 0);
    
    // Calculate cash from deposits/withdrawals
    const cash = transactions
      .filter(t => t.type === 'deposit' || t.type === 'withdrawal')
      .reduce((sum, t) => sum + (t.type === 'deposit' ? t.amount : -t.amount), 0);

    setSummary({
      totalValue,
      totalCost,
      totalGain: unrealizedGain,
      totalGainPercent: totalCost > 0 ? (unrealizedGain / totalCost) * 100 : 0,
      realizedGain: 0, // TODO: Calculate from sell transactions
      unrealizedGain,
      dividendIncome,
      cash
    });
  }, [positions, transactions, dividends]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [...prev, newTransaction].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addDividend = (dividend: Omit<DividendPayment, 'id'>) => {
    const newDividend: DividendPayment = {
      ...dividend,
      id: Date.now().toString()
    };
    setDividends(prev => [...prev, newDividend]);
  };

  return {
    transactions,
    positions,
    dividends,
    summary,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addDividend
  };
};
