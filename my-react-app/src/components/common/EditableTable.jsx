import {useState} from "react";

export const EditableDataTable = ({ data, onDataUpdate }) => {
    const [editCell, setEditCell] = useState(null);
    const [editValue, setEditValue] = useState("");

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

    const handleDoubleClick = (rowIndex, column, value) => {
        setEditCell({ rowIndex, column });
        setEditValue(value);
    };

    const handleEdit = (e) => {
        if (e.key === 'Enter') {
            const newValue = parseFloat(editValue);
            if (!isNaN(newValue)) {
                onDataUpdate(editCell.rowIndex, editCell.column, newValue);
            }
            setEditCell(null);
        } else if (e.key === 'Escape') {
            setEditCell(null);
        }
    };

    return (
        <div className="editable-table-container">
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
                {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{new Date(row.time).toLocaleString('pl-PL')}</td>
                        {['voltage', 'power', 'energy', 'currentLED', 'currentHalogen'].map((column) => (
                            <td
                                key={column}
                                onDoubleClick={() => handleDoubleClick(rowIndex, column, row[column])}
                            >
                                {editCell?.rowIndex === rowIndex && editCell?.column === column ? (
                                    <input
                                        type="number"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onKeyDown={handleEdit}
                                        autoFocus
                                        className="cell-input"
                                        step="0.01"
                                    />
                                ) : (
                                    row[column]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};