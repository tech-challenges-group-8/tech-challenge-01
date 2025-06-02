import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readMockData, saveMockData } from "../../../../utils/mockDatabase";
const fileName = "transactions.json";

// 📤 PATCH → atualiza
export async function PATCH(request: Request, context: { params: { id: string } }) {
    const id = context.params.id;
    const updatedTx = await request.json();

    const transactions = await readMockData(fileName);
    const users = await readMockData("users.json");

    const index = transactions.findIndex((tx: any) => String(tx.id) === id);
    if (index === -1) {
        return NextResponse.json({ success: false, message: "Transação não encontrada" }, { status: 404 });
    }

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    const userIndex = users.findIndex((u: any) => String(u.id) === String(userId));
    if (!userId || userIndex === -1) {
        return NextResponse.json({ success: false, message: "Usuário não autenticado ou não encontrado" }, { status: 400 });
    }

    const oldTx = transactions[index];
    let newValue = Number(updatedTx.value);
    let oldValue = Number(oldTx.value);

    // Ajustar saldo: desfazer valor anterior e aplicar o novo
    if (oldTx.type === "TRANSFER") {
        users[userIndex].balance += oldValue;
    } else {
        users[userIndex].balance -= oldValue;
    }

    if (updatedTx.type === "TRANSFER") {
        users[userIndex].balance -= newValue;
    } else {
        users[userIndex].balance += newValue;
    }

    transactions[index] = { ...oldTx, ...updatedTx };
    await saveMockData(fileName, transactions);
    await saveMockData("users.json", users);

    return NextResponse.json({
        success: true,
        transaction: transactions[index],
        balance: users[userIndex].balance,
    });
}


// 🗑️ DELETE → exclui
export async function DELETE(request: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const transactions = await readMockData(fileName);
    const users = await readMockData("users.json");

    const index = transactions.findIndex((tx: any) => String(tx.id) === id);
    if (index === -1) {
        return NextResponse.json({ success: false, message: "Transação não encontrada" }, { status: 404 });
    }

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    const userIndex = users.findIndex((u: any) => String(u.id) === String(userId));
    if (!userId || userIndex === -1) {
        return NextResponse.json({ success: false, message: "Usuário não autenticado ou não encontrado" }, { status: 400 });
    }

    const deletedTx = transactions.splice(index, 1)[0];

    // Ajustar saldo
    if (deletedTx.type === "TRANSFER") {
        users[userIndex].balance += deletedTx.value;
    } else {
        users[userIndex].balance -= deletedTx.value;
    }

    await saveMockData(fileName, transactions);
    await saveMockData("users.json", users);

    return NextResponse.json({
        success: true,
        deleted: deletedTx,
        balance: users[userIndex].balance,
    });
}
