import { createContext, useContext, useState } from "react";

export const StatsContext = createContext();

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
