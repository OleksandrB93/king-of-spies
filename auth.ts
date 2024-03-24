import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import prismadb from "./lib/prismadb";

export const config = {
  theme: {
    //todo: change logo
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    // todo: need to do this method
    // jwt({ token, trigger, session }) {
    //   if (trigger === "update") token.name = session.user.name;
    //   return token;
    // },
    //redirect to main page /client
    

    async signIn({ profile, account }) {
      const existingUser = await prismadb.user.findUnique({
        where: {
          email: profile?.email as string,
        },
      });
      if (!existingUser) {
        await prismadb.user.create({
          data: {
            email: profile?.email,
            name: profile?.name,
            image: profile?.image,
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
            email_verified: profile?.email_verified,
            given_name: profile?.given_name,
            family_name: profile?.family_name,
          } as any,
        });
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
