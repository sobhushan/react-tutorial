"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ATMProcess: React.FC = () => {
  const [username, setUsername] = useState<string | null>("Loading...");
  const [balance, setBalance] = useState<number | null>(null);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number | string>("");
  const [depositAmount, setDepositAmount] = useState<number | string>("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      alert("No user logged in! Redirecting to login page.");
      router.push("/login");
    } else {
      setUsername(storedUsername);
      fetchBalance(storedUsername);
    }
  }, []);

  // const fetchBalance = async (username: string) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   try {
  //     const response = await fetch("/api/balance", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  //       body: JSON.stringify({ username }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setBalance(data.balance);
  //       setResultMessage(null);
  //     } else {
  //       alert(data.message || "Error fetching balance");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchBalance = async (username: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const response = await fetch("/api/balance", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username }),
      });
  
      // Check if the response is not empty and is okay
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Error fetching balance");
        return;
      }
  
      // Try parsing the response if it's okay
      const data = await response.json();
      if (data) {
        setBalance(data.balance);
        setResultMessage(null);
      } else {
        alert('Response body is empty');
      }
    } catch (error) {
      console.error(error);
      alert('Error during balance fetch');
    }
  };
  

  const processWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0) {
      alert("Please enter a valid amount to withdraw.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username, amount: Number(withdrawAmount) }),
      });

      const data = await response.json();
      if (response.ok) {
        setBalance(data.newBalance);
        setWithdrawAmount("");
        setResultMessage("Withdrawal successful!");
      } else {
        setResultMessage(data.message || "Error processing withdrawal.");
      }
    } catch (error) {
      console.error(error);
      setResultMessage("An error occurred during withdrawal.");
    }
  };

  const processDeposit = async () => {
    if (!depositAmount || isNaN(Number(depositAmount)) || Number(depositAmount) <= 0) {
      alert("Please enter a valid amount to deposit.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username, amount: Number(depositAmount) }),
      });

      const data = await response.json();
      if (response.ok) {
        setBalance(data.newBalance);
        setDepositAmount("");
        setResultMessage("Deposit successful!");
      } else {
        setResultMessage(data.message || "Error processing deposit.");
      }
    } catch (error) {
      console.error(error);
      setResultMessage("An error occurred during deposit.");
    }
  };

  const exitApp = () => {
    alert("Thank you for using the ATM.");
    router.push("/login");
  };

  const showHistory = () => router.push("/history");

    return (
        <div className="container mt-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: 430 }}>
                <div className="card-body">
                    <h3 className="text-center mb-4">ATM Transaction</h3>
                    <h6 className="text-center">Welcome, {username}</h6>
                    <p className="text-center">Current Balance: {balance ?? "Loading..."}</p>

                    <div className="text-center mb-4">
                        <button onClick={() => setShowWithdrawForm(true)} className="btn btn-primary mx-2">Withdraw</button>
                        <button onClick={() => setShowDepositForm(true)} className="btn btn-success mx-2">Deposit</button>
                        <button onClick={showHistory} className="btn btn-warning mx-2">Show History</button>
                        <button onClick={exitApp} className="btn btn-danger mx-2">Exit</button>
                    </div>

                    {/* Withdraw Form */}
                    {showWithdrawForm && (
                        <div className="mb-3">
                            <label htmlFor="withdrawAmount" className="form-label">Withdraw Amount:</label>
                            <input
                                type="number"
                                id="withdrawAmount"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                className="form-control"
                            />
                            <button onClick={processWithdraw} className="btn btn-primary mt-2">Confirm</button>
                            <button onClick={() => setShowWithdrawForm(false)} className="btn btn-secondary mt-2 ms-2">Cancel</button>
                        </div>
                    )}

                    {/* Deposit Form */}
                    {showDepositForm && (
                        <div className="mb-3">
                            <label htmlFor="depositAmount" className="form-label">Deposit Amount:</label>
                            <input
                                type="number"
                                id="depositAmount"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="form-control"
                            />
                            <button onClick={processDeposit} className="btn btn-success mt-2">Confirm</button>
                            <button onClick={() => setShowDepositForm(false)} className="btn btn-secondary mt-2 ms-2">Cancel</button>
                        </div>
                    )}

                    {/* Result Message */}
                    {resultMessage && <p className="text-center text-success mt-3">{resultMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default ATMProcess;
