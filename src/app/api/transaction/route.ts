import { promises as fs } from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const filePath = path.join(process.cwd(), 'src/database', 'transactions.json');

// Função para ler os dados atuais
async function readTransactions() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Função para salvar os dados
async function saveTransactions(transactions: any) {
    await fs.writeFile(filePath, JSON.stringify(transactions, null, 2));
}

// 📥 POST → adiciona uma transaction
export async function POST(request: Request) {
    const { tipo, valor } = await request.json();

    if (!tipo) {
        return NextResponse.json(
            { success: false, message: 'Tipo de transação é obrigatório' },
            { status: 400 }
        );
    }

    if (!valor) {
        return NextResponse.json(
            { success: false, message: 'Valor da transação é obrigatório' },
            { status: 400 }
        );
    }

    const users = await readTransactions();

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
        return NextResponse.json(
            { success: false, message: 'Usuário nao autenticado' },
            { status: 400 }
        );
    }

    // Adiciona o novo usuário
    users.push({ id: Math.floor(Math.random() * 999999), tipo, valor, userId});

    await saveTransactions(users);

    return NextResponse.json({ success: true, message: 'Transação adicionada com sucesso' });
}

// 📤 GET → lista
export async function GET() {
    const users = await readTransactions();

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
        return NextResponse.json(
            { success: false, message: 'Usuário nao autenticado' },
            { status: 400 }
        );
    }

    users.filter((user: any) => user.userId === userId);

    return NextResponse.json(users);
}
