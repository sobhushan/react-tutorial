import React, { useEffect, useState } from "react";
//import { handleWithdraw, handleDeposit } from "../handlers";

const ATMProcess: React.FC = () => {
    const [username, setUsername] = useState<string | null>("Loading...");
    const [balance, setBalance] = useState<number | null>(null);
    const [showWithdrawForm, setShowWithdrawForm] = useState<boolean>(false);
    const [showDepositForm, setShowDepositForm] = useState<boolean>(false);
    const [withdrawAmount, setWithdrawAmount] = useState<number | string>('');
    const [depositAmount, setDepositAmount] = useState<number | string>('');
    const [resultMessage, setResultMessage] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is logged in
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
            alert("No user logged in! Redirecting to login page.");
            window.location.href = "/login";
        } else {
            setUsername(storedUsername);
            fetchBalance(storedUsername);
        }
    }, []);

    // Fetch balance from server
    const fetchBalance = async (username: string) => {
        try {
            const response = await fetch("http://localhost:8000/balance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });
            const data = await response.json();
            if (response.ok) {
                setBalance(data.balance);
            } else {
                alert(data);
                setBalance(null);
            }
        } catch (error) {
            console.error("Error fetching balance:", error);
            setBalance(null);
        }
    };

    // Handle withdrawal
    const processWithdraw = async () => {
        const amount = parseFloat(withdrawAmount.toString());
        if (amount <= 0) {
            alert("Invalid withdrawal amount.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, amount }),
            });
            const data = await response.text();
            if (response.ok) {
                fetchBalance(username!); // Refresh balance
                setResultMessage(data);
                resetTransaction();
            } else {
                alert(data);
            }
        } catch (error) {
            console.error("Error processing withdrawal:", error);
        }
    };

    // Handle deposit
    const processDeposit = async () => {
        const amount = parseFloat(depositAmount.toString());
        if (amount <= 0) {
            alert("Invalid deposit amount.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/deposit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, amount }),
            });
            const data = await response.text();
            if (response.ok) {
                fetchBalance(username!); // Refresh balance
                setResultMessage(data);
                resetTransaction();
            } else {
                alert(data);
            }
        } catch (error) {
            console.error("Error processing deposit:", error);
        }
    };

    // Show withdraw form
    const showWithdraw = () => {
        setShowWithdrawForm(true);
        setShowDepositForm(false);
    };

    // Show deposit form
    const showDeposit = () => {
        setShowWithdrawForm(false);
        setShowDepositForm(true);
    };

    // Reset transaction
    const resetTransaction = () => {
        setResultMessage(null);
        setShowWithdrawForm(false);
        setShowDepositForm(false);
    };

    // Cancel transaction
    const cancelTransaction = () => {
        setShowWithdrawForm(false);
        setShowDepositForm(false);
    };

    // Exit application
    const exitApp = () => {
        alert("Thank you for using the ATM.");
        window.location.href = "/login";
    };

    const showHistory = () => {
        alert("Redirecting to history page");
        window.location.href = "/history";
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: 430 }}>
                <div className="card-body">
                    <h3 className="text-center mb-4">ATM Transaction</h3>
                    <div className="text-center mb-4">
                        <h6>Welcome, {username}</h6>
                        <p>Current Balance: {balance !== null ? balance : "Loading..."}</p>
                    </div>

                    <div className="text-center mb-4">
                        <button className="btn btn-primary mx-1" onClick={showWithdraw}>Withdraw</button>
                        <button className="btn btn-success mx-1" onClick={showDeposit}>Deposit</button>
                        <button className="btn btn-warning mx-1" onClick={showHistory}> Show History</button>
                        <button className="btn btn-danger mx-1" onClick={exitApp}>Exit</button>
                    </div>

                    {showWithdrawForm && (
                        <div className="mb-3">
                            <h5>Enter Amount to Withdraw</h5>
                            <input
                                type="number"
                                className="form-control mb-2"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                placeholder="Amount to withdraw"
                                required
                            />
                            <button className="btn btn-warning mx-1" onClick={processWithdraw}>Withdraw</button>
                            <button className="btn btn-secondary mx-1" onClick={cancelTransaction}>Cancel</button>
                        </div>
                    )}

                    {showDepositForm && (
                        <div className="mb-3">
                            <h5>Enter Amount to Deposit</h5>
                            <input
                                type="number"
                                className="form-control mb-2"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                placeholder="Amount to deposit"
                                required
                            />
                            <button className="btn btn-info mx-1" onClick={processDeposit}>Deposit</button>
                            <button className="btn btn-secondary mx-1" onClick={cancelTransaction}>Cancel</button>
                        </div>
                    )}

                    {resultMessage && (
                        <div className="mt-4 text-center">
                            <p>{resultMessage}</p>
                            <button className="btn btn-primary" onClick={resetTransaction}>Go Back</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ATMProcess;