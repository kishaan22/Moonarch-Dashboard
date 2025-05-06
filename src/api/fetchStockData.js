import axios from "axios";
import { sampleStockData } from "./sampleData";

export const fetchStockData = async (symbol = "IBM", timeFrame = "daily") => {
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;

  const functionMap = {
    daily: "TIME_SERIES_DAILY",
    weekly: "TIME_SERIES_WEEKLY",
    monthly: "TIME_SERIES_MONTHLY",
  };

  const functionName = functionMap[timeFrame];

  try {
    //JUST FOR TESTING
    return sampleStockData;

    //REAL API DATA
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: functionName,
        symbole: symbol,
        apiKey: apiKey,
        outputsize: "compact",
      },
    });

    const data = response.data;

    if (data["Error Message"]) {
      throw new Error(data["Error Message"]);
    }

    //Check if we have actual data
    if (
      !data["Time Series(Daily)"] &&
      !data["Weekly Time Series"] &&
      !data["Monthly Time Series"]
    ) {
      if (data.Note && data.Note.includes("API call frequency")) {
        throw new Error("API rate limit exceeded.");
      }
      throw new Error("No stack data availaibal for the selected symbol");
    }

    return data;
  } catch (error) {
    console.log("Error:", error);
    //Returm sample data as fallback
    return sampleStockData;
  }
};
