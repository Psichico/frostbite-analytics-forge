
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { usePortfolio } from "@/hooks/usePortfolio";

export const PerformanceTracker = () => {
  const { summary, transactions } = usePortfolio();

  // Mock performance data (in real app, would calculate from historical data)
  const performanceData = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 11 + i);
    const portfolioReturn = Math.random() * 20 - 10; // Random return between -10% and 10%
    const sp500Return = Math.random() * 15 - 7.5; // S&P 500 typically less volatile
    
    return {
      month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      portfolio: portfolioReturn,
      sp500: sp500Return,
      portfolioValue: 50000 + (i * 2000) + (portfolioReturn * 100),
      sp500Value: 50000 + (i * 1800) + (sp500Return * 100)
    };
  });

  // Calculate performance metrics
  const totalPortfolioReturn = summary.totalGainPercent;
  const sp500Return = 8.5; // Mock S&P 500 return
  const alpha = totalPortfolioReturn - sp500Return;
  const beta = 1.1; // Mock beta
  const sharpeRatio = totalPortfolioReturn / 15; // Mock Sharpe ratio
  const maxDrawdown = -8.2; // Mock max drawdown

  // Realized vs Unrealized gains data
  const gainsData = [
    { name: 'Unrealized Gains', value: summary.unrealizedGain, color: '#3b82f6' },
    { name: 'Realized Gains', value: summary.realizedGain, color: '#10b981' }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Total Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPortfolioReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPortfolioReturn.toFixed(2)}%
            </div>
            <p className="text-sm text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Alpha vs S&P 500
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${alpha >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {alpha >= 0 ? '+' : ''}{alpha.toFixed(2)}%
            </div>
            <p className="text-sm text-gray-500">Outperformance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Sharpe Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sharpeRatio.toFixed(2)}</div>
            <p className="text-sm text-gray-500">Risk-adjusted return</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Max Drawdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{maxDrawdown}%</div>
            <p className="text-sm text-gray-500">Worst decline</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio vs S&P 500 Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${Number(value).toFixed(2)}%`, 
                  name === 'portfolio' ? 'Portfolio' : 'S&P 500'
                ]} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Portfolio"
              />
              <Line 
                type="monotone" 
                dataKey="sp500" 
                stroke="#6b7280" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="S&P 500"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Portfolio Value Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Value Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']} />
              <Area 
                type="monotone" 
                dataKey="portfolioValue" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Realized vs Unrealized Gains */}
      <Card>
        <CardHeader>
          <CardTitle>Gains Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                <span className="font-medium">Unrealized Gains</span>
              </div>
              <span className={`font-bold ${summary.unrealizedGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${summary.unrealizedGain.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="font-medium">Realized Gains</span>
              </div>
              <span className={`font-bold ${summary.realizedGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${summary.realizedGain.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
