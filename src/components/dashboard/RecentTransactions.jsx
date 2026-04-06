import React from "react";
import { useFinanceStore } from "../../store/financeStore";
import { ArrowUp, ArrowDown, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentTransactions = ({ limit = 5 }) => {
  const transactions = useFinanceStore((state) => state.transactions);
  const navigate = useNavigate();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
        <Tag className="w-5 h-5 text-indigo-600" />
        Recent Transactions
      </h2>

      <ul className="space-y-2">
        {recent.length > 0 ? (
          recent.map((t, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center gap-2">
                {/* Income / Expense Icon */}
                {t.type === "income" ? (
                  <ArrowUp className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDown className="w-5 h-5 text-red-600" />
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {t.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(t.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <span
                className={`font-semibold ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{Number(t.amount).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
            No transactions yet
          </li>
        )}
      </ul>

      {/* View All Button */}
      {transactions.length > limit && (
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/transactions")}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline transition"
          >
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
