import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const users = await prismadb.user.findMany();
  return NextResponse.json({ users });
}
