import React from "react";
import { useFinanceStore } from "../../store/financeStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GroupTransactions = () => {
  const groupBy = useFinanceStore((state) => state.groupBy);
  const setGroupBy = useFinanceStore((state) => state.setGroupBy);

  return (
    <div className="w-64 space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Group By
      </label>

      <Select
        value={groupBy || "none"}
        onValueChange={(value) =>
          setGroupBy(value === "none" ? "" : value)
        }
      >
        <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <SelectValue placeholder="Select grouping" />
        </SelectTrigger>

        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <SelectItem 
            value="none" 
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            None
          </SelectItem>
          <SelectItem 
            value="category"
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Category
          </SelectItem>
          <SelectItem 
            value="type"
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Type
          </SelectItem>
          <SelectItem 
            value="month"
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Month
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GroupTransactions;