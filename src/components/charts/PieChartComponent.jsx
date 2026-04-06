import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
  Cell,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#14b8a6",
];

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
        >
          {/* Colored Bullet */}
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />

          {/* Category Name */}
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const PieChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No expense data available
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    ...item,
    value: Number(item.value),
  }));

  const total = formattedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-full min-h-65 sm:min-h-80 md:min-h-95">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            innerRadius="55%"
            paddingAngle={4}
            labelLine={false}
          >
            {formattedData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}

            {/* Center Label */}
            <Label
              value={`₹${total.toLocaleString()}`}
              position="center"
              style={{
                fontWeight: 600,
                fill: "#374151",
                fontSize: 18,
              }}
            />
          </Pie>

          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />

          {/* Custom Bullet Legend */}
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
