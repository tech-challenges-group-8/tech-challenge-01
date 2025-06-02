import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from "uuid";

import { readMockData, saveMockData } from "../../../utils/mockDatabase";

const fileName = "transactions.json";
const transactionsFile = "transactions.json";
const usersFile = "users.json";

// 📥 POST → adiciona uma transaction
export async function POST(request: Request) {
  let { type, value } = await request.json();
  value = Number(value);

  if (!type) {
    return NextResponse.json(
      { success: false, message: "Tipo de transação é obrigatório" },
      { status: 400 }
    );
  }
  if (isNaN(value)) {
    return NextResponse.json(
      { success: false, message: "Valor inválido" },
      { status: 400 }
    );
  }

  if (!value) {
    return NextResponse.json(
      { success: false, message: "Valor da transação é obrigatório" },
      { status: 400 }
    );
  }

  const transactions = await readMockData(transactionsFile);
  const users = await readMockData(usersFile);

  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'Usuário nao autenticado' },
      { status: 400 }
    );
  }

  // Encontrar o usuário
  const userIndex = users.findIndex((u: any) => String(u.id) === String(userId));
  if (userIndex === -1) {
    return NextResponse.json(
      { success: false, message: 'Usuário não encontrado' },
      { status: 404 }
    );
  }

  // Atualizar o saldo do usuário
  if (type === "TRANSFER") {
    users[userIndex].balance -= value;
  } else {
    users[userIndex].balance += value;
  }

  // Criar nova transação
  const newTx = { id: uuidv4(), type, value, userId, date: new Date().toISOString() };
  transactions.push(newTx);

  // Salvar transações e usuários atualizados
  await saveMockData(transactionsFile, transactions);
  await saveMockData(usersFile, users);

  return NextResponse.json({
    success: true,
    transaction: newTx,
    balance: users[userIndex].balance,  // saldo atualizado
  });
}


// 📤 GET → lista

export async function GET() {
  const allTransactions = await readMockData(fileName);

  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'Usuário nao autenticado' },
      { status: 400 }
    );
  }

  const userTransactions = allTransactions.filter(
    (tx: any) => String(tx.userId) === String(userId)
  );

  return NextResponse.json({ success: true, transactions: userTransactions });
}
