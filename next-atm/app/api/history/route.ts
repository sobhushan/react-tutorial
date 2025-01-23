import { NextResponse, NextRequest } from 'next/server';
import pool from '@/app/auth';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    
    const [results]: any = await pool.query(
        'SELECT trans_id, username, action_type, amount, created_at FROM transactions WHERE username = ? ORDER BY created_at DESC',
        [username]
    );
    return Response.json(results);
  }