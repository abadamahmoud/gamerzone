"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

const prisma = new PrismaClient();

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Validate form data
    if (!email || !password) {
      throw new Error("Please fill in all required fields.");
    }

    // Attempt to sign in
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    if (result.error) {
      console.log(";;;;;;;;;;;;;;;;;;;;;;",result.error);
      throw new Error("Invalid email or password.");
    }

  } catch (error: any) {
    // Return the error to be handled in the component
    return { error:  error?.cause?.err?.message || error.message ||  "An unexpected error occurred. Please try again." };
  }
};
const register = async (formData: FormData) => {
  try {
    const name= formData.get("name")?.toString().trim();

   

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
      throw new Error("Please fill in all required fields.");
    }
    if (password.length < 8 ) throw new Error("Password must be at least 8 characters long.");
    if ((password.search(/[a-z]/) === -1 && password.search(/[A-Z]/) === -1) || password.search(/[0-9]/) === -1 || password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) === -1) throw new Error("Password is too weak. Please include a mix of letters, numbers, and special characters.")
     
    


    if (password!== confirmPassword) throw new Error("Passwords do not match. Please try again.");

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("An account with this email address already exists. Please use a different email or log in.");
    }

    const hashedPassword = await hash(password, 12);
    const username = `${name}`.toLowerCase().replace(" ", "");

    await prisma.user.create({
      data: { username, name, email, password: hashedPassword },
    });
    // return { success: true };

  } catch (error: any) {
    // Return the error to be handled in the component
    return { error: error.message };
  }
};
const fetchAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export { register, login, fetchAllUsers };
