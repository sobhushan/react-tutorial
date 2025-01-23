import { NextResponse, NextRequest } from 'next/server';
import pool from '@/app/auth';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "qwerty";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  console.log("Login attempt: ",username, password);

  const [results]: any = await pool.query(
          'SELECT * FROM users WHERE username = ? AND password = ?',
          [username, password]
        );
  if (results.length > 0) {
    //const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    //return Response.json({token, message: `Login successful! Welcome, ${username}`,});
    return Response.json({message: `Login successful! Welcome, ${username}`,});
  }else{
    return Response.json({message: "Invadid Credendials",});
  }
}

// const SECRET_KEY = "qwerty";

// export async function POST(request: Request) {
//   try {
//     const { username, password } = await request.json();

//     // Query the database to verify the user
//     const [results]: any = await pool.query(
//       'SELECT * FROM users WHERE username = ? AND password = ?',
//       [username, password]
//     );

//     if (results.length > 0) {
//       // Generate JWT token
//       const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
//       return Response.json({
//         token,
//         message: `Login successful! Welcome, ${username} NEXT`,
//       });
//     } else {
//       return Response.json(
//         { error: 'Invalid credentials NEXT' },
//         { status: 401 }
//       );
//     }
//   } catch (error) {
//     console.error('Error verifying user: NEXT ', error);
//     return Response.json(
//       { error: 'Internal server error NEXT' },
//       { status: 500 }
//     );
//   }
// }