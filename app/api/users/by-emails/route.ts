import { NextResponse } from "next/server";
interface IUsersEmails {
  params: {
    emails: string[];
  };
}

export async function GET(req: Request, { params }: IUsersEmails) {
  const { searchParams } = new URL(req.url);
  const emails = searchParams.get("emails")?.split(",");

  const users = await prismadb.user.findMany({
    where: {
      email: {
        in: emails,
      },
    },
  });
  return NextResponse.json(users, { status: 200 });
}

// export async function GET(req: Request, { params }: IUsersEmails) {
//   const { emails } = params;

//   if (!emails) {
//     return NextResponse.json({ message: "Emails not found" }, { status: 404 });
//   }

//   const users = await prismadb.user.findMany({
//     where: {
//       email: {
//         in: emails, // Use emails array directly
//       },
//     },
//   });

//   return NextResponse.json({ users }, { status: 200 });
// }
