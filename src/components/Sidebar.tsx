
import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Settings, 
  Home,
  PieChart,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navigation = [
  { name: "Dashboard", icon: Home, id: "dashboard" },
  { name: "Portfolio", icon: PieChart, id: "portfolio" },
  { name: "Analytics", icon: BarChart3, id: "analytics" },
  { name: "Performance", icon: TrendingUp, id: "performance" },
  { name: "Transactions", icon: Activity, id: "transactions" },
  { name: "Wallet", icon: Wallet, id: "wallet" },
  { name: "Settings", icon: Settings, id: "settings" },
];

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Snowball</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
