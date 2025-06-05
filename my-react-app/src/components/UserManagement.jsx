import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 dodaj to

const fakeUsers = [
  { id: 1, email: 'user1@example.com', role: 'user', points: 50 },
  { id: 2, email: 'admin@example.com', role: 'admin', points: 90 },
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(fakeUsers);
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>Lista użytkowników</h2>
      {users.map(user => (
        <div key={user.id} style={{ marginBottom: '1rem', border: '1px solid gray', padding: '1rem' }}>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rola:</strong> {user.role}</p>
          <Link to={`/admin/user/${user.id}`}>
            <button>Szczegóły</button>
          </Link>
          <button onClick={() => handleDelete(user.id)}>Usuń</button>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
