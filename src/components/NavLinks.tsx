"use client";
import { Home, Tv , Telescope, MessagesSquare, BellRing, Users, User } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"; 
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils";

const links  = [
    {   name: "Home",
        href: "/",
        icon: Home
     
    },
    {   name: "Explore",
        href: "/explore",
        icon: Telescope
       
    },
    {   name: "Live Streams",
        href: "/streams",
        icon: Tv
        
    },
    {   name: "Discussions",
        href: "/discussios",
        icon: MessagesSquare
      
    },
    {   name: "Communities",
        href: "/communities",
        icon: Users,
        hideOnMobile: true
    },
    {   name: "Notifications",
        href: "/notifications",
        icon: BellRing,
        hideOnMobile: true
    },
    {   name: "Profile",
        href: "/dashboard",
        icon: User
    } 
]
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
                  className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
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

export default NavLinks