"use client";
import { useMemo } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const PieChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || !data["Time Series (Daily)"]) return [];

    const entries = Object.entries(data["Time Series (Daily)"]).slice(0, 30);
    const prices = entries.map(([_, values]) => parseFloat(values["4. close"]));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    const intervalSize = range / 5;

    const categories = [
      {
        name: `$${min.toFixed(2)} - $${(min + intervalSize).toFixed(2)}`,
        value: 0,
      },
      {
        name: `$${(min + intervalSize).toFixed(2)} - $${(
          min +
          2 * intervalSize
        ).toFixed(2)}`,
        value: 0,
      },
      {
        name: `$${(min + 2 * intervalSize).toFixed(2)} - $${(
          min +
          3 * intervalSize
        ).toFixed(2)}`,
        value: 0,
      },
      {
        name: `$${(min + 3 * intervalSize).toFixed(2)} - $${(
          min +
          4 * intervalSize
        ).toFixed(2)}`,
        value: 0,
      },
      {
        name: `$${(min + 4 * intervalSize).toFixed(2)} - $${max.toFixed(2)}`,
        value: 0,
      },
    ];

    prices.forEach((price) => {
      const index = Math.min(Math.floor((price - min) / intervalSize), 4);
      categories[index].value++;
    });

    return categories;
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart width={730} height={250}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          labelLine={false}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={100}
          fill="#8884d8"
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
          animationDuration={1500}
          animationBegin={200}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} days`, name]}
          contentStyle={{
            backgroundColor: "#333",
            borderColor: "#555",
          }}
          itemStyle={{
            color: "#fff",
          }}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
export default PieChart;
