"use client";
import { useMemo } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AreaChart = ({ data }) => {
  console.log(data, "AreaChart");
  const chartData = useMemo(() => {
    if (!data || !data["Time Series (Daily)"]) return [];

    return Object.entries(data["Time Series (Daily)"])
      .slice(0, 30)
      .reverse()
      .map(([date, values]) => ({
        date: date,
        uv: parseFloat(values["2. high"]),
        pv: parseFloat(values["3. low"]),
      }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <YAxis domain={["auto", "auto"]} stroke="#aaa" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            borderColor: "#555",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="uv"
          name="High Price"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
          animationDuration={1500}
        />
        <Area
          type="monotone"
          dataKey="pv"
          name="Low Price"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
          animationDuration={1500}
          animationBegin={300}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChart;
