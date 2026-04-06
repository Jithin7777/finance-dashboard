import React from "react";
import { useFinanceStore } from "../../store/financeStore";
import { ArrowUp, ArrowDown, CreditCard } from "lucide-react";

const SummaryCards = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  // Total Income
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // Total Expenses
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // Total Balance
  const totalBalance = totalIncome - totalExpenses;

  const cardData = [
    {
      title: "Total Balance",
      value: totalBalance,
      color: "bg-blue-500 hover:bg-blue-600",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      title: "Total Income",
      value: totalIncome,
      color: "bg-green-500 hover:bg-green-600",
      icon: <ArrowUp className="w-6 h-6" />,
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      color: "bg-red-500 hover:bg-red-600",
      icon: <ArrowDown className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card) => (
        <div
          key={card.title}
          className={`p-5 rounded-xl shadow-md text-white cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-xl ${card.color}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">{card.title}</h3>
            {card.icon}
          </div>

          {/* Value */}
          <p className="text-3xl font-bold mt-4">
            ₹{card.value.toLocaleString("en-IN")}
          </p>

          <p className="text-xs mt-2 opacity-90">Updated from transactions</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
