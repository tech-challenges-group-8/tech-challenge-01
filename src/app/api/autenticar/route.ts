import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import path from 'path';
import { promises as fs } from 'fs';


const filePath = path.join(process.cwd(), 'src/database', 'usuarios.json');

async function readUsers() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function POST(request: Request) {
  const { email, senha } = await request.json();

  if (!email || !senha) {
    return NextResponse.json(
      { success: false, message: 'Email e senha são obrigatórios' },
      { status: 400 }
    );
  }

  const users = await readUsers();

  const user = users.find(
    (u: any) => u.email === email && u.senha === senha
  );

  const cookieStore = await cookies();

  if (user) {
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

  return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 });
}