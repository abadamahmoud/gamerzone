"use client";

import {
  Home,
  MessageSquare,
  MessagesSquare,
  Telescope,
  Tv,
  Users,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ProfileLink from "./ProfileLink";
import { getSession } from "@/lib/getSession";
import { useUser } from "@/context/UserContext";



 function NavLinks() {
  const { user, loading } = useUser();

  /*if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <div>Welcome, {user.name}</div>;
  }

  return <div>Please log in</div>;*/

  const links = [
    { name: "Home", href: "/", icon: Home },
    /*{ name: "Explore", href: "/explore", icon: Telescope },*/
    { name: "Live Streams", href: "/streams", icon: Tv },
    { name: "Chat Servers", href: `${user !== undefined? "/chatservers" : "login"}`, icon: MessagesSquare },
    { name: "Directe Messges", href: `${user !== undefined? "/dms" : "login"}`, icon: MessageSquare },
    { name: "Communities", href: `${user !== undefined ? "/communities" : "login"}`, icon: Users },
    
  ];

  const pathname = usePathname();

  return (
    <>
    
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
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
