const API_URL = 'http://localhost:8000';

export const signup = async (username: string, password: string, initial_amt: number) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, initial_amt }),
    });
    if (response.ok) {
      return await response.text();
    } else {
      throw new Error('Signup failed');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error signing up');
  }
};

export const login = async (username: string, password: string) => {
  try {
    //const response = await fetch(`${API_URL}/login`, {
      const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      return await response.text();
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error logging in');
  }
};
