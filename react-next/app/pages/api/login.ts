import { NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'qwerty';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Query the database to verify the user
    const [results]: any = await pool.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (results.length > 0) {
      // Generate JWT token
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      return NextResponse.json({
        token,
        message: `Login successful! Welcome, ${username}`,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}