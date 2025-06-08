import React, { useState } from 'react';
import '../css/EditableTable.css';

export function EditableDataTable({ data, onDataUpdate, isEditable = false }) {
    const [editCell, setEditCell] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Format data for table display
    const formatTableData = () => {
        if (!data || !data.time) return [];

        return data.time.map((time, index) => ({
            time,
            voltage: data.voltage[index]?.toFixed(2) || '-',
            power: data.power[index]?.toFixed(2) || '-',
            energy: data.energy[index]?.toFixed(2) || '-'
        }));
    };

    const handleCellClick = (rowIndex, column) => {
        if (!isEditable) return;

        setEditCell({ rowIndex, column });
        const value = data[column][rowIndex];
        setEditValue(value?.toString() || '');
    };

    const handleCellUpdate = (rowIndex, column) => {
        const numericValue = parseFloat(editValue);
        if (isNaN(numericValue)) {
            setEditCell(null);
            setEditValue('');
            return;
        }

        onDataUpdate(rowIndex, column, numericValue);
        setEditCell(null);
        setEditValue('');
    };

    const handleKeyPress = (e, rowIndex, column) => {
        if (e.key === 'Enter') {
            handleCellUpdate(rowIndex, column);
        } else if (e.key === 'Escape') {
            setEditCell(null);
            setEditValue('');
        }
    };

    const tableData = formatTableData();

    return (
        <div className="editable-table-container">
            <table className="editable-table">
                <thead>
                <tr>
                    <th>Czas</th>
                    <th>Napięcie [V]</th>
                    <th>Moc [W]</th>
                    <th>Energia [Wh]</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={row.time}>
                        <td>{new Date(row.time).toLocaleString('pl-PL')}</td>
                        {['voltage', 'power', 'energy'].map((column) => (
                            <td
                                key={column}
                                onClick={() => handleCellClick(rowIndex, column)}
                                className={isEditable ? 'editable' : ''}
                            >
                                {editCell?.rowIndex === rowIndex && editCell?.column === column ? (
                                    <input
                                        type="number"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => handleCellUpdate(rowIndex, column)}
                                        onKeyDown={(e) => handleKeyPress(e, rowIndex, column)}
                                        autoFocus
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
}
