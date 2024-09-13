import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import LoginHeader from "@/components/LoginHeader";
import RegisterForm from "@/components/RegisterForm";

const RegisterPage = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="w-full h-full xl:px-96">
    <div className=" h-full w-full max-w-[480px] mx-auto  p-4 flex items-center flex-col">
      <LoginHeader/>
      <RegisterForm/>

      

        
      </div>
    </div>
       
  
  );
};
export default RegisterPage;
