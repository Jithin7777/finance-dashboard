import React from "react";
import TopCategoriesBarChart from "../charts/TopCategoriesBarChart";

const HighestSpending = ({
  category,
  amount,
  secondCategory,
  secondAmount,
  thirdCategory,
  thirdAmount,
}) => {
  const topCategories = [
    { category, amount },
    secondCategory ? { category: secondCategory, amount: secondAmount } : null,
    thirdCategory ? { category: thirdCategory, amount: thirdAmount } : null,
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      {category ? (
        <>
          <div className="space-y-2">
            <p className="text-gray-500 text-sm font-medium">
              Top Expense Categories
            </p>

            <TopCategoriesBarChart data={topCategories} />

            <div className="mt-2 space-y-1">
              {topCategories.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm font-medium p-1 rounded-md"
                  style={{
                    backgroundColor:
                      idx === 0 ? "rgba(239, 68, 68, 0.1)" : "transparent",
                  }}
                >
                  <span
                    className={idx === 0 ? "font-semibold text-red-600" : ""}
                  >
                    {item.category}
                  </span>
                  <span
                    className={`font-semibold ${idx === 0 ? "text-red-600" : ""}`}
                  >
                    ₹{item.amount} {idx === 0 && " Highest"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center py-4">No expenses yet</p>
      )}
    </div>
  );
};

export default HighestSpending;
