import {data, useNavigate} from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
    demoCurrentData,
    demoEnergyData,
    demoPowerData,
    demoVoltageData,
    filterData,
    useStats
} from "../context/StatsContext";
import { useState, useEffect } from "react";
import LoginButton from "./LoginButton.jsx";
import "./css/HistoryPage.css"
import UserMenu from "./UserMenu.jsx";
import {EditableDataTable} from "./common/EditableTable.jsx";


function DataTable({ data }) {
    // Combine and format the data into a single array of records
    const formatTableData = () => {
        if (!data) return [];

        return data.voltage.map((voltageEntry, index) => {
            return {
                time: voltageEntry.time,
                voltage: voltageEntry.voltage.toFixed(2),
                power: data.power[index]?.power.toFixed(2) || '-',
                energy: data.energy[index]?.energy.toFixed(2) || '-',
                currentLED: data.current[index]?.led.toFixed(2) || '-',
                currentHalogen: data.current[index]?.halogen.toFixed(2) || '-'
            };
        });
    };

    const tableData = formatTableData();

    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                <tr>
                    <th>Czas</th>
                    <th>Napięcie [V]</th>
                    <th>Moc [W]</th>
                    <th>Energia [Wh]</th>
                    <th>Prąd LED [A]</th>
                    <th>Prąd Halogeny [A]</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row, index) => (
                    <tr key={index}>
                        <td>{new Date(row.time).toLocaleString('pl-PL')}</td>
                        <td>{row.voltage}</td>
                        <td>{row.power}</td>
                        <td>{row.energy}</td>
                        <td>{row.currentLED}</td>
                        <td>{row.currentHalogen}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


export default function HistoryPage() {
    const { stats, setStats } = useStats();
    const [filteredData, setFilteredData] = useState({
        voltage: demoVoltageData,
        power: demoPowerData,
        energy: demoEnergyData,
        current: demoCurrentData
    });

    const [startDate, setStartDate] = useState("2025-06-07T12:00");
    const [endDate, setEndDate] = useState("2025-06-07T13:00");

    const handleDateRange = (e) => {
        e.preventDefault();
        setFilteredData({
            voltage: filterData(demoVoltageData, startDate, endDate),
            power: filterData(demoPowerData, startDate, endDate),
            energy: filterData(demoEnergyData, startDate, endDate),
            current: filterData(demoCurrentData, startDate, endDate)
        });
    };

    //dark mode
    useEffect(() => {
    if (stats.power > 90) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [stats.power]);

    // Eksport danych do CSV
    const handleExport = () => {
        const csv = [
            ["Godzina", "Napięcie [V]", "Natężenie [A]", "Moc [W]", "Energia [Wh]"],
            ...data.map(d => [d.time, d.voltage, d.current, d.power, d.energy]),
        ]
            .map(row => row.join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "historia_pomiarow.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="dashboard-container">
            <UserMenu />
            <header className="dashboard-header">
                <h1>Historia pomiarów</h1>
            </header>
            <div className="dashboard-content">
                <section className="stats-section">
                    <h2>Wybierz zakres czasowy danych</h2>

                    <form onSubmit={handleDateRange} className="date-form">
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

                    <button onClick={handleExport} className="export-button">
                        Eksportuj do CSV
                    </button>
                </section>

                <section className="numerical-data-section">
                    <h2>Dane numeryczne</h2>
                    <div className="table-wrapper">
                        <EditableDataTable
                            data={filteredData}
                            onDataUpdate={() => {}} //TODO implement update logic for user
                        />
                    </div>
                </section>
            </div>
        </div>
    );


}
