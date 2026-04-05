import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const MonthlyBarChart = ({ monthlySummary }) => {
  // Convert object to array and sort months chronologically
  const data = Object.entries(monthlySummary)
    .map(([month, values]) => ({
      month,
      income: values.income,
      expense: values.expense,
    }))
    .sort((a, b) => new Date(a.month + "-01") - new Date(b.month + "-01")); 
    // adding "-01" to make it a valid date

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