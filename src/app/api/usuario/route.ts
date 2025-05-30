import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/database', 'usuarios.json');

// Função para ler os dados atuais
async function readUsers() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Função para salvar os dados
async function saveUsers(users: any) {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

// 📥 POST → adiciona um usuário
export async function POST(request: Request) {
    console.log('request', request);
    const { nome, email, senha } = await request.json();

    if (!nome || !senha || !email) {
        return NextResponse.json(
            { success: false, message: 'Nome, email e senha são obrigatórios' },
            { status: 400 }
        );
    }

    const users = await readUsers();

    // Verifica se o email ja existe
    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
        return NextResponse.json({ success: false, message: 'Email ja cadastrado' }, { status: 400 });
    }

    // Adiciona o novo usuário
    users.push({ nome, email, senha });

    await saveUsers(users);

    return NextResponse.json({ success: true, message: 'Usuário cadastrado' });
}

// 📤 GET → lista os usuários
export async function GET() {
    const users = await readUsers();
    return NextResponse.json(users);
}
