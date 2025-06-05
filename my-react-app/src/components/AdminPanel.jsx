import React, { useState } from 'react';
import UserManagement from './UserManagement';
import EnergyEditor from './EnergyEditor';
import MonitoringPanel from './MonitoringPanel';
import { useUser } from '../context/UserContext';

export default function AdminPanel() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('users');
  const [error, setError] = useState(null);

  // Dodatkowe zabezpieczenie
  if (!user || user.role !== 'admin') {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        Brak uprawnień administratora
      </div>
    );
  }

  const renderTabContent = () => {
    try {
      switch (activeTab) {
        case 'users':
          return <UserManagement />;
        case 'energy':
          return <EnergyEditor />;
        case 'monitoring':
          return <MonitoringPanel />;
        default:
          return <div>Nieznana zakładka</div>;
      }
    } catch (err) {
      console.error('Błąd renderowania zakładki:', err);
      setError(err.message);
      return <div style={{ color: 'red' }}>Wystąpił błąd: {error}</div>;
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Panel administratora</h1>
      
      <div style={{ 
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "1px solid #eee",
        paddingBottom: "1rem"
      }}>
        <TabButton 
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
          icon="👥"
          label="Użytkownicy"
        />
        <TabButton 
          active={activeTab === 'energy'}
          onClick={() => setActiveTab('energy')}
          icon="⚡"
          label="Dane energetyczne"
        />
        <TabButton 
          active={activeTab === 'monitoring'}
          onClick={() => setActiveTab('monitoring')}
          icon="📊"
          label="Monitoring"
        />
      </div>

      {error ? (
        <div style={{ color: 'red', padding: '1rem' }}>
          Błąd: {error}
        </div>
      ) : (
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {renderTabContent()}
        </div>
      )}
    </div>
  );
}

// Komponent pomocniczy dla przycisków zakładek
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.75rem 1.5rem",
        background: active ? "#1976d2" : "transparent",
        color: active ? "white" : "#333",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "1rem",
        transition: "all 0.2s ease"
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}