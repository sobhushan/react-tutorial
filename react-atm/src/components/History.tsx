// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Transaction {
//     trans_id: string;
//     username: string;
//     action_type: string;
//     amount: number;
//     created_at: string;
// }

// const History: React.FC = () => {
//     const [transactions, setTransactions] = useState<Transaction[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const username = localStorage.getItem("username");
//         if (!username) {
//             setError("No user logged in. Please log in first.");
//             return;
//         }

//         const token = localStorage.getItem("token");
//         if (!token) {
//             setError("Authentication token missing. Please log in again.");
//             return;
//         }

//         const fetchTransactionHistory = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://localhost:8000/transactions/${username}`,
//                     {
//                         headers: {
//                             "Authorization": `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 setTransactions(response.data); // Assuming the server sends transactions as JSON
//             } catch (error: any) {
//                 console.error("Error fetching transaction history:", error);
//                 if (error.response) {
//                     setError(error.response.data || "Failed to load transaction history.");
//                 } else {
//                     setError("Error fetching transaction history.");
//                 }
//             }
//         };

//         fetchTransactionHistory();
//     }, []);

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Transaction History</h2>

//             {error && <div className="alert alert-danger">{error}</div>}

//             <table className="table table-bordered table-striped">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Transaction ID</th>
//                         <th>Username</th>
//                         <th>Action Type</th>
//                         <th>Amount</th>
//                         <th>Date & Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.length > 0 ? (
//                         transactions.map((transaction) => (
//                             <tr key={transaction.trans_id}>
//                                 <td>{transaction.trans_id}</td>
//                                 <td>{transaction.username}</td>
//                                 <td>{transaction.action_type === "w" ? "Withdraw" : "Deposit"}</td>
//                                 <td>{transaction.amount}</td>
//                                 <td>{new Date(transaction.created_at).toLocaleString()}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={5} className="text-center">
//                                 No transactions found
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default History;

// ------------------------------------------------------------------->
// using Fetch API
import React, { useEffect, useState } from "react";

interface Transaction {
    trans_id: string;
    username: string;
    action_type: string;
    amount: number;
    created_at: string;
}

const History: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            setError("No user logged in. Please log in first.");
            return;
        }

        const fetchTransactionHistory = async () => {
            try {
                // const response = await fetch(`http://localhost:8000/transactions/${username}`);
                const response = await fetch(`http://localhost:3000/api/history?username=${username}`);
                const data = await response.json();
                if (response.ok) {
                    setTransactions(data);
                } else {
                    setError("Failed to load transaction history.");
                }
            } catch (error) {
                console.error("Error fetching transaction history:", error);
                setError("Error fetching transaction history.");
            }
        };

        fetchTransactionHistory();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Transaction History</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Transaction ID</th>
                        <th>Username</th>
                        <th>Action Type</th>
                        <th>Amount</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction.trans_id}>
                                <td>{transaction.trans_id}</td>
                                <td>{transaction.username}</td>
                                <td>{transaction.action_type === "w" ? "Withdraw" : "Deposit"}</td>
                                <td>{transaction.amount}</td>
                                <td>{new Date(transaction.created_at).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                No transactions found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default History;