import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the ATM Application!</h1>
      <p>Please choose an option:</p>
      <div>
        <Link href="/components/login" className="btn btn-primary mx-2">Login</Link>
        <Link href="/components/signup" className="btn btn-success mx-2">Signup</Link>
      </div>
    </div>
  );
};

export default Home;