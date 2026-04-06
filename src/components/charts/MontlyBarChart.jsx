import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MonthlyBarChart = ({ monthlySummary }) => {
  const data = Object.entries(monthlySummary)
    .map(([month, values]) => ({
      month,
      income: values.income,
      expense: values.expense,
    }))
    .sort((a, b) => new Date(a.month + "-01") - new Date(b.month + "-01"));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(val) => `₹${val}`} />
        <Legend />
        <Bar dataKey="income" fill="#22c55e" />
        <Bar dataKey="expense" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
