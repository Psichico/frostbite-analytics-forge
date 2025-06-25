
import { useState } from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { usePortfolio } from "@/hooks/usePortfolio";
import { Transaction } from "@/types/portfolio";

const Transactions = () => {
  const { transactions, addTransaction, deleteTransaction } = usePortfolio();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    addTransaction(transaction);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transaction Management</h1>
        <p className="text-gray-600 mt-1">Add, edit, and manage your portfolio transactions.</p>
      </div>

      <TransactionForm 
        onSubmit={handleAddTransaction}
      />

      <TransactionList 
        transactions={transactions}
        onDelete={deleteTransaction}
        onEdit={handleEditTransaction}
      />
    </div>
  );
};

export default Transactions;
