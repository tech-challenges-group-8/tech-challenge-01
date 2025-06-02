import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { readMockData, saveMockData } from "../../../utils/mockDatabase";

const fileName = "transactions.json";

// 📥 POST → adiciona uma transaction
export async function POST(request: Request) {
    const { type, value } = await request.json();

    if (!type) {
        return NextResponse.json(
          { success: false, message: "Tipo de transação é obrigatório" },
          { status: 400 }
        );
    }

    if (!value) {
        return NextResponse.json(
          { success: false, message: "Valor da transação é obrigatório" },
          { status: 400 }
        );
    }

    const users = await readMockData(fileName);

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
        return NextResponse.json(
            { success: false, message: 'Usuário nao autenticado' },
            { status: 400 }
        );
    }

    // Adiciona o novo usuário
    users.push({ id: Math.floor(Math.random() * 999999), type, value, userId});

    await saveMockData(fileName, users);

    return NextResponse.json({ success: true, message: 'Transação adicionada com sucesso' });
}

// 📤 GET → lista
export async function GET() {
    const users = await readMockData(fileName);

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
