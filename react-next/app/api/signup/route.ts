import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/mysql';

export async function POST(req: NextRequest) {
  const { username, password, initial_amt } = await req.json();

  try {
    await pool.query(
      'INSERT INTO users (username, password, initial_amt, current_amt) VALUES (?, ?, ?, ?)',
      [username, password, initial_amt, initial_amt]
    );
    return NextResponse.json({ message: 'Account created successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Error inserting data' }, { status: 500 });
  }
}