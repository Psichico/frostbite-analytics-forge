
import React from "react";
import { DividendAnalytics } from "@/components/DividendAnalytics";

const Dividends = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dividend Analytics</h1>
        <p className="text-gray-600 mt-1">Track dividend income, yields, and tax implications.</p>
      </div>

      <DividendAnalytics />
    </div>
  );
};

export default Dividends;
