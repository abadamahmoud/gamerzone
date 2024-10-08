"use client"
import { cn } from "@/lib/utils";
import { FileQuestion, Mail, MessageSquareWarning } from "lucide-react";
import Link from "next/link"
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

const links = [
    { name: "Business Contact", href: "/contact", icon: Mail},
    { name: "Feedback", href: "/feedback", icon:MessageSquareWarning  },
    { name: "Help", href: "/help", icon: FileQuestion},
   ];
   const footerLinks = [
    { name: "Privacy Policy", href: "/legal/privacy"},
    { name: "Terms of Use", href: "/legal/terms"},
   ];


function Footer() {
  const pathname = usePathname();
  return (

    <div className="lg:block hidden">
      <hr className="mb-4"/>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
          return (
            <Link
            key={index}
            href={link.href}
            rel="noopener noreferrer" target="_blank"
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
      <hr className="mt-4 mb-4" />
      {footerLinks.map((link, index) => <Link
          key={index}
          href={link.href}
          rel="noopener noreferrer" target="_blank"
          className="text-sm  dark:text-neutral-300 text-neutral-600 inline text-nowrap space-x-1 items-center "
        >
          <span className=" hover:underline ">{ link.name}</span>
          <br/>
        </Link>)}
        <hr className="my-4" />
        <p className="dark:text-neutral-300 text-neutral-600 text-sm">Copyright © 2024 Gamerzone®. All rights reserved. 
        </p>
      

    </div>
    
  )
}

export default Footer
