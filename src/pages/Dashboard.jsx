// src/pages/Dashboard.jsx

import React from "react";
import SummaryCards from "../components/dashboard/SummaryCards";
import LineChartComponent from "../components/charts/LineChartComponent";
import PieChartComponent from "../components/charts/PieChartComponent";
import { useFinanceStore } from "../store/financeStore";

const Dashboard = () => {
  const { transactions } = useFinanceStore();

  // ===============================
  // Monthly Income Expense Balance
  // ===============================
  const getBalanceTrendData = () => {
    const monthlyMap = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      const monthLabel = date.toLocaleString("en-IN", {
        month: "short",
        year: "numeric",
      });

      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = {
          month: monthLabel,
          income: 0,
          expense: 0,
          order: new Date(date.getFullYear(), date.getMonth(), 1),
        };
      }

      if (transaction.type === "income") {
        monthlyMap[monthKey].income += Number(transaction.amount);
      } else {
        monthlyMap[monthKey].expense += Number(transaction.amount);
      }
    });

    return Object.values(monthlyMap)
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        month: item.month,
        income: item.income,
        expense: item.expense,
        balance: item.income - item.expense,
      }));
  };

  const balanceTrendData = getBalanceTrendData();

  // ===============================
  // Spending Breakdown
  // ===============================
  const getSpendingBreakdown = () => {
    const categoryMap = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (!categoryMap[t.category]) {
          categoryMap[t.category] = {
            name: t.category,
            value: 0,
          };
        }
        categoryMap[t.category].value += Number(t.amount);
      });

    return Object.values(categoryMap);
  };

  const categoryData = getSpendingBreakdown();

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="text-lg font-semibold">
              📈 Monthly Financial Trend
            </h2>
            <span className="text-sm text-gray-500">
              Income vs Expense vs Balance
            </span>
          </div>

          {balanceTrendData.length > 0 ? (
<div className="w-full h-80 sm:h-80 md:h-96">
  <LineChartComponent data={balanceTrendData} />
</div>          ) : (
            <div className="text-center py-10 text-gray-500">
              No financial data available
            </div>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="text-lg font-semibold">
              🥧 Spending Breakdown
            </h2>
            <span className="text-sm text-gray-500">
              By Category
            </span>
          </div>

          {categoryData.length > 0 ? (
            <>
              <div className="mb-4 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Total Expenses: ₹
                {categoryData
                  .reduce((sum, cat) => sum + cat.value, 0)
                  .toLocaleString()}
              </div>

<div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
  <PieChartComponent data={categoryData} />
</div>            </>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No expense data available
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;