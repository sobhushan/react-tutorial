import { NextResponse, NextRequest } from 'next/server';
import pool from '@/app/auth';
//import { verifyToken } from '@app/auth';

export async function POST(request: NextRequest) {
    const { username } = await request.json();;
    const [results]: any = await pool.query(
        'SELECT current_amt FROM users WHERE username = ?',
        [username]
      );
      const balance = results[0].current_amt;
      console.log(`${username} ka balance is: ${balance}`);
      return Response.json({balance});
  }