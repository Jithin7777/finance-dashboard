  import React from "react";
  import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Label,
  } from "recharts";

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
    "#8b5cf6",
    "#14b8a6",
  ];

  const PieChartComponent = ({ data }) => {
    if (!data || data.length === 0) {
      return (
        <div className="text-center text-gray-500 py-10">
          No expense data available
        </div>
      );
    }

    // Add 'fill' color directly to each data item
    const formattedData = data.map((item, index) => ({
      ...item,
      value: Number(item.value),
      fill: COLORS[index % COLORS.length],
    }));

    const total = formattedData.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="w-full aspect-[1/1] sm:aspect-[4/3] md:aspect-[5/3]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              innerRadius="50%"
              paddingAngle={3}
              labelLine={false}
            >
              {/* Center total label */}
              <Label
                value={`₹${total.toLocaleString()}`}
                position="center"
                style={{
                  fontWeight: 600,
                  fill: "#374151",
                  textAnchor: "middle",
                  fontSize: 20, // fallback size
                }}
                className="text-base sm:text-lg md:text-2xl"
              />
            </Pie>

            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              height={56}
              wrapperStyle={{ flexWrap: "wrap" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  export default PieChartComponent;
