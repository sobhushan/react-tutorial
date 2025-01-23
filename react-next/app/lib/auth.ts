import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = 'qwerty';

export function verifyToken(req: NextApiRequest, res: NextApiResponse): { username: string } | null {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (!token) {
    res.status(403).json({ error: 'No token provided' });
    return null;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { username: string };
    return decoded;
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return null;
  }
}
