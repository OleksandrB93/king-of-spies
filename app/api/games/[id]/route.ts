import { NextResponse } from "next/server";

interface IGameRouteContext {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: IGameRouteContext) {
  const { id } = params;

  const game = await prismadb.game.findUnique({
    where: {
      id,
    },
  });

  if (!game) {
    return NextResponse.json({ message: "Game not found" }, { status: 404 });
  }

  return NextResponse.json(game);
}
