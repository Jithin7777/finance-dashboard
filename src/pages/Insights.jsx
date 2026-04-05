import React from "react";
import InsightsCards from "../components/insights/InsightCards";
import { useFinanceStore } from "../store/financeStore";
import { Sparkles } from "lucide-react";
import MonthlyBarChart from "@/components/charts/MontlyBarChart";
const Insights = () => {
  const { transactions } = useFinanceStore();

  // Prepare monthly summary for the chart
  const monthlySummary = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7);
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (t.type === "income") acc[month].income += t.amount;
    else acc[month].expense += t.amount;
    return acc;
  }, {});

  return (
    <div className="p-3 space-y-10 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Sparkles className="text-indigo-600 w-6 h-6" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Financial Insights
          </h1>
          <p className="text-gray-500 text-sm">
            Smart observations based on your income and expenses
          </p>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <InsightsCards />
      </div>

      {/* Monthly Expenses Bar Chart */}
      {/* Monthly Expenses Bar Chart */}
<div className="bg-white rounded-xl shadow-sm p-4">
  <h2 className="text-lg font-semibold mb-4 text-center">Monthly Expenses Chart</h2>

  <div className="max-w-3xl mx-auto">
    <MonthlyBarChart monthlySummary={monthlySummary} />
  </div>
</div>

    </div>
  );
};

export default Insights;