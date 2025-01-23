import mysql from 'mysql2';

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'somy@B2002', // Replace with your MySQL password
//   database: 'atm_database',
// });

// // Test MySQL connection
// (async () => {
//   try {
//     const connection = await pool.getConnection();
//     console.log('Connected to MySQL database!');
//     //connection.release(); // Release the connection back to the pool
//   } catch (error) {
//     console.error('Error connecting to MySQL database:', error);
//   }
// })();

// Create MySQL connection
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'somy@B2002', // Replace with your MySQL password
  database: 'atm_database',
});

// Test MySQL connection
pool.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});
export default pool;