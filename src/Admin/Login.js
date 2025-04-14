import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('/data/users.json');
    const users = await res.json();
    const admin = users.find(
      u => u.email === credentials.email && u.password === credentials.password && u.role === 'Admin'
    );
    if (admin) {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Login</h2>
      <input type="email" placeholder="Email" onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
