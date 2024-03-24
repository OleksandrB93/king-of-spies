// import { NextResponse } from "next/server";
// import { createGameDto } from "./dto";
// import  prismadb  from "@/lib/prismadb";

// export async function POST(req: Request, res: Response) {
//   const bodyRaw = await req.json();
//   const validateBody = createGameDto.safeParse(bodyRaw);

//   if (!validateBody.success) {
//     return NextResponse.json(validateBody.error.issues, {
//       status: 400,
//     });
//   }

//   const { numberOfSpies, players } = validateBody.data;

//   const newGame = await prismadb.game.create({
//     data: {
//       numberOfSpies,
//       players,
//     },
//   });

//   return NextResponse.json({ game: newGame }, { status: 201 });
  
// }
