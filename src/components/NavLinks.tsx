//"use client";

import {
  Home,
  MessagesSquare,
  Telescope,
  Tv,
  Users,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
//import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ProfileLink from "./ProfileLink";
import { getSession } from "@/lib/getSession";



async function NavLinks() {
  const session = await getSession();
  const user = session?.user;

  const links = [
    { name: "Home", href: "/", icon: Home },
    /*{ name: "Explore", href: "/explore", icon: Telescope },*/
    { name: "Live Streams", href: "/streams", icon: Tv },
    { name: "Messages", href: `${user ? "/messages" : "login"}`, icon: MessagesSquare },
    { name: "Communities", href: `${user ? "/communities" : "login"}`, icon: Users },
    
  ];

  //const pathname = usePathname();

  return (
    <>
    
      {links.map((link) => {
        const LinkIcon = link.icon;
      //  const isActive = pathname === link.href;
        const isActive = false
        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", { /*"hidden md:flex": link.hideOnMobile */}),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
      
    </>
  );
}

export default NavLinks;
