
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { usePortfolio } from "@/hooks/usePortfolio";

export const PortfolioCharts = () => {
  const { positions } = usePortfolio();

  // Asset allocation by stock
  const assetAllocation = positions.map(pos => ({
    symbol: pos.symbol,
    value: pos.marketValue,
    percentage: ((pos.marketValue / positions.reduce((sum, p) => sum + p.marketValue, 0)) * 100).toFixed(1)
  })).sort((a, b) => b.value - a.value);

  // Mock sector allocation (in real app, would have sector data)
  const sectorAllocation = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Healthcare', value: 20, color: '#10b981' },
    { name: 'Financial', value: 15, color: '#f59e0b' },
    { name: 'Consumer', value: 12, color: '#ef4444' },
    { name: 'Industrial', value: 10, color: '#8b5cf6' },
    { name: 'Other', value: 8, color: '#6b7280' }
  ];

  // Performance by position
  const performanceData = positions
    .map(pos => ({
      symbol: pos.symbol,
      gain: pos.unrealizedGain,
      gainPercent: pos.unrealizedGainPercent,
      value: pos.marketValue
    }))
    .sort((a, b) => b.gainPercent - a.gainPercent);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280', '#ec4899', '#14b8a6'];

  return (
    <div className="space-y-6">
      {/* Asset Allocation Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation by Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetAllocation.slice(0, 8)} // Top 8 holdings
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {assetAllocation.slice(0, 8).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {assetAllocation.slice(0, 8).map((item, index) => (
                <div key={item.symbol} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="truncate">{item.symbol} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
              {sectorAllocation.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded mr-2" 
                      style={{ backgroundColor: sector.color }}
                    ></div>
                    <span>{sector.name}</span>
                  </div>
                  <span className="font-medium">{sector.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance by Position */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Position</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="symbol" type="category" width={60} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'gainPercent') {
                    return [`${Number(value).toFixed(2)}%`, 'Gain/Loss %'];
                  }
                  return [`$${Number(value).toLocaleString()}`, 'Gain/Loss $'];
                }}
              />
              <Bar 
                dataKey="gainPercent" 
                fill={(entry) => entry >= 0 ? '#10b981' : '#ef4444'}
                name="Gain/Loss %"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Symbol</th>
                  <th className="text-right py-2">Value</th>
                  <th className="text-right py-2">% of Portfolio</th>
                  <th className="text-right py-2">Gain/Loss</th>
                  <th className="text-right py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {assetAllocation.slice(0, 10).map((position) => {
                  const posData = positions.find(p => p.symbol === position.symbol);
                  return (
                    <tr key={position.symbol} className="border-b">
                      <td className="py-3 font-semibold">{position.symbol}</td>
                      <td className="py-3 text-right">${position.value.toLocaleString()}</td>
                      <td className="py-3 text-right">{position.percentage}%</td>
                      <td className={`py-3 text-right ${posData?.unrealizedGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${posData?.unrealizedGain.toLocaleString()}
                      </td>
                      <td className={`py-3 text-right ${posData?.unrealizedGainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {posData?.unrealizedGainPercent.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
