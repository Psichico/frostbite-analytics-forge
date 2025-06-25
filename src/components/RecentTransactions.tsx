
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Transaction } from "@/types/portfolio";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'buy': return 'bg-green-100 text-green-800';
      case 'sell': return 'bg-red-100 text-red-800';
      case 'dividend': return 'bg-blue-100 text-blue-800';
      case 'deposit': return 'bg-emerald-100 text-emerald-800';
      case 'withdrawal': return 'bg-orange-100 text-orange-800';
      case 'fee': return 'bg-gray-100 text-gray-800';
      case 'split': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'buy':
      case 'deposit':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'sell':
      case 'withdrawal':
      case 'fee':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <ArrowRight className="w-4 h-4 text-blue-600" />;
    }
  };

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
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions yet. Add your first transaction to get started.
            </div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-gray-50">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {transaction.symbol || transaction.type.toUpperCase()}
                      </span>
                      <Badge className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {transaction.quantity && transaction.price 
                        ? `${transaction.quantity} shares @ $${transaction.price.toFixed(2)}`
                        : transaction.notes || 'No details'
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    ['sell', 'dividend', 'deposit'].includes(transaction.type) ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {['sell', 'dividend', 'deposit'].includes(transaction.type) ? '+' : '-'}
                    ${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
