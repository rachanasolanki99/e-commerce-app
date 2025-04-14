import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('/data/users.json')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return alert('All fields required');
    const updated = [...users, { ...newUser, id: Date.now() }];
    setUsers(updated);
    setNewUser({ name: '', email: '', role: 'User' });
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = () => {
    if (!editingUser.name || !editingUser.email) return alert('All fields required');
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    setEditingUser(null);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
      />

      <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
      <input
        type="text"
        placeholder="Name"
        value={editingUser ? editingUser.name : newUser.name}
        onChange={e => {
          const val = e.target.value;
          editingUser ? setEditingUser({ ...editingUser, name: val }) : setNewUser({ ...newUser, name: val });
        }}
        style={{ marginRight: '5px' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={editingUser ? editingUser.email : newUser.email}
        onChange={e => {
          const val = e.target.value;
          editingUser ? setEditingUser({ ...editingUser, email: val }) : setNewUser({ ...newUser, email: val });
        }}
        style={{ marginRight: '5px' }}
      />
      <select
        value={editingUser ? editingUser.role : newUser.role}
        onChange={e => {
          const val = e.target.value;
          editingUser ? setEditingUser({ ...editingUser, role: val }) : setNewUser({ ...newUser, role: val });
        }}
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      {editingUser ? (
        <>
          <button onClick={handleUpdate} style={{ marginLeft: '5px' }}>Update</button>
          <button onClick={() => setEditingUser(null)} style={{ marginLeft: '5px' }}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAddUser} style={{ marginLeft: '5px' }}>Add</button>
      )}

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;