import { connectDB } from "@/lib/mongodb";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { findOrCreateUser, getUserById } from "@/actions/register.action";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: async (profile) => {
        const user = await findOrCreateUser(profile);
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email.toLowerCase(),
        }).select("+password");

        if (!user) throw new Error("User not found");

        if (!user.password) {
          throw new Error("Please log in with Google");
        }

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Incorrect password");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      const dbUser = await getUserById(token.id as string);
      token.userName = dbUser?.name;
      console.log("token", token);
      return token;
    },
    session: async ({ session, token }) => {
      console.log("session", session);
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.userName as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
};