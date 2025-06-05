import React from 'react';
import AccordionChart from './AccordionChart';

const MonitoringPanel = () => {
  const demoPowerData = [
    { time: "10:00", power: 85 },
    { time: "10:05", power: 90 },
    { time: "10:10", power: 92 },
    { time: "10:15", power: 95 },
    { time: "10:20", power: 94 },
    { time: "10:25", power: 91 },
  ];

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📊 Monitoring energetyczny (admin)</h2>
      <AccordionChart
        title="Wykres mocy [W]"
        data={demoPowerData}
        dataKey="power"
        color="#ff0000"
      />
    </div>
  );
};

export default MonitoringPanel;
