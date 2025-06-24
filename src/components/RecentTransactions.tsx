
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "buy",
    asset: "AAPL",
    name: "Apple Inc.",
    amount: "$5,420.00",
    shares: 32,
    price: "$169.38",
    date: "2024-06-24",
    status: "completed"
  },
  {
    id: 2,
    type: "sell",
    asset: "MSFT",
    name: "Microsoft Corp.",
    amount: "$3,280.50",
    shares: 15,
    price: "$218.70",
    date: "2024-06-23",
    status: "completed"
  },
  {
    id: 3,
    type: "buy",
    asset: "NVDA",
    name: "NVIDIA Corp.",
    amount: "$8,750.00",
    shares: 25,
    price: "$350.00",
    date: "2024-06-22",
    status: "pending"
  },
  {
    id: 4,
    type: "dividend",
    asset: "VTI",
    name: "Vanguard Total Stock",
    amount: "$127.45",
    shares: 150,
    price: "$0.85",
    date: "2024-06-21",
    status: "completed"
  },
  {
    id: 5,
    type: "buy",
    asset: "GOOGL",
    name: "Alphabet Inc.",
    amount: "$2,890.00",
    shares: 8,
    price: "$361.25",
    date: "2024-06-20",
    status: "completed"
  }
];

export const RecentTransactions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Transactions</span>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'buy' ? 'bg-green-50' :
                  transaction.type === 'sell' ? 'bg-red-50' : 'bg-blue-50'
                }`}>
                  {transaction.type === 'buy' && <TrendingUp className="w-4 h-4 text-green-600" />}
                  {transaction.type === 'sell' && <TrendingDown className="w-4 h-4 text-red-600" />}
                  {transaction.type === 'dividend' && <ArrowRight className="w-4 h-4 text-blue-600" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{transaction.asset}</span>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{transaction.name}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.shares} shares @ {transaction.price}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${
                  transaction.type === 'buy' ? 'text-red-600' :
                  transaction.type === 'sell' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {transaction.type === 'buy' ? '-' : '+'}
                  {transaction.amount}
                </div>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
