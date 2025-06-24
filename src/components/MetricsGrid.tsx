
import { TrendingUp, TrendingDown, DollarSign, Activity, PieChart, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  {
    title: "Total Portfolio Value",
    value: "$247,892.45",
    change: "+12.3%",
    changeType: "positive",
    icon: DollarSign,
    description: "vs last month"
  },
  {
    title: "Monthly Return",
    value: "+8.42%",
    change: "+2.1%",
    changeType: "positive",
    icon: TrendingUp,
    description: "above benchmark"
  },
  {
    title: "Active Positions",
    value: "23",
    change: "+3",
    changeType: "positive",
    icon: Activity,
    description: "new positions"
  },
  {
    title: "Asset Allocation",
    value: "Balanced",
    change: "Optimized",
    changeType: "neutral",
    icon: PieChart,
    description: "risk profile"
  },
  {
    title: "YTD Performance",
    value: "+24.7%",
    change: "+5.2%",
    changeType: "positive",
    icon: Target,
    description: "vs S&P 500"
  },
  {
    title: "Volatility",
    value: "12.4%",
    change: "-1.8%",
    changeType: "positive",
    icon: TrendingDown,
    description: "30-day average"
  }
];

export const MetricsGrid = () => {
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
