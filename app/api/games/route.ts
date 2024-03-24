import { NextResponse } from "next/server";
import { createGameDto } from "./dto";

export async function POST(req: Request, res: Response) {
  const bodyRaw = await req.json();
  const validateBody = createGameDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const { numberOfSpies, playerEmails } = validateBody.data;

  const newGame = await prismadb.game.create({
    data: {
      numberOfSpies,
      playerEmails,
    },
  });

  return NextResponse.json({ game: newGame }, { status: 201 });
  
}
