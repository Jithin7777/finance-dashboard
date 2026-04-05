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


const TransactionToolbar = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const search = useFinanceStore((state) => state.search);
  const setSearch = useFinanceStore((state) => state.setSearch);

  const filterType = useFinanceStore((state) => state.filterType);
  const setFilterType = useFinanceStore((state) => state.setFilterType);

  const filterCategory = useFinanceStore((state) => state.filterCategory);
  const setFilterCategory = useFinanceStore(
    (state) => state.setFilterCategory
  );

  const groupBy = useFinanceStore((state) => state.groupBy);
  const setGroupBy = useFinanceStore((state) => state.setGroupBy);

  const categories = [
    ...new Set(transactions.map((t) => t.category)),
  ];

  const resetFilters = () => {
    setSearch("");
    setFilterType("");
    setFilterCategory("");
    setGroupBy("");
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">

      {/* Header */}
{/* Header */}
<div className="flex items-center justify-between mb-4">
  <h2 className="font-semibold text-gray-700">
    Transaction Controls
  </h2>

  <div className="flex items-center gap-2">
    {/* Reset Button */}
    <Button
      variant="outline"
      size="sm"
      onClick={resetFilters}
      className="flex items-center gap-2"
    >
      <RotateCcw size={14} />
      Reset
    </Button>

    {/* Export CSV Button */}
    <Button
      variant="outline"
      size="sm"
      onClick={() => exportTransactionsToCSV(transactions)}
      className="flex items-center gap-2"
    >
      <Download size={14} />
      Export CSV
    </Button>
  </div>
</div>
      {/* Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              pl-10
              pr-3
              py-2
              border
              rounded-lg
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          />
        </div>

        {/* Type */}
        <div>
          <Select
            value={filterType || "all"}
            onValueChange={(value) =>
              setFilterType(
                value === "all" ? "" : value
              )
            }
          >
            <SelectTrigger>
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Types
              </SelectItem>
              <SelectItem value="income">
                Income
              </SelectItem>
              <SelectItem value="expense">
                Expense
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div>
          <Select
            value={filterCategory || "all"}
            onValueChange={(value) =>
              setFilterCategory(
                value === "all" ? "" : value
              )
            }
          >
            <SelectTrigger>
              <Tag size={16} className="mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Categories
              </SelectItem>

              {categories.map((cat, index) => (
                <SelectItem
                  key={index}
                  value={cat}
                >
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Group */}
        <div>
          <Select
            value={groupBy || "none"}
            onValueChange={(value) =>
              setGroupBy(
                value === "none" ? "" : value
              )
            }
          >
            <SelectTrigger>
              <Layers size={16} className="mr-2" />
              <SelectValue placeholder="Group By" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">
                None
              </SelectItem>
              <SelectItem value="category">
                Category
              </SelectItem>
              <SelectItem value="type">
                Type
              </SelectItem>
              <SelectItem value="month">
                Month
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
};

export default TransactionToolbar;