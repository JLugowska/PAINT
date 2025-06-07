import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useStats, filterData, demoPowerData, demoEnergyData, demoVoltageData, demoCurrentData } from "../context/StatsContext";
import {useEffect, useState} from "react";
import "./css/Dashboard.css";
import AccordionChart from "../components/AccordionChart";
import LoginButton from "./LoginButton.jsx";
import UserMenu from "./UserMenu.jsx";

export default function Dashboard() {
//  const { logout, user } = useUser();
  const navigate = useNavigate();
  const { stats, setStats } = useStats();
  const { user } = useUser();
  const [filteredData, setFilteredData] = useState({
    voltage: demoVoltageData,
    power: demoPowerData,
    energy: demoEnergyData,
    current: demoCurrentData
  });

  const [startDate, setStartDate] = useState("2025-06-07T12:00");
  const [endDate, setEndDate] = useState("2025-06-07T13:00");


//dark mode
  useEffect(() => {
  if (stats.power > 90) { //do zmiany jak ustalimy próg
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}, [stats.power]);


//funkcja przygotowana dka backend(trzeba uzupełnić api do odświeżania)
//   async function fetchLatestSample() {
//   try {
//     const response = await fetch("/api/measurements/latest", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (!response.ok) throw new Error("Błąd pobierania danych");

//     const data = await response.json();
//     return {
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       voltage: data.voltage,
//       currentHalogen: data.currentHalogen,
//       currentLED: data.currentLED,
//       power: data.power,
//       energy: data.energy,
//     };
//   } catch (error) {
//     console.error("Błąd pobierania danych z backendu:", error);
//     return null;
//   }
// }

//!!!funkcja przygotowana dka backend(trzeba uzupełnić api do odświeżania)
// useEffect(() => {
//   const interval = setInterval(async () => {
//     const newSample = await fetchLatestSample();

//     if (!newSample) return;

//     setStats({
//       voltage: newSample.voltage,
//       currentHalogen: newSample.currentHalogen,
//       currentLED: newSample.currentLED,
//       power: newSample.power,
//       energy: newSample.energy,
//     });

//     setVoltageData(prev => [
//       ...prev.slice(-49),
//       { time: newSample.time, voltage: newSample.voltage },
//     ]);

//     // analogicznie: powerData, energyData...
//   }, 60000); // co minutę

//   return () => clearInterval(interval);
// }, []);

  const handleDaterange = (e) => {
    e.preventDefault();

    setFilteredData({
      voltage: filterData(demoVoltageData, startDate, endDate),
      power: filterData(demoPowerData, startDate, endDate),
      energy: filterData(demoEnergyData, startDate, endDate),
      current: filterData(demoCurrentData, startDate, endDate)
    });
  };


  return (
    <div className="dashboard-container">
      <UserMenu />
      <header className="dashboard-header">
        <h1 className="dasboard-title">Witaj, {user?.email}!</h1>
      </header>
      <div className="dashboard-content">
        <section className="stats-section">
          <h2>Wybierz zakres czasowy danych</h2>

          <form onSubmit={handleDaterange} className="date-form">
            <div className="form-group">
              <label>Data początku:</label>
              <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Data końca:</label>
              <input
                  type="datetime-local"
                  value={endDate}
                  i
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="form-input"
              />
            </div>

            <button type="submit" className="login-button">
              Zatwierdź
            </button>
          </form>
        </section>

        <section className="charts-section">
          <h2>Wykresy (demo)</h2>

          {/* --- Napięcie --- */}
          <AccordionChart
            title="Wykres napięcia [V]"
            id="voltage"
            data={filteredData.voltage}
            dataKey="voltage"
            color="#FF00FF"
          />

          {/* --- Moc --- */}
          <AccordionChart
            title="Wykres mocy [W]"
            id="power"
            data={filteredData.power}
            dataKey="power"
            color="#ff0000"
          />

          {/* --- Energia --- */}
          <AccordionChart
            title="Wykres energii [Wh]"
            id="energy"
            data={filteredData.energy}
            dataKey="energy"
            color="#ffb600"
          />

          {/* --- Natężenie LED/Halogen --- */}
          <AccordionChart
            title="Natężenie prądu: LED vs Halogeny [A]"
            id="current"
            data={filteredData.current}
            multipleLines={[
              { dataKey: "led", color: "#00FFFF", label: "LED" },
              { dataKey: "halogen", color: "#00ff00", label: "Halogeny" },
            ]}
          />

        </section>
      </div>
    </div>
  );
}
