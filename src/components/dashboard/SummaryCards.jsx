import React from "react";
import { useFinanceStore } from "../../store/financeStore";

const SummaryCards = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  // Convert amount to number
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpenses;

  const cardData = [
    {
      title: "Total Balance",
      value: totalBalance,
      color: "bg-blue-500",
    },
    {
      title: "Total Income",
      value: totalIncome,
      color: "bg-green-500",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card) => (
        <div
          key={card.title}
          className={`p-4 rounded shadow text-white ${card.color}`}
        >
          <h3 className="text-sm font-semibold">
            {card.title}
          </h3>

          <p className="text-2xl font-bold mt-2">
            ₹{card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;