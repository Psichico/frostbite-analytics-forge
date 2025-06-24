
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const portfolioData = [
  { name: "Technology", value: 35, amount: 86800, color: "#3b82f6" },
  { name: "Healthcare", value: 22, amount: 54500, color: "#10b981" },
  { name: "Finance", value: 18, amount: 44600, color: "#f59e0b" },
  { name: "Consumer", value: 15, amount: 37200, color: "#ef4444" },
  { name: "Energy", value: 10, amount: 24800, color: "#8b5cf6" },
];

export const PortfolioOverview = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center">
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    `${value}% ($${props.payload.amount.toLocaleString()})`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 pl-6 space-y-3">
            {portfolioData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{item.value}%</div>
                  <div className="text-xs text-gray-500">${item.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
