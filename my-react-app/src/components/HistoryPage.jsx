import React, { useState, useEffect } from 'react';
import { getDataFromApi } from "../context/StatsContext";
import UserMenu from "./UserMenu.jsx";
import { EditableDataTable } from "./common/EditableTable.jsx";

export default function HistoryPage() {
    const [filteredData, setFilteredData] = useState(null);
    const [startDate, setStartDate] = useState("2025-06-08T10:00");
    const [endDate, setEndDate] = useState("2025-06-08T16:00");

    useEffect(() => {
        // Initial data load
        setFilteredData(getDataFromApi());
    }, []);

    const handleDateRange = (e) => {
        e.preventDefault();
        setFilteredData(getDataFromApi(startDate, endDate));
    };

    const handleDataUpdate = (rowIndex, field, value) => {
        // Implement your update logic here
        console.log(`Updating row ${rowIndex}, field ${field} with value ${value}`);
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

                    <button  className="export-button">
                        Eksportuj do CSV
                    </button>
                </section>

                <section className="numerical-data-section">
                    <h2>Dane numeryczne</h2>
                    <div className="table-wrapper">
                        {filteredData && (
                            <EditableDataTable
                                data={filteredData}
                                isEditable={true}
                                onDataUpdate={handleDataUpdate}
                            />
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
