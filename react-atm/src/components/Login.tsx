import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { handleLogin } from "../handlers";

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.text();
      alert(data); // Show success or failure message

      if (data.includes('Login successful')) {
        localStorage.setItem('username', username);
        navigate("/atm")
        //window.location.href = "/atm"; // Redirect to action page on success
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error with the login process.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="text-center">Welcome to ATM</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={'password'}
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <a href="/signup" className="text-decoration-none">
              Not a User? Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
