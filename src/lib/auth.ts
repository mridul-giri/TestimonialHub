import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { config } from "@/config/config";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy, maxAge: 7 * 24 * 60 * 60 },
  secret: config.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/register",
  },
};
