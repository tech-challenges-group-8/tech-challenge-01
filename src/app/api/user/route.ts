import { NextResponse } from "next/server";

import { readMockData, saveMockData } from "../../../utils/mockDatabase";
import Transactions from "@/app/(dashboard)/transactions/page";

const fileName = "users.json";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !password || !email) {
    return NextResponse.json(
      { success: false, message: "name, email e password são obrigatórios" },
      { status: 400 }
    );
  }

  const users = await readMockData(fileName);

  const userExists = users.find((u: any) => u.email === email);
  if (userExists) {
    return NextResponse.json(
      { success: false, message: "Email já cadastrado" },
      { status: 400 }
    );
  }

  const newUser = {
    id: users.length ? Math.max(...users.map((u: any) => u.id)) + 1 : 1,
    name,
    email,
    password,
    active: true,
    balance: 0,
    
  };

  users.push(newUser);
  await saveMockData(fileName, users);

  return NextResponse.json({
    success: true,
    message: "Usuário criado com sucesso",
  });
}

export async function GET() {
  const users = await readMockData(fileName);
  return NextResponse.json(users);
}
