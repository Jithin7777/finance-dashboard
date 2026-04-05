

import React from "react";

const MonthlyComparison = ({ monthlySummary }) => {
  const months = Object.keys(monthlySummary).sort().reverse();

  if (!months.length) {
    return <p className="text-gray-500 text-center py-4">No transactions yet</p>;
  }

  // Format month for display
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, parseInt(month) - 1, 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-4 max-h-125 overflow-y-auto pr-2">
      <p className="text-gray-500 text-sm font-medium">
        Monthly Financial Summary
      </p>

      {months.map((month) => {
        const data = monthlySummary[month];
        const savings = data.income - data.expense;
        const savingsRate = data.income > 0 ? ((savings / data.income) * 100).toFixed(1) : 0;

        return (
          <div
            key={month}
            className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-800 text-base">
              {formatMonth(month)}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Income</p>
                <p className="text-green-600 font-semibold">₹{data.income}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Expenses</p>
                <p className="text-red-600 font-semibold">₹{data.expense}</p>
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-gray-500 text-xs">Savings</p>
              <p className={`font-semibold ${savings >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ₹{savings} {savingsRate > 0 && `(${savingsRate}% saved)`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyComparison;