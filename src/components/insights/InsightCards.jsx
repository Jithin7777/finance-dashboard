import React from "react";
import { useFinanceStore } from "../../store/financeStore";
import HighestSpending from "./HighestSpending";
import MonthlyComparison from "./MonthlyComparison";
import FinancialObservation from "./FinancialObservation"; // ✅ ADDED
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const InsightsCards = () => {
  const { transactions } = useFinanceStore();

  // ===============================
  // 1️⃣ Highest Spending Category (Top 3)
  // ===============================
  const categoryTotals = transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  );

  const highestCategory = sortedCategories[0]?.[0];
  const highestAmount = sortedCategories[0]?.[1];

  const secondCategory = sortedCategories[1]?.[0];
  const secondAmount = sortedCategories[1]?.[1];

  const thirdCategory = sortedCategories[2]?.[0];
  const thirdAmount = sortedCategories[2]?.[1];

  // ===============================
  // 2️⃣ Monthly Summary
  // ===============================
  const monthlySummary = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7);
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    if (t.type === "income") {
      acc[month].income += t.amount;
    } else {
      acc[month].expense += t.amount;
    }
    return acc;
  }, {});

  // ===============================
  // UI
  // ===============================
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
      
      {/* Highest Spending */}
      <Card>
        <CardHeader>
          <CardTitle>Highest Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <HighestSpending
            category={highestCategory}
            amount={highestAmount}
            secondCategory={secondCategory}
            secondAmount={secondAmount}
            thirdCategory={thirdCategory}
            thirdAmount={thirdAmount}
          />
        </CardContent>
      </Card>

      {/* Monthly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyComparison monthlySummary={monthlySummary} />
        </CardContent>
      </Card>

      {/* Smart Insights - Using FinancialObservation Component */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <FinancialObservation monthlySummary={monthlySummary} />
        </CardContent>
      </Card>

    </div>
  );
};

export default InsightsCards;