"use client";

import {
  Home,
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

const links = [
  { name: "Home", href: "/", icon: Home },
  /*{ name: "Explore", href: "/explore", icon: Telescope },*/
  { name: "Live Streams", href: "/streams", icon: Tv },
  { name: "Messages", href: "/messages", icon: MessagesSquare },
  { name: "Communities", href: "/communities", icon: Users },
  
];

function NavLinks() {
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
