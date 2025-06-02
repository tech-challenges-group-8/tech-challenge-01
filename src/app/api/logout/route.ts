import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'auth',
    value: '',
    path: '/',
    maxAge: 0,
  });

  cookieStore.set({
    name: 'userId',
    value: '',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}
