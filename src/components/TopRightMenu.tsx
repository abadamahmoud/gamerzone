

import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/getSession";
import { signOut } from "@/auth";
import ProfileLink from "./ProfileLink";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
  
      

      <ul className="hidden lg:flex items-center space-x-4 list-none">
        {!user ? (
          <>
            <li>
              <Link href="/login" >
              <Button  variant={"ghost"} className="flex space-x-2">
            
                Login
              </Button>
              </Link>
            </li>
            <li>
              <Link href="/register" >
              <Button  variant={"default"} className="flex space-x-2">
              
                Register
              </Button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
             <ProfileLink user={user}/>
            </li>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" variant={"ghost"}>
                Logout
              </Button>
            </form>
          
          </>
        )}
      </ul>
  
  );
};

export default Navbar;
