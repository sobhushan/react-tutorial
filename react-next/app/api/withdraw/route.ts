import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/app/lib/mysql';
import { verifyToken } from '@/app/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const user = verifyToken(req, res);
  if (!user) return;

  const { username } = user;
  const { amount } = req.body;

  try {
    const [results]: any = await pool.query(
      'SELECT id, username, current_amt FROM users WHERE username = ?',
      [username]
    );

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userInfo = results[0];
    if (userInfo.current_amt < amount) {
      res.status(400).json({ error: 'Insufficient funds' });
      return;
    }

    const newBalance = userInfo.current_amt - amount;
    await pool.query('UPDATE users SET current_amt = ? WHERE id = ?', [newBalance, userInfo.id]);
    await pool.query('INSERT INTO transactions (user_id, username, action_type, amount) VALUES (?, ?, ?, ?)', [
      userInfo.id,
      username,
      'w',
      amount,
    ]);

    res.status(200).json({ message: `Withdrawal successful! New balance: ${newBalance}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process withdrawal' });
  }
}
