import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ten sam fake DB
const fakeUsers = {
  1: { id: 1, email: "user1@example.com", role: "user", points: 50 },
  2: { id: 2, email: "admin@example.com", role: "admin", points: 90 },
};

export default function UserDetailsAdmin() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const data = fakeUsers[id];
    if (data) {
      setUser(data);
      setPoints(data.points);
    }
  }, [id]);

  if (!user) return <p>Nie znaleziono użytkownika</p>;

  const handleSave = () => {
    alert(`Zapisano punkty dla ${user.email}: ${points}`);
    // przyszłościowo – tu zrobisz zapytanie PUT/POST do API
  };

  return (
    <div>
      <h2>Dane użytkownika</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rola:</strong> {user.role}</p>
      <div>
        <label>
          Punkty:
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            style={{ marginLeft: "1rem" }}
          />
        </label>
      </div>
      <button onClick={handleSave} style={{ marginTop: "1rem" }}>Zapisz zmiany</button>
    </div>
  );
}
