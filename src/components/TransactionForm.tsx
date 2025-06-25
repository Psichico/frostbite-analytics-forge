
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Transaction } from "@/types/portfolio";

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel?: () => void;
}

export const TransactionForm = ({ onSubmit, onCancel }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'buy' as Transaction['type'],
    symbol: '',
    quantity: '',
    price: '',
    amount: '',
    fees: '',
    notes: '',
    dividendType: 'qualified' as Transaction['dividendType']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction: Omit<Transaction, 'id'> = {
      date: formData.date,
      type: formData.type,
      amount: parseFloat(formData.amount) || 0,
      notes: formData.notes || undefined,
    };

    if (formData.symbol) transaction.symbol = formData.symbol.toUpperCase();
    if (formData.quantity) transaction.quantity = parseFloat(formData.quantity);
    if (formData.price) transaction.price = parseFloat(formData.price);
    if (formData.fees) transaction.fees = parseFloat(formData.fees);
    if (formData.type === 'dividend') transaction.dividendType = formData.dividendType;

    onSubmit(transaction);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'buy',
      symbol: '',
      quantity: '',
      price: '',
      amount: '',
      fees: '',
      notes: '',
      dividendType: 'qualified'
    });
  };

  const requiresSymbol = ['buy', 'sell', 'dividend', 'split'].includes(formData.type);
  const requiresQuantity = ['buy', 'sell', 'split'].includes(formData.type);
  const requiresPrice = ['buy', 'sell'].includes(formData.type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value: Transaction['type']) => 
                setFormData(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  <SelectItem value="dividend">Dividend</SelectItem>
                  <SelectItem value="split">Stock Split</SelectItem>
                  <SelectItem value="deposit">Cash Deposit</SelectItem>
                  <SelectItem value="withdrawal">Cash Withdrawal</SelectItem>
                  <SelectItem value="fee">Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {requiresSymbol && (
              <div>
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                  id="symbol"
                  placeholder="AAPL"
                  value={formData.symbol}
                  onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
                  required
                />
              </div>
            )}

            {requiresQuantity && (
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.001"
                  placeholder="100"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  required
                />
              </div>
            )}

            {requiresPrice && (
              <div>
                <Label htmlFor="price">Price per Share</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="150.00"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="amount">Total Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="1500.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                required
              />
            </div>

            {(formData.type === 'buy' || formData.type === 'sell') && (
              <div>
                <Label htmlFor="fees">Fees (optional)</Label>
                <Input
                  id="fees"
                  type="number"
                  step="0.01"
                  placeholder="9.95"
                  value={formData.fees}
                  onChange={(e) => setFormData(prev => ({ ...prev, fees: e.target.value }))}
                />
              </div>
            )}

            {formData.type === 'dividend' && (
              <div>
                <Label htmlFor="dividendType">Dividend Type</Label>
                <Select value={formData.dividendType} onValueChange={(value: Transaction['dividendType']) => 
                  setFormData(prev => ({ ...prev, dividendType: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="non-qualified">Non-Qualified</SelectItem>
                    <SelectItem value="roc">Return of Capital</SelectItem>
                    <SelectItem value="foreign">Foreign</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">Add Transaction</Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
