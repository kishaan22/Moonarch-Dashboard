"use client";

import dynamic from "next/dynamic";
import { memo, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useStore } from "../store/store";

const LineChart = dynamic(() => import("./charts/LineChart"), {
  ssr: false,
});
const BarChart = dynamic(() => import("./charts/BarChart"), {
  ssr: false,
});
const AreaChart = dynamic(() => import("./charts/AreaChart"), {
  ssr: false,
});
const PieChart = dynamic(() => import("./charts/PieChart"), {
  ssr: false,
});

const ChartContainer = memo(({ title, children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    className={"p-4 rounded-lg shadow-lg bg-gray-800"}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </motion.div>
));

ChartContainer.displayName = "ChartContainer";

const DashBoadrd = () => {
  const [showModal, setShowModal] = useState(false);
  const stockData = useStore((state) => state.stockData);
  const useCharts = useStore((state) => state.useCharts);
  const isLoading = useStore((state) => state.isLoading);
  const fetchData = useStore((state) => state.fetchData);

  console.log("data", stockData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const container = useMemo(() => {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };
  }, []);

  const handleRefresh = useCallback(() => {
    // Logic to refresh the charts
    fetchData();
  }, [fetchData]);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  // Logic to open the modal

  const defaultCharts = [
    { id: 1, type: "line", title: "Line Chart" },
    { id: 2, type: "bar", title: "Bar Chart" },
    { id: 3, type: "area", title: "Area Chart" },
    { id: 4, type: "pie", title: "Pie Chart" },
  ];

  const renderChart = (type, data) => {
    console.log("check", type, data);
    switch (type) {
      case "line":
        return <LineChart data={data} />;
      case "bar":
        return <BarChart data={data} />;
      case "area":
        return <AreaChart data={data} />;
      case "pie":
        return <PieChart data={data} />;
      default:
        return <LineChart data={data} />;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-rpw justify-between items-center mb-2 gap-4">
        <div>
          <h1 className="text-2xl font-bold" tabIndex={0}>
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text=gray-400">
            Welcome to the dashboard!
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center bg-blue-500 hover:bg-blue-700 text-white"
            aria-label="Refresh"
          >
            <RefreshIcon className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={openModal}
            className="px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center bg-purple-600 hover:bg-purple-700 text-white"
            aria-label="Add Chart"
          >
            <AddIcon />
            Add Chart
          </button>
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          key="chart-grid"
          variants={container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {defaultCharts.map((chart) => (
            <ChartContainer key={chart.id} title={chart.title}>
              {console.log("AM I HERE??")}
              {renderChart(chart.type, stockData)}
            </ChartContainer>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default DashBoadrd;
