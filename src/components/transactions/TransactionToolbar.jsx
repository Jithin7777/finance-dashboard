import React from "react";
import { useFinanceStore } from "../../store/financeStore";
import { Search, Filter, Tag, Layers, RotateCcw, Download } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { exportTransactionsToCSV } from "../../utils/exportCSV";
import { Input } from "../ui/input";

const TransactionToolbar = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const search = useFinanceStore((state) => state.search);
  const setSearch = useFinanceStore((state) => state.setSearch);

  const filterType = useFinanceStore((state) => state.filterType);
  const setFilterType = useFinanceStore((state) => state.setFilterType);

  const filterCategory = useFinanceStore((state) => state.filterCategory);
  const setFilterCategory = useFinanceStore((state) => state.setFilterCategory);

  const groupBy = useFinanceStore((state) => state.groupBy);
  const setGroupBy = useFinanceStore((state) => state.setGroupBy);

  const categories = [...new Set(transactions.map((t) => t.category))];

  const resetFilters = () => {
    setSearch("");
    setFilterType("");
    setFilterCategory("");
    setGroupBy("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-100 text-base sm:text-lg">
          Transaction Controls
        </h2>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {/* Reset */}
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          {/* Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportTransactionsToCSV(transactions)}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <Input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-10
              pr-3
              py-2
              text-sm
              border
              rounded-lg
              focus:ring-2
              focus:ring-blue-500
              outline-none
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-600
            "
          />
        </div>

        {/* Type */}
        <Select
          value={filterType || "all"}
          onValueChange={(value) => setFilterType(value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">
            <Filter size={16} className="mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>

          <SelectContent className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        {/* Category */}
        <Select
          value={filterCategory || "all"}
          onValueChange={(value) =>
            setFilterCategory(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">
            <Tag size={16} className="mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat, index) => (
              <SelectItem key={index} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Group */}
        <Select
          value={groupBy || "none"}
          onValueChange={(value) => setGroupBy(value === "none" ? "" : value)}
        >
          <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">
            <Layers size={16} className="mr-2" />
            <SelectValue placeholder="Group By" />
          </SelectTrigger>

          <SelectContent className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TransactionToolbar;
