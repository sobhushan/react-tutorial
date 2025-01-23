import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/app/lib/mysql';
import { verifyToken } from '@/app/lib/auth';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const user = verifyToken(req, res);
  if (!user) return;

  const { username } = user;

  try {
    const [results]: any = await pool.query(
      'SELECT current_amt FROM users WHERE username = ?',
      [username]
    );

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const balance = results[0].current_amt;

    res.status(200).json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
}
