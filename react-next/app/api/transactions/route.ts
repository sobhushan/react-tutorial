import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/app/lib/mysql';
import { verifyToken } from '@/app/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const user = verifyToken(req, res);
  if (!user) return;

  const { username } = user;

  try {
    const [results]: any = await pool.query(
      'SELECT trans_id, username, action_type, amount, created_at FROM transactions WHERE username = ? ORDER BY created_at DESC',
      [username]
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
}
