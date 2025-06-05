import React, { useState } from 'react';
import { useStats } from '../context/StatsContext';

const EnergyEditor = () => {
  const { stats, setStats } = useStats();
  const [formData, setFormData] = useState(stats);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSave = () => {
    setStats(formData);
    alert("Zapisano zmiany!");
    // 🟡 Możesz tu też wysłać dane do backendu POST/PUTem
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Edycja danych energetycznych</h2>

      {['voltage', 'currentHalogen', 'currentLED', 'power', 'energy'].map((key) => (
        <div key={key} style={{ marginBottom: '1rem' }}>
          <label htmlFor={key}>
            {key}:
            <input
              type="number"
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              style={{ marginLeft: '1rem' }}
            />
          </label>
        </div>
      ))}

      <button onClick={handleSave}>💾 Zapisz zmiany</button>
    </div>
  );
};

export default EnergyEditor;
