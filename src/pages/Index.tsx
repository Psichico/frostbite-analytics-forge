
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 ml-64">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
