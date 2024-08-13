import { signIn } from "@/auth";
import { chakraPetch } from "../app/fonts";

const LoginHeader = () => {
  return (
    <div className=" bg-red-500 w-full">
      
        <h1
          className={`font-semibold text-center text-7xl border-2 dark:border-white border-black rounded-md px-2 ${chakraPetch.className}`}
        >
          Gamerzone
        </h1>
        <h2 className="text-4xl font-extralight">Join Now!</h2>
      
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              className="relative hover:opacity-90 group/btn justify-center flex space-x-2 items-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-950 dark:bg-zinc-100 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <img src="/google.png" alt="Icon" className="h-6 w-6" />
              <span className="text-neutral-100 dark:text-neutral-900 text-md">
                Continue with Google
              </span>
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("apple");
            }}
          >
            <button
              className="relative hover:opacity-90 group/btn justify-center flex space-x-2 items-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-950 dark:bg-zinc-100 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <img
                src="/apple_white.png"
                alt="Icon"
                className="h-6 w-6 dark:hidden flex"
              />
              <img
                src="/apple_dark.png"
                alt="Icon"
                className="h-6 w-6 dark:flex hidden"
              />

              <span className="text-neutral-100 dark:text-neutral-900 text-md">
                Continue with Apple
              </span>
            </button>
          </form>
       

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px dark:bg-gray-100 bg-gray-950"></div>
          <span className="px-2 text-xl dark:text-gray-100 text-gray-950">
            or
          </span>
          <div className="flex-1 h-px dark:bg-gray-100 bg-gray-950"></div>
        </div>
      
    </div>
  );
};

export default LoginHeader;
