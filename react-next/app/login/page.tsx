"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const { token, message } = await response.json();
        alert(message); // Show success message
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        router.push('/atm'); // Redirect to ATM page
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('There was an error with the login process.');
    }
  };

  return (
    <div><h1>Login Page Display</h1></div>
  //   <div className="container mt-5">
  //     <div className="card mx-auto" style={{ maxWidth: '400px' }}>
  //       <div className="card-body">
  //         <h2 className="text-center">Welcome to ATM</h2>
  //         <form onSubmit={handleSubmit}>
  //           <div className="mb-3">
  //             <label htmlFor="username" className="form-label">
  //               Username
  //             </label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               id="username"
  //               placeholder="Enter your username"
  //               value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="password" className="form-label">
  //               Password
  //             </label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               id="password"
  //               placeholder="Enter your password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="d-grid">
  //             <button type="submit" className="btn btn-primary">
  //               Login
  //             </button>
  //           </div>
  //         </form>
  //         <div className="text-center mt-3">
  //           <a href="/signup" className="text-decoration-none">
  //             Not a User? Signup
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  );
};

export default Login;
