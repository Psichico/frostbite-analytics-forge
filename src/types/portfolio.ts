
export interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell' | 'dividend' | 'split' | 'deposit' | 'withdrawal' | 'fee';
  symbol?: string;
  quantity?: number;
  price?: number;
  amount: number;
  fees?: number;
  notes?: string;
  dividendType?: 'qualified' | 'non-qualified' | 'roc' | 'foreign';
}

export interface Position {
  symbol: string;
  name: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  totalCost: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  dividendYield: number;
  yieldOnCost: number;
  sector: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalGain: number;
  totalGainPercent: number;
  realizedGain: number;
  unrealizedGain: number;
  dividendIncome: number;
  cash: number;
}

export interface DividendPayment {
  id: string;
  symbol: string;
  amount: number;
  exDate: string;
  payDate: string;
  type: 'qualified' | 'non-qualified' | 'roc' | 'foreign';
  shares: number;
}
