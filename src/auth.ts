import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
      },
      //adapter: PrismaAdapter(prisma),
  providers: [
    /*Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),*/

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              image: true,
              password: true,
             // role: true,
            },
          });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          //role: user.role,
          id: user.id,
        };

        return userData;
      },
    }),
  ],

  
  callbacks: {
    async session({ session, token }) {
        
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        //session.user.role = token.role;
        
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        //token.role = user.role;
        //token.sub = user.id;
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          const [firstName, lastName] = name?.split(" ") || [];
          const existingUser = await prisma.user.findUnique({
            where: { email: email || '' },
          });

           if (!existingUser) {
            // Create new user if not exists
            await prisma.user.create({
              data: {
                email,
                firstName,
                lastName,
                image,
                //authProviderId: id,
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error while creating user:", error);
          return false;
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});

