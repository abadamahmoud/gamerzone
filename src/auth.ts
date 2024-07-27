import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient, User } from "@prisma/client";
import Google from "next-auth/providers/google";

import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
      },
      //adapter: PrismaAdapter(prisma),
  providers: [ Google,

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
              name: true,
              username: true,
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
          name: user.name,
          email: user.email,
          image: user.image,
          username: user.username,
          //role: user.role,
          id: user.id,
        };

        return userData;
      },
    }),
  ],

  
  callbacks: {
    async session({ session, token }) {
        
      if (token?.sub ) {
        session.user.id = token.sub;
        //session.user.role = token.role;
        
      }
      session.user.username = token.name
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        
        const prismaUser: User | null = await prisma.user.findUnique({
          where: { authProviderId: user.id },
        });
        if (prismaUser) {

          // Store ObjectId as string in token
          token.sub = prismaUser.id; // `id` is ObjectId in string format
          token.name = prismaUser.name;
          token.picture = prismaUser.image;
          token.email = prismaUser.email;
        } else {
          // Handle case where user is not found in database
          console.error('User not found in database:', user.id);
        }
        
        //token.role = user.role;
       
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          const username = `${name}`.toLowerCase().replace(" ","").trim();;
          const existingUser = await prisma.user.findUnique({
            where: { email: email || '' },
          });


           if (!existingUser) {
            // Create new user if not exists
            await prisma.user.create({
              data: {
                username,
                email,
                name,
                image,
                authProviderId: id as string,
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

