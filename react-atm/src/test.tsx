import { useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleGetRequest = async () => {
    if (!name) {
      alert('Please enter your name');
      return;
    }
    const response = await fetch('http://localhost:3000/api/hello', {
      method: 'GET',
      headers: { name },
      body: JSON.stringify({ name }),
    });
    
    const data = await response.json();
    setMessage(data.message);
  };

  const handlePostRequest = async () => {
    if (!name) {
      alert('Please enter your name');
      return;
    }
    const response = await fetch('http://localhost:3000/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h3>Enter your name:</h3>
      <div>
        <label htmlFor="name">Your Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br></br>
      <div>
        <button onClick={handleGetRequest}>GET Greeting</button>
        <button onClick={handlePostRequest} >POST Greeting</button>
      </div>
      <h3>{message}</h3>
    </div>
  );
};

export default Home;