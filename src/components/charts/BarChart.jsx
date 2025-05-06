"use client";
import { useMemo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BarChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || !data["Time Series (Daily)"]) return [];

    return Object.entries(data["Time Series (Daily)"])
      .slice(0, 30)
      .reverse()
      .map(([date, values]) => ({
        date: date,
        volume: parseInt(values["5. volume"]),
      }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(date) =>
            new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }
          stroke="#aaa"
        />
        <YAxis stokr="#aaa" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            borderColor: "#555",
          }}
        />
        <Legend />
        <Bar
          dataKey="volume"
          name="Tranding Volume"
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
export default BarChart;
