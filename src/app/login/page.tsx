import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import LoginHeader from "@/components/LoginHeader";
import LoginForm from "@/components/LoginForm";

const LoginPage = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="w-full h-full xl:px-96">
      <div className=" h-full w-full max-w-[480px] mx-auto  p-4 flex border-x items-center flex-col">
        <LoginHeader/>
        <LoginForm/>
        </div>
      </div>
         
    
  );
};

export default LoginPage;
