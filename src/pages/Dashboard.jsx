// src/pages/Dashboard.jsx
import React from "react";
import LineChartComponent from "../components/charts/LineChartComponent";
import PieChartComponent from "../components/charts/PieChartComponent";
import { useFinanceStore } from "../store/financeStore";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { BarChart2, Landmark, PieChart } from "lucide-react";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
const Dashboard = () => {
  const { transactions } = useFinanceStore();

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

  // Spending Breakdown
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
    <div className="p-4 md:p-6 space-y-6  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex items-start gap-3">
        <Landmark className="w-8 h-8 text-indigo-600 mt-1" />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
            Welcome to Your Finance Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base ">
            Track your income, expenses, and balance over time...
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition-colors">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            {/* Left: Title + Icon */}
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-600 transform transition-transform duration-500 ease-out hover:scale-110" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300 hover:text-indigo-600">
                Monthly Financial Trend
              </h2>
            </div>

            {/* Right: Subtitle */}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Income vs Expense vs Balance
            </span>
          </div>

          {balanceTrendData.length > 0 ? (
            <div className="w-full h-80 sm:h-80 md:h-96">
              <LineChartComponent data={balanceTrendData} />
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              No financial data available
            </div>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition-colors">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            {/* Left: Icon + Title */}
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-600 transform transition-transform duration-500 ease-out hover:scale-110" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300 hover:text-indigo-600">
                Spending Breakdown
              </h2>
            </div>

            {/* Right: Subtitle */}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              By Category
            </span>
          </div>{" "}
          {categoryData.length > 0 ? (
            <>
              <div className="mb-4 text-xs text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                Total Expenses: ₹
                {categoryData
                  .reduce((sum, cat) => sum + cat.value, 0)
                  .toLocaleString()}
              </div>

              <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
                <PieChartComponent data={categoryData} />
              </div>
              
            </>
          ) : (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              No expense data available
            </div>
          )}
        </div>
        <RecentTransactions limit={5} />

      </div>
    </div>
  );
};

export default Dashboard;
