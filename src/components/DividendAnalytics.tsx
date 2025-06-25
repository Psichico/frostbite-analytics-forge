
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, DollarSign, PieChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { usePortfolio } from "@/hooks/usePortfolio";

export const DividendAnalytics = () => {
  const { transactions, positions, dividends } = usePortfolio();

  // Calculate dividend metrics
  const currentYear = new Date().getFullYear();
  const yearlyDividends = transactions
    .filter(t => t.type === 'dividend' && new Date(t.date).getFullYear() === currentYear)
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyDividends = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const amount = transactions
      .filter(t => 
        t.type === 'dividend' && 
        new Date(t.date).getMonth() + 1 === month &&
        new Date(t.date).getFullYear() === currentYear
      )
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      amount: amount
    };
  });

  // Calculate forward dividend yield (mock data - in real app would fetch from API)
  const forwardYield = positions.reduce((sum, pos) => {
    const mockAnnualDividend = pos.currentPrice * 0.02; // 2% mock yield
    return sum + (mockAnnualDividend * pos.shares);
  }, 0);

  // Tax categorization
  const taxSummary = transactions
    .filter(t => t.type === 'dividend')
    .reduce((acc, t) => {
      switch (t.dividendType) {
        case 'qualified':
          acc.qualified += t.amount;
          break;
        case 'non-qualified':
          acc.nonQualified += t.amount;
          break;
        case 'roc':
          acc.returnOfCapital += t.amount;
          break;
        case 'foreign':
          acc.foreign += t.amount;
          break;
        default:
          acc.qualified += t.amount;
      }
      return acc;
    }, { qualified: 0, nonQualified: 0, returnOfCapital: 0, foreign: 0 });

  return (
    <div className="space-y-6">
      {/* Dividend Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Annual Dividend Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${yearlyDividends.toFixed(2)}</div>
            <p className="text-sm text-gray-500">{currentYear}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Forward Yield
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${forwardYield.toFixed(2)}</div>
            <p className="text-sm text-gray-500">Estimated annual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <PieChart className="w-4 h-4 mr-2" />
              Qualified Dividends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${taxSummary.qualified.toFixed(2)}</div>
            <p className="text-sm text-gray-500">Tax-advantaged</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Monthly Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(yearlyDividends / 12).toFixed(2)}</div>
            <p className="text-sm text-gray-500">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Dividend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Dividend Income - {currentYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyDividends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Dividend Income']} />
              <Bar dataKey="amount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tax Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Badge className="bg-green-100 text-green-800 mr-2">Qualified</Badge>
                <span>Qualified Dividends</span>
              </div>
              <span className="font-semibold">${taxSummary.qualified.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Badge className="bg-yellow-100 text-yellow-800 mr-2">Non-Qualified</Badge>
                <span>Non-Qualified Dividends</span>
              </div>
              <span className="font-semibold">${taxSummary.nonQualified.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Badge className="bg-gray-100 text-gray-800 mr-2">ROC</Badge>
                <span>Return of Capital</span>
              </div>
              <span className="font-semibold">${taxSummary.returnOfCapital.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Badge className="bg-blue-100 text-blue-800 mr-2">Foreign</Badge>
                <span>Foreign Dividends</span>
              </div>
              <span className="font-semibold">${taxSummary.foreign.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
