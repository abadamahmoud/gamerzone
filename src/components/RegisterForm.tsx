"use client";

import { useState } from "react";
import { register } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import  { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await register(formData);


      if (result?.error) {

        // Handle specific error cases
        setError(result.error);
      } else {
        router.push("/login"); // Redirect on success
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form className="px-8 h-full w-full" onSubmit={handleSubmit}>
      <Label htmlFor="name" className="text-md dark:text-gray-400 text-gray-600">
        Full Name
      </Label>
      <Input
        id="name"
        placeholder="John"
        type="text"
        name="name"
        className="my-2 focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-none"
      />

      <Label htmlFor="email" className="text-md dark:text-gray-400 text-gray-600">
        Email Address
      </Label>
      <Input
        id="email"
        placeholder="johndoe@gmail.com"
        type="email"
        name="email"
        className="my-2 focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-none"
      />

      <Label htmlFor="password" className="text-md dark:text-gray-400 text-gray-600">
        Password
      </Label>
      <Input
        id="password"
        placeholder="********"
        type="password"
        name="password"
        className="my-2 focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-none"
      />
       <Label htmlFor="confirmPassword" className="text-md dark:text-gray-400 text-gray-600">
        Confirm Password
      </Label>
      <Input
        id="confirmPassword"
        placeholder="********"
        type="password"
        name="confirmPassword"
        className="my-2 mb-6 focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-none"
      />

      <button
        className="relative mt-2 hover:opacity-90 group flex justify-center items-center space-x-2 px-6 py-2 rounded-lg h-12 font-semibold shadow-lg bg-gradient-to-br from-black to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 w-full text-white dark:text-neutral-950 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        type="submit"
      >
        Sign up &rarr;
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <p className="text-sm mt-2 text-gray-600 text-center">
        By signing up, you agree to our <Link href="/legal/terms" rel="noopener noreferrer" target="_blank" className="text-blue-900">Terms of Use</Link> and <Link href="/legal/privacy" rel="noopener noreferrer" target="_blank" className="text-blue-900">Privacy Policy</Link>.
      </p>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <p className="text-start text-neutral-600 text-sm flex justify-center gap-3 max-w-sm mt-4 dark:text-neutral-300">
        Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-800 font-bold">Login Here</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
