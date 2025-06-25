
import React from "react";
import { PerformanceTracker } from "@/components/PerformanceTracker";

const Analytics = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
        <p className="text-gray-600 mt-1">Track your portfolio's performance against benchmarks.</p>
      </div>

      <PerformanceTracker />
    </div>
  );
};

export default Analytics;
