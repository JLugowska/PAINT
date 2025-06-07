import { createContext, useContext, useState } from "react";

export const StatsContext = createContext();

export const demoVoltageData = [
  { time: "2025-06-07T10:00", voltage: 60 },
  { time: "2025-06-07T10:05", voltage: 231 },
  { time: "2025-06-07T10:10", voltage: 230 },
  { time: "2025-06-07T10:15", voltage: 150 },
  { time: "2025-06-07T10:20", voltage: 230 },
  { time: "2025-06-07T10:25", voltage: 232 },
  { time: "2025-06-07T10:30", voltage: 229 },
  { time: "2025-06-07T10:35", voltage: 231 },
  { time: "2025-06-07T10:40", voltage: 228 },
  { time: "2025-06-07T10:45", voltage: 230 },
  { time: "2025-06-07T10:50", voltage: 233 },
  { time: "2025-06-07T10:55", voltage: 231 },
  { time: "2025-06-07T11:00", voltage: 230 },
  { time: "2025-06-07T11:05", voltage: 229 },
  { time: "2025-06-07T11:10", voltage: 231 },
  { time: "2025-06-07T11:15", voltage: 232 },
  { time: "2025-06-07T11:20", voltage: 230 },
  { time: "2025-06-07T11:25", voltage: 229 },
  { time: "2025-06-07T11:30", voltage: 231 },
  { time: "2025-06-07T11:35", voltage: 232 },
  { time: "2025-06-07T11:40", voltage: 230 },
  { time: "2025-06-07T11:45", voltage: 229 },
  { time: "2025-06-07T11:50", voltage: 231 },
  { time: "2025-06-07T11:55", voltage: 230 },
  { time: "2025-06-07T12:00", voltage: 232 },
  { time: "2025-06-07T12:05", voltage: 231 },
  { time: "2025-06-07T12:10", voltage: 229 },
  { time: "2025-06-07T12:15", voltage: 230 },
  { time: "2025-06-07T12:20", voltage: 231 },
  { time: "2025-06-07T12:25", voltage: 232 },
  { time: "2025-06-07T12:30", voltage: 230 },
  { time: "2025-06-07T12:35", voltage: 229 },
  { time: "2025-06-07T12:40", voltage: 231 },
  { time: "2025-06-07T12:45", voltage: 230 },
  { time: "2025-06-07T12:50", voltage: 232 },
  { time: "2025-06-07T12:55", voltage: 231 },
  { time: "2025-06-07T13:00", voltage: 230 }
];

export const demoPowerData = [
  { time: "2025-06-07T10:00", power: 85 },
  { time: "2025-06-07T10:05", power: 90 },
  { time: "2025-06-07T10:10", power: 92 },
  { time: "2025-06-07T10:15", power: 95 },
  { time: "2025-06-07T10:20", power: 94 },
  { time: "2025-06-07T10:25", power: 91 },
  { time: "2025-06-07T10:30", power: 93 },
  { time: "2025-06-07T10:35", power: 92 },
  { time: "2025-06-07T10:40", power: 90 },
  { time: "2025-06-07T10:45", power: 89 },
  { time: "2025-06-07T10:50", power: 91 },
  { time: "2025-06-07T10:55", power: 93 },
  { time: "2025-06-07T11:00", power: 94 },
  { time: "2025-06-07T11:05", power: 92 },
  { time: "2025-06-07T11:10", power: 91 },
  { time: "2025-06-07T11:15", power: 89 },
  { time: "2025-06-07T11:20", power: 88 },
  { time: "2025-06-07T11:25", power: 90 },
  { time: "2025-06-07T11:30", power: 92 },
  { time: "2025-06-07T11:35", power: 93 },
  { time: "2025-06-07T11:40", power: 91 },
  { time: "2025-06-07T11:45", power: 90 },
  { time: "2025-06-07T11:50", power: 89 },
  { time: "2025-06-07T11:55", power: 91 },
  { time: "2025-06-07T12:00", power: 93 },
  { time: "2025-06-07T12:05", power: 94 },
  { time: "2025-06-07T12:10", power: 92 },
  { time: "2025-06-07T12:15", power: 90 },
  { time: "2025-06-07T12:20", power: 89 },
  { time: "2025-06-07T12:25", power: 91 },
  { time: "2025-06-07T12:30", power: 93 },
  { time: "2025-06-07T12:35", power: 92 },
  { time: "2025-06-07T12:40", power: 90 },
  { time: "2025-06-07T12:45", power: 89 },
  { time: "2025-06-07T12:50", power: 91 },
  { time: "2025-06-07T12:55", power: 92 },
  { time: "2025-06-07T13:00", power: 93 }
];

export const demoEnergyData = [
  { time: "2025-06-07T10:00", energy: 0.12 },
  { time: "2025-06-07T10:05", energy: 0.17 },
  { time: "2025-06-07T10:10", energy: 0.21 },
  { time: "2025-06-07T10:15", energy: 0.27 },
  { time: "2025-06-07T10:20", energy: 0.34 },
  { time: "2025-06-07T10:25", energy: 0.42 },
  { time: "2025-06-07T10:30", energy: 0.49 },
  { time: "2025-06-07T10:35", energy: 0.56 },
  { time: "2025-06-07T10:40", energy: 0.64 },
  { time: "2025-06-07T10:45", energy: 0.71 },
  { time: "2025-06-07T10:50", energy: 0.79 },
  { time: "2025-06-07T10:55", energy: 0.86 },
  { time: "2025-06-07T11:00", energy: 0.94 },
  { time: "2025-06-07T11:05", energy: 1.02 },
  { time: "2025-06-07T11:10", energy: 1.10 },
  { time: "2025-06-07T11:15", energy: 1.18 },
  { time: "2025-06-07T11:20", energy: 1.26 },
  { time: "2025-06-07T11:25", energy: 1.34 },
  { time: "2025-06-07T11:30", energy: 1.42 },
  { time: "2025-06-07T11:35", energy: 1.50 },
  { time: "2025-06-07T11:40", energy: 1.58 },
  { time: "2025-06-07T11:45", energy: 1.66 },
  { time: "2025-06-07T11:50", energy: 1.74 },
  { time: "2025-06-07T11:55", energy: 1.82 },
  { time: "2025-06-07T12:00", energy: 1.90 },
  { time: "2025-06-07T12:05", energy: 1.98 },
  { time: "2025-06-07T12:10", energy: 2.06 },
  { time: "2025-06-07T12:15", energy: 2.14 },
  { time: "2025-06-07T12:20", energy: 2.22 },
  { time: "2025-06-07T12:25", energy: 2.30 },
  { time: "2025-06-07T12:30", energy: 2.38 },
  { time: "2025-06-07T12:35", energy: 2.46 },
  { time: "2025-06-07T12:40", energy: 2.54 },
  { time: "2025-06-07T12:45", energy: 2.62 },
  { time: "2025-06-07T12:50", energy: 2.70 },
  { time: "2025-06-07T12:55", energy: 2.78 },
  { time: "2025-06-07T13:00", energy: 2.86 }
];

export const demoCurrentData = [
  { time: "2025-06-07T10:00", led: 0.12, halogen: 0.34 },
  { time: "2025-06-07T10:05", led: 0.13, halogen: 0.35 },
  { time: "2025-06-07T10:10", led: 0.14, halogen: 0.36 },
  { time: "2025-06-07T10:15", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T10:20", led: 0.15, halogen: 0.39 },
  { time: "2025-06-07T10:25", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T10:30", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T10:35", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T10:40", led: 0.15, halogen: 0.39 },
  { time: "2025-06-07T10:45", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T10:50", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T10:55", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T11:00", led: 0.15, halogen: 0.39 },
  { time: "2025-06-07T11:05", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T11:10", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T11:15", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T11:20", led: 0.15, halogen: 0.39 },
  { time: "2025-06-07T11:25", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T11:30", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T11:35", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T11:40", led: 0.15, halogen: 0.39 },
  { time: "2025-06-07T11:45", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T11:50", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T11:55", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T12:00", led: 0.15, halogen: 0.39 },
  { time: "2025-06-07T12:05", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T12:10", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T12:15", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T12:20", led: 0.15, halogen: 0.39 },
  { time: "2025-06-07T12:25", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T12:30", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T12:35", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T12:40", led: 0.15, halogen: 0.39 },
  { time: "2025-06-07T12:45", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T12:50", led: 0.13, halogen: 0.37 },
  { time: "2025-06-07T12:55", led: 0.14, halogen: 0.38 },
  { time: "2025-06-07T13:00", led: 0.15, halogen: 0.39 }
];
export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    voltage: 230,
    currentHalogen: 0.4,
    currentLED: 0.1,
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
  });}

