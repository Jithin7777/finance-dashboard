// src/components/transactions/ExportCSV.jsx
import React from "react";
import { useFinanceStore } from "../../store/financeStore";
import { exportTransactionsToCSV } from "../../utils/exportCSV";
import { Download } from "lucide-react";

const ExportCSV = () => {
  const { transactions } = useFinanceStore();

  return (
    <button
      onClick={() => exportTransactionsToCSV(transactions)}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );
};

export default ExportCSV;