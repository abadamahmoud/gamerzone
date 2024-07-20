// src/types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// To avoid importing the type directly from the node_modules path, 
// we extend the NextAuth module using declaration merging.

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
