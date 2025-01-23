import { NextResponse, NextRequest } from 'next/server';
import pool from '@/app/auth';
//import { verifyToken } from '@app/auth';

export async function POST(request: NextRequest) {
    const { username, amount } = await request.json();
    const [results]: any = await pool.query(
        'SELECT id, username, current_amt FROM users WHERE username = ?',
        [username]
      );
    const userInfo = results[0];
    const newBalance = userInfo.current_amt + amount;
    await pool.query('UPDATE users SET current_amt = ? WHERE id = ?', [newBalance, userInfo.id]);
    await pool.query('INSERT INTO transactions (user_id, username, action_type, amount) VALUES (?, ?, ?, ?)', [
      userInfo.id,
      username,
      'd',
      amount,
    ]);

    console.log(`${username} ka deposit ke baad balance is: ${newBalance}`);
    return Response.json({ message: `Deposit successful! New balance: ${newBalance}` });
  }