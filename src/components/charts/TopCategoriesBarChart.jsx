import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#ef4444", "#f59e0b", "#3b82f6"]; // Red, Orange, Blue

const TopCategoriesBarChart = ({ data }) => {
  if (!data || data.length === 0)
    return <p className="text-gray-500 text-center py-4">No expenses yet</p>;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
      >
        {" "}
        <XAxis type="number" />
        <YAxis dataKey="category" type="category" />
        <Tooltip formatter={(value) => `₹${value}`} />
        <Bar dataKey="amount">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopCategoriesBarChart;
