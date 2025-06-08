import { createContext, useContext, useState } from "react";

export const StatsContext = createContext();

 function formatDateTimeLocalToString(datetimeLocalValue) {
            const date = new Date(datetimeLocalValue);
            const pad = n => n.toString().padStart(2, '0');
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}%20`+
            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        }

// Utility function to transform API data into component format
export const transformApiData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return {
    time: [],
    entry_id: [],
    voltage: [],
    power: [],
    energy: []
  };

  const transformed = {
    time: [],
    entry_id: [],
    voltage: [],
    power: [],
    energy: []
  };

  apiData.forEach(record => {
    transformed.time.push(record.created_at);
    transformed.entry_id.push(record.entry_id);
    transformed.voltage.push(parseFloat(record.field1));
    transformed.power.push(parseFloat(record.field2));
    transformed.energy.push(parseFloat(record.field3));
  });

  return transformed;
};

// Example of how the API data might look (for testing)
const demoApiData = [
  {
    created_at: "2025-06-07T10:00:00",
    entry_id: 1,
    field1: "230",
    field2: "85",
    field3: "0.12"
  },
  {
    created_at: "2025-06-07T10:05:00",
    entry_id: 2,
    field1: "231",
    field2: "90",
    field3: "0.17"
  }
  // ... more data
];

export const getDataFromApi = async (start=null, end=null) => {
  const startFormatted = formatDateTimeLocalToString(start);
  const endFormatted = formatDateTimeLocalToString(end);
  const url="http://152.70.175.119:8080/api/feeds" + (start && end ? `/range?start=${startFormatted}&end=${endFormatted}` : "");
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    else{
    const data = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch data from API:", error); 
    const data = null;
  }
  return transformApiData(data)
};

// Transform demo data
export const demoData = transformApiData(demoApiData);
export const demoVoltageData = demoData.voltage;
export const demoPowerData = demoData.power;
export const demoEnergyData = demoData.energy;

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    voltage: 230,
    power: 80,
    energy: 0.24,
  });

  return (
      <StatsContext.Provider value={{ stats, setStats }}>
        {children}
      </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);

export const filterData = (data, startDatetime, endDatetime) => {
  return data.filter((item) => {
    const itemDate = new Date(item.time);
    const start = new Date(startDatetime);
    const end = new Date(endDatetime);
    return itemDate >= start && itemDate <= end;
  });
};
