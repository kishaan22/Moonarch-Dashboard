import { create } from "zustand";
import { fetchStockData } from "../api/fetchStockData";

export const useStore = create((set, get) => ({
  //Data State
  stockData: null,
  isLoading: false,
  error: null,
  symbole: "IBM",
  timeFrame: "daily",

  userCharts: [],
  addChart: (chartConfig) =>
    set((state) => ({
      userCharts: [...state.userCharts, chartConfig],
    })),

  //Initialize the app and fetch initial data
  initializeApp: () => {
    get().fetchData();
  },

  //Fetch stock data
  fetchData: async () => {
    const { symbole, timeFrame } = get();
    set({ isLoading: true, error: null });

    try {
      const data = await fetchStockData(symbole, timeFrame);
      set({ stockData: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
