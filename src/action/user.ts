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
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    throw someError
    return someError.cause;
  }
  redirect("/");
};

const register = async (formData: FormData) => {
  const firstNamename = formData.get("firstName") as string;
  const lastNamename = formData.get("lastName") as string;
  const name = `${firstNamename} ${lastNamename}`;
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Please fill all fields");
  }

  // existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hash(password, 12);
  const username = `${name}`.toLowerCase();

  await prisma.user.create({
    data: { username ,  name, email, password: hashedPassword },
  });
  console.log(`User created successfully `);
  redirect("/login");
};

const fetchAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export { register, login, fetchAllUsers };
