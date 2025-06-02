import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { readMockData } from "../../../utils/mockDatabase";

const fileName = "users.json";


export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: 'Email e password são obrigatórios' },
      { status: 400 }
    );
  }

  const users = await readMockData(fileName);

  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );

  const cookieStore = await cookies();

  if(!user.active){
    return NextResponse.json({ success: false, message: 'Conta inativa' }, { status: 401 });
  }

  if (user) {
    // Salva o ID em um cookie
    cookieStore.set('userId', user.id, {
      httpOnly: true, // Se quiser acessar no client, deixe false. (Para segurança, use true.)
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    cookieStore.set('auth', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
    });
    return NextResponse.json({ success: true });
  }

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

  return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 });
}