
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Upload, Trash2, Edit } from "lucide-react";
import { Transaction } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit?: (transaction: Transaction) => void;
  onImport?: (transactions: Omit<Transaction, 'id'>[]) => void;
}

export const TransactionList = ({ transactions, onDelete, onEdit, onImport }: TransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Transaction>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filteredTransactions = transactions.filter(transaction => 
    (transaction.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     transaction.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     transaction.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortDirection === "asc") {
      return aValue! < bValue! ? -1 : 1;
    }
    return aValue! > bValue! ? -1 : 1;
  });

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

  const exportCSV = () => {
    const headers = ['Date', 'Type', 'Symbol', 'Quantity', 'Price', 'Amount', 'Fees', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        t.type,
        t.symbol || '',
        t.quantity || '',
        t.price || '',
        t.amount,
        t.fees || '',
        t.notes || ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please select a CSV file.",
        variant: "destructive",
      });
      return;
    }

    try {
      const text = await file.text();
      const rows = text.split('\n').filter(row => row.trim());
      
      if (rows.length < 2) {
        toast({
          title: "Empty file",
          description: "The CSV file appears to be empty or has no data rows.",
          variant: "destructive",
        });
        return;
      }

      const headers = rows[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
      const dataRows = rows.slice(1);

      const importedTransactions: Omit<Transaction, 'id'>[] = [];

      for (const row of dataRows) {
        const values = row.split(',').map(v => v.replace(/"/g, '').trim());
        
        if (values.length < headers.length) continue;

        const transaction: any = {};
        
        headers.forEach((header, index) => {
          const value = values[index];
          
          switch (header) {
            case 'date':
              transaction.date = value;
              break;
            case 'type':
              if (['buy', 'sell', 'dividend', 'split', 'deposit', 'withdrawal', 'fee'].includes(value.toLowerCase())) {
                transaction.type = value.toLowerCase();
              }
              break;
            case 'symbol':
              transaction.symbol = value || undefined;
              break;
            case 'quantity':
              transaction.quantity = value ? parseFloat(value) : undefined;
              break;
            case 'price':
              transaction.price = value ? parseFloat(value) : undefined;
              break;
            case 'amount':
              transaction.amount = parseFloat(value) || 0;
              break;
            case 'fees':
              transaction.fees = value ? parseFloat(value) : undefined;
              break;
            case 'notes':
              transaction.notes = value || undefined;
              break;
          }
        });

        if (transaction.type && transaction.date && !isNaN(transaction.amount)) {
          importedTransactions.push(transaction);
        }
      }

      if (importedTransactions.length === 0) {
        toast({
          title: "No valid transactions found",
          description: "Please check your CSV format. Required columns: Date, Type, Amount.",
          variant: "destructive",
        });
        return;
      }

      onImport?.(importedTransactions);
      
      toast({
        title: "Import successful",
        description: `Imported ${importedTransactions.length} transactions.`,
      });

    } catch (error) {
      console.error('CSV import error:', error);
      toast({
        title: "Import failed",
        description: "There was an error reading the CSV file.",
        variant: "destructive",
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Transaction History</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleImportClick}>
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => {
                    if (sortBy === 'date') {
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy('date');
                      setSortDirection('desc');
                    }
                  }}
                >
                  Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.symbol || '-'}</TableCell>
                  <TableCell>{transaction.quantity || '-'}</TableCell>
                  <TableCell>{transaction.price ? `$${transaction.price.toFixed(2)}` : '-'}</TableCell>
                  <TableCell className={transaction.type === 'sell' || transaction.type === 'dividend' ? 'text-green-600' : 'text-red-600'}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.fees ? `$${transaction.fees.toFixed(2)}` : '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{transaction.notes || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {onEdit && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onEdit(transaction)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {sortedTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No transactions found matching your search.' : 'No transactions yet. Add your first transaction above.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
