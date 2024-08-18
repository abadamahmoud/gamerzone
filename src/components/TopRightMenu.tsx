

import Link from "next/link";
import { Button } from "./ui/button";

import { signOut } from "next-auth/react"
import ProfileLink from "./ProfileLink";
import { useUser } from "@/context/UserContext";

const Navbar =  () => {
  const {user} = useUser();

  return (
      <ul className="hidden lg:flex items-center space-x-4 list-none">
        {!user ? (
          <>
            <li>
              <Link href="/login" >
              <Button  variant={"ghost"} className="flex px-6 space-x-2">
            
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
            <li>

            
              <Button variant={"ghost"} onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                Logout
              </Button>
            </li>
          
          
          </>
        )}
      </ul>
  
  );
};

export default Navbar;
