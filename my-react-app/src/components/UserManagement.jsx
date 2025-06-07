import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const fakeUsers = [
  { id: 1, email: 'user1@example.com', role: 'user', name: 'Anna', surname: 'Nowak', points: 50 },
  { id: 2, email: 'admin@example.com', role: 'admin', name: 'Admin', surname: 'Boss', points: 90 },
  { id: 3, email: 'user2@example.com', role: 'user', name: 'Jan', surname: 'Kowalski', points: 30 },
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [activeRole, setActiveRole] = useState('user');

  useEffect(() => {
    const filtered = fakeUsers.filter(user => user.role === activeRole);
    setUsers(filtered);
  }, [activeRole]);

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>Zarządzanie użytkownikami</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveRole('user')}
          style={{ background: activeRole === 'user' ? '#1976d2' : '#eee', color: activeRole === 'user' ? '#fff' : '#333' }}
        >
          👤 Użytkownicy
        </button>
        <button
          onClick={() => setActiveRole('admin')}
          style={{ background: activeRole === 'admin' ? '#1976d2' : '#eee', color: activeRole === 'admin' ? '#fff' : '#333' }}
        >
          🛡️ Administratorzy
        </button>
      </div>

      {users.length === 0 ? (
        <p>Brak użytkowników o roli "{activeRole}"</p>
      ) : (
        users.map(user => (
          <div key={user.id} style={{ marginBottom: '1rem', border: '1px solid gray', padding: '1rem' }}>
            <p><strong>{user.name} {user.surname}</strong> ({user.email})</p>
            <p><strong>Rola:</strong> {user.role}</p>
            <p><strong>Punkty:</strong> {user.points}</p>
            <Link to={`/admin/user/${user.id}`}>
              <button>Szczegóły</button>
            </Link>
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: '1rem' }}>
              Usuń
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserManagement;