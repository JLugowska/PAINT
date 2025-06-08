import { useUser } from "../context/UserContext";
import { useStats, filterData,demoData} from "../context/StatsContext";
import { useState} from "react";
import "./css/Dashboard.css";
import AccordionChart from "../components/AccordionChart";
import UserMenu from "./UserMenu.jsx";

export default function Dashboard() {
  const { user } = useUser();

  // Initialize with transformed demo data
  const [filteredData, setFilteredData] = useState({
    voltage: demoData.time.map((time, index) => ({
      time,
      voltage: demoData.voltage[index]
    })),
    power: demoData.time.map((time, index) => ({
      time,
      power: demoData.power[index]
    })),
    energy: demoData.time.map((time, index) => ({
      time,
      energy: demoData.energy[index]
    }))
  });


  const [startDate, setStartDate] = useState("2025-06-07T12:00");
  const [endDate, setEndDate] = useState("2025-06-07T13:00");

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
      voltage: filteredData.voltage.filter(item => {
        const itemDate = new Date(item.time);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      }),
      power: filteredData.power.filter(item => {
        const itemDate = new Date(item.time);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      }),
      energy: filteredData.energy.filter(item => {
        const itemDate = new Date(item.time);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      })
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
          <h2>Wykresy</h2>

          <AccordionChart
              title="Wykres napięcia [V]"
              id="voltage"
              data={filteredData.voltage}
              dataKey="voltage"
              color="#FF00FF"
          />

          <AccordionChart
              title="Wykres mocy [W]"
              id="power"
              data={filteredData.power}
              dataKey="power"
              color="#ff0000"
          />

          <AccordionChart
              title="Wykres energii [Wh]"
              id="energy"
              data={filteredData.energy}
              dataKey="energy"
              color="#ffb600"
          />
        </section>

      </div>
    </div>
  );
}
