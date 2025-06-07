import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function AccordionChart({ title, data, dataKey, color, multipleLines }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="accordion-chart">
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="accordion-content">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              {multipleLines
                ? multipleLines.map((line) => (
                    <Line
                      key={line.dataKey}
                      type="monotone"
                      dataKey={line.dataKey}
                      stroke={line.color}
                      name={line.label}
                    />
                  ))
                : (
                  <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
                )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
