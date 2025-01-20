import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';  
import Login from './components/Login'; 
import ATMProcess from './components/ATMProcess';
import History from './components/History';   
import Home from './components/Home';      

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define route for / */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/atm" element={<ATMProcess />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;