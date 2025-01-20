import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2';

// Initialize app and MySQL connection
const app: express.Application = express();
const port = 8000;

// Setup middleware to parse incoming JSON
app.use(express.json());

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:5173', // Your React frontend port
  methods: ['GET', 'POST'],
}));

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'atm_database',
});

// Test MySQL connection
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Handle Signup request
app.post('/signup', (req, res) => {
  const { username, password, initial_amt } = req.body;

  const sql = 'INSERT INTO users (username, password, initial_amt, current_amt) VALUES (?, ?, ?, ?)';
  connection.query(sql, [username, password, initial_amt, initial_amt], (error, results) => {
    if (error) {
      return res.status(500).send('Error inserting data');
    } else {
      return res.send('Account created successfully!');
    }
  });
});

// Handle Login request
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (error, results: any[]) => { // casting to array
    if (error) {
      return res.status(500).send('Error verifying user');
    } else if (results.length > 0) {
      return res.send(`Login successful! Welcome, ${username}`);
    } else {
      return res.status(401).send('Invalid credentials. Please try again.');
    }
  });
});


// Handle Withdraw request
app.post('/withdraw', (req, res) => {
  const { username, amount } = req.body;

  const checkBalanceQuery = 'SELECT id, username, current_amt FROM users WHERE username = ?';
  connection.query(checkBalanceQuery, [username], (error, results: any[]) => { // casting to array
    if (error) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    if (user.current_amt < amount) {
      return res.status(400).send('Insufficient funds');
    }

    const newBalance = user.current_amt - amount;
    const updateBalanceQuery = 'UPDATE users SET current_amt = ? WHERE id = ?';
    connection.query(updateBalanceQuery, [newBalance, user.id], (error) => {
      if (error) return res.status(500).send('Failed to process withdrawal');

      const transactionQuery = 'INSERT INTO transactions (user_id, username, action_type, amount) VALUES (?, ?, ?, ?)';
      connection.query(transactionQuery, [user.id, user.username, 'w', amount], (error) => {
        if (error) return res.status(500).send('Failed to log transaction');
        res.send(`Withdrawal successful! New balance: ${newBalance}`);
      });
    });
  });
});

// Handle Deposit request
app.post('/deposit', (req, res) => {
  const { username, amount } = req.body;

  // if (!username || !amount) {
  //   return res.status(400).send('Invalid request: Missing username or amount');
  // }

  const checkBalanceQuery = 'SELECT id, username, current_amt FROM users WHERE username = ?';
  connection.query(checkBalanceQuery, [username], (error, results: any[]) => { // casting to array
    if (error) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    const newBalance = user.current_amt + amount;
    const updateBalanceQuery = 'UPDATE users SET current_amt = ? WHERE id = ?';
    connection.query(updateBalanceQuery, [newBalance, user.id], (error) => {
      if (error) return res.status(500).send('Failed to process deposit');

      const transactionQuery = 'INSERT INTO transactions (user_id, username, action_type, amount) VALUES (?, ?, ?, ?)';
      connection.query(transactionQuery, [user.id, user.username, 'd', amount], (error) => {
        if (error) return res.status(500).send('Failed to log transaction');
        res.send(`Deposit successful! New balance: ${newBalance}`);
      });
    });
  });
});

// Fetch Current Balance
app.post('/balance', (req, res) => {
  const { username } = req.body;

  // if (!username) {
  //   return res.status(400).send('Invalid request: Missing username');
  // }

  const checkBalanceQuery = 'SELECT current_amt FROM users WHERE username = ?';
  connection.query(checkBalanceQuery, [username], (error, results: any[]) => { // casting to array
    if (error) return res.status(500).send('Failed to fetch balance');
    if (results.length === 0) return res.status(404).send('User not found');
    res.json({ balance: results[0].current_amt });
  });
});

// Fetch Transaction History
app.get('/transactions/:username', (req, res) => {
  const username = req.params.username;

  const sql = 'SELECT trans_id, username, action_type, amount, created_at FROM transactions WHERE username = ? ORDER BY created_at DESC';
  connection.query(sql, [username], (error, results: any[]) => { // casting to array
    if (error) return res.status(500).send('Failed to fetch transaction history');
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
