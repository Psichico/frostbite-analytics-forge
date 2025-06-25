
import React from "react";
import { PortfolioCharts } from "@/components/PortfolioCharts";

const Charts = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Visualization</h1>
        <p className="text-gray-600 mt-1">Visual breakdown of your portfolio allocation and performance.</p>
      </div>

      <PortfolioCharts />
    </div>
  );
};

export default Charts;
