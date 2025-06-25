
import { TrendingUp, TrendingDown, DollarSign, Activity, PieChart, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PortfolioSummary } from "@/types/portfolio";

interface MetricsGridProps {
  summary: PortfolioSummary;
}

export const MetricsGrid = ({ summary }: MetricsGridProps) => {
  const metrics = [
    {
      title: "Total Portfolio Value",
      value: `$${summary.totalValue.toLocaleString()}`,
      change: `${summary.totalGainPercent >= 0 ? '+' : ''}${summary.totalGainPercent.toFixed(1)}%`,
      changeType: summary.totalGainPercent >= 0 ? "positive" : "negative",
      icon: DollarSign,
      description: "vs cost basis"
    },
    {
      title: "Unrealized Gain/Loss",
      value: `${summary.unrealizedGain >= 0 ? '+' : ''}$${Math.abs(summary.unrealizedGain).toLocaleString()}`,
      change: `${summary.totalGainPercent.toFixed(1)}%`,
      changeType: summary.unrealizedGain >= 0 ? "positive" : "negative",
      icon: summary.unrealizedGain >= 0 ? TrendingUp : TrendingDown,
      description: "unrealized"
    },
    {
      title: "Dividend Income",
      value: `$${summary.dividendIncome.toLocaleString()}`,
      change: "YTD",
      changeType: "positive",
      icon: Target,
      description: "total received"
    },
    {
      title: "Cash Balance",
      value: `$${summary.cash.toLocaleString()}`,
      change: "Available",
      changeType: "neutral",
      icon: Activity,
      description: "liquid funds"
    },
    {
      title: "Total Invested",
      value: `$${summary.totalCost.toLocaleString()}`,
      change: "Cost basis",
      changeType: "neutral",
      icon: PieChart,
      description: "total deployed"
    },
    {
      title: "Portfolio Value",
      value: `$${(summary.totalValue + summary.cash).toLocaleString()}`,
      change: "Total worth",
      changeType: "neutral",
      icon: DollarSign,
      description: "including cash"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-sm font-medium flex items-center ${
                  metric.changeType === 'positive' ? 'text-green-600' : 
                  metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.changeType === 'positive' && <TrendingUp className="w-4 h-4 mr-1" />}
                  {metric.changeType === 'negative' && <TrendingDown className="w-4 h-4 mr-1" />}
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
