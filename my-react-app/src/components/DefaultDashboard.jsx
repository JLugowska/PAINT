import { useNavigate } from "react-router-dom";
import { useStats, demoVoltageData, demoEnergyData, demoPowerData } from "../context/StatsContext";
import { useEffect } from "react";
import "./css/Dashboard.css";
import AccordionChart from "../components/AccordionChart";
import LoginButton from "./LoginButton.jsx";

export default function DefaultDashboard() {

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

    return (
        <div className="dashboard-container">
            <LoginButton />
            <header className="dashboard-header">
                <h1 className="dasboard-title">Monitoring zużycia energii</h1>
            </header>
            <div className="dashboard-content">

                <section className="charts-section">
                    <h2>Wykresy (demo)</h2>
                    <AccordionChart
                        title="Wykres napięcia [V]"
                        data={demoVoltageData.slice(-12)}
                        dataKey="voltage"
                        color="#FF00FF"
                    />

                    <AccordionChart
                        title="Wykres mocy [W]"
                        data={demoPowerData.slice(-12)}
                        dataKey="power"
                        color="#ff0000"
                    />

                    <AccordionChart
                        title="Wykres energii [Wh]"
                        data={demoEnergyData.slice(-12)}
                        dataKey="energy"
                        color="#ffb600"
                    />


                </section>
            </div>
        </div>
    );
}
