import React, { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Transaction } from "@/types/portfolio";

interface CsvUploaderProps {
  onImport: (transactions: Omit<Transaction, "id">[]) => void;
}

export const CsvUploader = ({ onImport }: CsvUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const cleanNumber = (value: string): number =>
    parseFloat(value.replace(/[$,()]/g, "")) * (value.includes("(") ? -1 : 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleParse = () => {
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed: Omit<Transaction, "id">[] = results.data.map((row: any) => ({
          date: row["Date"],
          symbol: row["Instrument"],
          type: row["Trans Code"].toLowerCase() === "buy" ? "buy" : "sell",
          quantity: parseFloat(row["Quantity"]),
          price: cleanNumber(row["Price"]),
          amount: cleanNumber(row["Amount"]),
          notes: row["Description"] || undefined,
        }));
        onImport(parsed);
      },
    });
  };

  return (
    <div className="space-y-4">
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleParse}>Import Robinhood CSV</Button>
    </div>
  );
};
