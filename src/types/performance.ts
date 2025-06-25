
export interface PerformanceMetrics {
  timeWeightedReturn: number;
  moneyWeightedReturn: number;
  benchmarkReturn: number;
  alpha: number;
  beta: number;
  sharpeRatio: number;
  volatility: number;
  maxDrawdown: number;
}

export interface BenchmarkData {
  date: string;
  value: number;
  return: number;
}

export interface PerformanceData {
  date: string;
  portfolioValue: number;
  portfolioReturn: number;
  benchmarkValue: number;
  benchmarkReturn: number;
}

export interface DividendCalendar {
  symbol: string;
  exDate: string;
  payDate: string;
  amount: number;
  estimatedAmount?: number;
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
}

export interface TaxSummary {
  qualifiedDividends: number;
  nonQualifiedDividends: number;
  returnOfCapital: number;
  foreignDividends: number;
  totalTaxable: number;
  estimatedTax: number;
}
