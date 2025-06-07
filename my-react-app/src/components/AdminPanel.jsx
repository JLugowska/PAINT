import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import AdminMenu from "./AdminMenu";
import AccordionChart from "./AccordionChart";
import "./css/AdminPanel.css";
import {
    demoCurrentData,
    demoEnergyData,
    demoPowerData,
    demoVoltageData,
    filterData
} from "../context/StatsContext";
import Modal from "./Modal.jsx";
import {data} from "react-router-dom";
import {EditableDataTable} from "./common/EditableTable.jsx";



const FilteringBox = ({ startDate, setStartDate, endDate, setEndDate, onFilter, onExport }) => (
    <div className="filtering-box">
        <h2>Filtrowanie danych</h2>
        <form onSubmit={onFilter} className="date-form">
            <div className="date-inputs">
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
            </div>
            <div className="filter-actions">
                <button type="submit" className="filter-button">
                    Filtruj dane
                </button>
                {onExport && (
                    <button type="button" onClick={onExport} className="export-button">
                        Eksportuj do CSV
                    </button>
                )}
            </div>
        </form>
    </div>
);

export default function AdminPanel() {
    const { user } = useUser();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [startDate, setStartDate] = useState("2025-06-07T12:00");
    const [endDate, setEndDate] = useState("2025-06-07T13:00");
    const [filteredData, setFilteredData] = useState({
        voltage: demoVoltageData,
        power: demoPowerData,
        energy: demoEnergyData,
        current: demoCurrentData
    });

    const [activeTab, setActiveTab] = useState('users');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleEditClick = (user) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const handleUserUpdate = async (userData) => {
        //TODO Add actual update logic
        setUsers(users.map(user =>
            user.id === userData.id ? { ...user, ...userData } : user
        ));
        setIsEditModalOpen(false);
        setEditingUser(null);
    };

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

    const handleDataUpdate = (rowIndex, column, newValue) => {
        //TODO Add actual update logic for table data (admin)
        setFilteredData(prevData => {
            const newData = { ...prevData };
            switch (column) {
                case 'voltage':
                    newData.voltage[rowIndex].voltage = newValue;
                    break;
                case 'power':
                    newData.power[rowIndex].power = newValue;
                    break;
                case 'energy':
                    newData.energy[rowIndex].energy = newValue;
                    break;
                case 'currentLED':
                    newData.current[rowIndex].led = newValue;
                    break;
                case 'currentHalogen':
                    newData.current[rowIndex].halogen = newValue;
                    break;
            }
            return newData;
        });
    };



    const handleDeleteUser = async (userId) => {
        if (window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
            //TODO Add delete user logic
            setUsers(users.filter(user => user.id !== userId));
        }
    };



    // Fetch users (mock data for now)
    useEffect(() => {
        const mockUsers = [
            { id: 1, email: "user1@example.com", name: "User", surname: "One", role: "user" },
            { id: 2, email: "user2@example.com", name: "User", surname: "Two", role: "user" },
            { id: 3, email: "admin@example.com", name: "Admin", surname: "User", role: "admin" }
        ];
        setUsers(mockUsers);
    }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Hasła nie są takie same!");
            return;
        }
        //TODO Add password change logic here
        alert("Hasło zostało zmienione!");
        setNewPassword("");
        setConfirmPassword("");
        setIsPasswordModalOpen(false);
    };


    const handleDateRange = (e) => {
        e.preventDefault();
        setFilteredData({
            voltage: filterData(demoVoltageData, startDate, endDate),
            power: filterData(demoPowerData, startDate, endDate),
            energy: filterData(demoEnergyData, startDate, endDate),
            current: filterData(demoCurrentData, startDate, endDate)
        });
    };

    const renderUsersTab = () => (
        <div className="tab-content">
            <section className="users-section">
                <h2>Zarządzanie użytkownikami</h2>
                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Rola</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.role === 'admin' ? 'Administrator' : 'Użytkownik'}</td>
                                <td className="action-buttons">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="edit-button"
                                    >
                                        Edytuj
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="delete-button"
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );


    const renderChartsTab = () => (
        <div className="tab-content">
            <FilteringBox
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onFilter={handleDateRange}
            />

            <section className="charts-container">
                <div className="filtering-section">
                    <h2>Wykresy pomiarów</h2>
                </div>
                <div className="charts-grid">
                    <AccordionChart
                        title="Wykres napięcia [V]"
                        data={filteredData.voltage}
                        dataKey="voltage"
                        color="#FF00FF"
                    />
                    <AccordionChart
                        title="Wykres mocy [W]"
                        data={filteredData.power}
                        dataKey="power"
                        color="#ff0000"
                    />
                    <AccordionChart
                        title="Wykres energii [Wh]"
                        data={filteredData.energy}
                        dataKey="energy"
                        color="#ffb600"
                    />
                    <AccordionChart
                        title="Natężenie prądu: LED vs Halogeny [A]"
                        data={filteredData.current}
                        multipleLines={[
                            { dataKey: "led", color: "#00FFFF", label: "LED" },
                            { dataKey: "halogen", color: "#00ff00", label: "Halogeny" },
                        ]}
                    />
                </div>
            </section>
        </div>
    );


    const renderDataTab = () => (
        <div className="tab-content">
            <FilteringBox
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onFilter={handleDateRange}
                onExport={handleExport}

            />

            <section className="numerical-data-section">
                <h2>Dane numeryczne</h2>
                <div className="table-wrapper">
                    <EditableDataTable
                        data={filteredData}
                        onDataUpdate={handleDataUpdate}
                    />
                </div>
            </section>
        </div>
    );


    return (
        <div className="dashboard-container">
            <AdminMenu />
            <header className="dashboard-header">
                <h1>Panel administracyjny</h1>
            </header>

            <div className="admin-tabs">
                <div className="tab-buttons">
                    <button
                        className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Użytkownicy
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'charts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('charts')}
                    >
                        Wykresy
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'data' ? 'active' : ''}`}
                        onClick={() => setActiveTab('data')}
                    >
                        Dane
                    </button>
                </div>

                {activeTab === 'users' && renderUsersTab()}
                {activeTab === 'charts' && renderChartsTab()}
                {activeTab === 'data' && renderDataTab()}
            </div>


            <Modal
                    isOpen={isPasswordModalOpen}
                    onClose={() => {
                        setIsPasswordModalOpen(false);
                        setNewPassword("");
                        setConfirmPassword("");
                    }}
                >
                    <div className="edit-password-form">
                        <h2>Zmiana hasła administratora</h2>
                        <form onSubmit={handlePasswordChange} className="admin-form">
                            <div className="form-group">
                                <label>Nowe hasło:</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="form-input"
                                    minLength="6"
                                />
                            </div>
                            <div className="form-group">
                                <label>Potwierdź hasło:</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="form-input"
                                    minLength="6"
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="save-button">
                                    Zmień hasło
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsPasswordModalOpen(false);
                                        setNewPassword("");
                                        setConfirmPassword("");
                                    }}
                                    className="cancel-button"
                                >
                                    Anuluj
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>



                {/* Edit User Modal */}
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setEditingUser(null);
                    }}
                >
                    {editingUser && (
                        <div className="edit-user-form">
                            <h2>Edycja użytkownika</h2>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleUserUpdate({
                                    id: editingUser.id,
                                    email: formData.get("email"),
                                    name: formData.get("name"),
                                    surname: formData.get("surname"),
                                    role: formData.get("role")
                                });
                            }}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={editingUser.email}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Imię:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={editingUser.name}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nazwisko:</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        defaultValue={editingUser.surname}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rola:</label>
                                    <select
                                        name="role"
                                        defaultValue={editingUser.role}
                                        className="form-input"
                                        required
                                    >
                                        <option value="user">Użytkownik</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit" className="save-button">
                                        Zapisz zmiany
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="cancel-button"
                                    >
                                        Anuluj
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </Modal>
        </div>
    );
}