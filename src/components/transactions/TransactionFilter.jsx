import React from "react";
import { useFinanceStore } from "../../store/financeStore";
import { Filter, Tag } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionFilter = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const filterType = useFinanceStore((state) => state.filterType);
  const setFilterType = useFinanceStore((state) => state.setFilterType);

  const filterCategory = useFinanceStore((state) => state.filterCategory);
  const setFilterCategory = useFinanceStore(
    (state) => state.setFilterCategory
  );

  // unique categories
  const categories = [
    ...new Set(transactions.map((t) => t.category)),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">

      {/* Type Filter */}
      <div className="w-full sm:w-56 space-y-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter size={16} />
          <span>Type</span>
        </div>

        <Select
          value={filterType || "all"}
          onValueChange={(value) =>
            setFilterType(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Types" />
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

      {/* Category Filter */}
      <div className="w-full sm:w-64 space-y-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Tag size={16} />
          <span>Category</span>
        </div>

        <Select
          value={filterCategory || "all"}
          onValueChange={(value) =>
            setFilterCategory(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Categories
            </SelectItem>

            {categories.map((cat, index) => (
              <SelectItem key={index} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>
  );
};

export default TransactionFilter;