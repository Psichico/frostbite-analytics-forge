import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";
import Analytics from "./Analytics";
import Dividends from "./Dividends";
import Charts from "./Charts";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "portfolio":
        return <Portfolio />;
      case "analytics":
        return <Analytics />;
      case "dividends":
        return <Dividends />;
      case "charts":
        return <Charts />;
      case "transactions":
        return <Transactions />;
      case "performance":
        return <div className="p-8"><h1>Performance (Coming Soon)</h1></div>;
      case "wallet":
        return <div className="p-8"><h1>Wallet (Coming Soon)</h1></div>;
      case "settings":
        return <div className="p-8"><h1>Settings (Coming Soon)</h1></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 ml-64">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
