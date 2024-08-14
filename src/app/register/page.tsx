import { register } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginHeader from "@/components/LoginHeader";

const RegisterPage = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="w-full h-full xl:px-96">
    <div className=" h-full w-full max-w-[480px] mx-auto  p-4 flex items-center flex-col">
      <LoginHeader/>


      <form className="px-8 h-full w-full" action={register}>
        
            <Label htmlFor="firstname" className="text-md dark:text-gray-400 text-gray-600">
              First Name
            </Label>
            <Input
              id="firstname"
              placeholder="John"
              type="text"
              name="firstname"
              className="my-2 focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-none"
            />
          <div className="flex flex-col">
            <Label htmlFor="lastname" className="text-md dark:text-gray-400 text-gray-600">
              Last Name
            </Label>
            <Input
              id="lastname"
              placeholder="Doe"
              type="text"
              name="lastname"
              className="my-2 focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-none"
            />
          </div>

        <Label htmlFor="email" className="text-md dark:text-gray-400 text-gray-600">Email Address</Label>
        <Input
          id="email"
          placeholder="johndoe@gmail.com"
          type="email"
          name="email"
          className="my-2 focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-none"
        />

        <Label htmlFor="password" className="text-md dark:text-gray-400 text-gray-600">Password</Label>
        <Input
          id="password"
          placeholder="**********"
          type="password"
          name="password"
          className="my-2 mb-6 focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-none"
          
        />

<button className="relative mt-2 hover:opacity-90 group flex justify-center items-center space-x-2 px-6 py-2 rounded-lg h-12 font-semibold shadow-lg bg-gradient-to-br from-black to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 w-full text-white dark:text-neutral-950 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
  Sign up &rarr;
</button>
<p className="text-sm mt-2 text-gray-600 text-center">By signing up, you agree to our <Link href="/legal/terms" className="text-blue-900 "> Terms of Use</Link> and <Link href="/legal/privacy" className="text-blue-900 "> Privacy Policy</Link> .</p>

<div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <p className="text-start text-neutral-600 text-sm flex justify-center gap-3 max-w-sm mt-4 dark:text-neutral-300">
          Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-800 font-bold"> Login Here</Link>
        </p>
        
        
      </form>

        
      </div>
    </div>
       
  
  );
};
export default RegisterPage;







