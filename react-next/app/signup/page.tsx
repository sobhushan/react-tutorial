"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [initialAmount, setInitialAmount] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const signupData = {
      username,
      password,
      initial_amt: initialAmount,
    };

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Success message
        router.push('/login'); // Redirect to login page
      } else {
        alert(data.error || 'Signup failed');
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
