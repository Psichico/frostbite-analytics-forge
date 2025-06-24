
import { MetricsGrid } from "./MetricsGrid";
import { ChartSection } from "./ChartSection";
import { RecentTransactions } from "./RecentTransactions";
import { PortfolioOverview } from "./PortfolioOverview";

export const Dashboard = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your portfolio overview.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartSection />
        <PortfolioOverview />
      </div>
      
      <RecentTransactions />
    </div>
  );
};
