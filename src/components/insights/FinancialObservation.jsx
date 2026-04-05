import React from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Target,
  PiggyBank,
  ShoppingBag,
  MinusCircle,
  Sparkles,
} from "lucide-react";

const FinancialObservation = ({ monthlySummary }) => {
  const months = Object.keys(monthlySummary).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  if (months.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
        <p className="text-gray-500">
          Add transactions to see financial insights
        </p>
      </div>
    );
  }

  // ---------- Helpers ----------
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split("-");
    return new Date(year, month - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  const createInsight = (icon, title, message, type) => ({
    icon,
    title,
    message,
    type,
  });

  const getTotal = (key) =>
    Object.values(monthlySummary).reduce((sum, m) => sum + m[key], 0);

  // ---------- Latest & Previous ----------
  const lastMonth = months.at(-1);
  const prevMonth = months.at(-2);

  const lastData = monthlySummary[lastMonth];
  const prevData = prevMonth ? monthlySummary[prevMonth] : null;

  const lastMonthName = formatMonth(lastMonth);
  const prevMonthName = prevMonth ? formatMonth(prevMonth) : null;

  // ---------- Totals ----------
  const totalIncome = getTotal("income");
  const totalExpenses = getTotal("expense");
  const totalSavings = totalIncome - totalExpenses;
  const overallSavingsRate =
    totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : 0;

  // ---------- Changes ----------
  const calcChange = (current, previous) => {
    if (!previous || previous === 0) return null;
    return Math.abs(((current - previous) / previous) * 100).toFixed(1);
  };

  const expenseChange = calcChange(
    lastData.expense,
    prevData?.expense
  );

  const incomeChange = calcChange(
    lastData.income,
    prevData?.income
  );

  // ---------- Insights ----------
  const insights = [];

  // 1 Budget health
  if (lastData.expense > lastData.income) {
    insights.push(
      createInsight(
        <AlertCircle className="w-5 h-5 text-red-500" />,
        "Budget Alert",
        `In ${lastMonthName}, expenses exceeded income by ₹${
          lastData.expense - lastData.income
        }`,
        "warning"
      )
    );
  } else if (lastData.income > lastData.expense) {
    const savings = lastData.income - lastData.expense;
    const rate = ((savings / lastData.income) * 100).toFixed(1);

    insights.push(
      createInsight(
        <PiggyBank className="w-5 h-5 text-green-500" />,
        "Savings Success",
        `In ${lastMonthName}, you saved ₹${savings} (${rate}% of income)`,
        "success"
      )
    );
  } else {
    insights.push(
      createInsight(
        <MinusCircle className="w-5 h-5 text-gray-500" />,
        "Balanced Budget",
        `In ${lastMonthName}, income and expenses were equal`,
        "neutral"
      )
    );
  }

  // 2 Expense trend
  if (expenseChange && prevData) {
    if (lastData.expense > prevData.expense) {
      insights.push(
        createInsight(
          <TrendingUp className="w-5 h-5 text-red-500" />,
          "Expense Increase",
          `Spending increased by ${expenseChange}% compared to ${prevMonthName}`,
          "warning"
        )
      );
    } else {
      insights.push(
        createInsight(
          <TrendingDown className="w-5 h-5 text-green-500" />,
          "Expense Decrease",
          `Spending decreased by ${expenseChange}% compared to ${prevMonthName}`,
          "success"
        )
      );
    }
  }

  // 3 Income trend
  if (incomeChange && prevData) {
    if (lastData.income > prevData.income) {
      insights.push(
        createInsight(
          <TrendingUp className="w-5 h-5 text-green-500" />,
          "Income Growth",
          `Income increased by ${incomeChange}% compared to ${prevMonthName}`,
          "success"
        )
      );
    } else {
      insights.push(
        createInsight(
          <TrendingDown className="w-5 h-5 text-red-500" />,
          "Income Decrease",
          `Income decreased by ${incomeChange}% compared to ${prevMonthName}`,
          "warning"
        )
      );
    }
  }

  // 4 Overall health
  if (months.length >= 2) {
    if (overallSavingsRate >= 50) {
      insights.push(
        createInsight(
          <Sparkles className="w-5 h-5 text-yellow-500" />,
          "Excellent",
          `You've saved ${overallSavingsRate}% of your income`,
          "success"
        )
      );
    } else if (overallSavingsRate >= 20) {
      insights.push(
        createInsight(
          <CheckCircle className="w-5 h-5 text-green-500" />,
          "Good Progress",
          `You've saved ${overallSavingsRate}% of your income`,
          "success"
        )
      );
    } else {
      insights.push(
        createInsight(
          <Target className="w-5 h-5 text-blue-500" />,
          "Keep Going",
          `Try to increase savings from ${overallSavingsRate}%`,
          "neutral"
        )
      );
    }
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border-l-4 ${
            insight.type === "warning"
              ? "bg-red-50 border-red-500"
              : insight.type === "success"
              ? "bg-green-50 border-green-500"
              : "bg-gray-50 border-gray-500"
          } hover:shadow-md`}
        >
          <div className="flex gap-3">
            {insight.icon}
            <div>
              <h4 className="font-semibold text-sm text-gray-800">
                {insight.title}
              </h4>
              <p className="text-sm text-gray-600">
                {insight.message}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialObservation;