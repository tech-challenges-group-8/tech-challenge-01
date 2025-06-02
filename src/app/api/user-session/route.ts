import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { readMockData } from "../../../utils/mockDatabase";

const fileName = "users.json";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const users = await readMockData(fileName);
  // Ensure comparison is type-safe, assuming u.id might be a number or string
  const user = users.find((u: any) => String(u.id) === userId);

  if (user) {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { password, ...userData } = user; // Exclude sensitive data
    return NextResponse.json({ success: true, user: userData });
  } else {
    // If userId cookie exists but user not found in mock data (e.g., deleted user)
    cookieStore.delete("userId");
    cookieStore.delete("auth");
    return NextResponse.json(
      { success: false, message: "User not found" + userId },
      { status: 404 }
    );
  }
}
