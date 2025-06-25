
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolio } from "@/hooks/usePortfolio";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const Portfolio = () => {
  const { positions, summary } = usePortfolio();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Overview</h1>
        <p className="text-gray-600 mt-1">Track your holdings and performance.</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${summary.totalGain.toLocaleString()}
            </div>
            <div className={`text-sm ${summary.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {summary.totalGainPercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Dividend Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${summary.dividendIncome.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cash</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.cash.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          {positions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No positions yet. Add some transactions to see your holdings.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Symbol</th>
                    <th className="text-left py-2">Shares</th>
                    <th className="text-right py-2">Avg Cost</th>
                    <th className="text-right py-2">Current Price</th>
                    <th className="text-right py-2">Market Value</th>
                    <th className="text-right py-2">Gain/Loss</th>
                    <th className="text-right py-2">%</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position) => (
                    <tr key={position.symbol} className="border-b">
                      <td className="py-3">
                        <div>
                          <div className="font-semibold">{position.symbol}</div>
                          <div className="text-sm text-gray-500">{position.name}</div>
                        </div>
                      </td>
                      <td className="py-3">{position.shares.toFixed(3)}</td>
                      <td className="py-3 text-right">${position.averageCost.toFixed(2)}</td>
                      <td className="py-3 text-right">${position.currentPrice.toFixed(2)}</td>
                      <td className="py-3 text-right">${position.marketValue.toLocaleString()}</td>
                      <td className={`py-3 text-right ${position.unrealizedGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="flex items-center justify-end">
                          {position.unrealizedGain >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          ${Math.abs(position.unrealizedGain).toLocaleString()}
                        </div>
                      </td>
                      <td className={`py-3 text-right ${position.unrealizedGainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.unrealizedGainPercent.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
