import React, { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext";
import { api } from '../services/api.jsx';
import "./css/Dashboard.css";
import AccordionChart from "../components/AccordionChart";
import UserMenu from "./UserMenu.jsx";
import { transformApiData } from "../context/StatsContext";

export default function Dashboard() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState("2025-06-08T10:00");
  const [endDate, setEndDate] = useState("2025-06-08T16:00");

  const loadData = async (start, end) => {
    try {
      setLoading(true);
      const response = await api.getFeedsInRange(start, end);

      console.log('API Response:', response); // Debug log

      // If response is null, use empty array
      const dataArray = response || [];

      // Transform the data
      const transformed = transformApiData(dataArray);
      console.log('Transformed data:', transformed); // Debug log

      // Format data for charts
      const chartFormatted = {
        voltage: transformed.time.map((time, index) => ({
          time,
          voltage: transformed.voltage[index]
        })),
        power: transformed.time.map((time, index) => ({
          time,
          power: transformed.power[index]
        })),
        energy: transformed.time.map((time, index) => ({
          time,
          energy: transformed.energy[index]
        }))
      };

      setChartData(chartFormatted);
      setError(null);
    } catch (err) {
      console.error('Full error:', err); // Debug log
      setError('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load with empty state check
  useEffect(() => {
    if (startDate && endDate) {
      loadData(startDate, endDate);
    }
  }, []); // Empty dependency array for initial load

  const handleDateRange = async (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      await loadData(startDate, endDate);
    }
  };

  return (
      <div className="dashboard-container">
        <UserMenu />
        <header className="dashboard-header">
          <h1 className="dashboard-title">Witaj, {user?.email}!</h1>
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
          </section>

          <section className="charts-section">
            <h2>Wykresy</h2>
            {error && <div className="error-message">{error}</div>}
            {loading && <div>Loading...</div>}
            {!loading && !error && chartData && (
                <>
                  <iframe
                      title="Voltage Chart"
                      width="100%"
                      height="400"
                      style={{ border: "1px solid #cccccc", marginBottom: "20px" }}
                      src={api.getChartUrl({
                        title: "Wykres%20napiecia",
                        field: "1",
                        color: "FF00FF",
                        start: startDate,
                        end: endDate
                      })}
                  />
                  <iframe
                      title="Power Chart"
                      width="100%"
                      height="400"
                      style={{ border: "1px solid #cccccc", marginBottom: "20px" }}
                      src={api.getChartUrl({
                        title: "Wykres%20mocy",
                        field: "2",
                        color: "ff0000",
                        start: startDate,
                        end: endDate
                      })}
                  />
                  <iframe
                      title="Energy Chart"
                      width="100%"
                      height="400"
                      style={{ border: "1px solid #cccccc" }}
                      src={api.getChartUrl({
                        title: "Wykres%20energii",
                        field: "3",
                        color: "ffb600",
                        start: startDate,
                        end: endDate
                      })}
                  />
                </>
            )}
          </section>
        </div>
      </div>
  );
}