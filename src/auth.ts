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
        try {
          const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error("Please provide both email & password");
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
          throw new Error("Invalid email or password");
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
           // Successful authorization
        } catch (error: any) {
          // Handle different types of errors
          console.error("[auth][error] Authorization failed:", error.message);
          throw new Error("Invalid email or password");
        }
        
      },
    }),
  ],

  
  callbacks: {
    async jwt({ token, user, account }) {
      // When the user is defined (i.e., during initial login)
      if (user) {
        // This is a new login, set authProviderId from the account provider
        token.authProviderId = account?.providerAccountId;
      }

      // Fetch user data from the database if it doesn't exist on the token
      if (!token.sub) {
        try {
          const prismaUser = await prisma.user.findUnique({
            where: { authProviderId: token.authProviderId as string },
          });

          if (prismaUser) {
            // Store ObjectId as string in token
            token.sub = prismaUser.id; // `id` is ObjectId in string format
            token.name = prismaUser.name;
            token.picture = prismaUser.image;
            token.email = prismaUser.email;
          } else {
            // Handle case where user is not found in database
            console.error('User not found in database:', token.authProviderId);
          }
        } catch (error) {
          console.error('Error fetching user from database:', error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Set session user properties from the token
      if (token.sub) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture;
       // session.user.authProviderId = token.authProviderId;
      }

      return session;
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

