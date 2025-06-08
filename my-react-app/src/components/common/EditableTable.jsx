import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.jsx';
import '../css/EditableTable.css';

export function EditableDataTable({ startDate, endDate, onDataUpdate, isEditable = false }) {
    const [editCell, setEditCell] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                let data;
                if (startDate && endDate) {
                    data = await api.getFeedsInRange(startDate, endDate);
                } else {
                    data = await api.getFeeds();
                }
                setTableData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error loading data:', error);
                setError('Failed to load data');
                setTableData([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [startDate, endDate]);

    const handleCellUpdate = async (rowIndex, field) => {
        const newValue = editValue;
        if (!newValue) {
            setEditCell(null);
            setEditValue('');
            return;
        }

        try {
            const updatedFeed = {
                ...tableData[rowIndex],
                [field]: newValue
            };

            await api.updateFeed(updatedFeed);
            await api.pushEdits(); // Push changes to ThingSpeak

            // Update local state
            setTableData(prevData => {
                const newData = [...prevData];
                newData[rowIndex] = updatedFeed;
                return newData;
            });

            onDataUpdate?.(rowIndex, field, newValue);
        } catch (error) {
            console.error('Error updating data:', error);
            // You might want to show an error message to the user
        }

        setEditCell(null);
        setEditValue('');
    };


    const handleCellClick = (rowIndex, column) => {
        if (!isEditable) return;

        setEditCell({ rowIndex, column });
        const value = tableData[rowIndex][column];
        setEditValue(value?.toString() || '');
    };

    const handleKeyPress = (e, rowIndex, column) => {
        if (e.key === 'Enter') {
            handleCellUpdate(rowIndex, column);
        } else if (e.key === 'Escape') {
            setEditCell(null);
            setEditValue('');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tableData || tableData.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="editable-table-container">
            <table className="editable-table">
                <thead>
                <tr>
                    <th>Time</th>
                    <th>Entry ID</th>
                    <th>Field 1</th>
                    <th>Field 2</th>
                    <th>Field 3</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={row.entry_id || rowIndex}>
                        <td>{row.created_at ? new Date(row.created_at).toLocaleString() : ''}</td>
                        <td>{row.entry_id}</td>
                        {['field1', 'field2', 'field3'].map((field) => (
                            <td
                                key={field}
                                onClick={() => handleCellClick(rowIndex, field)}
                                className={isEditable ? 'editable' : ''}
                            >
                                {editCell?.rowIndex === rowIndex && editCell?.column === field ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => handleCellUpdate(rowIndex, field)}
                                        onKeyDown={(e) => handleKeyPress(e, rowIndex, field)}
                                        autoFocus
                                    />
                                ) : (
                                    row[field]
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