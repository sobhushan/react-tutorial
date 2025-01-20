import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { handleSignup } from "../handlers";

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [initialAmount, setInitialAmount] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const signupData = {
      username,
      password,
      initial_amt: initialAmount,
    };

    try {
      const response = await fetch('http://localhost:5173/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.text();
      alert(data); // Show success message from server

      if (data.includes('Signup successful')) {
        navigate('/login'); // Redirect to login page on success
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error with the signup process.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="text-center">Signup Here</h2>
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
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

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Initial Amount Input */}
            <div className="mb-3">
              <label htmlFor="initial-amount" className="form-label">
                Initial Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="initial_amount"
                name="initial_amount"
                placeholder="Enter initial deposit amount"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Signup
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <a href="/login" className="text-decoration-none">
              Already a user? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;